---
marp: true
theme: default
paginate: true
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

| C# Alias  | Range                  | Size     | C# Alias   | Range                |
|-----------|------------------------|----------|------------|----------------------|
| byte      | 0 à 255                | 1 byte   | sbyte      | -128 à 127           |
| short     | -32768 à 32767         | 2 bytes  | ushort     | 0 à 65535            |
| int       | -2,147,483,648 à       | 4 bytes  | uint       | 0 à 4,294,967,295    |
|           | 2,147,483,647          |          |            |                      |
| long      | -9,223,372,036,854,775,808 à 9,223,372,036,854,775,807 | 8 bytes | ulong | 0 à 18,446,744,073,709,551,615 |

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
