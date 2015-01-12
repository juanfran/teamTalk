// Karma configuration
// Generated on Fri Feb 07 2014 19:18:06 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'dist/lib/jquery/dist/jquery.js', included: true, served: true, watched: false},
      {pattern: 'dist/lib/lodash/dist/lodash.js', included: true, served: true, watched: false},
      {pattern: 'dist/lib/angular/angular.js', included: true, served: true, watched: false},
      {pattern: 'dist/lib/angular-mocks/angular-mocks.js', included: true, served: true, watched: false},
      {pattern: 'dist/lib/traceur-runtime/traceur-runtime.js', included: true, served: true, watched: false},
      'dist/js/main.js',
      'test/**/*.spec.js'
    ],

    preprocessors: {
      'dist/js/main.js': ['sourcemap']
    },

    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
