const path = require("path");
const fs = require("fs");
const { merge } = require("webpack-merge");

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}
const configureEmotion = (config) => {
  return {
    ...config,
    babel: (config) => {
      config.presets.push("@emotion/babel-preset-css-prop");
      return config;
    },

    webpackFinal: async (config) => {
      return merge(config, {
        resolve: {
          alias: {
            "@emotion/core": getPackageDir("@emotion/react"),
            "@emotion/styled": getPackageDir("@emotion/styled"),
            "emotion-theming": getPackageDir("@emotion/react"),
          },
        },
      });
    },
  };
};

module.exports = configureEmotion;