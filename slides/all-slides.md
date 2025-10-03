---
marp: true
theme: default
paginate: true
---

# Programmation BA1
## UE1102 - Programmation (36h)
### Année académique 2025-2026

---

# Introduction à la programmation

---

## Concepts fondamentaux

- La programmation va de : **algorithme → langage de prog. → logiciel**
- Un **algorithme** est une suite finie et non-ambiguë d'**instructions** permettant de donner **la réponse à un problème**.
- Un **langage de programmation** est une notation conventionnelle destinée à formuler des algorithmes et à produire des programmes informatiques qui les appliquent.
- Un **logiciel** est un ensemble de séquences d'instructions interprétables par une machine et d'un jeu de données nécessaires à ses opérations.

---

## Concepts fondamentaux (suite)

- Exemple en programmation :
  ```
  algorithme 
    → C#, Java, C++, Python, JS, ... 
    → prog.exe, un site web, ...
  ```

---

## Vocabulaire

- **Code source** : code écrit par un développeur dans le but d'obtenir un logiciel.
- **Compilation** : transformation du code source en un logiciel exécutable.
- **Exécution** : lancement du logiciel par le système d'exploitation (Windows, par exemple).
- **Erreur de syntaxe** : le code source ne correspond pas à la grammaire du langage utilisé.
- **Erreur de sémantique** : le programme peut être compilé mais lors de l'exécution il ne fait pas ce qui était prévu (c'est le « sens » du code qui n'est pas correct).

---

## Paradigmes multiples

