const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index', // Vhodna točka tvoje aplikacije
  mode: 'development', // Lahko izbereš 'production' za produkcijsko verzijo
  devServer: {
    static: { // 'contentBase' je bilo preimenovano v 'static' v webpack 5
      directory: path.join(__dirname, 'public'), // Mapa, iz katere bo strežnik serviral
    },
    port: 7000, // Port na katerem bo aplikacija dostopna
  },
  output: {
    publicPath: 'auto', // Za avtomatsko določanje publicPath vrednosti
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Pravilo za JavaScript in JSX datoteke
        loader: 'babel-loader', // Uporabi babel-loader za transpilacijo
        exclude: /node_modules/, // Izključi node_modules mapo
        options: {
          presets: ['@babel/preset-react'], // Preset za React
        },
      },
      {
        test: /\.css$/, // Pravilo za CSS datoteke
        use: ['style-loader', 'css-loader'], // Uporabi te loaderje za obdelavo CSS
      },
      // ... ostala pravila za slike, fonte itd.
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'bookManagement', // Ime mikrofrontenda
      filename: 'remoteEntry.js', // Datoteka, ki bo vsebovala informacije o izpostavljenih modulih
      exposes: {
        './Library': './src/Library', // Izpostavi Library komponento
      },
      shared: { // Deljene odvisnosti
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
        // ... ostale deljene odvisnosti
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Predloga za HTML, ki se bo uporabila
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Dovoli import datotek brez navedbe teh končnic
  },
};
