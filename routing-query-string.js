const app = require('express')();
const { products } = require('./data')

app.get('/', (req, res) => {
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
})

app.get('/api/products', (req, res) => {
    const newProd = products.map( product => {
        const {id, name, image} = product;
        return { id, name, image};
    })
    res.json(newProd)
})
// route parameter
app.get('/api/products/:productID', (req, res) => {
    //console.log(req.params);
    const { productID } = req.params;
    const singleProd = products.find( product => product.id === Number(productID));

    if ( !singleProd ){
        return res.status(404).send('Product Does Not Exist');
    }

    res.json(singleProd)
})

// complext route parameter
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
    res.send('Hello');
})

// query string parameter
app.get('/api/v1/query', (req, res) => {
    //console.log(req.query);
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter( product => {
            return product.name.startsWith(search)
        })
    }

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if (sortedProducts.length < 1) {
        return res.status(200).json({ success: true, data: []});
    }

    res.status(200).json(sortedProducts);

    //res.send('Hello World');
})


app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})