define([], function(){
		function LightService(config) {
			this.config = config;
		};		

		LightService.prototype.getLight = function (light, success, error){			
			light.fetch({success: success, error : error});
		};

		return LightService;
});