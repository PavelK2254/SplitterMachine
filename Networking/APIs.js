//http://api.self-point.com/v2/retailers/10/data-shipping/products?token=a820cb0ba6d9875d0c4a9466a55cc475&page=
//http://api.self-point.com/v2/retailers/10/data-shipping/categories?token=a820cb0ba6d9875d0c4a9466a55cc475&page=
//http://api.self-point.com/v2/retailers/10/data-shipping/orders?token=a820cb0ba6d9875d0c4a9466a55cc475&start=2019-09-10&end=2019-09-15&page=1

exports.selfPoint = {
    host: "http://api.self-point.com",
    productsPath: "/v2/retailers/10/data-shipping/products",
    categoriesPath: "/v2/retailers/10/data-shipping/categories",
    ordersPath: "/v2/retailers/10/data-shipping/orders",
    testToken: "a820cb0ba6d9875d0c4a9466a55cc475",
    getProductsByPage: function(page) {
        return this.host + this.productsPath + "?token=" + this.testToken + "&page=" + page;
    },
    getCategoriesByPage: function(page) {
        return this.host + this.categoriesPath + "?token=" + this.testToken + "&page=" + page;
    },
    getOrdersByDate: function(start, end) {
        return this.host + this.ordersPath + "?token=" + this.testToken + "&start=" + start + "&end=" + end;
    }


}