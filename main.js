import { updateDbWithNewOrders, getSingleOrder, addTestOrders } from './Controller/ordersFetcher';
import { OrderModel } from './Models/orderModel';
import { initTcpServer } from './TCPmodule/TCPListener';

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser())

function main() {
    // app.get('/', (req, res) => res.send('Hello World!'))
    // app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    //fetchNewOrders();
    //getOrder('7290005230806');
    initTcpServer();

}

function getOrder(barcode) {
    getSingleOrder(barcode);
}

function fetchNewOrders() {
    //updateDbWithNewOrders();
    addTestOrders();
}
main();