export class OrderModel {
    constructor(id, orderNum, barcodeNum, numberOfUnits, status, productName) {
        this.id = id;
        this.orderNum = orderNum;
        this.barcodeNum = barcodeNum;
        this.numberOfUnits = numberOfUnits;
        this.status = status;
        this.productName = productName;
    }
}