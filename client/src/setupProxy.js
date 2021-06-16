const proxy = require('http-proxy-middleware');
const config = require('../config/config.json');
module.exports = function (app) {

    app.use(

        '/post',

        proxy({

            target: config.server+':5000',
            changeOrigin: true,

        })

    );

};
