/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_APP_BASE_API: string;
  VITE_APP_STATIC_URL: string; // 注意：这里仍然是字符串，你需要自行转换为布尔值
}
