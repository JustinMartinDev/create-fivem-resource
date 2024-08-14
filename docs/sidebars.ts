import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: "category",
      label: "Welcome",
      items: ["about-docs"],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started",
        "folder-structure",
        "available-scripts",
        "supported-features",
      ],
    },
    {
      type: "category",
      label: "Typescript / Javascript",
      items: ["rollupjs", "ts-js-available-scripts", "typings"],
    },
    {
      type: "category",
      label: "Nui",
      items: ["nui-client"],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
