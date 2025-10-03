# Tableaux et collections

## Introduction : Pourquoi utiliser des collections ?

Imaginez que vous voulez stocker les notes de 30 étudiants. Sans collections, vous devriez créer 30 variables différentes :

```csharp
double note1 = 15.5;
double note2 = 12.0;
double note3 = 18.5;
// ... et ainsi de suite jusqu'à note30 !
```

C'est fastidieux et peu pratique ! Les **collections** permettent de regrouper plusieurs données du même type sous un seul nom.

::: info Définition
Une **collection** est une structure de données qui permet de stocker et d'organiser plusieurs éléments ensemble.
:::

## 1. Les tableaux - Votre première collection

### Qu'est-ce qu'un tableau ?

Un **tableau** est comme une rangée de casiers numérotés, chacun pouvant contenir une valeur du même type.

```csharp
// Déclaration d'un tableau de 5 entiers
int[] notes = new int[5];

// Ou directement avec des valeurs
int[] notes = new int[] { 15, 12, 18, 14, 16 };
// Syntaxe simplifiée (équivalente)
int[] notes = { 15, 12, 18, 14, 16 };
```

### Comprendre l'indexation

::: warning Important
Les indices commencent **toujours** à 0 en C# !
:::

```csharp
int[] notes = { 15, 12, 18, 14, 16 };

// Accès aux éléments :
Console.WriteLine(notes[0]);  // Affiche 15 (premier élément)
Console.WriteLine(notes[1]);  // Affiche 12 (deuxième élément)
Console.WriteLine(notes[4]);  // Affiche 16 (cinquième et dernier élément)
```

**Représentation visuelle :**

| Index | 0  | 1  | 2  | 3  | 4  |
|-------|----|----|----|----|----| 
| Valeur| 15 | 12 | 18 | 14 | 16 |

### Opérations de base sur les tableaux

```csharp
int[] data = new int[5] { 10, 20, 30, 40, 50 };

// Modifier un élément
data[1] = 25;  // Le tableau devient {10, 25, 30, 40, 50}

// Connaître la taille
Console.WriteLine($"Le tableau contient {data.Length} éléments");

// Parcourir avec une boucle for
for (int i = 0; i < data.Length; i++)
{
    Console.WriteLine($"Élément {i}: {data[i]}");
}

// Parcourir avec foreach (plus simple)
foreach (int nombre in data)
{
    Console.WriteLine($"Valeur: {nombre}");
}
```

::: danger Attention aux débordements !
```csharp
int[] tableau = new int[3];
tableau[5] = 10;  // ❌ ERREUR ! L'index 5 n'existe pas
```
Cela provoque une exception `IndexOutOfRangeException`.
:::

## 2. Les tableaux multidimensionnels

### Tableaux à deux dimensions (matrices)

Pensez à une grille ou à un tableur Excel :

```csharp
// Matrice 3x4 (3 lignes, 4 colonnes)
int[,] matrice = new int[3, 4];

// Avec initialisation
int[,] grille = new int[,] {
    { 1, 2, 3, 4 },      // Ligne 0
    { 5, 6, 7, 8 },      // Ligne 1
    { 9, 10, 11, 12 }    // Ligne 2
};

// Accès : grille[ligne, colonne]
Console.WriteLine(grille[1, 2]);  // Affiche 7
```

**Représentation visuelle :**

|         | Col 0 | Col 1 | Col 2 | Col 3 |
|---------|-------|-------|-------|-------|
| **Ligne 0** |   1   |   2   |   3   |   4   |
| **Ligne 1** |   5   |   6   |   7   |   8   |
| **Ligne 2** |   9   |  10   |  11   |  12   |

```csharp
// Parcourir une matrice
for (int ligne = 0; ligne < grille.GetLength(0); ligne++)
{
    for (int colonne = 0; colonne < grille.GetLength(1); colonne++)
    {
        Console.Write(grille[ligne, colonne] + " ");
    }
    Console.WriteLine(); // Nouvelle ligne
}
```

### Tableaux irréguliers (Jagged Arrays)

Contrairement aux matrices, les tableaux irréguliers ont des lignes de tailles différentes :

```csharp
// Chaque ligne peut avoir une taille différente
int[][] irregular = new int[3][];
irregular[0] = new int[2] { 1, 2 };           // 2 éléments
irregular[1] = new int[4] { 3, 4, 5, 6 };     // 4 éléments  
irregular[2] = new int[1] { 7 };              // 1 élément

// Accès : irregular[ligne][colonne]
Console.WriteLine(irregular[1][2]);  // Affiche 5
```

