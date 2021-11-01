# webpack-react-starter
Custom built webpack v4 react build setup

## Install and run

### install
`nvm use`

`npm i`

### run
`npm run dev`

will auto open [http://localhost:9000](http://localhost:9000) to simple react app in browser
hot reloads

### test


## steps followed to assemble
webpack from scratch (using v4 of webpack per tutorial..latest is v5) https://webpack.js.org/concepts/

why not webpack v5? simple the course is v4 so I followed that. But a next step is to configure a webpack v5 setup.

### bootstrap with webpack

 `npm init`

 `git init`

 `npm install --save-dev webpack webpack-cli`
 
webpack is now installed in node_modules/.bin/ and you can run as `node_modules/.bin/webpack` and it will generate js output file in /dist (because it has default) which you can run as `node /dist/main.js`
  
to make it easier when you add a script to package.json, it will resolve to node_modules 

webpack runs in production mode by default so can pass params to run in development mode 

`npm run build -- --mode development`

when run in development mode the webpack runtime is included and it builds a data struct of each src file

webpack.config.js - file for webpack to pickup
 - entry   - starting file for code
 - output  - path and filename to output

### add babel
babel is a compiler used to convert modern js down to a format which runs in older browsers
 
`npm i -D @babel/core @babel/cli @babel/preset-env`
 
this also puts an executable in `node_modules/.bin` which you can run like so `$(npm bin)/babel ./src/greet.js` ...which just outputs the same code

but run using preset `$(npm bin)/babel ./src/greet.js --presets=@babel/preset-env` and it down converts modern js to older code

### add babel-loader
used to transform modern js code into older js 
added options in `module` property to use babel-loader

now we have build setup to run & build plain javascript ^


### convert to react app
install babel react preset: `npm i -D @babel/preset-react`

add preset to loader list in webpack.config

add simple React component and use in index.js

run `npm run build`   and now we see /dist/app.bundle.js contains react and our simple app


### add HTML file to contain react app
add webpack-html-plugin to include an html file `npm i -D html-webpack-plugin`

generates html file by default but missing the div for the react app

created custom index.html template in src to include div for react app and edited webpack.config.js to pass the template name as a param to HtmlWebpackPlugin ctor


### run webpack in watch mode
added a script to package.json `"dev": "webpack --watch --mode development"`

now `npm run dev` runs in watch mode and rebuilds when code changes


### support webpack dev and production config files
add webpack-merge `npm i -D webpack-merge`

create base, prod and dev webpack config files (prod and dev "inherit base")

change package.json scripts to pass config to use e.g. `"build": "webpack --config webpack.config.prod.js",`


### add a web server to live load the page
 `npm i -D webpack-dev-server`

change package.json to run webpack-dev-server instead of webpack-config
  - added --open option to auto open when run dev 
  - changed port to 9000

`npm run dev` will now run app on http://localhost:9000/ and auto open and it live reloads when make changes in the app!


### generate sourcemaps for debugging
the code running in the browser is the converted code which is not the same as the code I wrote, sourcemaps will map the converted code back to the original code so what I debug is what I wrote

add `devtool: 'source-map'` option to webpack.config.dev.js and rerun the app with chrome debugger open


### add support for proposed js features
`npm i -D @babel/plugin-proposal-class-properties`   which adds support for proposed class changes

change webpack.config.base.js as a plugin  

this is for example, we don't use classes for react, functional ftw...right? eh?

### auto include styles
add style and css loaders to auto add a styles tag in the html
`npm i -D css-loader style-loader`

### add support for hot react reload (retain react state)
`npm i -S react-hot-loader`

changed App.js to use like docs: https://github.com/gaearon/react-hot-loader

and added new npm script command in package.json

### add webpack-bundle-analyzer to analyze build size and content
`npm i -D webpack-bundle-analyzer`

change webpack prod config to use

see https://github.com/webpack-contrib/webpack-bundle-analyzer

to use: `npm run build` and `open dist/bundle_sizes.html`
