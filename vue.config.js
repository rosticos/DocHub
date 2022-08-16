
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

// const fs = require('fs');
// const { vscodeConfig } = require('./configs/vscode.config.js');
const vscodeConfig = require('./configs/vscode.config.js');

// Дефолтная конфигурация dev-сервера
const config = {
	runtimeCompiler: true,
	devServer: {
		/*
        allowedHosts: [
            'dochub.rabota.space',
            'localhost'
        ],
        */
	},
	configureWebpack: {
		optimization: {
			splitChunks: false 
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'plugin.html', 
				template: 'src/plugin.html', 
				inlineSource: '.(woff(2)?|ttf|eot|svg|js|css)$'
			}),
			new HtmlWebpackInlineSourcePlugin()
		]
	}    
};

// Подключает сертификаты, если они обнаружены
/*
if(fs.lstatSync(__dirname + '/certs').isDirectory()) {
    config.devServer = {
        http2: true,
        https: {
            key: fs.readFileSync(__dirname + '/certs/server.key'),
            cert: fs.readFileSync(__dirname + '/certs/server.cert')
        }
    }
}
*/

if (process.env.BUILD_VSCODE_EXTENSION) {
	module.exports = vscodeConfig;
} else {
	module.exports = config;
}
