import { updateDbWithNewOrders, getSingleOrder, addTestOrders, initDB, resetDBStatuses } from './Controller/ordersFetcher';
import { OrderModel } from './Models/orderModel';
import { initTcpServer } from './TCPmodule/TCPListener';

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser())

function main() {
    console.log("Connecting to the DB...");
    // fetchNewOrders();

    initDB().then((result) => {
        console.log("DB initialized");
        initTcpServer();
        resetDBStatuses()
    }).catch((error) => {
        console.error(`Error: ${error}`)
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