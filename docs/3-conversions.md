# Les conversions de types

Changer de type, c’est comme verser un liquide d’un récipient dans un autre: parfois, ça se fait naturellement sans en renverser une goutte (implicite); parfois, il faut un entonnoir et accepter qu’il y ait de la perte (explicite). Comprendre ces règles vous évite des surprises et des exceptions.

## Les conversions de type implicite

- Les **conversions implicites** se produisent automatiquement lorsque le compilateur peut convertir une valeur d'un type à un autre **sans perte de données** et sans risque d'exception. Le code reste lisible, mais il est parfois utile de savoir exactement lesquelles existent.
- Exemple simple :
    ```csharp
    int entier = 10;
    double decimale = entier;       // int → double (sans cast)
    ```

### Implicites numériques (types valeur)
- Règles générales
  - Jamais de conversion implicite « réductrice » (risque de perte): ex. long → int, double → float, decimal → double nécessitent un cast.
  - Aucune conversion implicite entre decimal et float/double (dans les deux sens) — toujours explicite.
  - Les littéraux entiers sont int par défaut; les littéraux réels sont double par défaut.
- Listes usuelles de conversions implicites sûres:
  - sbyte → short, int, long, float, double, decimal
  - byte  → short, ushort, int, uint, long, ulong, float, double, decimal
  - short → int, long, float, double, decimal
  - ushort→ int, uint, long, ulong, float, double, decimal
  - int   → long, float, double, decimal
  - uint  → long, ulong, float, double, decimal
  - long  → float, double, decimal
  - ulong → float, double, decimal
  - char  → ushort, int, uint, long, ulong, float, double, decimal
  - float → double

- Exemples:
  ```csharp
  short s = 1000;
  long  l = s;          // short → long
  float f = s;          // short → float
  decimal m = 42;       // int → decimal
  double d = 3.14f;     // float → double
  ```

- Promotions arithmétiques (dans les expressions):
  - byte, sbyte, short (et leurs versions signées / non signées) sont promus au moins en int avant les opérations arithmétiques.
  - Le résultat « monte » vers le plus large: int + long → long; long + float → float; float + double → double; int + decimal → decimal, etc.
  ```csharp
  byte b = 10; byte c = 20;
  var sum = b + c;   // sum est int (promotion)
  ```

### Autres conversions implicites utiles
- char → int (code Unicode):
  ```csharp
  char lettre = 'A';
  int code = lettre; // 65
  ```
- null peut être converti implicitement vers tout type référence ou nullable (ex.: string, object, int?, DateTime?).

### Ce qui n'existe pas implicitement (à retenir)
- Pas d'implicite entre bool et numériques.
- Pas d'implicite entre enums et numériques (cast requis).
- Pas d'implicite entre decimal et float/double (déjà cité).
- Les conversions « vers plus petit » (ex. long → int, double → float) sont toujours explicites.

## Les conversions de type explicite

- Les **conversions explicites** nécessitent une opération de conversion définie par le programmeur (un cast ou une méthode).  
  Elles sont nécessaires lorsqu'il existe un risque de perte d'information ou lorsqu'on convertit un type **plus large** vers un **plus petit**.
- Exemple basique (troncature):
    ```csharp
    double decimale = 10.5;
    int entier = (int)decimale;   // 10 (la partie décimale est perdue, pas d'arrondi)
    ```
- Différence cast vs Convert:
    ```csharp
    double x = 10.6;
    int a = (int)x;              // 10  (troncature)
    int b = Convert.ToInt32(x);  // 11  (arrondi bancaire .5 → pair le plus proche)
    ```
- Risque d'overflow lors d'un cast « réducteur »:
    ```csharp
    int grand = 300;
    byte petit = (byte)grand; // 44 en contexte unchecked (wrap-around), Exception en checked

    checked
    {
        // byte p = (byte)300; // OverflowException
    }
    ```
- Conversions explicites fréquentes:
  - double/float → int/long (troncature)
  - long → int, int → short, etc. (potentiel overflow)
  - enums ↔ numériques (cast requis):
    ```csharp
    enum Couleur { Rouge = 1, Vert = 2 }
    int n = (int)Couleur.Rouge; // 1
    Couleur c = (Couleur)2;     // Vert (même si 2 n'est pas forcément défini, pas d'erreur à la compilation)
    ```
  - string ↔ numériques: utiliser Parse/TryParse ou Convert (voir plus bas), pas un cast.

## Les conversions numériques vers chaînes

- Pour convertir un type numérique en string, utiliser `.ToString()`.
  ```csharp
  int a = 10;
  string resultat = a.ToString();
  Console.WriteLine(resultat); // affiche "10"
  ```

## Les conversions chaînes vers numériques

- Utiliser `Parse()` ou `TryParse()` pour convertir une chaîne en nombre.
  - `Parse()` lève une exception si la chaîne n'est pas au bon format.
  - `TryParse()` renvoie `true/false` et ne lève pas d'exception en cas d'échec. La valeur convertie est retournée via le paramètre `out`.
- Espaces: les espaces en début/fin sont généralement acceptés. Les caractères non numériques au milieu feront échouer la conversion.
- Culture: les séparateurs (décimal, milliers) dépendent de la culture courante.  
  Exemple: "1,23" est 1.23 en fr-BE, mais invalide pour `en-US` (où on attend "1.23").