- Un **paradigme** est une manière de penser.
- On peut programmer en voyant un code de plusieurs manières différentes :
  - **procédural** (programme = ensemble de procédures)
  - **orienté objet** (programme = ensemble d'objets qui se parlent)
  - **fonctionnel** (programme = ensemble de fonctions qui sont appelées les unes sur les autres)
  - **logique** (programme = règles et faits)
- Cet aspect influence le code produit, la méthode, etc.

---

## Console .NET

### .NET 5

```csharp
using System;

namespace MyFirstConsApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

- Le **framework** (technologie) propose des ressources dans un environnement hiérarchisé.

---

## Console .NET (suite)

### A partir de .NET 6 

- Avec les mises à jour, il est possible de simplifier :
    ```csharp
    Console.WriteLine("Hello World!");
    ```

---

## Syntaxe générale du langage

- Il faut respecter les **majuscules** et **minuscules**.
- Chaque ligne de code se termine par un `;`
- Un bloc de code s'identifie **par des accolades** `{ ... }`
- On peut ajouter un commentaire avec `//`
- **camelCase** : façon d'écrire les variables (ex : `maVariable`)

---

## Syntaxe générale du langage (suite)

- La **signature d'une fonction** est un ensemble d'informations qui définit comment une fonction peut être appelée dans le code :
    - Nom de la fonction
    - Type et nombre de paramètres
    - Type de retour de la fonction

Exemple en C# :
```csharp
void AfficherMessage(string message)
{
    Console.WriteLine(message);
}
```
- nom : `AfficherMessage`
- paramètre : `string message` (chaîne de char)
- type de retour : `void` (la fonction ne renvoie rien)

---

## Plan du cours

Le cours s'organise de façon progressive, des concepts les plus fondamentaux aux plus avancés.

1. Introduction à la programmation
2. Variables et Types
3. Opérateurs
4. Conversions
5. Structures de Contrôle
6. Méthodes des Types Natifs
7. Tableaux et Collections
8. Organisation de la Mémoire
9. Fonctions

Chaque chapitre s'appuie sur les connaissances des chapitres précédents, il est donc important de bien comprendre les concepts avant de passer au chapitre suivant.

---

# Les variables et types de données

---

## Les variables de type valeur

- Une **variable** est une mémoire qui stocke une valeur qui peut être modifiée.
- La **déclaration** d'une variable est sa création, **l'assignation** est donner une valeur à une variable.
- Les **variables de type valeur** contiennent des données simples et contiennent directement leurs valeurs.
- Types valeur : `sbyte, ushort, uint, ulong, float, decimal, double, char, bool`
- Pourquoi pas string ?  
  → Avec un string, on travaille avec une référence à une chaîne de caractères dans la mémoire.  
  En type valeur, on travaille avec la valeur elle-même.

---

## Les variables de type référence

- Les **variables de type référence** stockent des références à leurs données (objets).
- Ce typage trouve tout son intérêt dans l'orienté objet.
- Types référence : `string`, tout ce qu'on a créé avec le mot clé `new` (ex : tableaux, listes, etc).

---

## Tableaux des principaux types C#

<style>
.table-small {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.7em;
}
.table-small td:nth-child(3) {
  width: 100px;
  white-space: nowrap;
}
</style>

<div class="table-small">

| C# Alias  | Range                  | Size     | C# Alias   | Range                |
|-----------|------------------------|----------|------------|----------------------|
| byte      | 0 à 255                | 1 byte   | sbyte      | -128 à 127           |
| short     | -32768 à 32767         | 2 bytes  | ushort     | 0 à 65535            |
| int       | -2,147,483,648 à 2,147,483,647       | 4 bytes  | uint       | 0 à 4,294,967,295    |
| long      | -9,223,372,036,854,775,808 à 9,223,372,036,854,775,807 | 8 bytes | ulong | 0 à 18,446,744,073,709,551,615 |

</div>

---

## Tableaux des principaux types C# (suite)

| C# Alias | Size     | Précision        | Range                                   |
|----------|----------|------------------|-----------------------------------------|
| float    | 4 bytes  | 7 digits         | ±1.5×10⁻⁴⁵ à ±3.4×10³⁸                |
| double   | 8 bytes  | 15-16 digits     | ±5.0×10⁻³²⁴ à ±1.7×10³⁰⁸               |
| decimal  | 16 bytes | 28-29 décimales  | ±1.0×10⁻²⁸ à ±7.9×10²⁸                 |

---

## Bit et Byte

- Un **byte** ou **octet** représente 8 bits.
- Un **bit** est soit un 0, soit un 1.
- Un **char** représente un seul caractère codé sur 16 bits (Unicode).
- Une **constante entière** est par défaut de type `int`, et une **constante réelle** est par défaut de type `double`.

---

## La portée des variables

- La portée d'une variable, c'est la **partie du code** dans laquelle une variable est accessible.
- Une variable locale est visible uniquement dans la partie du code où elle a été déclarée (jusqu'à la fermeture de l'accolade qui termine le bloc).

---

## La portée des variables (suite)

- Exemple portée inaccessible :
    ```csharp
    static void Main()
    {
        for(int i=0; i <5; i++)
        {
            Console.WriteLine(i);
        }
        Console.WriteLine(i); // erreur : i inaccessible ici
    }
    ```

---

## La portée des variables (suite)

- Exemple portée accessible :
    ```csharp
    static void Main()
    {
        int nombre = 42;
        Console.WriteLine(nombre);
    }
    ```

---

## Méthodes d'assemblage de strings

- **Concaténation** :  
  ```csharp
  string greet = "Hello " + name;
  ```
- **Interpolation** :
  ```csharp
  string greet = $"Hello {name}";
  ```
- **Formatage de chaîne** :
  ```csharp
  Console.WriteLine("Hello {0}", name);
  ```
  
  Note: Toujours avec `Console.WriteLine(…)` ! (Sinon, `string.Format`)

---

# Les opérateurs

Les opérateurs sont des symboles qui réalisent des opérations sur une ou plusieurs valeurs (appelées opérandes). Ils sont fondamentaux en programmation car ils permettent de manipuler les données.

---

## Opérateurs arithmétiques binaires

Les opérateurs arithmétiques binaires effectuent des calculs mathématiques de base sur deux opérandes et retournent un résultat numérique.

- `+` : addition (`a+b`)
- `-` : soustraction (`a-b`)
- `*` : multiplication (`a*b`)
- `/` : division (`a/b`) (le résultat d'une division entière de type `int` reste entier)
- `%` : modulo (`a%b`) - donne le reste de la division

---

## Opérateurs arithmétiques binaires (exemple)

```csharp
int a = 10;
int b = 3;
Console.WriteLine(a + b);  // 13
Console.WriteLine(a - b);  // 7
Console.WriteLine(a * b);  // 30
Console.WriteLine(a / b);  // 3 (pas 3.33, car division entière)
Console.WriteLine(a % b);  // 1 (reste de la division)

// Avec des nombres décimaux, la division donne un résultat décimal
double c = 10.0;
double d = 3.0;
Console.WriteLine(c / d);  // 3.3333333333333335
```

**Attention**: Si vous divisez deux entiers (`int`), le résultat sera un entier (troncature). Si vous voulez un résultat décimal, au moins un des opérandes doit être de type décimal.

---

## Opérateurs arithmétiques unaires

Ces opérateurs n'agissent que sur une seule opérande. Ils sont souvent utilisés pour incrémenter ou décrémenter des variables dans les boucles ou les compteurs.

- `++` : incrémentation (augmentation) (`a++` ou `++a`)
- `--` : décrémentation (diminution) (`a--` ou `--a`)
- `x++` (post-incrémentation) : d'abord utiliser la valeur, puis incrémenter.
- `++x` (pré-incrémentation) : incrémenter d'abord, puis utiliser la nouvelle valeur de x.

---

## Opérateurs arithmétiques unaires (exemple)

```csharp
// Post-incrémentation vs pré-incrémentation
int a = 5;
int b = a++; // b = 5, puis a devient 6
Console.WriteLine($"a = {a}, b = {b}"); // a = 6, b = 5

int c = 5;
int d = ++c; // c devient 6, puis d = 6
Console.WriteLine($"c = {c}, d = {d}"); // c = 6, d = 6

// Utilisation dans une boucle
int i = 0;
while (i < 3) {
    Console.WriteLine(i++); // Affiche 0, 1, 2
}
```

---

## Opérateurs arithmétiques avec affectation

Ces opérateurs combinent une opération arithmétique et une affectation en une seule instruction.

- `+=` : affectation de l'entier par addition (`a+=b` identique à `a = a + b`)
- `-=` : affectation de l'entier par soustraction (`a-=b` identique à `a = a - b`)
- `*=` : affectation de l'entier par multiplication (`a*=b` identique à `a = a * b`)
- `/=` : affectation de l'entier par division (`a/=b` identique à `a = a / b`)
- `%=` : affectation de l'entier par modulo (`a%=b` identique à `a = a % b`)

---

## Opérateurs arithmétiques avec affectation (exemple)

```csharp
int score = 0;

// Ajoute 10 points
score += 10; // équivalent à score = score + 10;
Console.WriteLine($"Score: {score}"); // 10

// Double les points
score *= 2; // équivalent à score = score * 2;
Console.WriteLine($"Score: {score}"); // 20

// Enlève 5 points
score -= 5; // équivalent à score = score - 5;
Console.WriteLine($"Score: {score}"); // 15

// Divise par 3
score /= 3; // équivalent à score = score / 3;
Console.WriteLine($"Score: {score}"); // 5
```

---

## Opérateurs relationnels

Les opérateurs relationnels permettent de comparer des valeurs et de déterminer la relation entre elles.

- `==` : comparaison d'égalité (`a == b`)
- `!=` : comparaison de différence (`a != b`)
- `>` : comparaison de plus grand que (`a > b`)
- `>=` : plus grand ou égal à (`a >= b`)
- `<` : plus petit que (`a < b`)
- `<=` : plus petit ou égal à (`a <= b`)

Ces opérateurs donnent un résultat booléen (`true` ou `false`).

---

## Opérateurs relationnels (exemple)

```csharp
int age = 20;
bool estMajeur = age >= 18; // true
Console.WriteLine($"Est majeur: {estMajeur}");

// Dans une condition if
if (age > 18) {
    Console.WriteLine("Plus de 18 ans");
} else if (age == 18) {
    Console.WriteLine("Exactement 18 ans");
} else {
    Console.WriteLine("Moins de 18 ans");
}

// Comparaison de chaînes
string nom1 = "Alice";
string nom2 = "Bob";
bool memePrenoms = nom1 == nom2; // false
Console.WriteLine($"Même prénoms: {memePrenoms}");
```

**Attention**: Pour comparer l'égalité, utilisez toujours `==` (double égal) et non `=` (simple égal) qui sert à affecter une valeur.

---

## Opérateurs logiques

Les opérateurs logiques permettent de combiner ou de modifier des expressions booléennes (true/false).

- `&&` : "et logique" (`a && b`) - renvoie true si les deux conditions sont vraies
- `||` : "ou logique" (`a || b`) - renvoie true si au moins une condition est vraie
- `!` : "non logique" (`!a`) - inverse la valeur booléenne (true devient false et vice versa)

Ces opérateurs sont souvent utilisés avec les opérateurs relationnels pour construire des conditions complexes.

---

## Opérateurs logiques (exemple)

```csharp
int age = 20;
string pays = "Belgique";

// ET logique - les deux conditions doivent être vraies
if (age >= 18 && pays == "Belgique") {
    Console.WriteLine("Majeur en Belgique");
}

// OU logique - au moins une condition doit être vraie
bool promotion = age < 12 || age >= 65;
Console.WriteLine($"Éligible à la promotion: {promotion}");

// NON logique - inverse la condition
bool estMineur = !(age >= 18); // équivalent à age < 18
Console.WriteLine($"Est mineur: {estMineur}");
```

---

## Opérateurs logiques (exemple suite)

```csharp
// Combinaisons complexes
if ((age >= 18 && pays == "Belgique") || (age >= 21 && pays == "USA")) {
    Console.WriteLine("Majeur selon les critères locaux");
}
```

**Évaluation à court-circuit**:
- L'opérateur `&&` n'évalue pas la seconde condition si la première est déjà fausse.
- L'opérateur `||` n'évalue pas la seconde condition si la première est déjà vraie.

---

## Opérateurs logiques bit à bit

Ces opérateurs agissent sur la représentation binaire (en bits) des nombres.

- `<<` : décalage à gauche (`a << b`) - multiplie a par 2^b
- `>>` : décalage à droite (`a >> b`) - divise a par 2^b
- `~` : négation binaire (`~a`) - inverse tous les bits
- `&` : "et binaire" (`a & b`) - bit à 1 si les deux bits correspondants sont à 1
- `|` : "ou binaire" (`a | b`) - bit à 1 si au moins un des bits correspondants est à 1
- `^` : "ou exclusif binaire" (`a ^ b`) - bit à 1 si exactement un des bits correspondants est à 1

---

## Opérateurs logiques bit à bit (exemple)

```csharp
// Représentation en bits de 5: 00000101
// Représentation en bits de 3: 00000011

int a = 5;
int b = 3;

// Décalage à gauche (multiplie par 2^n)
int decalageGauche = a << 1; // 5 * 2 = 10 (00001010)
Console.WriteLine($"5 << 1 = {decalageGauche}");

// Décalage à droite (divise par 2^n)
int decalageDroite = a >> 1; // 5 / 2 = 2 (00000010)
Console.WriteLine($"5 >> 1 = {decalageDroite}");
```

---

## Opérateurs logiques bit à bit (exemple suite)

```csharp
// ET binaire (1 si les deux bits sont 1)
int etBinaire = a & b; // 00000101 & 00000011 = 00000001 = 1
Console.WriteLine($"5 & 3 = {etBinaire}");

// OU binaire (1 si au moins un bit est 1)
int ouBinaire = a | b; // 00000101 | 00000011 = 00000111 = 7
Console.WriteLine($"5 | 3 = {ouBinaire}");

// OU exclusif (1 si un seul bit est 1)
int ouExclusif = a ^ b; // 00000101 ^ 00000011 = 00000110 = 6
Console.WriteLine($"5 ^ 3 = {ouExclusif}");

// Négation binaire (inverse tous les bits)
int negation = ~a; // ~00000101 = 11111010 (représentation complément à 2)
Console.WriteLine($"~5 = {negation}");
```

---

## Opérateurs de chaînes de caractères

Les opérateurs pour les chaînes de caractères permettent de comparer, concaténer et manipuler du texte.

- `string1 == string2` : comparaison d'égalité
- `string1 != string2` : comparaison de différence
- `string1 + string2` : concaténation (fusion) de chaînes
- `$"..."` : chaîne d'interpolation (permet d'insérer des variables dans du texte)

---

## Opérateurs de chaînes de caractères (exemple)

```csharp
string prenom = "Alice";
string nom = "Dupont";

// Concaténation
string nomComplet = prenom + " " + nom;
Console.WriteLine(nomComplet); // "Alice Dupont"

// Comparaison
bool memeNom = nom == "Dupont"; // true
Console.WriteLine($"Même nom: {memeNom}");

// Interpolation de chaîne
string presentation = $"Je m'appelle {prenom} {nom} et j'ai {25} ans.";
Console.WriteLine(presentation);
```

---

## Opérateurs de chaînes de caractères (exemple suite)

```csharp
// Autres opérations sur les chaînes (méthodes)
string majuscules = prenom.ToUpper();
Console.WriteLine(majuscules); // "ALICE"

bool contientA = prenom.Contains("A"); // true
Console.WriteLine($"Contient 'A': {contientA}");

string sousChaine = nom.Substring(0, 2);
Console.WriteLine(sousChaine); // "Du"
```

**Attention**: La comparaison des chaînes avec `==` est sensible à la casse. Pour une comparaison insensible à la casse, utilisez `string.Equals(s1, s2, StringComparison.OrdinalIgnoreCase)`.

---

## Priorité des opérateurs

La priorité des opérateurs détermine l'ordre dans lequel les expressions sont évaluées.

Du plus prioritaire au moins prioritaire:

1. Parenthèses `()`
2. Opérateurs unaires (`++`, `--`, `!`)
3. Opérateurs arithmétiques multiplicatifs (`*`, `/`, `%`)
4. Opérateurs arithmétiques additifs (`+`, `-`)
5. Opérateurs de décalage (`<<`, `>>`)
6. Opérateurs relationnels (`<`, `>`, `<=`, `>=`)
7. Opérateurs d'égalité (`==`, `!=`)
8. Opérateurs bit à bit (`&`, `|`, `^`)
9. Opérateurs logiques (`&&`, `||`)
10. Opérateurs d'affectation (`=`, `+=`, `-=`, etc.)

---

## Priorité des opérateurs (exemple)

```csharp
// Sans parenthèses - multiplication effectuée avant addition
int resultat1 = 2 + 3 * 4;
Console.WriteLine(resultat1); // 14

// Avec parenthèses - addition effectuée avant multiplication
int resultat2 = (2 + 3) * 4;
Console.WriteLine(resultat2); // 20

// Combinaison complexe
int x = 5;
int y = 3;
int z = 2;
bool test = x > y + z && !(z < 0);
Console.WriteLine($"Le test est: {test}"); // true
// évalué comme: (x > (y + z)) && (!(z < 0))
```

**Conseil**: En cas de doute sur la priorité des opérateurs, utilisez des parenthèses pour rendre votre code plus lisible et éviter les erreurs.

---

## Résumé des opérateurs

| Catégorie | Opérateurs | Utilisation |
|-----------|------------|-------------|
| Arithmétiques | `+`, `-`, `*`, `/`, `%`, `++`, `--` | Calculs mathématiques |
| Affectation | `=`, `+=`, `-=`, `*=`, `/=`, `%=` | Assigner des valeurs |
| Relationnels | `==`, `!=`, `<`, `>`, `<=`, `>=` | Comparer des valeurs |
| Logiques | `&&`, `||`, `!` | Combiner des conditions |
| Bit à bit | `&`, `|`, `^`, `~`, `<<`, `>>` | Manipuler des bits |
| Chaînes | `+`, `==`, `!=` | Manipuler du texte |

---

# Les conversions de types

---

## Les conversions de type implicite

- Les **conversions implicites** se produisent automatiquement lorsque le compilateur peut convertir une valeur d'un type à un autre **sans perte de données**.
- Exemple :
    ```csharp
    int entier = 10;
    double decimale = entier;       // int converti en double
    ```
- Un caractère peut aussi être converti en int sans perte via le code ASCII ou Unicode (char vers int).

---

## Les conversions de type explicite

- Les **conversions explicites** nécessitent une opération de conversion définie par le programmeur.  
  Cela se produit généralement lorsqu'il existe un risque de perte de données ou lorsqu'on convertit un type **plus large** vers un **plus petit**.
- Exemple :
    ```csharp
    double decimale = 10.5;
    int entier = (int)decimale;   // la valeur d'entier sera 10
    ```

---

## Les conversions numériques vers chaînes

- Pour convertir un type numérique en string, utiliser `.ToString()`.
  ```csharp
  int a = 10;
  string resultat = a.ToString();
  Console.WriteLine(resultat); // affiche "10"
  ```

---

## Les conversions chaînes vers numériques

- Utiliser `Parse()` ou `TryParse()` pour convertir une chaîne en nombre.
- `Parse()` convertit et fait "crasher" le programme en cas d'échec.
- `TryParse()` est plus sécurisé : elle essaie, ne fait pas planter, et indique si ça a réussi.

---

## Exemple avec Parse()

```csharp
int resultat;
Console.Write("Donnez une valeur : ");
string data = Console.ReadLine();
resultat = int.Parse(data);
Console.WriteLine("Vous avez écrit " + resultat);
```

---

## Exemple avec try...catch

```csharp
try
{
    string data = Console.ReadLine();
    resultat = int.Parse(data);
}
catch
{
    Console.WriteLine("invalide");
}
```

---

## Exemple avec TryParse()

```csharp
Console.Write("Donnez une valeur : ");
string data = Console.ReadLine();

if (int.TryParse(data, out int resultat))
{
    Console.WriteLine("Le nombre : " + resultat);
}
else
{
    Console.WriteLine("invalide");
}
```

---

## Débordement arithmétique

- Le débordement arithmétique se produit lorsque la valeur d'une variable dépasse la capacité max de son type.
- Exemple :
  ```csharp
  byte a = 254;
  Console.WriteLine(a); // 254
  a++; // 255
  Console.WriteLine(a); // 255
  a++; // revient à 0 (overflow)
  Console.WriteLine(a); // 0
  ```

---

## Débordement arithmétique (suite)

- Pour éviter un débordement silencieux, utiliser `checked` :
  ```csharp
  checked
  {
      byte a = 254;
      a++;
      a++;
  }
  // Génère une exception d'overflow
  ```

---

## Nombres réels et imprécision

- Les **nombres réels** (comme float et double) sont parfois imprécis à cause de la façon dont ils sont stockés en mémoire, en binaire. 
- Les ordinateurs utilisent le **système binaire** (base 2), ce qui rend difficile la représentation exacte de certains nombres décimaux (base 10), comme 0,1, donc ils sont **approximés**.

---

## Nombres réels et imprécision (exemple)

- Par exemple :
  ```csharp
  double a = 0.1;
  double b = 0.2;
  Console.WriteLine(a + b); // affiche 0,30000000000000004
  ```

- **Solution** : arrondir à l'aide de `Math.Round()`
  ```csharp
  double result = a + b;
  Console.WriteLine(Math.Round(result, 1)); // affiche 0,3
  ```

---

# Structures de contrôle

---

## Condition : if ... else

- `if` est une instruction qui permet d'exécuter un bloc de code si une condition est vraie.
- `else` permet d'exécuter un bloc si la condition est fausse, utilisé avec if.

---

## Condition : if ... else (exemple)

```csharp
if (age >= 18)
{
    Console.WriteLine("Vous êtes majeur(e)");
}
else
{
    Console.WriteLine("Vous êtes mineur(e)");
}
```

---

## Instruction switch ... case

- Le **switch** permet de choisir entre plusieurs options en fonction de la valeur d'une variable.
- Le **break** est essentiel pour terminer l'exécution d'un case et éviter que le programme n'exécute les instructions des cases suivants.

---

## Instruction switch ... case (exemple)

```csharp
switch (data)
{
    case 0:
        Console.WriteLine("Valeur 0");
        break;
    case 1:
        Console.WriteLine("Valeur 1");
        break;
    default:
        Console.WriteLine("Autre valeur");
        break;
}
```

- Ici, selon la valeur de `data`, le programme affiche un message différent.

---

## Flux de contrôle dans un switch-case

- Le programme évalue la valeur de la variable
- Il exécute le bloc de code correspondant au cas qui correspond
- Le `break` permet de sortir du switch après l'exécution du bloc
- Le `default` s'exécute si aucun cas ne correspond

---

## Boucles

Les boucles permettent d'exécuter un bloc de code plusieurs fois.

---

## Boucle for

Utilisée lorsque le nombre d'itérations est connu à l'avance.

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
```

---

## Boucle while

Répète tant qu'une condition est vraie, testée AVANT chaque itération.

```csharp
int i = 0;
while (i < 5)
{
    Console.WriteLine(i);
    i++;
}
```

---

## Boucle do...while

Comme while, mais la condition est vérifiée APRES l'exécution du bloc (donc le bloc s'exécute au moins une fois).

```csharp
int i = 0;
do
{
    Console.WriteLine(i);
    i++;
} while (i < 5);
```

---

## Boucle foreach

Utilisée pour parcourir les éléments d'une collection (tableau, liste) sans se soucier de l'index.

```csharp
string[] mois = new string[] { "janvier", "février" };
foreach (string data in mois)
{
    Console.WriteLine(data);
}
```

---

## Comparaison des boucles

- **for** : Quand vous connaissez le nombre exact d'itérations
- **while** : Quand vous ne savez pas combien de fois vous devez itérer
- **do-while** : Quand vous voulez que le bloc s'exécute au moins une fois
- **foreach** : Pour parcourir tous les éléments d'une collection

---

## Instructions de contrôle de flux

- **break** : Sort immédiatement de la boucle ou du switch
- **continue** : Passe directement à la prochaine itération de la boucle
- **return** : Sort de la méthode actuelle (et renvoie une valeur si nécessaire)

---

# Méthodes des Types Natifs

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

# Organisation de la Mémoire

---

## La pile (stack)

1. La pile est organisée sous la forme **LIFO** (Last In First Out) : le dernier élément ajouté est le premier retiré (comme une pile de livres).
2. On y stocke les types de données **simples** (`int`, `char`, `bool`), avec taille fixe et connue.
3. **Gestion du programme** : la pile contient des informations comme les variables locales de fonctions. Quand une fonction est appelée, ses variables sont ajoutées à la pile.

---

## La pile (stack) - suite

4. **Arguments des fonctions** : les valeurs passées à une fonction y sont aussi stockées localement.
5. **Taille limitée** : souvent ~1Mo. Dépasser donne un "dépassement de pile".

**Attention**: Une erreur de type "Stack Overflow" (débordement de pile) se produit quand la pile est pleine, souvent à cause d'une récursion infinie ou trop profonde.

---

## Le tas (heap)

1. Utilisé pour stocker les **données grandes et complexes** (tableaux, objets).
2. **Taille flexible** : pas de limite stricte.
3. **Distingué par "new"** : on range sur le tas en créant des objets avec `new`.
4. **Nettoyage automatique** via le **garbage collector (GC)** : quand des données ne sont plus utilisées, GC les libère.

```csharp
int[] data = new int[20]; // référence data sur la pile, tableau sur le tas
```

---

## Le garbage collector

- Tant qu'une donnée sur le tas est référencée, elle ne sera pas supprimée.
- Dès qu'elle n'est plus référencée, elle peut être libérée par le GC.
- L'appel au GC est **automatique** mais peut être forcé :
  ```csharp
  int[] data = new int[20];
  data = null; // plus référencé
  GC.Collect(); // appel forcé au GC
  ```

---

## Les références multiples

- Plusieurs variables peuvent pointer vers le même objet sur le tas. L'objet reste en mémoire tant qu'une référence y pointe.
- Mettre une variable à `null` ne supprime pas l'objet s'il est encore référencé ailleurs.

```csharp
int[] data1 = new int[20];
int[] data2 = data1;
data1 = null;
GC.Collect(); // tableau reste car data2 le pointe
Console.WriteLine(data2[17]);
```

---

## Organisation de la mémoire en C#

- Les variables simples (types valeur) sont stockées sur la pile
- Les objets complexes sont créés sur le tas
- Les variables de type référence sur la pile contiennent une adresse mémoire vers le tas

---

## Vue conceptuelle de l'allocation mémoire

**Stack (Pile)**:
- Variables types valeur (int, bool, char...)
- Variables types référence (contiennent des adresses)

**Heap (Tas)**:
- Objets
- Tableaux
- Classes
- Chaînes de caractères

Les variables de type référence pointent vers des objets dans le tas.

---

## Implications pour la programmation

- **Variables valeur** (stockées sur la pile) sont plus rapides d'accès
- **Variables référence** (pointant vers le tas) sont plus flexibles pour des données complexes
- Comprendre cette organisation aide à debugger les problèmes de mémoire
- Le mécanisme de "passage par référence" vs "passage par valeur" s'explique par cette organisation

---

# Tableaux et collections

---

## Les tableaux

- Un **tableau** est une collection d'éléments du même type. L'accès se fait par **index**.
- **Déclaration** :
  ```csharp
  int[] data = new int[20];
  string[] mois = new string[] { "janvier", "février" };
  ```
- **Index** : commence à 0 (`data[0]` pour le premier élément).
- Modifier un élément par l'index : `data[1] = 25;`

---

## Les tableaux (suite)

- **Attention** : l'index ne doit **jamais** dépasser la taille du tableau.
- Pour la taille d'un tableau :  
  `data.Length`

**Conseil**: `var` est à éviter pour déclarer un tableau pour des raisons de clarté.

---

## Les tableaux à plusieurs dimensions

- Un tableau à deux dimensions a un nombre fixe de lignes et de colonnes.

```csharp
// Tableau 2D (3 lignes x 4 colonnes)
int[,] matrice = new int[3, 4];
matrice[0, 0] = 1;  // Première ligne, première colonne
```

---

## Les tableaux à plusieurs dimensions (suite)

- Tableaux 3D ou plus:
```csharp
int[,,] cube = new int[3, 4, 5];
cube[0, 0, 0] = 1;  // Coordonnées x=0, y=0, z=0
```

- Tableaux de tableaux ("jagged array") - tailles variables:
```csharp
int[][] irregulier = new int[3][];
irregulier[0] = new int[4];
irregulier[1] = new int[2];
irregulier[2] = new int[5];
```

---

## Les tableaux à plusieurs dimensions (suite)

- Pour connaître le nombre de dimensions : `tab.Rank`
- Pour la taille d'une dimension : `tab.GetLength(0)`

---

## Les tuples

- Un **tuple** est une collection d'éléments de différents types. Contrairement aux tableaux qui contiennent des éléments du même type, un tuple peut stocker plusieurs types. La taille du tuple est fixée à la création.

**Syntaxe :**  
```csharp
(Type1, Type2, ...) monTuple = (valeur1, valeur2, ...);
```

---

## Les tuples (suite)

- On peut donner des noms aux valeurs :
  ```csharp
  (int age, string nom) personne = (age: 30, nom: "Alice");
  ```
- On peut accéder par position : `personne.Item1`
- Ou par nom : `personne.nom`

---

## Les collections

- Une **collection** est une structure de données pouvant contenir des éléments du même type.
- Types de collections en C# :
  - Tableaux (`[]`)
  - Listes (`List`)
  - Ensembles (`Set`)
  - Maps (`HashMap`)
  - ...

---

## Les listes

- Une **liste** en C# est une collection d'éléments du même type, dynamique (on peut ajouter ou supprimer des éléments facilement).
- Création :
  ```csharp
  List<int> liste = new List<int>();
  List<string> liste = new List<string>();
  ```

---

## Les listes (suite)

- Les chevrons `< >` indiquent le type d'éléments.
- Ajouter/retirer :  
  ```csharp
  maListe.Add(42);
  maListe.Remove(42);
  ```
- Accès :  
  `maListe[0]`  
  Nombre d'éléments : `maListe.Count`

---

## Parcourir une liste

- Avec une boucle `for` :
  ```csharp
  for (int i = 0; i < maListe.Count; i++)
  {
      // faire qqch avec maListe[i]
  }
  ```
- Avec une boucle `foreach` :
  ```csharp
  foreach (int item in maListe)
  {
      // faire qqch avec item
  }
  ```

---

## Liste VS Tableau

|     | Liste                       | Tableau                        |
|-----|-----------------------------|--------------------------------|
| 1   | taille dynamique            | taille fixe                    |
| 2   | créé avec `List<T>`         | créé avec `T[]`                |
| 3   | Add(), Remove(), Contains() | pas vraiment de méthodes dispo |
| 4   | légèrement plus lent        | plus rapide (performance)      |
| 5   | modifs fréquentes, flexible | mieux quand taille/contenu const. |

---

## Représentation visuelle des collections

### Tableau à une dimension  

```csharp
int[] data = new int[3] { 15, 25, 35 };
```

| Index | Valeur |
|-------|--------|
| 0     | 15     |
| 1     | 25     |
| 2     | 35     |

---

## Représentation visuelle des collections

### Tableau à deux dimensions 

```csharp 
int[,] data = new int[3, 2] { { 10, 20 }, { 30, 40 }, { 50, 60 } };
```

|         | Colonne 0 | Colonne 1 |
|---------|-----------|-----------|
| Ligne 0 |    10     |    20     |
| Ligne 1 |    30     |    40     |
| Ligne 2 |    50     |    60     |

---

## Représentation visuelle des collections

### Jagged array (tableau irrégulier)

```csharp 
int[][] data = new int[3][] { 
    new int[2] { 10, 20 }, 
    new int[3] { 30, 40, 50 }, 
    new int[1] { 60 } 
}; 
```

- Un tableau principal contient 3 tableaux de tailles différentes
- Premier tableau: 2 éléments [10, 20]
- Deuxième tableau: 3 éléments [30, 40, 50]
- Troisième tableau: 1 élément [60]

---

## Représentation visuelle des collections

### Liste 

```csharp
List<int> data = new List<int>() { 15, 25, 35 };
```

- Une liste est similaire à un tableau mais peut changer de taille
- Éléments: [15, 25, 35]
- Peut continuer à s'agrandir avec Add() ou se réduire avec Remove()

---

## Quelques fonctions utiles

- `a.CompareTo(b)` : Compare deux chaînes ou objets (renvoie 0 si égal, <0 si a < b, >0 si a > b).
- `string[] mots = phrase.Split(' ')` : sépare une chaîne et place les éléments dans un tableau.
- `DateTime.Now.Year` : donne l'année en cours.
- `string.Join(",", numbers)` : crée une chaîne avec les éléments d'une liste séparés par des virgules.

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

## LINQ : Points clés

✅ **Where()** : filtrer des éléments selon une condition
✅ **Select()** : transformer chaque élément
✅ **OrderBy()** : trier les éléments
✅ **Count(), Sum(), Average()** : calculs statistiques
✅ **Chaînage** : combiner plusieurs opérations
✅ **ToList()** : matérialiser le résultat

**N'oubliez pas** : `using System.Linq;` !

---

# Les fonctions

---

## Concept de base

- Une **fonction** est un bloc d'instructions qui porte un nom, qui peut prendre des **paramètres** (int, char, string, ...) en entrée et peut renvoyer une **valeur** en sortie.

---

## Définition d'une fonction

### Exemple de signature simple

```csharp
void Affiche(string texte)
{
    Console.WriteLine(texte);
}
```

Pour appeler cette fonction :
```csharp
Affiche("Bonjour");
```

---

## Définition d'une fonction

### Avec plusieurs paramètres

```csharp
void AfficheNFois(string texte, int nb)
{
    for (int i = 0; i < nb; i++)
    {
        Console.WriteLine(texte);
    }
}
```

Pour appeler cette fonction :
```csharp
AfficheNFois("Bonjour", 4);
```

---

## Fonction avec valeur de retour

Une fonction peut **renvoyer une valeur** avec `return` :
```csharp
int Somme(int a, int b)
{
    int resultat = a + b;
    return resultat;
}
```

Pour utiliser la valeur renvoyée :
```csharp
int total = Somme(5, 3);
Console.WriteLine(total);  // Affiche 8
```

---

## Le passage de paramètres

### Par valeur

La fonction reçoit une **copie** du paramètre, les modifications sont locales seulement.

```csharp
void Increment(int nombre)
{
    nombre++;  // Modification locale uniquement
    Console.WriteLine("Dans la fonction : " + nombre);
}

int x = 5;
Increment(x);
Console.WriteLine("Après appel : " + x);  // Affiche toujours 5
```

---

## Le passage de paramètres

### Par référence

La variable locale et le paramètre partagent la même instance. On utilise `ref` ou `out`.

```csharp
void Increment(ref int nombre)
{
    nombre++;  // Modifie la variable d'origine
}

int x = 5;
Increment(ref x);
Console.WriteLine(x);  // Affiche 6
```

---

## Visualisation du passage de paramètres

**Passage par valeur**:
- Appelant: x = 5
- Copie vers paramètre
- Fonction: nombre = 5
- Fonction: nombre++ = 6
- Appelant: x reste 5

**Passage par référence**:
- Appelant: x = 5
- Référence vers paramètre
- Fonction: nombre = 5
- Fonction: nombre++ = 6
- Appelant: x devient 6

---

## Types valeur vs types référence

Les comportements du passage de paramètres varient selon qu'il s'agit de types valeur (int, bool, struct...) ou de types référence (objets, tableaux, chaînes...).

---

## Types valeur : passage par valeur vs référence

**Type valeur par valeur**:
- Appelant: int x = 5
- Fonction: int nombre = 5 (copie)
- Fonction: nombre devient 6
- Appelant: x reste 5

**Type valeur par référence**:
- Appelant: int y = 5
- Fonction: ref int nombre = 5
- Fonction: nombre devient 6
- Appelant: y devient 6

---

## Types référence : passage par valeur vs référence

**Type référence par valeur**:
- Stack: int[] arr = [1,2,3]
- Stack: int[] param (copie de référence)
- Les deux pointent vers le même tableau dans le Heap
- Modifications du tableau visibles après l'appel

**Type référence par référence**:
- Permet de changer la référence elle-même
- Peut faire pointer arr vers un nouveau tableau

---

## Exemple concret avec tableau

```csharp
// Modification du tableau original
void ModifierTableau(int[] param)
{
    param[2] = 9;  // Modifie le tableau original
}

// Création d'un nouveau tableau
void ModifierNouveauTableau(int[] param)
{
    int[] nouveauArr = new int[] {param[0], param[1], 9};
    // nouveauArr pointe vers un nouveau tableau
    // param n'est pas modifié
}

// Dans le programme principal
int[] arr = new int[] {1, 2, 3};
ModifierTableau(arr);
Console.WriteLine(arr[2]);  // Affiche 9 (modifié)

arr = new int[] {1, 2, 3};
ModifierNouveauTableau(arr);
Console.WriteLine(arr[2]);  // Affiche 3 (non modifié)
```

---

## Points importants à retenir

1. **Types valeur** (int, bool, char, struct...) :
   - Passés par valeur : la fonction reçoit une copie, les modifications sont locales
   - Passés par référence (ref/out) : la fonction modifie la variable originale

2. **Types référence** (tableaux, objets, listes...) :
   - Passés par valeur : la fonction reçoit une copie de la référence, mais peut modifier l'objet original
   - Passés par référence (ref/out) : la fonction peut changer la référence elle-même

---

## Quand utiliser le passage par référence ?

- Pour modifier plusieurs valeurs dans une fonction
- Pour éviter la copie de grandes structures de données
- Pour retourner plusieurs valeurs depuis une fonction

---

## Exemple avec out

```csharp
void CalculerStatistiques(int[] donnees, out double moyenne, out double ecartType)
{
    moyenne = donnees.Average();
    
    double sommeCarres = 0;
    foreach (int valeur in donnees)
    {
        sommeCarres += Math.Pow(valeur - moyenne, 2);
    }
    
    ecartType = Math.Sqrt(sommeCarres / donnees.Length);
}

// Utilisation:
int[] mesures = new int[] {5, 7, 9, 12, 15};
double moy, ecart;
CalculerStatistiques(mesures, out moy, out ecart);
Console.WriteLine($"Moyenne: {moy}, Écart-type: {ecart}");
```

---

## Exemple avec out (simple)

```csharp
void ObtenirDonnees(out int valeur)
{
    valeur = 42;  // Doit assigner une valeur
}

int resultat;
ObtenirDonnees(out resultat);
Console.WriteLine(resultat);  // Affiche 42
```

**Différence entre ref et out**:
- `ref` : la variable doit être initialisée avant l'appel
- `out` : la variable peut ne pas être initialisée, mais doit recevoir une valeur dans la fonction

---

## Paramètres optionnels

```csharp
void Message(string texte, bool majuscules = false)
{
    if (majuscules)
    {
        Console.WriteLine(texte.ToUpper());
    }
    else
    {
        Console.WriteLine(texte);
    }
}
```

Utilisation :
```csharp
Message("Hello");  // Paramètre optionnel non fourni
Message("Hello", true);  // Paramètre optionnel fourni
```

---

## Surcharge de fonction

La **surcharge** permet de définir plusieurs fonctions avec le même nom mais des paramètres différents.

```csharp
int Addition(int a, int b)
{
    return a + b;
}

double Addition(double a, double b)
{
    return a + b;
}
```

Le compilateur choisit automatiquement la bonne fonction selon les types des arguments.

---

## Fonctions récursives

Une fonction **récursive** s'appelle elle-même.

```csharp
int Factorielle(int n)
{
    if (n <= 1)
        return 1;
    else
        return n * Factorielle(n - 1);
}
```

**Attention**: Les fonctions récursives doivent toujours avoir une condition de sortie pour éviter un débordement de pile.

---

## Fonctions anonymes et expressions lambda

Les fonctions anonymes et expressions lambda permettent de définir des fonctions sans nom.

```csharp
// Fonction anonyme
Func<int, int, int> addition = delegate(int a, int b) { return a + b; };

// Expression lambda équivalente
Func<int, int, int> addition = (a, b) => a + b;

Console.WriteLine(addition(5, 3));  // Affiche 8
```

---

# Gestion des Exceptions

## Programmation C# - BA1
### Chapitre 9

---

## Plan du chapitre

1. **Introduction aux exceptions**
2. **Types d'exceptions courantes**
3. **Structure try-catch**
4. **Multiples blocs catch**
5. **Le bloc finally**
6. **Lancer des exceptions (throw)**
7. **Bonnes pratiques**
8. **Exemple complet**

---

## Qu'est-ce qu'une exception ?

> Une **exception** est un événement qui interrompt le flux normal d'exécution d'un programme

### 🚗 Analogie
- **Sans gestion** : Vous foncez dans l'obstacle
- **Avec gestion** : Vous prenez un détour prévu

### Objectifs
- **Robustesse** : Programme continue malgré les erreurs
- **UX** : Messages clairs au lieu de plantages
- **Maintenance** : Code plus facile à déboguer

---

## Types d'exceptions courantes

### 📊 Données
- `FormatException` : Conversion impossible
- `OverflowException` : Dépassement numérique
- `ArgumentException` : Argument invalide

### 📁 Ressources
- `FileNotFoundException` : Fichier introuvable
- `UnauthorizedAccessException` : Accès refusé

### 🧮 Logiques
- `DivideByZeroException` : Division par zéro
- `IndexOutOfRangeException` : Index hors limites
- `NullReferenceException` : Objet null

---

## Structure try-catch basique

```csharp
try
{
    // Code qui peut lever une exception
    int resultat = int.Parse("abc");
}
catch (FormatException)
{
    // Code exécuté si FormatException
    Console.WriteLine("Erreur : format invalide !");
}
```

### ✅ Le programme continue au lieu de planter !

---

## Exemple : Division sécurisée

```csharp
try
{
    Console.Write("Premier nombre : ");
    double a = double.Parse(Console.ReadLine());
    
    Console.Write("Second nombre : ");
    double b = double.Parse(Console.ReadLine());
    
    if (b == 0)
        throw new DivideByZeroException("Division par zéro !");
    
    Console.WriteLine($"Résultat : {a / b}");
}
catch (FormatException)
{
    Console.WriteLine("Erreur : nombres invalides");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Erreur : {ex.Message}");
}
```

---

## Multiples blocs catch

### ⚠️ ORDRE IMPORTANT
**Du plus spécifique au plus général !**

```csharp
try
{
    int[] nombres = { 1, 2, 3 };
    int index = int.Parse(Console.ReadLine());
    Console.WriteLine(nombres[index]);
}
catch (FormatException)           // Spécifique
{
    Console.WriteLine("Index doit être un nombre");
}
catch (IndexOutOfRangeException)  // Spécifique
{
    Console.WriteLine("Index hors limites");
}
catch (Exception ex)              // Général (toujours en dernier)
{
    Console.WriteLine($"Erreur : {ex.Message}");
}
```

---

## Récupérer les détails

```csharp
try
{
    int resultat = int.Parse("invalid");
}
catch (FormatException ex)
{
    Console.WriteLine($"Message : {ex.Message}");
    Console.WriteLine($"Type : {ex.GetType().Name}");
    Console.WriteLine($"Stack trace : {ex.StackTrace}");
}
```

### Informations utiles pour le débogage ! 🐛

---

## Le bloc finally

> **finally** s'exécute **TOUJOURS**, exception ou pas

```csharp
FileStream fichier = null;
try
{
    fichier = new FileStream("data.txt", FileMode.Open);
    // Traitement du fichier
}
catch (FileNotFoundException)
{
    Console.WriteLine("Fichier non trouvé");
}
finally
{
    // TOUJOURS exécuté
    if (fichier != null)
    {
        fichier.Close();
        Console.WriteLine("Fichier fermé proprement");
    }
}
```

---

## Ordre d'exécution

```csharp
try
{
    Console.WriteLine("1. Dans try");
    throw new Exception("Test");
    Console.WriteLine("2. Jamais exécuté");
}
catch (Exception)
{
    Console.WriteLine("3. Dans catch");
}
finally
{
    Console.WriteLine("4. Dans finally (TOUJOURS)");
}
Console.WriteLine("5. Après try-catch-finally");
```

**Sortie :**
```
1. Dans try
3. Dans catch
4. Dans finally (TOUJOURS)
5. Après try-catch-finally
```

---

## Lancer des exceptions (throw)

### Créer une exception
```csharp
static double CalculerRacine(double nombre)
{
    if (nombre < 0)
    {
        throw new ArgumentException(
            "Impossible de calculer la racine d'un nombre négatif");
    }
    return Math.Sqrt(nombre);
}
```

### Relancer une exception
```csharp
catch (FileNotFoundException ex)
{
    LogError(ex);  // Enregistrer l'erreur
    throw;         // Relancer (préserve la stack trace)
}
```

---

## ❌ Mauvaises pratiques

### 1. Ignorer les exceptions
```csharp
try
{
    int.Parse("invalid");
}
catch
{
    // Ne rien faire - DANGEREUX !
}
```

### 2. Trop général
```csharp
try
{
    // Code complexe
}
catch (Exception ex)
{
    // Gère tout pareil
}
```

---

## ✅ Bonnes pratiques

### 1. Messages informatifs
```csharp
// ❌ Peu utile
throw new Exception("Erreur");

// ✅ Descriptif
throw new ArgumentException(
    $"La valeur {valeur} n'est pas valide. Doit être entre 1 et 100.");
```

### 2. Ne pas utiliser pour le contrôle de flux
```csharp
// ❌ Mauvais
try { return int.Parse(input); }
catch { return 0; }

// ✅ Bon
if (int.TryParse(input, out int result))
    return result;
return 0;
```

---

## Exemple complet : Calculatrice robuste

```csharp
static void Main()
{
    try
    {
        double a = LireNombre("Premier nombre : ");
        char op = LireOperation("Opération : ");
        double b = LireNombre("Second nombre : ");
        
        double resultat = Calculer(a, op, b);
        Console.WriteLine($"{a} {op} {b} = {resultat}");
    }
    catch (FormatException)
    {
        Console.WriteLine("❌ Format invalide");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("❌ Division par zéro");
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"❌ {ex.Message}");
    }
}
```

---

## Exceptions personnalisées

```csharp
public class AgeInvalideException : Exception
{
    public int Age { get; }
    
