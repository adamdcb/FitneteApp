module.exports = api => {
  const env = api.env();
  const plugins = [];
  if (env !== 'development') {
    plugins.push('transform-remove-console');
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins
  }
};
