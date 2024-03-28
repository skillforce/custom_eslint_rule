const {isPathRelative} = require('../helpers')

"use strict";

const path = require('path')
module.exports = {
    meta: {
        type: null, // `problem`, `suggestion`, or `layout`
        docs: {
            description: "rule to follow fsd path rules",
            recommended: false,
            url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [
            {
                type: 'object',
                alias: {
                    type: 'string'
                }
            }
        ], // Add a schema if the rule has options
    },

    create(context) {
        const alias = context.options[0]?.alias
        return {
            ImportDeclaration(node) {
                //example app/entity/Articles
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value
                //example C:\User\tim\Desktop\ ...app/entity/Article.js
                const fromFileName = context.getFilename();
                if (shouldBeRelative(fromFileName, importTo)) {
                    context.report(node, 'In one slice environment paths should be relative')
                }
            }
        };
    },
};


const layers = {
    'pages': 'pages',
    'entity': 'entity',
    'features': 'features',
    'widgets': 'widgets',
    'shared': 'shared',
}

function shouldBeRelative(from, to) {

    if (isPathRelative(to)) {
        return false
    }

    //example entity/Articles
    const toArray = to.split('/')
    const toLayer = toArray[0]
    const toSlice = toArray[1]

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false
    }

    //example C:\User\tim\Desktop\app\entity\Article.js
    const normalizePath = path.toNamespacedPath(from);
    const projectFrom = normalizePath.split('src')[1];
    const fromArray = projectFrom.split('\\')
    const fromLayer = fromArray[1]
    const fromSlice = fromArray[2]

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false
    }


    return fromSlice === toSlice && toLayer === fromLayer;


}


shouldBeRelative('C:\\User\\tim\\Desktop\\src\\app\\entity\\Article.js', 'entity/Articles')