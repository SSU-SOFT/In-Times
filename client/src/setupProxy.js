const proxy = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(

        '/post',

        proxy({

            target: 'http://13.209.70.51:5000',

            changeOrigin: true,

        })

    );

};
