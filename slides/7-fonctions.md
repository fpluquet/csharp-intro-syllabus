---
marp: true
theme: default
paginate: true
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
