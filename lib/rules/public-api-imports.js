const {isPathRelative} = require('../helpers')

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
                properties: {
                    alias: {
                        type: 'string'
                    },
                    testFilesPatterns: {
                        type: 'array'
                    }
                }
            }
        ],
    },

    create(context) {
        const {alias = '', testFilesPatterns = []} = context.options[0] || {}
        const layersForChecking = {
            'pages': 'pages',
            'entity': 'entity',
            'features': 'features',
            'widgets': 'widgets',
        }
        return {
            ImportDeclaration(node) {

                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value
                const segments = importTo.split('/')
                const isImportNotFromPublicApi = segments.length > 2
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4
                const layer = segments[0];

              if (isPathRelative(importTo)) {
                    return;
                }
                // [entity, article, model, types]

                if (!layersForChecking[layer]) {
                    return;
                }

              if (isImportNotFromPublicApi && !isTestingPublicApi) {
                context.report(node, 'Absolute import is allowed only from public API(index.ts)');
              }
            }
        };
    },
};
