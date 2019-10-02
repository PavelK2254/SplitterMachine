const collectionName = "ordersTest";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const dbName = 'splitterDB'
import { MongoClient } from 'mongodb';
var url = "mongodb://localhost:27017/" + dbName;
var availableCollections = [];

export function init() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, options, function(err, db) {
            if (err) {
                reject(err)
            };
            var dbo = db.db(dbName);
            dbo.listCollections().toArray(function(err, items) {
                if (err) {
                    reject(err)
                };
                availableCollections = items;
                if (items.length == 0) {
                    console.log(`No collections in database, creating ${collectionName}`)
                    dbo.createCollection(collectionName, function(err, res) {
                        if (err) {
                            reject(err)
                        };
                        resolve(`Collection created! ${collectionName}`);
                        db.close();
                    });
                } else {
                    resolve(`Collection ${collectionName} Is available`);
                }
            });
        });
    })
}

export function addNewOrdersToDB(order) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, options, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var newOrder = order;
            dbo.collection(collectionName).insertMany(newOrder, function(err, res) {
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
        MongoClient.connect(url, function(err, db) {
            if (err) reject(err);
            var dbo = db.db(dbName);
            var orderBoject = dbo.collection(collectionName).findOneAndUpdate({ barcodeNum: +barcode, status: 0 }, { $set: { status: 1 } }, options, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result.value != null && result.value != undefined) {
                        resolve(result.value.orderNum);
                    } else {
                        reject(`No item found for barcode ${barcode}`);
                    }
                }
                db.close();
            });
        });
    });
}