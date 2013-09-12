define([
	'backbone',
	'jquery',
	'text!templates/StatsViewTemplate.tpl.html',
	'models/LightCollection',
	'widgets/LineGraphWidget',
	'widgets/PieChartWidget'
	], 
	function(Backbone, $, StatsViewTemplate, LightCollection, LineGraphWidget, PieChartWidget){
		return Backbone.View.extend({
			initialize : function(options){
				this.template = _.template(StatsViewTemplate);
				_.bindAll(this);
				this.context = options.context;

				this.collection = new LightCollection({url:this.context.getConfig().lightUrl});
				return this;
			},

			render: function(){
				
				$(this.el).append(this.template);
				this.context.getLightService().getLight(this.collection, this.onSuccess, this.onError);
				var that = this;
				window.setInterval(function(){
					// that.context.getLightService().getLight(that.collection, that.onSuccess, that.onError);
					that.drawGraph();
				}, 5000);
				return this;
			},

			onSuccess : function(response){
				$('#statData').text(JSON.stringify(response.models[0].attributes));
				this.drawGraph();

				debugger;
			},

			drawGraph : function(){
				debugger;
				if(this.lineGraph == null){
					this.lineGraph = new LineGraphWidget({
						el : '#lineGraph',
						xArray: this.collection.getTime(),
						// yArray: this.collection.getLight(),
						yArray: this.collection.getAccel(),
						height : $("#lineGraph").height(),
						width : $("#lineGraph").width(),
						parseTime : true,
						margin : 40,
						interpolate : "basis"
					}).render();
				} else{
					this.lineGraph.update(this.collection.getTime(), this.collection.getAccel());

				}

				if(this.pieChart == null){
					this.pieChart = new PieChartWidget({
						el : '#pieChart',
						height : $('#pieChart').height(),
						width : $('#pieChart').width(),
						margin: 20,
						//radius: 40,
						data : [{
							label : "one",
							data : 23
						},{
							label : "two",
							data : 3
						},{
							label : "three",
							data : 27
						}]
					}).render();
				} else{
					this.pieChart.update([{
							label : "one",
							data : 23
						},{
							label : "two",
							data : 32
						},{
							label : "three",
							data : 2
						}]);
				}

			},

			onError : function(){
				debugger;
			}



		});
})