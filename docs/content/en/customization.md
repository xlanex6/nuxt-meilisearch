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

By default, it will set at `true` so **ALL** Algolia components will be loaded and available in your app. 

```ts
instantSearch: true, // default true
```

<alert type="info">
Keep in mind  

- No theme will be install _( on the Roadmap )_
- No tree skacking  _( on the Roadmap )_

</alert>
