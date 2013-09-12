define([
	'backbone',
	'jquery',
	'text!templates/HomeViewTemplate.tpl.html'
	], 
	function(Backbone, $, HomeViewTemplate){
		return Backbone.View.extend({
			initialize : function(options){
				this.template = _.template(HomeViewTemplate);
				_.bindAll(this);
				this.context = options.context;				
				return this;
			},

			render: function(){
				debugger;
				$(this.el).append(this.template);
				return this;
			}
		});
})