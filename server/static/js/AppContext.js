define([
	'text!../config/config.json',
	'services/LightService'
	], function(config, LightService){
	return {
		getConfig : function(){
			if(this.config == null)
				this.config = JSON.parse(config);
			return this.config;
		},

		getLightService : function(){
			if(this.lightService == null){
				this.lightService = new LightService(this.getConfig());
			}
			return this.lightService;
		}

	}
})