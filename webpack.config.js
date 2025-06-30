const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Resolver problemas de MIME e punycode
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "punycode": false,
    "fs": false,
    "path": false,
    "crypto": false,
  };

  // Configurar para ignorar warnings de deprecação
  config.ignoreWarnings = [
    /DeprecationWarning/,
    /The `punycode` module is deprecated/,
  ];

  return config;
}; 