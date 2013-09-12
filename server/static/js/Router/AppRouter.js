define([
	'backbone',
	'views/HomeView',
	'views/StatsView'
	], function(Backbone, HomeView, StatsView){
	return Backbone.Router.extend({
		initialize: function(options){			
			_.bindAll(this);
			this.context  = options.context;
			Backbone.history.start();
		},
		
		routes : {
			'' : 'showHome',
			'stats' : 'showStats'
		},

		showHome: function() {
			
			this.homeView = new HomeView({
				el : '#homeView',
				context : this.context
			}).render();
			this.showStats();
		},

		showStats : function(){
			debugger;
			if(this.homeView == null)
				this.showHome();
			this.statsView = new StatsView({
				el : '#statView',
				context : this.context
			}).render();
		},

		hideContent : function(){
			$(".mainContent .inView").html();
		}

	});

})