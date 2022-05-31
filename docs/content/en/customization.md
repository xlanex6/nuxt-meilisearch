---
title: Customization
position: 2
---

## Customization

### Meilisearch Client

You can customization Meilisearch client `clientOptions`.   
Full documentation on [on Meiliserch client page](https://github.com/meilisearch/instant-meilisearch#-customization) for more details.

```ts 
// exemple
clientOptions: {
      placeholderSearch: true,
      paginationTotalHits: 200,
      finitePagination: false,
      primaryKey: undefined,
      keepZeroFacets: true
    }
```

### Algolia Vue 3 components library

You can use [Algolia Vue 3 Instantsearch](https://github.com/algolia/vue-instantsearch) components. 

By default, **ALL** Algolia components will be loaded and available in your app.  
Theme valid options are `satellite`, `reset` or `algolia`.

All `theme` info on [official page](https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/vue/#style-your-widgets)


It could be 

```ts
instantSearch: {
      theme: 'algolia'
    },
```

<alert type="info">
Keep in mind  

- No tree skacking Algolia Vue 3 components lib.   _( on the Roadmap )_

</alert>
