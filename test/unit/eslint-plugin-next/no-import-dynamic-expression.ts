import rule from '@next/eslint-plugin-next/dist/rules/no-import-dynamic-expression'
import { RuleTester } from 'eslint'
;(RuleTester as any).setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
})
const ruleTester = new RuleTester()

const message =
  '`import()` should only be used with a string literal. See: https://nextjs.org/docs/messages/no-import-dynamic-expression'

ruleTester.run('no-import-dynamic-expression', rule, {
  valid: [
    `
    isBaby ? import("grogu") : import("yoda");
    `,
  ],
  invalid: [
    {
      code: `
      import(isBaby ? "grogu" : "yoda")
      `,
      errors: [
        {
          message,
        },
      ],
    },
  ],
})
