// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mermaid({
      theme: "neutral",
      autoTheme: true,
    }),
    starlight({
      customCss: ["./src/styles/custom.css"],
      favicon: "/favicon.png",
      logo: {
        src: "./src/assets/Purro_Icon_Dark.png",
      },
      title: "Purro Docs",
      social: [
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://twitter.com/purro_xyz",
        },
      ],
      sidebar: [
        {
          label: "Purro Extension",
          items: [
            { label: "Features Building", slug: "extension/features-building" },
            {
              label: "Technical Architecture",
              slug: "extension/technical-architecture",
            },
            {
              label: "Provider System",
              slug: "extension/provider-system",
            },
            {
              label: "Data Flows and Interactions",
              slug: "extension/data-flow",
            },
            {
              label: "Keys and Storage",
              slug: "extension/keys-and-storage",
            },
            {
              label: "Security Model",
              slug: "extension/security-model",
            },
            // { label: "API Reference", slug: "extension/api-reference" },
            // { label: "FAQ", slug: "extension/faq" },
            // { label: "Changelog", slug: "extension/changelog" },
            // { label: "Contributing", slug: "extension/contributing" },
            // { label: "License", slug: "extension/license" },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
            { label: "Getting Started", slug: "guides/getting-started" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      plugins: [starlightThemeNova()],
    }),
  ],
});
