const APIS = require('./APIs')
const request = require('request');

const DEFAULT_PORT = 8080;
const options = {
    'json': true
}

exports.getProductsJSON = function(page) {
    return new Promise(function(resolve, reject) {
        request(APIS.selfPoint.getProductsByPage(page), { options }, (err, res, body) => {
            if (err) {
                reject(err);

            } else {
                resolve(JSON.parse(body));
            }

        })
    })

}