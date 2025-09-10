# Guide du site Cours CSharp Intro 

Vous trouverez le rendu de ce site à l'adresse suivante: [https://fpluquet.github.io/csharp-intro-syllabus](https://fpluquet.github.io/csharp-intro-syllabus)

Ce document explique comment le site du Syllabus a été structuré et comment le maintenir.

## Structure du projet

```
Syllabus/
│
├── docs/                     # Contenu du site
│   ├── .vitepress/           # Configuration VitePress
│   │   ├── theme/            # Personnalisation du thème
│   │   │   ├── custom.css    # Styles personnalisés
│   │   │   └── index.js      # Configuration du thème
│   │   └── config.js        # Configuration principale du site
│   │
│   ├── public/               # Fichiers statiques (images, etc.)
│   ├── index.md              # Page d'accueil
│   ├── 0-introduction.md     # Chapitre 0 - Introduction
│   ├── 1-variables-types.md  # Chapitre 1 - Variables et Types
│   ├── 2-operateurs.md       # Chapitre 2 - Opérateurs
│   ├── 3-conversions.md      # Chapitre 3 - Conversions
│   ├── 4-structures-controle.md  # Chapitre 4 - Structures de contrôle
│   ├── 5-memoire.md          # Chapitre 5 - Organisation mémoire
│   ├── 6-tableaux-collections.md # Chapitre 6 - Tableaux et collections
│   └── 7-fonctions.md        # Chapitre 7 - Fonctions
│
├── slides/                   # Présentations Marp pour les cours
│   ├── 0-introduction.md     # Slides pour le chapitre 0
│   ├── 1-variables-types.md  # Slides pour le chapitre 1
│   ├── 2-operateurs.md       # Slides pour le chapitre 2
│   ├── 3-conversions.md      # Slides pour le chapitre 3
│   ├── 4-structures-controle.md  # Slides pour le chapitre 4
│   ├── 5-memoire.md          # Slides pour le chapitre 5
│   ├── 6-tableaux-collections.md # Slides pour le chapitre 6
│   └── 7-fonctions.md        # Slides pour le chapitre 7
│
├── node_modules/             # Dépendances (généré par npm)
├── package.json              # Configuration npm
└── package-lock.json         # Versions exactes des dépendances
```

## Comment utiliser ce site

### Pour le développement

1. Cloner le dépôt
2. Installer les dépendances: `npm install`
3. Démarrer le serveur de développement: `npm run docs:dev`
4. Accéder au site à l'adresse: `http://localhost:5173/`

### Pour la production

1. Construire le site: `npm run docs:build`
2. Les fichiers générés se trouvent dans `.vitepress/dist/`
3. Ces fichiers peuvent être déployés sur n'importe quel serveur statique

## Comment ajouter du contenu

1. Créer un nouveau fichier markdown dans le dossier `docs/`
2. Ajouter une entrée dans le fichier `.vitepress/config.js` pour l'inclure dans la navigation
3. Utiliser la syntaxe Markdown pour formater le contenu

## Présentations Marp

Le dossier `slides/` contient des présentations au format Marp (Markdown Presentation Ecosystem) qui correspondent aux chapitres du syllabus. Ces présentations permettent de donner cours sans avoir à montrer directement le site VitePress.

### Comment utiliser les présentations Marp

1. Installer l'extension Marp pour VS Code ou un autre éditeur compatible
2. Ouvrir un fichier .md du dossier slides/
3. Utiliser la prévisualisation Marp pour voir les slides
4. Exporter en PDF ou HTML pour présenter en cours

Pour plus d'informations sur Marp, consultez [la documentation officielle](https://marp.app/).

## Fonctionnalités spéciales

Ce site utilise VitePress qui offre plusieurs fonctionnalités pour améliorer la documentation:

- **Blocs de code** avec coloration syntaxique pour C#
- **Conteneurs personnalisés** pour info, conseils, avertissements, etc.
- **Recherche** intégrée pour trouver rapidement du contenu
- **Navigation** automatique basée sur les titres
- **Mode sombre** pour une meilleure lisibilité en faible luminosité

### Exemples de blocs personnalisés

```markdown
::: tip Conseil
Contenu du conseil ici
:::

::: warning Attention
Contenu de l'avertissement ici
:::

::: danger Erreur
Contenu de l'erreur ici
:::

::: info Note
Information supplémentaire ici
:::
```
