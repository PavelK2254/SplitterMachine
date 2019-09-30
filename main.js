import { updateDbWithNewOrders, getSingleOrder, addtestOrders } from './Controller/ordersFetcher';
import { OrderModel } from './Models/orderModel';
import { initTcpServer } from './TCPmodule/TCPListener';

const express = require('express');
const app = express();
const port = 3000;


function main() {
    //app.get('/', (req, res) => res.send('Hello World!'))
    //app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    //fetchNewOrders();
    //getOrder('7290016400595');
    initTcpServer();

}

function getOrder(barcode) {
    getSingleOrder(barcode);
}

function fetchNewOrders() {
    //updateDbWithNewOrders();
    addtestOrders();
}
main();