/**
 * Конфигурация RequireJS
 */

requirejs.config({
    paths: {
        "text": "assets/libs/js/require.text",
        "css": "assets/libs/js/require.css"
    }
});


define(['app/Controllers/Page.js'], function (Page) {

   const page = new Page;

});