    public AgeInvalideException(int age) 
        : base($"L'âge {age} n'est pas valide (0-150)")
    {
        Age = age;
    }
}

// Utilisation
static void ValiderAge(int age)
{
    if (age < 0 || age > 150)
        throw new AgeInvalideException(age);
}
```

---

## Debugging avec les exceptions

### Stack trace exemple
```
System.FormatException: Input string was not in a correct format.
   at System.Number.ThrowOverflowOrFormatException(...)
   at System.Number.ParseInt32(...)
   at System.Int32.Parse(String s)
   at Program.Main() in Program.cs:line 12
```

**Lecture :** L'erreur vient de la ligne 12 dans Main() → Int32.Parse → ...

### 🔍 La stack trace indique exactement où l'erreur s'est produite !

---

## Structure complète

```csharp
try
{
    // Code qui peut lever une exception
}
catch (TypeException1 ex)
{
    // Gestion spécifique
}
catch (TypeException2)
{
    // Gestion sans récupération des détails
}
catch (Exception ex)
{
    // Gestion générale (toujours en dernier)
}
finally
{
    // Code de nettoyage (optionnel, toujours exécuté)
}
```

---

## Points clés à retenir

### ✅ À faire
- **try-catch** pour le code risqué
- **Exceptions spécifiques** avant les générales  
- **Messages informatifs** pour le débogage
- **finally** pour le nettoyage
- **throw** pour vos propres erreurs

### ❌ À éviter
- Ignorer les exceptions
- Utiliser pour le contrôle de flux normal
- Messages d'erreur vagues

---

## Quand utiliser les exceptions ?

### ✅ Utilisez pour
- Erreurs **exceptionnelles** (fichier manquant, réseau coupé)
- Validation d'arguments de méthodes
- Ressources indisponibles

### ❌ N'utilisez pas pour
- Le flux de contrôle **normal**
- Validations d'entrée utilisateur courantes
- Code critique en performance

### 🎯 **Règle d'or :** Les exceptions sont pour les situations *exceptionnelles* !

---

## Récapitulatif

### La gestion des exceptions rend vos programmes :
- 🛡️ **Robustes** : Résistent aux erreurs
- 🎯 **Professionnels** : Messages clairs
- 🔧 **Maintenables** : Faciles à déboguer
- 👥 **Conviviaux** : Expérience utilisateur fluide

### 💡 **Prochaines étapes**
Chapitre 10 : Gestion des fichiers (où les exceptions sont cruciales !)

---

## Questions ?

### 🤔 Pensez aux erreurs possibles dans vos programmes
### 🛠️ Ajoutez une gestion d'exceptions appropriée
### 🎯 Rendez vos applications plus robustes !

**Merci pour votre attention ! 👏**

---

# Chapitre 10 : Gestion des Fichiers

## Introduction à la manipulation des fichiers en C#

---

## Classes principales

- **`File`** : Opérations sur les fichiers
- **`Directory`** : Opérations sur les dossiers  
- **`Path`** : Manipulation des chemins
- **`FileInfo`** : Informations détaillées sur un fichier
- **`DirectoryInfo`** : Informations détaillées sur un dossier

---

## Lecture de fichiers

### Lire toutes les lignes

```csharp
string[] lignes = File.ReadAllLines(@"C:\temp\fichier.txt");
Console.WriteLine($"Le fichier contient {lignes.Length} lignes");

