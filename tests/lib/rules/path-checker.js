/**
 * @fileoverview rule to follow fsd path rules
 * @author skillforce
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
    valid: [
        {
            filename: 'C:\\User\\tim\\Desktop\\javascript\\production_project\\src\\entity/Article',
            code: "import { addCommentForArticle, addCommentFormReducer } from '../../model/slices/addCommentForArticle';",
            errors: [{message: "In one slice environment paths should be relative"}],
        },
    ],

    invalid: [
        {
            filename: 'C:\\User\\tim\\Desktop\\javascript\\production_project\\src\\entity/Article',
            code: "import { addCommentForArticle, addCommentFormReducer } from 'entity/Article/model/slices/addCommentForArticle';",
            errors: [{message: "In one slice environment paths should be relative"}],
        }, {
            filename: 'C:\\User\\tim\\Desktop\\javascript\\production_project\\src\\entity/Article',
            code: "import { addCommentForArticle, addCommentFormReducer } from '@/entity/Article/model/slices/addCommentForArticle';",
            errors: [{message: "In one slice environment paths should be relative"}],
            options: [
                {
                    alias: '@'
                }
            ]
        },
    ],
});
