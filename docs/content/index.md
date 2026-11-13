---
title: Home
seo:
  title: Nuxt Meilisearch
  description: Easy way to install a blazing-fast search experience with Meilisearch into your Nuxt application.
---

::u-page-hero
---
snippet: npx nuxi@latest module add nuxt-meilisearch
features:
  - Auto-imported composables for client and server search
  - Optional Vue InstantSearch widgets
  - Server routes to manage documents, indexes and settings
---

#title
Nuxt Meilisearch

#description
Easy way to install a blazing-fast search experience with [Meilisearch](https://www.meilisearch.com) into your [Nuxt](https://nuxt.com) application.

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /getting-started/setup
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  to: https://github.com/xlanex6/nuxt-meilisearch
  variant: outline
  ---
  Star on GitHub
  :::
::

::u-page-section
#title
Search, wired into Nuxt

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-nuxt
  target: _blank
  to: https://nuxt.com
  ---
  #title
  Built for [Nuxt 3 and 4]{.text-primary}

  #description
  Drop the module in, set the host and a search key, and the composables are auto-imported on the client and the server.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-meilisearch
  target: _blank
  to: https://www.meilisearch.com/
  ---
  #title
  Powered by [Meilisearch]{.text-primary}

  #description
  Typo-tolerant full-text search, filters, facets and the official JavaScript client, with the admin key kept on the server.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-vuedotjs
  target: _blank
  to: https://vuejs.org/
  ---
  #title
  Optional [InstantSearch]{.text-primary}

  #description
  Turn on `instantSearch` to use Vue InstantSearch widgets against your Meilisearch indexes.
  :::
::
