import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    ignores: [
      'src/runtime/types/meilisearch.d.ts',
      'src/runtime/types/instantsearh.d.ts',
    ],
  },
)
