'use strict';

define([
	'text!templates/main.html',
	'models/Main'
	], function(MainTemplate, MainModel) {
	
	var MainView = Backbone.View.extend({
		el: $('#content'),
		
		render: function() {
			this.$el.html( _.template(MainTemplate, this.model.attributes) );
		},

	});

	//Render view
	var mainView = new MainView({model: MainModel});
	return mainView;
});