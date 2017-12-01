$(function() {

    var LicensePlate = Backbone.Model.extend({});

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
            var cartItem = new CartItem(this.model.attributes);
            cartItem.save();
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: '/data'
    });

    var plateList = new LicensePlateList();

    var StoreView = Backbone.View.extend({

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


    var view = new StoreView();


});