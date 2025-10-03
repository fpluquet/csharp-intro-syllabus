---
marp: true
theme: default
class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

# Méthodes des Types Natifs

## Programmation C# - BA1
### HELHa

---

## Plan du chapitre

1. **Introduction aux méthodes**
2. **Type `string`** - Manipulation de texte
3. **Type `int`** - Nombres entiers
4. **Type `double`** - Nombres décimaux
5. **Type `bool`** - Valeurs logiques
6. **Type `char`** - Caractères
7. **Type `DateTime`** - Dates et heures

---

## Introduction

### Qu'est-ce qu'une méthode de type ?
- **Fonction** intégrée à un type de données
- **Opération** que l'on peut effectuer sur une valeur
- **Syntaxe** : `variable.NomMethode(paramètres)`

### Exemple simple
```csharp
string texte = "Bonjour";
int longueur = texte.Length;  // Propriété
string majuscules = texte.ToUpper();  // Méthode
```

---

## Type `string` - Propriétés essentielles

### `Length` - Longueur de la chaîne
```csharp
string nom = "Alice";
Console.WriteLine(nom.Length);  // Affiche: 5
```

### Vérification de contenu
```csharp
string email = "alice@example.com";
bool contientArobase = email.Contains("@");  // True
bool commenceParAlice = email.StartsWith("alice");  // True
```

---

## Type `string` - Transformation

### Changement de casse
```csharp
string texte = "Bonjour Monde";
Console.WriteLine(texte.ToUpper());    // "BONJOUR MONDE"
Console.WriteLine(texte.ToLower());    // "bonjour monde"
```

### Nettoyage
```csharp
string sale = "  Texte avec espaces  ";
string propre = sale.Trim();  // "Texte avec espaces"
```

---

## Type `string` - Extraction et recherche

### `Substring()` - Extraire une partie
```csharp
string phrase = "Programmation C#";
string debut = phrase.Substring(0, 12);  // "Programmation"
string fin = phrase.Substring(13);       // "C#"
```

### `IndexOf()` - Trouver une position
```csharp
string texte = "Hello World";
int position = texte.IndexOf("World");  // 6
```

---

## Type `string` - Division et remplacement

### `Split()` - Diviser en parties
```csharp
string fruits = "pomme,banane,orange";
string[] tableau = fruits.Split(',');
// tableau[0] = "pomme"
// tableau[1] = "banane" 
// tableau[2] = "orange"
```

### `Replace()` - Remplacer du texte
```csharp
string original = "Bonjour le monde";
string nouveau = original.Replace("monde", "univers");
// "Bonjour le univers"
```

---

## Type `string` - Vérifications importantes

### `IsNullOrEmpty()` - Vérifier si vide
```csharp
string vide = "";
string nulle = null;
string normale = "texte";

Console.WriteLine(string.IsNullOrEmpty(vide));     // True
Console.WriteLine(string.IsNullOrEmpty(nulle));    // True
Console.WriteLine(string.IsNullOrEmpty(normale));  // False
```

---

## Type `int` - Conversions

### `ToString()` - Vers chaîne
```csharp
int nombre = 42;
string texte = nombre.ToString();  // "42"
```

### `Parse()` - Depuis chaîne
```csharp
string chaine = "123";
int nombre = int.Parse(chaine);  // 123
```

---

## Type `int` - Conversion sécurisée

### `TryParse()` - Sans exception
```csharp
string entree = "abc";  // Invalide
bool succes = int.TryParse(entree, out int resultat);

if (succes)
{
    Console.WriteLine($"Nombre: {resultat}");
}
else
{
    Console.WriteLine("Conversion impossible");
}
```

---

## Type `int` - Comparaison et limites

### `CompareTo()` - Comparer
```csharp
int a = 42;
int b = 30;
int resultat = a.CompareTo(b);
// resultat = 1 (a > b)
// resultat = 0 (a == b)
// resultat = -1 (a < b)
```

### Valeurs limites
```csharp
Console.WriteLine(int.MaxValue);  // 2,147,483,647
Console.WriteLine(int.MinValue);  // -2,147,483,648
```

---

## Type `double` - Spécificités

### Formatage des décimales
```csharp
double pi = 3.14159;
Console.WriteLine(pi.ToString("F2"));  // "3.14"
Console.WriteLine(pi.ToString("F4"));  // "3.1416"
```

### Valeurs spéciales
```csharp
double infini = 1.0 / 0.0;
double invalide = Math.Sqrt(-1);

Console.WriteLine(double.IsInfinity(infini));  // True
Console.WriteLine(double.IsNaN(invalide));     // True
```

---

## Type `bool` - Opérations de base

### Conversions
```csharp
bool vrai = true;
string texte = vrai.ToString();  // "True"

bool converti = bool.Parse("false");  // false
```

### Conversion sécurisée
```csharp
bool succes = bool.TryParse("yes", out bool resultat);
// succes = false (seuls "true" et "false" fonctionnent)
```

---

## Type `char` - Classification

