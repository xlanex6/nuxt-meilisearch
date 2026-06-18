import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: 'test/fixtures/basic',
        domEnvironment: 'happy-dom',
      },
    },
    include: ['test/**/*.test.ts'],
    setupFiles: ['test/setup.ts'],
  },
})
