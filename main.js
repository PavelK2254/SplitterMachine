import { updateDbWithNewOrders, getSingleOrder, addTestOrders, initDB } from './Controller/ordersFetcher';
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

    //getOrder('7290005230806');
    console.log("Connecting to the DB...");
    // fetchNewOrders();
    initDB().then((result) => {
        console.log("DB initialized");
        initTcpServer();
    })


}

function getOrder(barcode) {
    getSingleOrder(barcode);
}

function fetchNewOrders() {
    //updateDbWithNewOrders();
    addTestOrders();
}
main();