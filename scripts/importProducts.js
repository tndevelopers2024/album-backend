const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const xlsx = require('xlsx');
const Product = require('../models/Product');

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

async function migrate() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Read Excel
        const workbook = xlsx.readFile(path.join(__dirname, '../../products.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // Skip first row label, header is on row 2 (index 1)
        const data = xlsx.utils.sheet_to_json(worksheet, { range: 1 });

        console.log(`Found ${data.length} products in Excel`);

        // Directory mapping
        const imagesBaseDir = path.join(__dirname, '../../product image');
        const uploadsDir = path.join(__dirname, '../uploads/products');

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Clear existing products? 
        await Product.deleteMany({});
        // console.log('Cleared existing products');

        for (const row of data) {
            const name = row['PRODUCT NAME'];
            const category = row['PRODUCT CATEGORY'];
            if (!name || !category) continue;

            console.log(`Processing ${name} (${category})...`);

            // 1. Normalize category for directory matching
            const categorySlug = category.toLowerCase().trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            
            // 2. Parse Sizes
            const sizeRaw = row['SIZE OPTIONS'] || '';
            const sizes = { Square: [], Portrait: [], Landscape: [] };
            const sizeLines = sizeRaw.split('\n');
            sizeLines.forEach(line => {
                const parts = line.split('-');
                if (parts.length === 2) {
                    const orientation = parts[0].trim();
                    const vals = parts[1].split(',').map(v => v.trim());
                    if (orientation.toUpperCase() === 'SQUARE') sizes.Square = vals;
                    if (orientation.toUpperCase() === 'POTRAIT') sizes.Portrait = vals;
                    if (orientation.toUpperCase() === 'LANDSCAPE') sizes.Landscape = vals;
                }
            });

            // 3. Parse Print (Paper Types)
            const printRaw = row['PRINT'] || '';
            let paperTypes = [];
            if (printRaw.includes('NT')) {
                const ntPart = printRaw.split('2.')[0]; // Get everything before "2.LAYFLAT"
                const types = ntPart.replace(/1\.NT\s*-\s*/, '').split(',');
                paperTypes = types.map(t => t.trim().split(' ')[0]).filter(Boolean); // Extract main word e.g. "GLOSSY"
            }

            // 4. Parse Pad Details (Customization)
            const padRaw = row['PAD DETAILS'] || '';
            const frontPageOptions = [];
            if (padRaw.toUpperCase().includes('NAME')) frontPageOptions.push({ id: 'names', label: 'Full Names', type: 'text', required: true });
            if (padRaw.toUpperCase().includes('INITIAL')) frontPageOptions.push({ id: 'initials', label: 'Initials', type: 'text', required: false });
            if (padRaw.toUpperCase().includes('PHOTO')) frontPageOptions.push({ id: 'cover_photo', label: 'Cover Photo', type: 'image', required: true });
            if (padRaw.toUpperCase().includes('DATE')) frontPageOptions.push({ id: 'event_date', label: 'Event Date', type: 'date', required: false });
            if (padRaw.toUpperCase().includes('LOGO')) frontPageOptions.push({ id: 'logo_text', label: 'Custom Logo/Text', type: 'text', required: false });

            // 5. Parse Colors and Images
            const nameMatch = name.match(/\d+$/);
            const productNum = nameMatch ? parseInt(nameMatch[0], 10) : null;
            
            let productDir = path.join(imagesBaseDir, categorySlug);
            // Try with number suffix if it exists (e.g. basic-rexine-series-1)
            if (productNum !== null) {
                const altDir = `${productDir}-${productNum}`;
                if (fs.existsSync(altDir)) {
                    productDir = altDir;
                }
            }

            const colorRaw = row['BOX COLOUR'] || '';
            const colorLines = colorRaw.split('\n').map(c => c.trim()).filter(Boolean);
            const colors = [];
            let mainImage = '';
            let mainGallery = [];

            // Helper to get images from a directory
            const getImagesFromDir = (dir) => {
                if (!fs.existsSync(dir)) return [];
                const files = fs.readdirSync(dir);
                const result = [];
                for (const file of files) {
                    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                        const newFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file}`;
                        const destPath = path.join(uploadsDir, newFilename);
                        fs.copyFileSync(path.join(dir, file), destPath);
                        result.push(`/uploads/products/${newFilename}`);
                    }
                }
                return result;
            };

            const isStandardGallery = colorRaw.toUpperCase().includes('NR') || 
                                    colorRaw.toUpperCase().includes('AVAILBALE') || 
                                    colorLines.length === 0;

            if (isStandardGallery) {
                // Look for images directly in productDir or all subfolders
                mainGallery = getImagesFromDir(productDir);
                
                // Also check subfolders if any
                if (fs.existsSync(productDir)) {
                    const subitems = fs.readdirSync(productDir, { withFileTypes: true });
                    for (const item of subitems) {
                        if (item.isDirectory()) {
                            mainGallery.push(...getImagesFromDir(path.join(productDir, item.name)));
                        }
                    }
                }

                if (mainGallery.length > 0) {
                    mainImage = mainGallery[0];
                }
            } else {
                for (const colorLine of colorLines) {
                    const colorName = colorLine.replace(/^\d+\.\s*/, '').trim();
                    const colorSlug = colorName.toLowerCase().replace(/\s+/g, '-');
                    
                    const colorDir = path.join(productDir, colorSlug);
                    const colorGallery = getImagesFromDir(colorDir);

                    if (colorGallery.length > 0) {
                        if (!mainImage) mainImage = colorGallery[0];
                        colors.push({
                            name: colorName,
                            hex: getColorHex(colorName),
                            gallery: colorGallery
                        });
                    }
                }

                // If no images found in subfolders, try the main dir
                if (colors.length === 0) {
                    mainGallery = getImagesFromDir(productDir);
                    if (mainGallery.length > 0) {
                        mainImage = mainGallery[0];
                    }
                }
            }

            // Create Product
            const productData = {
                name,
                category,
                description: `${category} - High quality customized album.`,
                image: mainImage,
                gallery: mainGallery,
                features: [row['SIZE OPTIONS'].replace(/\n/g, ', ')],
                benefits: ['Premium Quality', 'Handcrafted', 'Fast Delivery'],
                price: 2500, // Default price
                boxPrice: 500, // Default box price
                frontPageOptions,
                sizes,
                paperTypes,
                colors
            };

            await Product.findOneAndUpdate({ name }, productData, { upsert: true, new: true });
            console.log(`Saved ${name}`);
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

function getColorHex(name) {
    const map = {
        'GREEN': '#2E7D32',
        'BLUE': '#1565C0',
        'NAVY BLUE': '#1A237E',
        'SKY BLUE': '#03A9F4',
        'BROWN': '#5D4037',
        'PINK': '#E91E63',
        'BEIGE': '#F5F5DC',
        'GREY': '#9E9E9E',
        'PEACH': '#FFCCBC',
        'CHARCOAL': '#37474F'
    };
    return map[name.toUpperCase()] || '#808080';
}

migrate();
