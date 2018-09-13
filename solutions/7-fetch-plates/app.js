$(function() {

    var LicensePlate = Backbone.Model.extend({});


    var LicensePlateView = Backbone.View.extend({
        tagName:  "div",
        attributes: {class: 'col-md-4', style: 'margin-top: 40px'},
        initialize: function () {
            this.render();
        },
        render: function () {
            var source = $('#plate-template').html();
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: '/data'
    });

    var plateList = new LicensePlateList();

    var AppView = Backbone.View.extend({

        el: "#container",

        initialize: function () {
            this.listenTo(plateList, "sync", this.render);
            plateList.fetch();
        },
        render: function () {
            plateList.each((plate) => {
                let model = new LicensePlateView({model: plate});
                this.$el.append(model.render().el);
            });
            return this;
        }

    });

    var app = new AppView();

});