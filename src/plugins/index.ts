/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { setupDirective } from '@/directive'
// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  setupDirective(app)
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueDOMPurifyHTML)
}