### Propriétés utiles des tableaux

```csharp
int[,] matrice = new int[3, 4];

Console.WriteLine(matrice.Rank);           // 2 (nombre de dimensions)
Console.WriteLine(matrice.GetLength(0));   // 3 (taille de la 1ère dimension)
Console.WriteLine(matrice.GetLength(1));   // 4 (taille de la 2ème dimension)
Console.WriteLine(matrice.Length);         // 12 (nombre total d'éléments)
```

## 3. Les listes - Collections dynamiques

### Pourquoi utiliser des listes ?

Les tableaux ont une **taille fixe**. Si vous ne savez pas combien d'éléments vous aurez, utilisez une **liste** !

```csharp
// Problème avec un tableau
int[] tableau = new int[5];  // Que faire si j'ai besoin de 6 éléments ?

// Solution avec une liste
List<int> liste = new List<int>();  // Taille flexible !
```

### Créer et utiliser des listes

```csharp
using System.Collections.Generic;  // N'oubliez pas cette ligne !

// Création d'une liste vide
List<int> nombres = new List<int>();

// Création avec des valeurs initiales
List<string> prenoms = new List<string> { "Alice", "Bob", "Charlie" };

// Ajouter des éléments
nombres.Add(10);
nombres.Add(20);
nombres.Add(30);

// Accès par index (comme les tableaux)
Console.WriteLine(nombres[0]);  // Affiche 10

// Connaître le nombre d'éléments
Console.WriteLine($"La liste contient {nombres.Count} éléments");
```

### Opérations courantes sur les listes

```csharp
List<string> fruits = new List<string> { "pomme", "banane", "orange" };

// Ajouter
fruits.Add("kiwi");                    // Ajoute à la fin
fruits.Insert(1, "fraise");           // Insère à la position 1

// Supprimer
fruits.Remove("banane");               // Supprime la première occurrence
fruits.RemoveAt(0);                   // Supprime l'élément à l'index 0
fruits.Clear();                       // Vide complètement la liste

// Rechercher
bool contient = fruits.Contains("pomme");     // true ou false
int index = fruits.IndexOf("orange");        // -1 si non trouvé
```

### Parcourir une liste

```csharp
List<int> notes = new List<int> { 15, 12, 18, 14, 16 };

// Méthode 1 : boucle for (quand vous avez besoin de l'index)
for (int i = 0; i < notes.Count; i++)
{
    Console.WriteLine($"Note {i + 1}: {notes[i]}");
}

// Méthode 2 : foreach (plus simple, recommandée)
foreach (int note in notes)
{
    Console.WriteLine($"Note: {note}");
}
```

## 4. Comparaison : Tableaux vs Listes

| Critère | Tableau | Liste |
|---------|---------|-------|
| **Taille** | Fixe à la création | Dynamique |
| **Performance** | Plus rapide | Légèrement plus lente |
| **Syntaxe** | `int[] tab = new int[5]` | `List<int> list = new List<int>()` |
| **Méthodes** | Limitées | Nombreuses (Add, Remove, etc.) |
| **Quand utiliser** | Taille connue et constante | Taille variable, ajouts/suppressions |

::: tip Conseil pratique
- Utilisez des **tableaux** quand vous connaissez la taille exacte
- Utilisez des **listes** quand vous devez ajouter/supprimer des éléments
:::

## 5. Les tuples - Regrouper des types différents

### Le problème des types multiples

Parfois, vous voulez regrouper des informations de types différents :

```csharp
// Comment stocker le nom ET l'âge d'une personne ensemble ?
string nom = "Alice";
int age = 25;
// Deux variables séparées, pas pratique...
```

### Solution avec les tuples

```csharp
// Un tuple peut contenir différents types
(string nom, int age) personne = ("Alice", 25);

// Ou sans noms explicites
(string, int) personne2 = ("Bob", 30);

// Accès par nom
Console.WriteLine($"Nom: {personne.nom}");
Console.WriteLine($"Âge: {personne.age}");

// Accès par position
Console.WriteLine($"Nom: {personne2.Item1}");
Console.WriteLine($"Âge: {personne2.Item2}");
```

### Exemples pratiques de tuples

