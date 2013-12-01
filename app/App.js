'use strict';

/* 
 * Project: Cash in
 * Developer: Rafael Heringer Carvalho
 * Website: -
 */

/* =========================
 * Paths and others configs
 * ======================== */
require.config({
	nodeRequire: require,
	baseUrl: '/',
	shim: {
		'foundation': {
			deps: ['jquery']
		},
	 	'backbone': {
	 		deps: ['jquery'],
	 		exports: 'Backbone'
	 	}
	},
	paths: {
		'jquery': 'scripts/vendor/jquery/jquery',
		'foundation': 'scripts/vendor/foundation/js/foundation',
		//'handlebars': 'scripts/vendor/handlebars/handlebars',
		'underscore': 'scripts/vendor/underscore-amd/underscore',
		'backbone': 'scripts/vendor/backbone-amd/backbone',
		'text' : 'scripts/vendor/requirejs-text/text',
		'i18n' : 'scripts/vendor/i18next/release/i18next-1.5.10',
		'accounting' : 'scripts/vendor/accounting/accounting'
	}
});


//under18n.templateSettings();


/* =================
 * First Page Invoke
 * ================= */

//Main content
require(['accounting', 'i18n', 'backbone'], function(accounting){
	/* ============
	 * Close method
	 * ============ */
	Backbone.View.prototype.close = function() {
		//this.stopListening();
		//this.undelegateEvents();
		//this.$el.removeData().unbind();
		this.$el.empty();

		if(this.onClose)
			this.onClose();
	};

	/* =================
	 * Routes techniques
	 * ================= */
	var AppRouter = Backbone.Router.extend({
		//Register router
		routes: {
			'': 'loginAction',
			'main': 'mainAction'
		},

		//Actions
		loginAction: function(){
			app.views.show('login');
		},

		mainAction: function() {
			app.views.show('main');
		}
	});

	app.router = new AppRouter();

	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();


	//i18next configuration
	i18n.init({ lng: 'pt-BR' });

	//Accounting configuration
	accounting.settings.currency = {
		symbol: i18n.t('currency.symbol'),
		format: i18n.t('currency.format'),
		decimal: i18n.t('currency.decimal'),
		thousand: i18n.t('currency.thousand'),
		precision: i18n.t('currency.precision')
	};

	accounting.settings.number = {
		precision: i18n.t('number.precision'),
		thousand: i18n.t('number.thousand'),
		decimal: i18n.t('number.decimal')
	};
});