console.log('\'Allo \'Allo!');
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	if (chrome.runtime.lastError) {
		console.log('FUUUUUUUUUUUU');
	} else {
		getUserInfo(true);
	}
});




function xhrWithAuth(method, url, interactive, callback) {
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
	}

function getUserInfo(interactive) {
	xhrWithAuth('GET', 'https://www.googleapis.com/plus/v1/people/me', interactive, onUserInfoFetched);
}

function onUserInfoFetched(error, status, response) {
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
	}
