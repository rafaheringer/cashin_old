var requirejs = require('requirejs');

var config = {
	appDir: './app',
	baseUrl: './app/scripts',
	dir: './dist',
	mainConfigFile: './app/scripts/main.js',
	name: 'main',
	optimizeCSS: 'standard'
};

requirejs.optimize(config, function (buildResponse) {
	var contents = fs.readFileSync(config.out, 'utf8');
}, function(err) {
	console.log(err);
});