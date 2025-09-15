# Les variables et types de données en C#

## Pourquoi des variables et des types ?

En programmation, une **variable** permet de stocker temporairement une information en mémoire pour pouvoir la manipuler. Le **type** d'une variable précise la nature de cette information (nombre, texte, etc.) et les opérations possibles.

> **À retenir** : Le choix du type influence la mémoire utilisée et les opérations autorisées.

---

## 1. Les variables de type valeur

Les **types valeur** stockent directement la donnée. Ils sont utilisés pour les informations simples : nombres, caractères, booléens…

- **Déclaration** : création de la variable.
- **Assignation** : donner une valeur à la variable.

**Exemple** :
```csharp
int age = 20; // déclaration + assignation
```

**Types valeur principaux** : `int`, `byte`, `short`, `long`, `sbyte`, `ushort`, `uint`, `ulong`, `float`, `decimal`, `double`, `char`, `bool`.

> **Attention** : Les types valeur contiennent la donnée elle-même, pas une référence.

**Pourquoi pas string ?**
- Un `string` est un objet : il contient une référence vers la chaîne de caractères en mémoire, pas la chaîne elle-même.

---

## 2. Les variables de type référence

Les **types référence** stockent une adresse (référence) vers la donnée réelle, qui se trouve ailleurs en mémoire. C’est le cas des objets, tableaux, chaînes de caractères…

- **Exemple** :
```csharp
string nom = "Alice"; // nom référence la chaîne "Alice"
int[] notes = new int[3]; // notes référence un tableau d'entiers
```

**Types référence principaux** : `string`, tout ce qui est créé avec `new` (tableaux, listes, objets personnalisés…)

> **Astuce** : En programmation orientée objet, on manipule surtout des types référence.

---

## 3. Tableaux des principaux types C#

### Types numériques entiers

| Alias C# | Plage de valeurs                | Taille   |
|----------|---------------------------------|----------|
| byte     | 0 à 255                         | 1 octet  |
| sbyte    | -128 à 127                      | 1 octet  |
| short    | -32 768 à 32 767                | 2 octets |
| ushort   | 0 à 65 535                      | 2 octets |
| int      | -2 147 483 648 à 2 147 483 647  | 4 octets |
| uint     | 0 à 4 294 967 295               | 4 octets |
| long     | -9 223 372 036 854 775 808 à 9 223 372 036 854 775 807 | 8 octets |
| ulong    | 0 à 18 446 744 073 709 551 615  | 8 octets |

### Types numériques à virgule flottante

| Alias C# | Taille   | Précision         | Plage de valeurs                        |
|----------|----------|-------------------|-----------------------------------------|
| float    | 4 octets | 7 chiffres        | ±1,5×10⁻⁴⁵ à ±3,4×10³⁸                 |
| double   | 8 octets | 15-16 chiffres    | ±5,0×10⁻³²⁴ à ±1,7×10³⁰⁸                |
| decimal  | 16 octets| 28-29 décimales   | ±1,0×10⁻²⁸ à ±7,9×10²⁸                  |

> **À retenir** :
> - Utilisez `int` pour les entiers courants, `double` pour les réels, `decimal` pour les calculs financiers.
> - `float` et `double` sont sujets à des imprécisions d'arrondi.

### Autres types
- `char` : un caractère Unicode (16 bits)
- `bool` : vrai ou faux

::: info Bit et Byte
- Un **byte** (ou octet) = 8 bits.
- Un **bit** vaut 0 ou 1.
- Un **char** = 16 bits (Unicode).
- Une constante entière est par défaut de type `int`, une constante réelle de type `double`.
:::

---

## 4. La portée (visibilité) des variables

La **portée** d'une variable détermine où elle est accessible dans le code.

- Une variable déclarée dans un bloc (`{ ... }`) n'est visible que dans ce bloc.

**Exemple d'erreur de portée** :
```csharp
static void Main()
{
    for(int i=0; i<5; i++)
    {
        Console.WriteLine(i);
    }
    Console.WriteLine(i); // Erreur : i n'existe plus ici
}
```

**Exemple correct** :
```csharp
static void Main()
{
    int nombre = 42;
    Console.WriteLine(nombre); // OK
}
```

> **Schéma** :
> ```
> { // début du bloc
>     int x = 5;
>     // x est accessible ici
> }
> // x n'est plus accessible ici
> ```

---

## 5. Méthodes d'assemblage de chaînes de caractères (strings)

Assembler des chaînes est très courant. Voici les principales méthodes :

- **Concaténation** (avec +) :
  ```csharp
  string greet = "Hello " + name;
  ```
  > Simple, mais peu lisible si beaucoup de variables.

- **Interpolation** (recommandée) :
  ```csharp
  string greet = $"Hello {name}";
  ```
  > Lisible, moderne, à privilégier.

- **Formatage de chaîne** :
  ```csharp
  Console.WriteLine("Hello {0}", name);
  ```
  > Utile pour afficher plusieurs variables.

::: warning À savoir
- `Console.WriteLine("Hello {0}", name)` fonctionne uniquement avec `Console.WriteLine`.
- Pour créer une chaîne formatée sans afficher : `string.Format("Hello {0}", name)`
:::

---

## 6. Résumé visuel

| Type         | Stocke...         | Exemples               |
|--------------|-------------------|------------------------|
| Valeur       | la donnée elle-même | int, double, bool, ... |
| Référence    | une adresse mémoire | string, tableau, ...   |

> **À retenir** :
> - Toujours choisir le type le plus adapté à l'information à stocker.
> - Bien comprendre la portée pour éviter les erreurs.
> - Privilégier l'interpolation pour assembler des chaînes.
