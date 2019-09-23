import { updateDbWithNewOrders, getSingleOrder, addtestOrders } from './Controller/ordersFetcher';
import { OrderModel } from './Models/orderModel';

const express = require('express');
const app = express();
const port = 3000


function main() {
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    fetchNewOrders();
}

function fetchNewOrders() {
    //updateDbWithNewOrders();
    //getSingleOrder('60');
    //addtestOrders();
}
main();