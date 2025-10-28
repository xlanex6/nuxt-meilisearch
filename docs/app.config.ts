export default defineAppConfig({
  docus: {
    title: 'Nuxt Meilisearch',
    description: 'Meilisearch integration to enable lightning-fast, and hyper-relevant search engine into Nuxt',
    image: '/cover.png',
    socials: {
      twitter: 'xlanex6',
      github: 'xlanex6/nuxt-meilisearch',
    },
    // github: {
    //   dir: '.starters/default/content',
    //   branch: 'main',
    //   repo: 'docus',
    //   owner: 'nuxt-themes',
    //   edit: true
    // },
    aside: {
      level: 0,
      collapsed: false,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
  },
})