foreach (string ligne in lignes)
{
    Console.WriteLine(ligne);
}
```

---

## Lecture ligne par ligne

```csharp
using (StreamReader lecteur = new StreamReader(cheminFichier))
{
    string ligne;
    int numeroLigne = 1;
    
    while ((ligne = lecteur.ReadLine()) != null)
    {
        Console.WriteLine($"Ligne {numeroLigne}: {ligne}");
        numeroLigne++;
    }
}
```

**Avantage** : Économise la mémoire pour les gros fichiers

---

## Écriture de fichiers

### Écrire toutes les lignes

```csharp
string[] lignes = {
    "Première ligne",
    "Deuxième ligne",
    "Date: " + DateTime.Now.ToString()
};

File.WriteAllLines(@"C:\temp\fichier.txt", lignes);
```

---

## Ajouter du contenu

```csharp
// Ajouter une ligne
File.AppendAllText(@"C:\temp\fichier.txt", 
                   "\nNouvelle ligne: " + DateTime.Now);

// Écrire ligne par ligne avec contrôle
using (StreamWriter ecrivain = new StreamWriter(fichier, append: true))
{
    ecrivain.WriteLine("Ligne 1");
    ecrivain.WriteLine("Ligne 2");
}
```

---

## Manipulation des chemins

### Construction sécurisée avec Path

```csharp
// ✅ Correct
string chemin = Path.Combine(@"C:\temp", "fichier.txt");

