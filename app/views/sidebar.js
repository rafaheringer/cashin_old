'use strict';

define([
	'backbone', 
	'underscore', 
	'jquery', 
	'accounting',
	'models/Account',
	'text!templates/accounts/list.html'
], function(Backbone, _, $, accounting, Account, AccountsListTemplate) {


	var SidebarView = Backbone.View.extend({
		el: $('#myAccountsList'),
		tagName: 'div',
		className: 'account-list-item',
		render: function() {
			this.$el.append( _.template(AccountsListTemplate, this.model.attributes) );
		}
	});

	for(var i = 0; i < 10; i++){
		var accountItem = new Account({
			title: "Item " + i,
			id: i,
			type: 'ss',
			type_id: 1,
			balance: Math.random()*Math.random()*100
		});
		var sidebarView = new SidebarView({model: accountItem});
		sidebarView.render();
	}

	return SidebarView;
});