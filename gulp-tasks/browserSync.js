export default (gulp, plugins, browserSync) => {
	return () => {
		browserSync.init(null, {
    		logLevel: 'debug',
    		proxy: 'localhost:3000'
  		});
	}
}