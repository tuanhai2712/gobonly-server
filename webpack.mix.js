const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/index.js", "public/js");
mix.webpackConfig({
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "resources/js/components/"),
            "@layouts": path.resolve(__dirname, "resources/js/layouts/"),
            "@pages": path.resolve(__dirname, "resources/js/pages/"),
            "@assets": path.resolve(__dirname, "resources/js/assets/"),
            "@routes": path.resolve(__dirname, "resources/js/routes/")
        }
    }
});
