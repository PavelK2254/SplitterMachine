import { getProductsJSON } from '../Networking/dataRepository';
import { OrderModel } from '../Models/orderModel';
//import { exampleOrderNums } from '../Utils/orderNumbers';
import { init, addNewOrdersToDB, getOrderByBarcode } from '../DAO/dbAccessManager';
import { resolve } from 'dns';
var exampleOrdersJson = require('../OrderExamples/20200511C2.json');
var currentPage = '1';
var ordersGetter = getProductsJSON(currentPage);
var ordersCollection = [];

export function initDB() {
    return new Promise((resolve, reject) => {
        init().then((result) => {
            resolve(result)
        })
    })
}

export function updateDbWithNewOrders() {

    init().then(function (result) {
        ordersGetter.then(function (result) {
            result.products.forEach(element => {
                console.log(`${element.id} ${element.id} ${element.barcode} 0, 1, ${element.longName}`);
                //ordersCollection.push({ orderNumber: element.id, barcode: element.barcode, numberOfUnits: 0, status: 1, productName: element.longName })
                ordersCollection.push(new OrderModel(element.id, element.barcode, 0, 1, element.longName))
            });
            addNewOrdersToDB(ordersCollection).then(function (result) {
                //getOrderByBarcode('60').then(function(result) {
                console.log(result);

            }, function (err) {
                console.error(err);
            })
        }, function (err) {
            console.log(err);

        })
    }, function (err) {
        console.log(err);
    });
}

//TODO Remove this
/*export function addtestOrders() {
    var testOrderNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    exampleOrderNums.forEach(element => {
        ordersCollection.push(new OrderModel(testOrderNumber[Math.floor(Math.random() * 11)], element, 0, 0, "test item " + exampleOrderNums.indexOf(element)))
            //console.log(new OrderModel(testOrderNumber[Math.floor(Math.random() * 11)], element, 0, 1, "test item " + exampleOrderNums.indexOf(element)));
        addNewOrdersToDB(ordersCollection).then(function(result) {
            console.log(result);

        }, function(err) {
            console.error(err);
        })
    });
}*/



export function addTestOrders() {
    exampleOrdersJson.filter((item, index, currentArray) => {

        var currentLaneNumber = parseInt(item.laneNum)
        var currentOrderNumber = parseInt(item.orderNum);
        var currentBarCodeNumber = parseInt(item.barcodeNum);
        var currentName = item.productName
        var order = new OrderModel(currentLaneNumber, currentOrderNumber, currentBarCodeNumber, 0, 0, currentName)

        ordersCollection.push(order);


    })
    addNewOrdersToDB(ordersCollection).then(function (result) {
        console.log(result);

    }, function (err) {
        console.error(err);
    })
    //console.table(ordersCollection)
}



export async function getSingleOrder(barcode) {
    return new Promise(function (resolve, reject) {
        getOrderByBarcode(barcode).then(function (result) {
            console.log(result);
            resolve(result);
        }, function (err) {
            console.log("Error " + err);
            reject(err);
        });
    })

}