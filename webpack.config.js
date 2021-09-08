var Encore = require('@symfony/webpack-encore');

//const Encore = require('@symfony/webpack-encore');

//if (!Encore.runtimeIsConfigured()) {
  //  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
//}

const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    .createSharedEntry('layout', './assets/js/layout.js')
    .addEntry('login', './assets/js/login.js')
    .addEntry('rep_log_react', './assets/js/rep_log_react.js')
    .addEntry('RepLogList', './assets/js/RepLogs/RepLogList.js')
    //.addEntry('RepLogCreator', './assets/js/RepLogs/RepLogCreator.js')
    .addEntry('RepLog', './assets/js/RepLogs/RepLog.js')
    .addEntry('RepLogAAA', './assets/js/RepLogs/RepLogAAA.js')
    .enableBuildNotifications()
    // fixes modules that expect jQuery to be global
    .autoProvidejQuery()

    .disableSingleRuntimeChunk()

    .addPlugin(new CopyWebpackPlugin([

        // copies to {output}/static
        { from: './assets/static', to: 'static' }
    ]))
    .enableReactPreset()
    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .cleanupOutputBeforeBuild()
    .enableVersioning(Encore.isProduction())

    .configureBabel((babelConfig) => {
        if (Encore.isProduction()) {
            babelConfig.plugins.push(
                'transform-react-remove-prop-types'
            );
        }
    }, {
        useBuiltIns: 'usage',
        corejs: 2,
    })
;

// export the final configuration
module.exports = Encore.getWebpackConfig();
