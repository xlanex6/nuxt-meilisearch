export default defineAppConfig({
  header: {
    title: 'Nuxt Meilisearch',
  },
  seo: {
    title: 'Nuxt Meilisearch',
    description: 'Easy way to install a blazing-fast search experience with Meilisearch into your Nuxt application.',
    schema: {
      type: 'SoftwareApplication',
      applicationCategory: 'DeveloperApplication',
      price: 0,
      sameAs: [
        'https://github.com/xlanex6/nuxt-meilisearch',
        'https://www.npmjs.com/package/nuxt-meilisearch',
      ],
    },
  },
  github: {
    url: 'https://github.com/xlanex6/nuxt-meilisearch',
    branch: 'master',
    rootDir: 'docs',
  },
  socials: {
    github: 'https://github.com/xlanex6/nuxt-meilisearch',
  },
  ui: {
    colors: {
      primary: 'pink',
      neutral: 'zinc',
    },
  },
})
