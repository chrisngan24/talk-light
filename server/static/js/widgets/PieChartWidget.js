define(['backbone', 'd3'], function(Backbone){
	return Backbone.View.extend({
		initialize: function(options){
			_.bindAll(this);
			this.width = options.width;
			this.height = options.height;
			if(options.margin != null)
				this.margin = options.margin;
			else this.margin = 0;

			if(options.radius != null)
				this.radius = options.radius;
			else {
				var radius = (this.width-this.margin*2)/2 ;
				if((this.height-this.margin*2)/2 < radius)
					radius = (this.height-this.margin*2)/2;
				this.radius = radius;
			}



			this.data = options.data;
			if(options.innerRadius != null)
				this.innerRadius = options.innerRadius;
			else innerRadius = 0;
			if(options.color!= null)
				this.color = options.color;
			else this.color = d3.scale.category20c();  


			return this;
		},

		render: function(){
			this.arc = this.setArc();
        	this.pie = this.setPie();
        	debugger;
        	var that = this;
			this.canvas = d3.select(this.$el[0])
				.append('svg')
				.data([this.data])
				.attr('width', that.width)
				.attr('height', that.height)
				.append("g")
				.attr('transform', 'translate(' + (this.radius +this.margin) +',' + (this.radius +this.margin)+')');
			this.drawData();

			return this;
		},

		drawData : function(){
			debugger;
			this.arcs = this.canvas.selectAll(this.$el.selector + "g.slice")     
		        .data(this.pie)                    
		        .enter()           
		            .append("g")
		                .attr("class", this.$el.selector + " slice");

		    if(this.canvas.select(this.$el.selector + " .slice .pieSlice")[0][0] == null){
		    	var that = this;
		    	this.paths = this.arcs.append("path")
		    		
		    		.attr("class", "pieSlice")
                	.attr("fill", function(d, i) { return that.color(i); } ) //set the color for each slice to be chosen from the color function defined above
                	
                	
            } 
            	
            this.paths
            	.attr("d", this.arc)


           	

		},

		setArc : function(){
			return d3.svg.arc()              //this will create <path> elements for us using arc data
        		.outerRadius(this.radius)
        		//.innerRadius(this.innerRadius);
		},

		setPie : function(){
			return d3.layout.pie()           //this will create arc data for us given a list of values
        		.value(function(d) { 
        			debugger;
        			return d.data; }); 
		},

		removeOldData : function(){
			
		},



		update: function(data){
			this.data = data;
			this.canvas.data([this.data]);
			this.arc = this.setArc();
			this.removeOldData();
			this.drawData();
		}
	});

});