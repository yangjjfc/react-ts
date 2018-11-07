/* config-overrides.js */
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader, paths } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const rewireSass = require('react-app-rewire-scss');
const rewireAliases = require('react-app-rewire-aliases');


module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );
    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
                libraryDirectory: 'es',
                libraryName: 'antd',
                style: true,
            }), tsImportPluginFactory({
                camel2DashComponentName: false,
                libraryDirectory: 'lib',
                libraryName: 'ant-design-pro',
                style: true
            })]
        })
    };

    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: {
            "@primary-color": "#1DA57A"
        },
    })(config, env);
    // add Sass-loader
    config = rewireSass.withLoaderOptions({
        javascriptEnabled: true,
    })(config, env);
    //add alias
    config = rewireAliases.aliasesOptions({
        '@': path.resolve(__dirname, `${paths.appSrc}`)
    })(config, env);


    return config;
}