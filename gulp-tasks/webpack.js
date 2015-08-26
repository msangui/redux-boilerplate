import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;

export default (gulp, plugins, config) => {
	return () => {
		let serverOptions = {
	    	contentBase: 'http://' + host + ':' + port,
		    quiet: true,
		    noInfo: true,
		    hot: true,
		    inline: true,
		    lazy: false,
		    publicPath: config.output.publicPath,
		    headers: {"Access-Control-Allow-Origin": "*"},
		    stats: {colors: true}
		};

		let compiler = webpack(config);
		let webpackDevServer = new WebpackDevServer(compiler, serverOptions);
		
		webpackDevServer.listen(port, host, function() {
	  		console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
		});
	}
};