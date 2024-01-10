const path = require("path");

modele.exports = {
    entry: "./src/js/main.js",
    output: {
        filenmae: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
 
        ],
    },
};