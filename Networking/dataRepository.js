import { selfPoint } from './APIs';
import request from 'request';

const DEFAULT_PORT = 8080;
const options = {
    'json': true
}

export function getProductsJSON(page) {
    return new Promise(function(resolve, reject) {
        request(selfPoint.getProductsByPage(page), { options }, (err, res, body) => {
            if (err) {
                reject(err);

            } else {
                resolve(JSON.parse(body));
            }

        })
    })

}