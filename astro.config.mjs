// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
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
          label: "Develop",
          items: [
            { label: "Extension Building", slug: "develop/extension-building" },
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
