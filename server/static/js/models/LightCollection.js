define([
	'backbone',
	'models/LightModel'
	], function(Backbone, LightModel){
		return Backbone.Collection.extend({
			initialize : function(options){
				this.url = options.url;
			},
			model : LightModel,

			getTime : function(){
				return this.getModelArray('time');
			},
			getLight : function(){
				return this.getModelArray('light');
			},
			getAccel : function(){
				return this.getModelArray('accelX');
			},

			getModelArray : function(attribute){
				var modelArray = [];
				for(var i = 0; i < this.length; i++){
					modelArray.push(this.models[i].get(attribute));
				}
				return modelArray;
			}

		});

})