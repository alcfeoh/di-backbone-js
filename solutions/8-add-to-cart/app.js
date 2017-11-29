$(function() {

    var LicensePlate = Backbone.Model.extend({});

    var CartItem = Backbone.Model.extend({
        url: 'http://localhost:8000/cart'
    });

    var LicensePlateView = Backbone.View.extend({
        tagName:  "div",
        attributes: {class: 'col-md-4', style: 'margin-top: 40px'},
        events: {
            "click .btn": "addToCart"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var source = $('#plate-template').html();
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            this.$el.html(html);
            return this;
        },
        addToCart: function(){
            console.log("Adding to cart "+ this.model.get('title'));
            debugger;
            var cartItem = new CartItem(this.model);
            cartItem.save();
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: 'http://localhost:8000/data'
    });

    var plateList = new LicensePlateList();

    var AppView = Backbone.View.extend({

        el: "#container",

        initialize: function () {
            this.listenTo(plateList, "add", this.addPlate);
            plateList.fetch();
        },
        addPlate: function(plate) {
            let model = new LicensePlateView({model: plate});
            this.$el.append(model.render().el);
        }

    });

    var app = new AppView();

});