import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'h7bgz50r',
    dataset: 'production',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
})
