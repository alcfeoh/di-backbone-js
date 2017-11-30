$(function() {

    var HelloWorld = Backbone.Model.extend({
        defaults: {
            message: "Marionette World"
        },
        helloWorld: function() {
            alert("Hello "+ this.get('message') +"!");
        }
    });

    var HelloView = Marionette.View.extend({
        tagName: 'h1',
        template: '#hello-template'
    });

    var App = Marionette.Application.extend({
        region: 'body',

        onStart: function() {
            this.showView(new HelloView({model: new HelloWorld()}));
        }
    });

    var myApp = new App();
    myApp.start();

});