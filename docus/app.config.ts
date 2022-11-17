export default defineAppConfig({
  docus: {
    title: 'Nuxt Meilisearch',
    description: 'Full integration of Meilisearch via Nuxt module',
    url: 'https://nuxt-meilisearch-docs.netlify.app',
    image: '/preview.png',
    socials: {
      twitter: '@xlanex6',
      github: 'xlanex6/nuxt-meilisearch'
    },
    github: {
      root: 'content',
      edit: true,
      contributors: false
    },
    aside: {
      level: 0,
      exclude: []
    },
    header: {
      logo: false,
      showLinkIcon: true
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com'
      },
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          component: 'IconNuxtLabs'
        },
        {
          label: 'Vue Telescope',
          href: 'https://vuetelescope.com',
          component: 'IconVueTelescope'
        }
      ]
    }
  }
})
