export class OrderModel {
    constructor(laneNum, orderNum, barcodeNum, numberOfUnits, status, productName) {
        this.laneNum = laneNum;
        this.orderNum = orderNum;
        this.barcodeNum = barcodeNum;
        this.numberOfUnits = numberOfUnits;
        this.status = status;
        this.productName = productName;
    }
}