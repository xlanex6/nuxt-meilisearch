import { defineNuxtPlugin, addRouteMiddleware } from '#imports'

export default defineNuxtPlugin(() => {
  // addRouteMiddleware('global-test', () => {
  //   console.log('this global middleware was added in a plugin and will be run on every route change')
  // }, { global: true })
})
