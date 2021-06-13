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

app.get('/api/products/1', (req, res) => {
    const singleProd = products.find( product => product.id === 1 )
    res.json(singleProd)
})



app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})