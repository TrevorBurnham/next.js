import { defineRule } from '../utils/define-rule'

const url = 'https://nextjs.org/docs/messages/no-import-dynamic-expression'

export = defineRule({
  meta: {
    docs: {
      description:
        'Prevent using `import()` with anything other than a string literal.',
      recommended: true,
      url,
    },
    type: 'problem',
    schema: [],
  },
  create(context) {
    return {
      ImportExpression(node) {
        if (
          node.source.type === 'Literal' &&
          typeof node.source.value === 'string'
        ) {
          return
        }

        context.report({
          node,
          message: `\`import\` should only be used with a string literal. See: ${url}`,
        })
      },
    }
  },
})
