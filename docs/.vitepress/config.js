import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'fr-FR',
  title: 'Programmation C#',
  description: 'Syllabus du cours de Programmation C# pour les étudiants de BA1 - HELHa',
  base: '/csharp-intro-syllabus/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // Configuration de Mermaid
  mermaid: {
    theme: 'neutral',
    darkMode: false,
    securityLevel: 'loose',
    logLevel: 'error',
    htmlLabels: true,
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      rankSpacing: 65,
      nodeSpacing: 30,
      padding: 15
    },
    // Styles personnalisés pour améliorer la lisibilité
    themeVariables: {
      primaryColor: '#5D8AA8',
      primaryTextColor: '#fff',
      primaryBorderColor: '#7C0200',
      lineColor: '#404040',
      secondaryColor: '#006100',
      tertiaryColor: '#fff',
      nodeBorder: '#2b6387', // Couleur des bordures de nœuds
      clusterBkg: '#e9f3f8', // Couleur de fond des subgraphs
      clusterBorder: '#2b6387', // Couleur de bordure des subgraphs
      titleColor: '#333333' // Couleur du texte des titres
    }
  },

  themeConfig: {
    // Logo dans la barre de navigation
    logo: '/logo.png',

    // Navigation principale
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'HELHa', link: 'https://www.helha.be', target: '_blank' },
    ],

    // Barre latérale
    sidebar: [
      {
        text: 'Introduction',
        link: '/0-introduction',
      },
      {
        text: 'Variables et Types',
        link: '/1-variables-types',
      },
      {
        text: 'Opérateurs',
        link: '/2-operateurs',
      },
      {
        text: 'Conversions de Types',
        link: '/3-conversions',
      },
      {
        text: 'Structures de Contrôle',
        link: '/4-structures-controle',
      },
      {
        text: 'Méthodes des Types Natifs',
        link: '/5-methodes-types-natifs',
      },
      {
        text: 'Tableaux et Collections',
        link: '/6-tableaux-collections',
      },
      {
        text: 'Organisation de la Mémoire',
        link: '/7-memoire',
      },
      {
        text: 'Fonctions',
        link: '/8-fonctions',
      },
      {
        text: 'Gestion des Exceptions',
        link: '/9-gestion-exceptions',
      },
      {
        text: 'Gestion des Fichiers',
        link: '/10-gestion-fichiers',
      },
    ],

    // Pied de page
    footer: {
      message: 'Syllabus créé par Prof. Frédéric Pluquet',
      copyright: 'Copyright © 2025-2026 HELHa'
    },

    // Options de recherche
    search: {
      provider: 'local'
    },

    // Fonctionnalités sociales
    socialLinks: [{ icon: "github", link: "https://github.com/fpluquet/csharp-intro-syllabus" }],

    // Fonctionnalités supplémentaires
    outline: {
      level: 'deep',
      label: 'Sur cette page'
    },

    editLink: {
      pattern: 'https://github.com/fpluquet/csharp-intro-syllabus/edit/master/docs/:path',
      text: 'Modifier cette page'
    },


    // Dernier mis à jour
    lastUpdated: {
      text: 'Mis à jour le',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },

    // Liens de navigation en bas de page
    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante'
    }
  }
}))
