define(['backbone', 'd3'], function(Backbone){
	return Backbone.View.extend({
 		initialize : function(options){			
			_.bindAll(this);
			this.xArray = options.xArray;
			this.yArray = options.yArray;
			this.width = options.width;
			this.height = options.height;

			if(options.margin != null)
				this.margin= options.margin;
			else this.margin = 30;

			if(options.interpolate != null)
				this.interpolate = options.interpolate
			else this.interpolate = "linear";

			if(options.parseTime != null)
				this.parseTime = options.parseTime;
			else this.parseTime = false;

			return this;

		},

		labelChartTitle : function(){
			$(this.$el[0] + ' .graphTitle').setText(this.graphTitle);
		},

		

		render : function(){			
			var xArray = this.xArray,
			yArray = this.yArray,
			w = this.width,
			h = this.height,
			margin = this.margin,
			yScale = d3.scale.linear().domain([0, d3.max(yArray)]).range([h- margin, margin]);
			var xScale = this.setXScale(xArray, w, margin);

			
			
			var options = {
				xArray : this.xArray,
				yArray : this.yArray,
				w :this.width,
				h : this.height,
				margin : this.margin,
				yScale : yScale,
				xScale : xScale
			};
		
			

			var canvas = d3.select(this.$el[0])
				.attr("class", 'lineGraph')
			    .append("svg")
			    .attr("width", w)
			    .attr("height", h);
			this.canvas = canvas;
			var xAxis = this.setXAxis(xScale);
			var yAxis = this.setYAxis(yScale);
			this.drawAxis(canvas, xAxis, yAxis, options);
			this.drawGraphData(canvas, xScale, yScale, xArray, yArray);
			
			return this;
			
		},

		drawGraphData: function(canvas, xScale, yScale, xArray, yArray){
			var line = d3.svg.line()
			    .interpolate(this.interpolate)			    
			    .x(function(d) { 			    	
			    	return xScale(d.x); 
			    })
			    .y(function(d) { return yScale(d.y); });	

			var dataSet = [];
			var emptyData =[];
			for(var i = 0; i < xArray.length && i<yArray.length; i++){
				dataSet.push({
					x : xArray[i],
					y : yArray[i]
				});
				emptyData.push({
					x : xArray[i],
					y : 0,
				})
			}
			
			
			if(canvas.select(this.$el.selector +" .dataLine")[0][0] == null){
				this.path = canvas						
					.append("path")	
					.attr("class", "dataLine")			
					.attr("d", line(emptyData));			
				}
			// } else{
			// 	
			// 	d3.transition()
			// 		.select(this.$el.selector + ".dataLine")
			// 		.attr("d", line(emptyData));
			// }
//			
			d3.transition()
				.select( this.$el.selector+ ' .dataLine')
				//.select(".dataLine")
				.delay(100)
				.attr("d", line(dataSet))				
				.duration(400)
				.ease("linear");
		},

		drawAxis : function(canvas, xAxis, yAxis){		
			if(canvas.select(this.$el.selector +" .xAxis")[0][0] == null){
				
				canvas.append("g")
	    			.attr("class", "axis xAxis")
	    			.transition()
	    			.attr("transform", "translate(0," + (this.height - this.margin) + ")")
	    			.duration(400)
	    			.call(xAxis);
	    		// if(d3.max(this.yArray) >1000)
	    		// 	yAxis.tickFormat(d3.format("e"));
	    		canvas.append("g")
	    			.attr("class", "axis yAxis")
	    			.transition()
	    			.attr("transform", "translate(" +this.margin +",0 )")
	    			.duration(400)
	    			.call(yAxis);

	    		
	    	} else{
	    		
	    		canvas.select(this.$el.selector + " .xAxis")
	    			.transition()
	    			.call(xAxis)
	    			.duration(400);
	    		canvas.select(this.$el.selector + " .yAxis")
	    			.transition()
	    			.call(yAxis)
	    			.duration(400);
	    	}
	    		



		},

		setXAxis : function(xScale){
			var xAxis;
			if(this.parseTime){
			xAxis = d3.svg.axis()
	                .scale(xScale)
	                .orient("bottom")
	                .ticks(d3.time.days, 1)
    				.tickFormat(d3.time.format('%I:%M:%S %p'))
	                .ticks(4);  //Set rough # of ticks
				
			}

			else{
 				xAxis = d3.svg.axis()
	                .scale(xScale)
	                .orient("bottom")
	                .ticks(5);  //Set rough # of ticks
	        }


            return xAxis;
		},

		setYAxis : function(yScale){
			var yAxis =  d3.svg.axis()
				.scale(yScale)
				.orient("left")
				.ticks(5)
			return yAxis;
		},

		setXScale : function(xArray, w, margin){
			if(!this.parseTime)
				return d3.scale.linear().domain([d3.min(xArray), d3.max(xArray)]).range([0 + margin, w - margin]);
			else{
				return d3.time.scale()
					.domain([new Date(xArray[0]), new Date(xArray[xArray.length -1])])
					.rangeRound([0 + margin, w - margin]);

			}
		},

		setYScale: function(yArray, h, margin){
			return  d3.scale.linear().domain([0, d3.max(yArray)]).range([h- margin, margin]);
		},
 
		update : function(xArray, yArray){			
			//$(this.$el).empty();
			// var h = this.height,
			// w = this.width,
			// margin = 30,
			this.xArray = xArray;
			this.yArray = yArray;
			xScale = this.setXScale(xArray, this.width, this.margin),
			yScale = this.setYScale(yArray, this.height, this.margin);
			var xAxis = this.setXAxis(xScale);
			var yAxis = this.setYAxis(yScale);
			this.drawAxis(this.canvas, xAxis, yAxis);
			this.drawGraphData(this.canvas, xScale, yScale, xArray, yArray);
			
			return this;
			
		},

		setToZero : function(){
			// d3.select('')
			// d3.select(this.$el[0])
			// this.path = canvas						
			// 		.append("path")	
			// 		.attr("class", "dataLine")			
			// 		.attr("d", line(emptyData));
		}
	});


});