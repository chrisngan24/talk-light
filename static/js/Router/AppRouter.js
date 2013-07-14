define([
	'backbone',
	'views/HomeView'
	], function(Backbone){
	return Backbone.Router.extend({
		initialize: function(){

		},
		
		routes : {
			'' : 'showHome'
		},

		showHome: function() {
			this.homeView = new HomeView({
				el : '#homeView'
			}).render();
		}

	});

})