### Exemple avec Parse()

```csharp
Console.Write("Donnez une valeur entière : ");
string data = Console.ReadLine();
int resultat = int.Parse(data); // FormatException si data = "12a"
Console.WriteLine($"Vous avez écrit {resultat}");
```

### Exemple avec try...catch (pour Parse)

```csharp
try
{
    string data = Console.ReadLine();
    int resultat = int.Parse(data);
    Console.WriteLine(resultat);
}
catch (FormatException)
{
    Console.WriteLine("Format invalide");
}
catch (OverflowException)
{
    Console.WriteLine("Valeur trop grande/petite pour ce type");
}
```

### Exemple avec TryParse()

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

### Gérer les décimaux, la culture et les styles

```csharp
using System.Globalization;

string s = "1 234,56"; // "1 234,56" en fr-BE (espace insécable + virgule)
var culture = CultureInfo.GetCultureInfo("fr-BE");
if (decimal.TryParse(s, NumberStyles.Number, culture, out decimal montant))
{
    Console.WriteLine(montant); // 1234,56
}
```

- `NumberStyles` permet d'autoriser par ex. les séparateurs de milliers, les signes, les espaces, etc.
- Pour ignorer la culture de la machine, utiliser `CultureInfo.InvariantCulture` avec le point comme séparateur décimal.

:::: tip Erreurs fréquentes
- Tenter de caster une string en int avec `(int)"123"` ne fonctionne pas: utilisez `int.Parse`, `int.TryParse` ou `Convert.ToInt32`.
- Utiliser `double` pour les montants financiers peut introduire des erreurs d’arrondi: préférez `decimal`.
- Oublier la culture lors du parsing des décimaux: explicitez `CultureInfo` si nécessaire.
- Confondre troncature et arrondi: `(int)10.6` tronque à 10, `Convert.ToInt32(10.6)` arrondit à 11 (bancaire).
::::

### Parse/TryParse vs Convert
- `Convert.ToInt32("10")` se comporte comme `int.Parse("10")`, mais renvoie 0 si l'entrée est `null` (au lieu d'une exception).
- `Convert.ToInt32(10.6)` arrondit (bancaire) alors qu'un cast `(int)10.6` tronque.

## Débordement arithmétique

- Le débordement arithmétique se produit lorsque la valeur d'une variable dépasse la capacité max/min de son type (ex.: byte ∈ [0..255]).
- En C#, par défaut, les opérations entières s'exécutent en contexte `unchecked` (pas d'exception) sauf si vous activez explicitement `checked` (via mot-clé ou option de compilation).  
  En `unchecked`, la valeur « reboucle » (wrap-around) modulo la taille du type.
- Exemple en unchecked (comportement par défaut):
  ```csharp
  byte a = 254;
  a++;            // 255
  a++;            // 0 (overflow, wrap-around)
  Console.WriteLine(a); // 0
  ```
- Forcer la détection d'overflow avec `checked`:
  ```csharp
  checked
  {
      byte b = 254;
      b++;       // 255
      b++;       // OverflowException
  }
  ```
- À retenir:
  - Préférer `checked` pour le code critique où les dépassements doivent être détectés.
  - Les casts « réducteurs » peuvent aussi lever une OverflowException en `checked` (voir plus haut).

## Nombres réels et imprécision

- Les **nombres réels** (float, double) sont représentés en binaire (IEEE 754) et ne peuvent pas représenter exactement certains décimaux (ex. 0,1). Ils sont donc sujets à de petites erreurs d'arrondi.

- Exemple classique :
  ```csharp
  double a = 0.1;
  double b = 0.2;
  Console.WriteLine(a + b); // 0,30000000000000004
  ```

- Techniques pratiques:
  - Arrondir l'affichage ou le résultat final: `Math.Round(valeur, nombreDeDécimales)`.
  - Comparer avec une tolérance (epsilon) au lieu de `==`:
    ```csharp
    double x = 0.3;
    double y = a + b;
    bool egaux = Math.Abs(x - y) < 1e-9; // true
    ```
  - Pour les montants financiers, préférez `decimal` (base 10, plus précis pour décimaux) et évitez float/double.

- Exemple d'arrondi:
  ```csharp
  double result = a + b;
  Console.WriteLine(Math.Round(result, 1)); // 0,3
  ```


## En résumé

- Implicite: seulement quand il n’y a ni perte d’info ni risque d’exception.
- Explicite (cast/Convert): attendez-vous à de la perte (troncature) ou à des exceptions en `checked`.
- Pour les chaînes, utilisez Parse/TryParse/Convert, pas de cast.
- Sur les décimaux et la monnaie, préférez `decimal`; attention à la culture.
- Anticipez les overflows: utilisez `checked` dans le code critique.

Checklist pratique
- Suis-je en train de réduire le type (risque de perte/overflow) ?
- Dois-je arrondir ou tronquer ? Ai-je choisi l’API adaptée ?
- Quelle culture s’applique à mes nombres (virgule/point, séparateurs) ?
- Ai-je besoin d’une comparaison de réels avec une tolérance (epsilon) ?
