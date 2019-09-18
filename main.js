import { getOrders } from './Controller/ordersFetcher'
const express = require('express');
const app = express();
const port = 3000


function main() {
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
        //getProducts();
    fetchNewOrders();
}

function fetchNewOrders() {
    getOrders();
}
main();