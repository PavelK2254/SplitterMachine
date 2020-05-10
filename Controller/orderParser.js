import { PlcResultModel } from '../Models/plcResultModel';
import { getSingleOrder } from '../Controller/ordersFetcher';

const STATIC_LANE = "2"

export async function parseOrderData(socketString) {
    return new Promise(function(resolve, reject) {
        var barcodeObject;
        try {
            if (isJson(socketString)) {
                barcodeObject = JSON.parse(socketString)
                barcodeObject.forEach(element => {
                    getSingleOrder(element.tracingNum).then((result) => {
                        var modResult = result;
                        resolve(new PlcResultModel("true", modResult.toString()))
                    }).catch((err) => {
                        reject(new PlcResultModel("false", "Error: " + err));
                    })
                });
            } else {
                reject(new PlcResultModel("false", "Invalid JSON Object: " + socketString));
            }

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}