// Extraire les composants
string nomFichier = Path.GetFileName(chemin);
string extension = Path.GetExtension(chemin);
string dossier = Path.GetDirectoryName(chemin);
string nomSansExt = Path.GetFileNameWithoutExtension(chemin);
```

---

## Parcourir un dossier

### Lister fichiers et dossiers

```csharp
string dossier = @"C:\temp";

// Lister les fichiers
string[] fichiers = Directory.GetFiles(dossier);
foreach (string fichier in fichiers)
{
    Console.WriteLine($"📄 {Path.GetFileName(fichier)}");
}

// Lister les sous-dossiers
string[] sousDossiers = Directory.GetDirectories(dossier);
foreach (string sousDossier in sousDossiers)
{
    Console.WriteLine($"📁 {Path.GetFileName(sousDossier)}");
}
```

---

## Parcours récursif

```csharp
static void ParcoursRecursif(string dossier, int niveau = 0)
{
    string indentation = new string(' ', niveau * 2);
    
    // Afficher les fichiers
    foreach (string fichier in Directory.GetFiles(dossier))
    {
        Console.WriteLine($"{indentation}📄 {Path.GetFileName(fichier)}");
    }
    
    // Parcourir les sous-dossiers
    foreach (string sousDossier in Directory.GetDirectories(dossier))
    {
        Console.WriteLine($"{indentation}📁 {Path.GetFileName(sousDossier)}/");
        ParcoursRecursif(sousDossier, niveau + 1);
    }
}
```

---

## Informations sur les fichiers

```csharp
FileInfo info = new FileInfo(cheminFichier);

