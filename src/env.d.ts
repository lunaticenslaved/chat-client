/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_SERVER_URL: string;
  readonly VITE_CHAT_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
