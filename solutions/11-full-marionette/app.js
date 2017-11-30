$(function() {

    var LicensePlate = Backbone.Model.extend({});

    var LicensePlateView = Marionette.View.extend({
        template: '#plate-template',
        attributes: {class: 'col-md-4', style: 'margin-top: 40px'},
        events: {
            "click .btn": "addToCart"
        },
        addToCart: function(){
            console.log("Adding to cart "+ this.model.get('title'));
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: '/data'
    });

    var plateList = new LicensePlateList();


    var StoreView = Marionette.CollectionView.extend({
        childView: LicensePlateView,
        attributes: {class: 'row'},
    });


    var App = Marionette.Application.extend({
        region: '#container',

        onStart: function() {
            this.showView(new StoreView({collection: plateList}));
            plateList.fetch();
        }
    });

    var app = new App();
    app.start();


});