Console.WriteLine($"Nom: {info.Name}");
Console.WriteLine($"Taille: {info.Length} octets");
Console.WriteLine($"Créé le: {info.CreationTime}");
Console.WriteLine($"Modifié le: {info.LastWriteTime}");
Console.WriteLine($"Lecture seule: {info.IsReadOnly}");

// Calculer l'âge
TimeSpan age = DateTime.Now - info.LastWriteTime;
Console.WriteLine($"Âge: {age.Days} jours");
```

---

## Informations sur les dossiers

```csharp
DirectoryInfo info = new DirectoryInfo(cheminDossier);

Console.WriteLine($"Nom: {info.Name}");
Console.WriteLine($"Chemin: {info.FullName}");
Console.WriteLine($"Parent: {info.Parent?.Name}");

// Compter le contenu
int fichiers = Directory.GetFiles(cheminDossier).Length;
int dossiers = Directory.GetDirectories(cheminDossier).Length;

Console.WriteLine($"Fichiers: {fichiers}");
Console.WriteLine($"Dossiers: {dossiers}");
```

---

## Copier et déplacer

```csharp
// Copier un fichier
File.Copy(source, destination);

// Déplacer un fichier
File.Move(source, destination);

// Créer un dossier
Directory.CreateDirectory(cheminDossier);

