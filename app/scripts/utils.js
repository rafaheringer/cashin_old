'use strict';

if(typeof app === 'undefined') var app = {};
/* ==============
 * Message system
 * ============== */
app.message = {
	//TODO Error
	error: function(text) {
		this.template(text, 'error');
	},
	
	//TODO Success
	success: function(text) {
		this.template(text, 'success');
	},
	
	//TODO Alert
	alert: function(text) {
		this.template(text, 'alert');
	},
	
	//TODO Template system for messages
	template: function(text, type) {
		alert(type + ': ' + text);
	}
};

/* ==========
 * User setup
 * ========== */
app.googleUser = {
	config: {
		
	},

	xhrWithAuth: function(method, url, interactive, callback) {
	var retry = true;
	var access_token;
	getToken();

		function getToken() {
			chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
			if (chrome.runtime.lastError) {
				callback(chrome.runtime.lastError);
				return;
			}

			// Save the token globally for the revoke button.
			revoke_button_token = token;

			access_token = token;
			requestStart();
			});
		}

		function requestStart() {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
			xhr.onload = requestComplete;
			xhr.send();
		}

		function requestComplete() {
			if (this.status == 401 && retry) {
			retry = false;
			chrome.identity.removeCachedAuthToken({ token: access_token },
													getToken);
			} else {
			callback(null, this.status, this.response);
			}
		}
	},

	getUserInfo: function(interactive) {
		this.xhrWithAuth('GET', 'https://www.googleapis.com/plus/v1/people/me', interactive, onUserInfoFetched);
	},

	onUserInfoFetched: function(error, status, response) {
		if (!error && status == 200) {
			console.log("Got the following user info: " + response);
			var user_info = JSON.parse(response);
			console.log(user_info);
			//populateUserInfo(user_info);
			//hideButton(signin_button);
			//showButton(revoke_button);
		} else {
			showButton(signin_button);
		}
	},


	//Login
	login: function(callback) {
		//Is an Chrome APP?
		if(chrome.identity) {
			chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
				if (chrome.runtime.lastError) {
					console.log('FUUUUUUUUUUUU');
				} else {
					app.googleUser.getUserInfo(true);
				}
			});
		}

		//Is a WEB APP?
		else {
			//TODO: 

			//Callback
			if(typeof callback !== 'undefined') {
				callback.call();
			}
		}
	}
};

/* ======================
 * Backbone views control
 * ====================== */
app.views = {
	//Change view
	show: function(viewName) {
		//TODO: Add loading

		//Load view
		require(['views/' + viewName], function(view) {
			if (app.views.current){
				app.views.current.close();
			}

			app.views.current = view;
			app.views.current.render();

			//TODO: Remove loading
		});
		
	},

	//Current view
	current: null
};