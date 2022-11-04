module.exports = {
	presets: [ '@babel/preset-typescript'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				alias: {
					'@customDecorators': './src/customDecorators',
					'@entities': './src/entities',
					'@lib': './src/lib',
					'@modules': './src/modules',
					'@types': './src/types',
					'@utils': './src/utils',
				}
			}
		],
		'react-native-reanimated/plugin'
	]
}