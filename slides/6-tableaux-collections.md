---
marp: true
theme: default
paginate: true
header: 'Chapitre 6 : Tableaux et Collections'
footer: 'Programmation C# - BA1'
---

# Chapitre 6 : Tableaux et Collections

## Stocker et organiser plusieurs données

---

## Pourquoi utiliser des collections ?

Sans collections :
```csharp
double note1 = 15.5;
double note2 = 12.0;
double note3 = 18.5;
// ... et ainsi de suite jusqu'à note30 !
```

Avec collections :
```csharp
double[] notes = { 15.5, 12.0, 18.5, /* ... */ };
```

**Collections = regrouper plusieurs données du même type**

---

## Les tableaux - Votre première collection

### Déclaration et initialisation

```csharp
// Déclaration avec taille fixe
int[] notes = new int[5];

// Initialisation directe
int[] notes = new int[] { 15, 12, 18, 14, 16 };

// Syntaxe simplifiée
int[] notes = { 15, 12, 18, 14, 16 };
```

---

## Indexation des tableaux

⚠️ **Important : les indices commencent à 0 !**

```csharp
int[] notes = { 15, 12, 18, 14, 16 };

Console.WriteLine(notes[0]);  // 15 (premier élément)
Console.WriteLine(notes[1]);  // 12 (deuxième élément)
Console.WriteLine(notes[4]);  // 16 (cinquième et dernier)

// notes[5] → Exception ! L'index n'existe pas
```

**Index : 0, 1, 2, 3, 4**
**Valeurs : 15, 12, 18, 14, 16**

---

## Opérations de base sur les tableaux

```csharp
int[] notes = { 15, 12, 18, 14, 16 };

// Taille du tableau
Console.WriteLine(notes.Length);  // 5

// Parcourir avec for
for (int i = 0; i < notes.Length; i++)
{
    Console.WriteLine($"Note {i}: {notes[i]}");
}

// Parcourir avec foreach
foreach (int note in notes)
{
    Console.WriteLine(note);
}
```

---

## Les listes - Collections dynamiques

### Pourquoi utiliser des listes ?

**Tableaux** : taille fixe définie à la création
**Listes** : taille variable, peut grandir/rétrécir

```csharp
using System.Collections.Generic;

List<int> notes = new List<int>();
// Ou avec initialisation
List<int> notes = new List<int> { 15, 12, 18 };
```

---

## Opérations sur les listes

```csharp
List<string> prenoms = new List<string>();

// Ajouter des éléments
prenoms.Add("Alice");
prenoms.Add("Bob");

// Insérer à une position
prenoms.Insert(1, "Charlie");  // Alice, Charlie, Bob

// Supprimer
prenoms.Remove("Bob");           // Par valeur
prenoms.RemoveAt(0);            // Par index

// Vérifier l'existence
bool existe = prenoms.Contains("Alice");
```

---

## Tableaux vs Listes

| Aspect | Tableaux | Listes |
|--------|----------|--------|
| **Taille** | Fixe | Dynamique |
| **Performance** | Plus rapide | Légèrement plus lent |
| **Syntaxe** | `int[]` | `List<int>` |
| **Utilisation** | Données fixes | Données variables |

**Conseil** : Utilisez les listes sauf si vous avez des contraintes de performance spécifiques.

---

## Les tuples

### Regrouper des types différents

```csharp
// Problème : comment stocker nom ET âge ensemble ?
string nom = "Alice";
int age = 25;

// Solution avec tuple
(string nom, int age) personne = ("Alice", 25);

Console.WriteLine($"Nom: {personne.nom}");
Console.WriteLine($"Âge: {personne.age}");
```

---

## LINQ - Manipuler les collections facilement

### Introduction

**LINQ** = Language Integrated Query
Permet de manipuler les collections avec une syntaxe élégante

```csharp
using System.Linq; // ← Important !

List<int> nombres = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Méthode traditionnelle (avec boucle)
List<int> nombresPairs = new List<int>();
foreach (int nombre in nombres)
{
    if (nombre % 2 == 0)
        nombresPairs.Add(nombre);
}

// Avec LINQ - une seule ligne !
var nombresPairsLinq = nombres.Where(n => n % 2 == 0).ToList();
```

---

## Opérations LINQ essentielles

### Where() - Filtrer

