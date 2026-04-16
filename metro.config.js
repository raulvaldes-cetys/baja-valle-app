const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

const nativeWindConfig = withNativeWind(config, { input: './src/global.css' });

nativeWindConfig.transformer = {
  ...nativeWindConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

module.exports = nativeWindConfig;