```csharp
// Coordonnées géographiques
(double latitude, double longitude) coordonnees = (50.8503, 4.3517);

// Résultat d'une division avec reste
(int quotient, int reste) division = (17, 3);

// Informations d'un étudiant
(string nom, int age, double moyenne) etudiant = ("Marie", 20, 15.5);
```

## 6. LINQ - Manipuler les collections facilement

### Introduction à LINQ

**LINQ** (Language Integrated Query) est une technologie puissante qui permet de manipuler les collections avec une syntaxe similaire au SQL. Au lieu d'écrire des boucles complexes, LINQ offre des méthodes élégantes pour filtrer, trier, transformer et analyser vos données.

::: info Pourquoi utiliser LINQ ?
LINQ rend votre code plus lisible, plus concis et moins sujet aux erreurs. Une opération qui prendrait 5-10 lignes avec des boucles traditionnelles peut souvent être écrite en une seule ligne avec LINQ.
:::

### Prérequis pour utiliser LINQ

```csharp
using System;
using System.Collections.Generic;
using System.Linq; // ← Important : n'oubliez pas cet using !
```

### Les opérations LINQ essentielles

#### 1. Where() - Filtrer des éléments

```csharp
List<int> nombres = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Méthode traditionnelle (avec boucle)
List<int> nombresPairs = new List<int>();
foreach (int nombre in nombres)
{
    if (nombre % 2 == 0)
        nombresPairs.Add(nombre);
}

// Avec LINQ - beaucoup plus simple !
var nombresPairsLinq = nombres.Where(n => n % 2 == 0).ToList();
// Résultat : { 2, 4, 6, 8, 10 }
```

#### 2. Select() - Transformer des éléments

```csharp
List<string> prenoms = new List<string> { "alice", "bob", "charlie" };

// Transformer en majuscules
var prenomsEnMajuscules = prenoms.Select(p => p.ToUpper()).ToList();
// Résultat : { "ALICE", "BOB", "CHARLIE" }

// Transformer en longueurs
var longueurs = prenoms.Select(p => p.Length).ToList();
// Résultat : { 5, 3, 7 }
```

#### 3. OrderBy() et OrderByDescending() - Trier

```csharp
List<int> notes = new List<int> { 15, 12, 18, 14, 16 };

// Tri croissant
var notesTriees = notes.OrderBy(n => n).ToList();
// Résultat : { 12, 14, 15, 16, 18 }

// Tri décroissant
var notesDecroissantes = notes.OrderByDescending(n => n).ToList();
// Résultat : { 18, 16, 15, 14, 12 }
```

#### 4. First(), Last(), Single() - Récupérer des éléments spécifiques

```csharp
List<int> nombres = new List<int> { 1, 2, 3, 4, 5 };

int premier = nombres.First();           // 1
int dernier = nombres.Last();            // 5
int premierPair = nombres.First(n => n % 2 == 0);  // 2

// Versions "sécurisées" qui retournent null si rien n'est trouvé
int? premierGrand = nombres.FirstOrDefault(n => n > 10);  // null
```

#### 5. Count() et Sum() - Statistiques

```csharp
List<int> notes = new List<int> { 15, 12, 18, 14, 16 };

int nombreNotes = notes.Count();                    // 5
int nombreBonnesNotes = notes.Count(n => n >= 15);  // 3
int somme = notes.Sum();                            // 75
double moyenne = notes.Average();                   // 15.0
int noteMax = notes.Max();                          // 18
int noteMin = notes.Min();                          // 12
```

### Exemples pratiques avec des données complexes

#### Gestion d'une liste d'étudiants

```csharp
// Définir une structure pour un étudiant
var etudiants = new List<(string nom, int age, double moyenne)>
{
    ("Alice", 20, 15.5),
    ("Bob", 19, 12.0),
    ("Charlie", 21, 17.8),
    ("Diana", 20, 14.2),
    ("Eve", 22, 16.9)
};

// Trouver tous les étudiants qui ont la moyenne
var etudiantsAvecMoyenne = etudiants
    .Where(e => e.moyenne >= 12.0)
    .ToList();

// Trier par note décroissante
var etudiantsParNote = etudiants
    .OrderByDescending(e => e.moyenne)
    .ToList();

// Récupérer seulement les noms des meilleurs étudiants (> 15)
var nomsMeilleursEtudiants = etudiants
    .Where(e => e.moyenne > 15.0)
    .Select(e => e.nom)
    .ToList();
// Résultat : { "Alice", "Charlie", "Eve" }
```

