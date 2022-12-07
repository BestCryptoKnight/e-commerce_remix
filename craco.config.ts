const CracoLessPlugin = require("craco-less");

const cracoSettings = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#394764" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

export default cracoSettings;
