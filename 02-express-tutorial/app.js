const app = require('express')();
const { products } = require('./data')



app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})