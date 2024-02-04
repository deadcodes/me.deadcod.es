import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

let theme = prismThemes.vsDark;
theme.plain.background = '#201b23';

const config: Config = {
  
  title: 'Dead Codes',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://me.deadcod.es',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'deadcodes', // Usually your GitHub org/user name.
  projectName: 'me.deadcod.es', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: ["docusaurus-plugin-less","docusaurus-lunr-search"],
  presets: [
    [
      'classic',
      {
        docs: {
                    sidebarPath: './sidebars.ts',
          admonitions: {
            keywords: ['hidden'],
            extendDefaults: true,
          },
        },
// blog: {
//           routeBasePath: '/guides',
//           showReadingTime: true,
//         },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    docs:{
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    // Replace with your project's social card
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'Dead Codes',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo-min.svg',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'mainSidebar',
        //   position: 'left',
        //   label: 'Scripts',
        // },
        {
          type: 'docSidebar',
          sidebarId: 'kbSidebar',
          position: 'left',
          label: 'Scripts',
        },
        {
          type: 'docSidebar',
          sidebarId: 'libSidebar',
          position: 'left',
          label: 'Libraries',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guideSidebar',
          position: 'left',
          label: 'Guides',
        },
        // {to: '/guides', label: 'Guides', position: 'left'},
        {
          href: 'https://github.com/deadcodes/MEScripts',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} DeadCodes`,
      links: [
        {
          label: 'Ko-Fi',
          href: 'https://ko-fi.com/deadcodes',
        }
      ],
    },
    prism: {
      additionalLanguages: ['lua','diff'],
      theme: prismThemes.github,
      darkTheme: theme,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