// Supprimer un fichier
File.Delete(cheminFichier);

// Supprimer un dossier (vide)
Directory.Delete(cheminDossier);

// Supprimer un dossier et son contenu
Directory.Delete(cheminDossier, recursive: true);
```

---

## Rechercher des fichiers

```csharp
// Recherche simple
string[] fichiersTxt = Directory.GetFiles(@"C:\temp", "*.txt");

// Recherche récursive
string[] tousLesPdf = Directory.GetFiles(@"C:\temp", "*.pdf", 
                                        SearchOption.AllDirectories);

// Recherche avec motif
string[] rapports = Directory.GetFiles(@"C:\temp", "rapport*");

foreach (string fichier in fichiersTxt)
{
    Console.WriteLine(Path.GetFileName(fichier));
}
```

---

## Gestion des erreurs

```csharp
try
{
    string contenu = File.ReadAllText(cheminFichier);
    Console.WriteLine(contenu);
}
catch (FileNotFoundException)
{
    Console.WriteLine("Fichier non trouvé!");
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("Accès refusé!");
}
catch (IOException ex)
{
    Console.WriteLine($"Erreur d'E/S: {ex.Message}");
}
```

---

## Bonnes pratiques

### 1. Toujours vérifier l'existence
```csharp
if (File.Exists(cheminFichier))
{
    // Traiter le fichier
}
```

### 2. Utiliser `using` pour les ressources
```csharp
using (StreamReader lecteur = new StreamReader(fichier))
{
    // Utilisation du lecteur
} // Automatiquement fermé
```

---

## Bonnes pratiques (suite)

### 3. Utiliser Path.Combine
```csharp
// ✅ Correct
string chemin = Path.Combine(dossier, fichier);

