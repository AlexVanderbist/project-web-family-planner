ROI Toolkit Front-End
=====================


Installation
------------

### 1. Install NPM packages
        
> `npm install --no-bin-links`

### 2. Install bower packages

> `bower install`

### 3. Done!

Usage
-----

There are a couple of usefull features in this build system:

### Serving

`gulp serve` will compile some resources to /.tmp and use some from /src to provide you with a livereloading version of the app.

`gulp serve:dist` will do exactly the same as the above but build first and serve/livereload from the /dist folder. 

### Building

`gulp build` or simply `gulp` will build the /src directory to /dist. This includes minifying, uglifying, etc...

### Extra

#### Bower injection

Gulp will automagically inject all installed bower packages into your app when building or serving!

#### Automatic ngInjection

Gulp will make sure none of your code breaks when minifying. Make sure you add `/** @ngInject */` above functions where dependancy injection is used.