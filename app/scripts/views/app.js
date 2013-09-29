define(['backbone'], function(Backbone) {
	var App = Backbone.View.extend({
		el: $('body'),
		initialize: function() {
			console.log('Wohaa!');
			this.render();
		},
		render: function() {
			$(this.el).append("<h1>Hello World</h1>");
		}
	});

	return App;
});