#### Analyse de données de vente

```csharp
List<double> ventes = new List<double> { 1200.50, 850.75, 2100.00, 950.25, 1750.80 };

// Statistiques en une ligne
var statistiques = new
{
    Total = ventes.Sum(),
    Moyenne = ventes.Average(),
    Maximum = ventes.Max(),
    Minimum = ventes.Min(),
    NombreVentesElevees = ventes.Count(v => v > 1000)
};

Console.WriteLine($"Total: {statistiques.Total:C}");
Console.WriteLine($"Moyenne: {statistiques.Moyenne:C}");
Console.WriteLine($"Ventes > 1000€: {statistiques.NombreVentesElevees}");
```

### Chaînage d'opérations LINQ

L'une des forces de LINQ est la possibilité de **chaîner** plusieurs opérations :

```csharp
List<string> mots = new List<string> { "programmation", "csharp", "linq", "collection", "tableau" };

// Chaînage : filtrer → transformer → trier
var resultat = mots
    .Where(m => m.Length > 5)        // Garder les mots de plus de 5 lettres
    .Select(m => m.ToUpper())        // Convertir en majuscules
    .OrderBy(m => m)                 // Trier alphabétiquement
    .ToList();

// Résultat : { "COLLECTION", "PROGRAMMATION", "TABLEAU" }
```

### LINQ avec des tableaux

LINQ fonctionne aussi avec les tableaux classiques :

```csharp
int[] nombres = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Trouver les nombres pairs et les mettre au carré
var carresDesPairs = nombres
    .Where(n => n % 2 == 0)     // { 2, 4, 6, 8, 10 }
    .Select(n => n * n)         // { 4, 16, 36, 64, 100 }
    .ToArray();                 // Convertir en tableau
```

### Syntaxe de requête LINQ (optionnelle)

LINQ offre également une syntaxe similaire au SQL :

```csharp
List<int> nombres = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Syntaxe de méthode (recommandée)
var nombresPairs1 = nombres.Where(n => n % 2 == 0).ToList();

// Syntaxe de requête (optionnelle)
var nombresPairs2 = (from n in nombres
                     where n % 2 == 0
                     select n).ToList();

// Les deux donnent le même résultat !
```

### Bonnes pratiques avec LINQ

#### 1. Utilisez ToList() ou ToArray() quand nécessaire

```csharp
List<int> nombres = new List<int> { 1, 2, 3, 4, 5 };

// ❌ Problématique - la requête est réévaluée à chaque accès
var nombresPairs = nombres.Where(n => n % 2 == 0);

// ✅ Mieux - la requête est évaluée une seule fois
var nombresPairsList = nombres.Where(n => n % 2 == 0).ToList();
```

#### 2. Attention aux exceptions avec First() et Single()

```csharp
List<int> nombres = new List<int> { 1, 3, 5 };

// ❌ Lève une exception si aucun élément pair
int premierPair = nombres.First(n => n % 2 == 0);

// ✅ Retourne null (ou 0 pour les int) si aucun élément trouvé
int premierPairSafe = nombres.FirstOrDefault(n => n % 2 == 0);
```

#### 3. LINQ et performance

Pour de petites collections (< 1000 éléments), LINQ est parfait. Pour de très grandes collections, considérez :
- **PLINQ** (Parallel LINQ) pour le traitement parallèle
- Les boucles traditionnelles si la performance est critique


## Résumé des points clés

✅ **Tableaux** : taille fixe, rapides, indices de 0 à Length-1  
✅ **Listes** : taille dynamique, méthodes Add/Remove, plus flexibles  
✅ **Matrices** : tableaux 2D avec [ligne, colonne]  
✅ **Tuples** : regroupent différents types de données  
✅ **LINQ** : manipule les collections avec des méthodes élégantes (Where, Select, OrderBy...)  
✅ **Attention** : toujours vérifier les limites d'indices et utiliser FirstOrDefault() pour éviter les exceptions !

::: tip Conseil final
1. **Débutez** avec les tableaux simples et les listes
2. **Maîtrisez** les opérations LINQ de base (Where, Select, OrderBy)
3. **Progressez** vers les concepts avancés (matrices, tuples, chaînage LINQ)
4. **N'oubliez pas** `using System.Linq;` pour utiliser LINQ !
:::