```csharp
List<int> nombres = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Garder seulement les nombres pairs
var nombresPairs = nombres.Where(n => n % 2 == 0).ToList();
// Résultat : { 2, 4, 6, 8, 10 }

// Garder les nombres > 5
var grandsNombres = nombres.Where(n => n > 5).ToList();
// Résultat : { 6, 7, 8, 9, 10 }
```

---

## Select() - Transformer

```csharp
List<string> prenoms = { "alice", "bob", "charlie" };

// Transformer en majuscules
var majuscules = prenoms.Select(p => p.ToUpper()).ToList();
// Résultat : { "ALICE", "BOB", "CHARLIE" }

// Transformer en longueurs
var longueurs = prenoms.Select(p => p.Length).ToList();
// Résultat : { 5, 3, 7 }
```

---

## OrderBy() - Trier

```csharp
List<int> notes = { 15, 12, 18, 14, 16 };

// Tri croissant
var notesTriees = notes.OrderBy(n => n).ToList();
// Résultat : { 12, 14, 15, 16, 18 }

// Tri décroissant
var notesDecroissantes = notes.OrderByDescending(n => n).ToList();
// Résultat : { 18, 16, 15, 14, 12 }
```

---

## Statistiques avec LINQ

```csharp
List<int> notes = { 15, 12, 18, 14, 16 };

int nombre = notes.Count();                    // 5
int bonnesNotes = notes.Count(n => n >= 15);   // 3
int somme = notes.Sum();                       // 75
double moyenne = notes.Average();              // 15.0
int maximum = notes.Max();                     // 18
int minimum = notes.Min();                     // 12
```

---

## Chaînage d'opérations LINQ

```csharp
List<string> mots = { "programmation", "csharp", "linq", "collection" };

// Chaîner : filtrer → transformer → trier
var resultat = mots
    .Where(m => m.Length > 5)        // Mots > 5 lettres
    .Select(m => m.ToUpper())        // En majuscules
    .OrderBy(m => m)                 // Trier
    .ToList();

// Résultat : { "COLLECTION", "PROGRAMMATION" }
```

---

## Exemple pratique : Gestion d'étudiants

```csharp
var etudiants = new List<(string nom, double moyenne)>
{
    ("Alice", 15.5),
    ("Bob", 12.0),
    ("Charlie", 17.8),
    ("Diana", 14.2)
};

// Étudiants avec la moyenne (≥ 12)
var reussis = etudiants
    .Where(e => e.moyenne >= 12.0)
    .ToList();

// Noms des meilleurs étudiants (> 15)
var meilleurs = etudiants
    .Where(e => e.moyenne > 15.0)
    .Select(e => e.nom)
    .ToList();
```

---

## Bonnes pratiques LINQ

### 1. Utilisez ToList() ou ToArray()
```csharp
// ❌ La requête est réévaluée à chaque accès
var nombresPairs = nombres.Where(n => n % 2 == 0);

// ✅ La requête est évaluée une seule fois
var nombresPairsList = nombres.Where(n => n % 2 == 0).ToList();
```

### 2. Attention aux exceptions
```csharp
// ❌ Exception si aucun élément trouvé
int premier = nombres.First(n => n > 100);

// ✅ Retourne 0 si aucun élément trouvé
int premierSafe = nombres.FirstOrDefault(n => n > 100);
```

---

## LINQ avec tableaux

LINQ fonctionne aussi avec les tableaux :

```csharp
int[] nombres = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Carrés des nombres pairs
var carresDesPairs = nombres
    .Where(n => n % 2 == 0)     // { 2, 4, 6, 8, 10 }
    .Select(n => n * n)         // { 4, 16, 36, 64, 100 }
    .ToArray();                 // Convertir en tableau
```

---

## Récapitulatif

✅ **Tableaux** : taille fixe, indices 0 à Length-1
✅ **Listes** : taille dynamique, Add/Remove
✅ **Tuples** : regrouper différents types
✅ **LINQ** : manipuler collections élégamment
- `Where()` : filtrer
- `Select()` : transformer  
- `OrderBy()` : trier
- `Count(), Sum(), Average()` : statistiques

**N'oubliez pas** : `using System.Linq;` !

---

## Exercices pratiques

1. **Tableau de notes** : Calculer moyenne, min, max
2. **Liste de courses** : Ajouter/supprimer des articles
3. **LINQ sur étudiants** : Filtrer par âge et moyenne
4. **Analyse de ventes** : Statistiques avec LINQ
5. **Tri de mots** : Chaîner Where/Select/OrderBy

**Conseil** : Maîtrisez d'abord les bases avant LINQ !