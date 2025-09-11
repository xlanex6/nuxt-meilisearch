import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  failOnWarn: false,
  externals: ['#imports', '#app'],
  declaration: true,
  entries: [
    'src/module'
  ],
})
