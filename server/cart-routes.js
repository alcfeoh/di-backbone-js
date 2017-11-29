const storage = require('./plates-storage');
let plates = storage.plates;
let cart = storage.cart;

module.exports = [{
        method: 'GET',  path:'/cartContents',
        handler: function (request, reply) {
            let cartContents = plates.filter(plate => cart.indexOf(plate._id) != -1);
            return reply(JSON.stringify(cartContents));
        }
}, {
    method: ['PUT', 'POST'],  path:'/cart',
    handler: function (request, reply) {
        cart.push(request.payload._id);
        return reply(request.payload._id + ' added to the cart');
    }
}, {
    method: 'DELETE',  path:'/cart',
    handler: function (request, reply) {
        cart.splice(cart.indexOf(request.payload._id), 1);
        return reply(request.payload._id + ' removed from the cart');
    }
}];