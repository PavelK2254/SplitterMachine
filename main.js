const express = require('express')
const app = express()
const dataRepository = require('./Networking/dataRepository');

const port = 3000
var ordersGetter = dataRepository.getProductsJSON('1');

function main() {
    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    getProducts();
}
main();

function getProducts() {
    ordersGetter.then(function(result) {
        console.log(result);

    }, function(err) {
        console.log(err);

    })
}