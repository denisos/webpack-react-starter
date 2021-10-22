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


### step to assemble
webpack from scratch (using v4 of webpack per tutorial..latest is v5)
 https://webpack.js.org/concepts/

 `npm init`
 `git init`
 `npm install --save-dev webpack webpack-cli`
 
 webpack was installed in node_modules/.bin/ and you can run as `node_modules/.bin/webpack` 
  and it will generate js output file in /dist (because it has default)
    which you can run as `node /dist/main.js`
  
  to make it easier when you add a script ot package.json it will resolve it to node_modules for you, so we did that

webpack runs in production mode by default so can pass params to run in development mode 
 `npm run build -- --mode development`

 when run in development mode the webpack runtime is included and it builds a data struct of each src file

webpack.config.js - file for webpack to pickup
 - entry   - starting file for code
 - output  - path and filename to output

babel
 babel is a compiler used to convert modern js down to a format which runs in older browsers
 
 install `npm i -D @babel/core @babel/cli @babel/preset-env`
 
  also puts an executable in `node_modules/.bin` which you can run like so `$(npm bin)/babel ./src/greet.js`
    ...which just outputs the same code

    but to run using preset `$(npm bin)/babel ./src/greet.js --presets=@babel/preset-env`
      ...it down converts modern js to older code

babel-loader
 used to transform modern js code into older js 
 added options in `module` property to use babel-loader

So by now we have build setup to run & build plain javascript ^

Now we convert it into a react app.
 add simple React component and use in index.js

 install babel react preset: `npm i -D @babel/preset-react`

 add preset to loader list in webpack.config

 run `npm run build`   and now we see /dist/app.bundle.js contains react and our simple app

HTML fiel f
 add webpack-html-plugin to include an html file
   generates html file by default but missing the div for the react app

   so created custom index.html template in src

   and edited webpack.config.js to pass the template name as a param to HtmlWebpackPlugin ctor


webpack watch mode
 added a script to package.json `"dev": "webpack --watch --mode development"`

 `npm run dev`
   runs in watch mode and rebuilds when code changes


webpack dev and production config files
 add webpack-merge `npm i -D webpack-merge`

 create base, prod and dev webpack config files (prod and dev "inherit base")

 change package.json scripts to pass config to use e.g. `"build": "webpack --config webpack.config.prod.js",`


add a web server to live load the page
 `npm i -D webpack-dev-server`

 change package.json to run webpack-dev-server instead of webpack-config
   added --open option to auto open when run dev 
   changed port to 9000

 now when run `npm run dev` will run on http://localhost:9000/

 now can load the page from there and it live reloads when make changes in the app!