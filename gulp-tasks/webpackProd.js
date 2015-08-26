import webpack from 'webpack';
export default (gulp, plugins, config) => {
	return () => {
	  let compiler = webpack(config);
	  compiler.run(function(err, stats) {
    	    if (err) {
    	       return console.error(err);	
    		}
        
    		let jsonStats = stats.toJson();
    		if (jsonStats.errors.length > 0) {
    			return console.info(jsonStats.errors);	
    		}
        
    		if(jsonStats.warnings.length > 0) {
    			console.warning(jsonStats.warnings);
    		}
		});
	};
}