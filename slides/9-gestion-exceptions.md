---
marp: true
theme: gaia
class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
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