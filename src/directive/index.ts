import type { App } from 'vue'

import { highlight } from '@/directive/highlight'

// 全局注册 directive
// 指令
export function setupDirective (app: App<Element>) {
  app.directive('highlight', highlight)
}
