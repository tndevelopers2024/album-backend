async function test() {
    try {
        console.log('Testing GET /api/products...');
        const res1 = await fetch('https://dev.placetest.in/api/products');
        console.log('Products status:', res1.status);
        if (res1.status === 500) {
            console.log('Error payload:', await res1.text());
        }

        console.log('Testing GET /api/master-specs...');
        const res2 = await fetch('https://dev.placetest.in/api/master-specs');
        console.log('Master Specs status:', res2.status);
        if (res2.status === 500) {
            console.log('Error payload:', await res2.text());
        }
    } catch (e) {
        console.error('Fetch failed:', e.message);
    }
}

test();
