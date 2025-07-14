/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

// src/declarations.d.ts
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_API_LOGIN_URL: string;
  readonly VITE_API_LOGOUT_URL: string;
  readonly VITE_AUTH_USERNAME: string;
  readonly VITE_AUTH_PASSWORD: string;
  // Add other VITE_ variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
