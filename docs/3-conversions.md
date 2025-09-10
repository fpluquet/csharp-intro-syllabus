# Les conversions de types

## Les conversions de type implicite

- Les **conversions implicites** se produisent automatiquement lorsque le compilateur peut convertir une valeur d'un type à un autre **sans perte de données**.
- Exemple :
    ```csharp
    int entier = 10;
    double decimale = entier;       // int converti en double
    ```
- Un caractère peut aussi être converti en int sans perte via le code ASCII ou Unicode (char vers int).

## Les conversions de type explicite

- Les **conversions explicites** nécessitent une opération de conversion définie par le programmeur.  
  Cela se produit généralement lorsqu'il existe un risque de perte de données ou lorsqu'on convertit un type **plus large** vers un **plus petit**.
- Exemple :
    ```csharp
    double decimale = 10.5;
    int entier = (int)decimale;   // la valeur d'entier sera 10
    ```

## Les conversions numériques vers chaînes

- Pour convertir un type numérique en string, utiliser `.ToString()`.
  ```csharp
  int a = 10;
  string resultat = a.ToString();
  Console.WriteLine(resultat); // affiche "10"
  ```

## Les conversions chaînes vers numériques

- Utiliser `Parse()` ou `TryParse()` pour convertir une chaîne en nombre.
- `Parse()` convertit et fait "crasher" le programme en cas d'échec.
- `TryParse()` est plus sécurisé : elle essaie, ne fait pas planter, et indique si ça a réussi.

### Exemple avec Parse()

```csharp
int resultat;
Console.Write("Donnez une valeur : ");
string data = Console.ReadLine();
resultat = int.Parse(data);
Console.WriteLine("Vous avez écrit " + resultat);
```

### Exemple avec try...catch

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

## Nombres réels et imprécision

- Les **nombres réels** (comme float et double) sont parfois imprécis à cause de la façon dont ils sont stockés en mémoire, en binaire. Les ordinateurs utilisent le **système binaire** (base 2), ce qui rend difficile la représentation exacte de certains nombres décimaux (base 10), comme 0,1, donc ils sont **approximés**.

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
