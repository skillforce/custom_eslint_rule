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
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node){
        //example app/entity/Articles
        const importTo = node.source.value;
        //example C:\User\tim\Desktop\ ...app/entity/Article.js
        const fromFileName = context.getFilename();

        context.report(node, 'Linter is yelling!!!')
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}
const layers = {
  'pages':'pages',
  'entity':'entity',
  'features':'features',
  'widgets':'widgets',
  'shared':'shared',
}
function shouldBeRelative(from, to){

  if(isPathRelative(to)){
    return false
  }

  //example entity/Articles
  const toArray = to.split('/')
  const toLayer = toArray[0]
  const toSlice = toArray[1]

  if(!toLayer || !toSlice || !layers[toLayer]){
    return false
  }


  //example C:\User\tim\Desktop\ ...app/entity/Article.js



}


