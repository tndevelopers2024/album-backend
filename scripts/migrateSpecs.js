require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

async function migrate() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const collection = mongoose.connection.collection('masterspecifications');
    const docs = await collection.find({}).toArray();
    console.log(`Found ${docs.length} specification documents`);

    for (const doc of docs) {
        const cleanOptions = (doc.options || []).map(opt => ({
            label: opt.label,
            price: typeof opt.price === 'number' ? opt.price : 0
        }));

        await collection.updateOne(
            { _id: doc._id },
            {
                $set: { options: cleanOptions },
                $unset: { name: '', category: '', displayOrder: '', required: '' }
            }
        );
        console.log(`Migrated: ${doc.label || doc.name || doc._id}`);
    }

    console.log('Migration complete');
    await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
