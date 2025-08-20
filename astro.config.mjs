// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.purro.xyz",
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
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/terrancrypt/purro-extension",
        },
      ],
      sidebar: [
        {
          label: "About",
          items: [
            { label: "About Purro", slug: "about/overview" },
            { label: "Contributors", slug: "about/contributors" },
          ],
        },
        {
          label: "Wallet",
          items: [
            { label: "Overview", slug: "wallet/overview" },
            { label: "Getting Started", slug: "wallet/getting-started" },
            {
              label: "Features",
              items: [
                {
                  label: "Gasless Swaps & Bridging",
                  slug: "wallet/gasless-swaps-bridging",
                },
                { label: "Name Transfers", slug: "wallet/hyper-names" },
                { label: "Rebates", slug: "wallet/rebates" },
                { label: "NFT & Identity", slug: "wallet/nft-identity" },
                { label: "Smart Wallet (AA)", slug: "wallet/smart-wallet" },
              ],
            },
          ],
        },
        {
          label: "Developers",
          items: [
            { label: "Wallet SDK & Provider", slug: "wallet/developer-sdk" },
            {
              label: "Extension",
              items: [
                {
                  label: "Feature Overview",
                  slug: "extension/features-building",
                },
                {
                  label: "Technical Architecture",
                  slug: "extension/technical-architecture",
                },
                { label: "Provider System", slug: "extension/provider-system" },
                {
                  label: "Data Flows & Interactions",
                  slug: "extension/data-flow",
                },
                { label: "Keys & Storage", slug: "extension/keys-and-storage" },
                { label: "Security Model", slug: "extension/security-model" },
                {
                  label: "Security Checklist",
                  slug: "extension/security-checklist",
                },
              ],
            },
          ],
        },
        {
          label: "Security",
          items: [
            { label: "Security Design", slug: "wallet/security" },

            { label: "Audit & Compliance", slug: "wallet/audit-compliance" },
          ],
        },
        {
          label: "Roadmap",
          items: [{ label: "Roadmap", slug: "wallet/roadmap" }],
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
