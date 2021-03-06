module.exports = {
    entry: {
        background: "./src/background/background.ts",
        popup: "./src/popup.ts",
        import: "./src/import.ts",
        readme: "./src/readme.ts"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.plugin('compilation', function (compilation, params) {
                    params.normalModuleFactory.plugin('parser', function (parser) {
                        parser.plugin('expression global', function expressionGlobalPlugin() {
                            this.state.module.addVariable('global', "(function() { return this; }())")
                            return false
                        })
                    })
                })
            }
        }
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    }
};