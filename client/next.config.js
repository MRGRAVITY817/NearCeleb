// Basic Exports

module.exports = {
  // React Strict Mode
  reactStrictMode: true,
  // Webpack
  webpack: (config, { isServer }) => {
    // Enable fs only for serverside
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
      };
    }
    // For svg files
    config.module.rules.push({
      test: [/\.svg$/, /\.mdx?$/],
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack", "raw-loader"],
    });
    return config;
  },
  images: {
    domains: ['https://kr.object.ncloudstorage.com/']
  }
};
// MDX extension
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "md"],
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withFonts = require("next-fonts");
module.exports = withFonts({
  webpack(config, options) {
    config.node = {
      fs: "empty",
    };
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "url-loader?limit=100000",
        },
        {
          loader: "file-loader",
        },
      ],
    });
    return config;
  },
});