### Tests de caractères
```csharp
char c = 'A';
Console.WriteLine(char.IsLetter(c));     // True
Console.WriteLine(char.IsDigit(c));      // False
Console.WriteLine(char.IsUpper(c));      // True
Console.WriteLine(char.IsWhiteSpace(c)); // False
```

---

## Type `char` - Transformation

### Changement de casse
```csharp
char minuscule = 'a';
char majuscule = char.ToUpper(minuscule);  // 'A'

char lettre = 'B';
char nouveauMin = char.ToLower(lettre);    // 'b'
```

### Exemple pratique
```csharp
string mot = "Hello123";
int lettres = 0, chiffres = 0;

foreach (char c in mot)
{
    if (char.IsLetter(c)) lettres++;
    if (char.IsDigit(c)) chiffres++;
}
```

---

## Type `DateTime` - Obtenir la date/heure

### Propriétés essentielles
```csharp
DateTime maintenant = DateTime.Now;
DateTime aujourdhui = DateTime.Today;

Console.WriteLine(maintenant.Year);   // 2025
Console.WriteLine(maintenant.Month);  // 10
Console.WriteLine(maintenant.Day);    // 3
Console.WriteLine(maintenant.Hour);   // 14
```

---

## Type `DateTime` - Formatage

### Formats prédéfinis
```csharp
DateTime date = DateTime.Now;
Console.WriteLine(date.ToString("d"));    // Date courte
Console.WriteLine(date.ToString("t"));    // Heure courte
Console.WriteLine(date.ToString("F"));    // Date et heure complètes
```

### Format personnalisé
```csharp
DateTime date = DateTime.Now;
string format = date.ToString("dd/MM/yyyy HH:mm");
// "03/10/2025 14:30"
```

---

## Type `DateTime` - Calculs

### Ajouter du temps
```csharp
DateTime maintenant = DateTime.Now;
DateTime demain = maintenant.AddDays(1);
DateTime dansUneHeure = maintenant.AddHours(1);
DateTime lAnneeProchaine = maintenant.AddYears(1);
```

### Calculer des différences
```csharp
DateTime debut = new DateTime(2020, 1, 1);
DateTime fin = DateTime.Now;
TimeSpan duree = fin.Subtract(debut);
Console.WriteLine($"Jours écoulés: {duree.Days}");
```

---

## Exemple pratique - Validation email

```csharp
static bool EstEmailValide(string email)
{
    // Vérifications de base
    if (string.IsNullOrEmpty(email))
        return false;
    
    // Doit contenir exactement un @
    int nbArobase = 0;
    foreach (char c in email)
    {
        if (c == '@') nbArobase++;
    }
    if (nbArobase != 1) return false;
    
    // Doit y avoir un point après @
    int posArobase = email.IndexOf('@');
    string apresArobase = email.Substring(posArobase + 1);
    return apresArobase.Contains('.');
}
```

---

## Exemple pratique - Calculateur d'âge

```csharp
static int CalculerAge(DateTime dateNaissance)
{
    DateTime aujourdhui = DateTime.Today;
    int age = aujourdhui.Year - dateNaissance.Year;
    
    // Si l'anniversaire n'a pas encore eu lieu cette année
    if (aujourdhui < dateNaissance.AddYears(age))
    {
        age--;
    }
    
    return age;
}

// Utilisation
DateTime naissance = new DateTime(1995, 6, 15);
int age = CalculerAge(naissance);
```

---

## Bonnes pratiques

### 1. Toujours utiliser `TryParse` pour les conversions utilisateur
```csharp
// ✅ Bon
if (int.TryParse(input, out int nombre))
{
    // Utiliser nombre
}

// ❌ Éviter (peut lever une exception)
int nombre = int.Parse(input);
```

---

## Bonnes pratiques (suite)

### 2. Vérifier les chaînes nulles ou vides
```csharp
// ✅ Bon
if (!string.IsNullOrEmpty(nom))
{
    Console.WriteLine(nom.ToUpper());
}

// ❌ Risqué (peut lever NullReferenceException)
Console.WriteLine(nom.ToUpper());
```

### 3. Utiliser les méthodes appropriées pour les caractères
```csharp
// ✅ Bon pour analyser des caractères
if (char.IsLetter(c)) { /* ... */ }

// ❌ Moins efficace
if (c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z') { /* ... */ }
```

---

## Récapitulatif

### Les types et leurs méthodes clés
- **`string`** : `Length`, `ToUpper()`, `Contains()`, `Split()`, `Trim()`
- **`int`** : `ToString()`, `Parse()`, `TryParse()`, `CompareTo()`
- **`double`** : Même que `int` + `IsNaN()`, `IsInfinity()`
- **`bool`** : `ToString()`, `Parse()`, `TryParse()`
- **`char`** : `IsLetter()`, `IsDigit()`, `ToUpper()`, `ToLower()`
- **`DateTime`** : `Now`, `AddDays()`, `ToString()`, `Subtract()`

---

## Questions ?

### Prochaine étape
**Chapitre 6 : Tableaux et Collections**
- Manipulation des tableaux
- Listes dynamiques
- Dictionnaires