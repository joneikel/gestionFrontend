const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    plugins: [
      "@babel/plugin-proposal-logical-assignment-operators"
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#077ca0' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
