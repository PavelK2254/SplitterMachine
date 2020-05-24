const collectionName = require("./collectionName.json");
const currentCollectionName = collectionName.collectionName.toString()
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = 'splitterDB'
import { MongoClient } from 'mongodb';

var url = "mongodb://localhost:27017/" + dbName;
var availableCollections = [];
var dbo;

export function init() {
    console.log(`Collection name: ${currentCollectionName}`);
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, options, function(err, db) {
            if (err) {
                reject(err)
            };
            dbo = db.db(dbName);
            dbo.listCollections().toArray(function(err, items) {
                if (err) {
                    reject(err)
                };
                availableCollections = items;
                if (items.length == 0) {
                    console.log(`No collections in database, creating ${currentCollectionName}`)
                    dbo.createCollection(currentCollectionName, function(err, res) {
                        if (err) {
                            reject(err)
                        };
                        resolve(`Collection created! ${currentCollectionName}`);
                        db.close();
                    });
                } else {
                    resolve(`Collection ${currentCollectionName} Is available`);
                }
            });
        });
    })
}

export function addNewOrdersToDB(order) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, options, function(err, db) {
            if (err) throw err;
            dbo = db.db(dbName);
            var newOrder = order;
            dbo.collection(currentCollectionName).insertMany(newOrder, function(err, res) {
                if (err) {
                    db.close();
                    reject(err);
                    console.log(err);
                } else {
                    resolve(res);
                    db.close();
                }
            });
        });
    })

}



export function getOrderByBarcode(barcode) {
    return new Promise(function(resolve, reject) {
       // dbo.collection(currentCollectionName).findOne({ barcodeNum: +barcode }, options, function(err, result) {
        dbo.collection(currentCollectionName).findOneAndUpdate({ barcodeNum: +barcode, status: 0 }, { $set: { status: 1 } }, options).then(result => {
                console.log(`Result ${JSON.stringify(result,4)}`)
                var resultObj = result.value
                if (resultObj != null && resultObj != undefined) {
                    resolve(resultObj.laneNum);
                } else {
                    reject(`No item found for barcode ${barcode} or it is already scanned`);
                }
            })
    });
}