// ❌ Éviter
string chemin = dossier + "\\" + fichier;
```

### 4. Gérer les gros fichiers
```csharp
// Pour les petits fichiers
string[] lignes = File.ReadAllLines(fichier);

// Pour les gros fichiers
using (StreamReader lecteur = new StreamReader(fichier))
{
    // Lecture ligne par ligne
}
```

---

## Exemple pratique : Gestionnaire de logs

```csharp
static void EcrireLog(string message)
{
    string fichierLog = Path.Combine(@"C:\temp", "app.log");
    string entree = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}";
    
    File.AppendAllLines(fichierLog, new[] { entree });
}

static void LireLogs()
{
    string fichierLog = Path.Combine(@"C:\temp", "app.log");
    
    if (File.Exists(fichierLog))
    {
        string[] lignes = File.ReadAllLines(fichierLog);
        foreach (string ligne in lignes)
        {
            Console.WriteLine(ligne);
        }
    }
}
```

---

## Exemple : Organisateur de fichiers

```csharp
static void OrganiserParExtension(string dossier)
{
    foreach (string fichier in Directory.GetFiles(dossier))
    {
        string extension = Path.GetExtension(fichier).ToLower();
        
        if (!string.IsNullOrEmpty(extension))
        {
            string dossierExtension = Path.Combine(dossier, 
                                      extension.Substring(1).ToUpper());
            
            Directory.CreateDirectory(dossierExtension);
            
            string destination = Path.Combine(dossierExtension, 
                                             Path.GetFileName(fichier));
            File.Move(fichier, destination);
        }
    }
}
```

---

## Surveillance de fichiers

```csharp
FileSystemWatcher surveillant = new FileSystemWatcher();
surveillant.Path = @"C:\temp";
surveillant.Filter = "*.txt";

surveillant.Created += (sender, e) => 
    Console.WriteLine($"Créé: {e.Name}");
surveillant.Changed += (sender, e) => 
    Console.WriteLine($"Modifié: {e.Name}");
surveillant.Deleted += (sender, e) => 
    Console.WriteLine($"Supprimé: {e.Name}");

surveillant.EnableRaisingEvents = true;
```

---

## Exercices pratiques

1. **Gestionnaire de journaux** : Système d'écriture/lecture de logs avec filtrage par date

2. **Organisateur de fichiers** : Classer automatiquement les fichiers par extension

3. **Analyseur de texte** : Compter mots, lignes, caractères dans un fichier

4. **Système de sauvegarde** : Copier et archiver des fichiers avec vérification

5. **Recherche de fichiers** : Outil de recherche avec filtres multiples

---

## Récapitulatif

- **File** : Lecture/écriture de fichiers
- **Directory** : Manipulation de dossiers
- **Path** : Construction sécurisée de chemins
- **FileInfo/DirectoryInfo** : Informations détaillées
- **StreamReader/StreamWriter** : Lecture/écriture optimisée
- **Gestion d'erreurs** : try-catch obligatoire
- **using** : Libération automatique des ressources

La gestion des fichiers est essentielle pour créer des applications robustes et utiles !
