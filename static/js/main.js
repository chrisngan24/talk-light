requirejs.config({
	baseUrl: "static/js",
	paths: {
		jquery: "../libs/jquery-1.9.0.min",
		backbone: "../libs/backbone-min",
		underscore: "../libs/underscore-min",
		bootstrap: "../libs/bootstrap/js/bootstrap.min",
		text: "../libs/text"		
	},
	shim: {
		"backbone" : {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"bootstrap" : {
			deps: ["jquery"], 
			exports: "Bootstrap"
		}

	}
});

requirejs(["jquery", "backbone", "App" ], function ($, Backbone, App) {
	//App.initialize();
});



