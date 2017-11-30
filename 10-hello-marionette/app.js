$(function() {

    var HelloWorld = Backbone.Model.extend({
        defaults: {
            message: "Marionette World"
        },
        helloWorld: function() {
            alert("Hello "+ this.get('message') +"!");
        }
    });

    <!-- Create your marionette app here -->

});