const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	resolve: {
		plugins: [
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, 'tsconfig.json'),
			}),
		],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	// Other configurations (entry, output, module rules, etc.)
};
