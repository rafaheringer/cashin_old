'use strict';

define([
	'text!templates/login.html',
	'models/Login'
	], function(LoginTemplate, LoginModel) {
	
	var LoginView = Backbone.View.extend({
		el: $('#content'),
		
		render: function() {
			this.$el.html( _.template(LoginTemplate, this.model.attributes) );
		},

		//Events
		events: {
			'click #loginAction': 'loginCall'
		},

		//Login Call method
		loginCall: function() {
			var _self = this;

			app.googleUser.login(function(){
				//Render main view
				app.router.navigate('main', {trigger: true});
			});
		}
	});

	//Render view
	var loginView = new LoginView({model: LoginModel});

	return loginView;
});