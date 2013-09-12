define([
	'backbone'
	], function(Backbone){
		return Backbone.Model.extend({
			initialize : function(){
				
			},

			defaults : {
				'light' : 0,
				'time' : new Date().getTime()
			}
		});

})