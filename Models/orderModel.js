export class OrderModel {
    constructor(orderNum, barcodeNum, numberOfUnits, status, productName) {
        this.orderNum = orderNum;
        this.barcodeNum = barcodeNum;
        this.numberOfUnits = numberOfUnits;
        this.status = status;
        this.productName = productName;
    }
}