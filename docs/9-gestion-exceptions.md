# Gestion des Exceptions

## Introduction

Dans le monde réel, tout ne se passe pas toujours comme prévu. Un fichier peut être introuvable, une division par zéro peut se produire, ou une conversion de chaîne peut échouer. En programmation, ces situations exceptionnelles sont appelées **exceptions**. La gestion des exceptions est un mécanisme fondamental qui permet à vos programmes de réagir intelligemment aux erreurs plutôt que de planter brutalement.

### Qu'est-ce qu'une exception ?

Une **exception** est un événement qui interrompt le flux normal d'exécution d'un programme. Quand une exception se produit, le système "lance" (throw) une exception qui doit être "attrapée" (catch) pour éviter que le programme ne s'arrête.

**Analogie** : Imaginez que vous conduisez sur une route normale. Soudain, il y a un accident qui bloque la route (exception). Vous avez deux choix :
- **Sans gestion d'exception** : Vous foncez dans l'obstacle et votre voyage s'arrête brutalement
- **Avec gestion d'exception** : Vous prenez un itinéraire de contournement prévu à l'avance

### Pourquoi gérer les exceptions ?

**1. Robustesse** : Votre programme continue de fonctionner même en cas d'erreur
**2. Expérience utilisateur** : Messages d'erreur clairs plutôt que des plantages
**3. Débogage** : Informations précises sur ce qui s'est mal passé
**4. Maintenance** : Code plus facile à maintenir et déboguer

## Types d'exceptions courantes

C# définit de nombreux types d'exceptions pour différentes situations :

### Exceptions liées aux données
- `FormatException` : Conversion impossible (ex: "abc" → int)
- `OverflowException` : Dépassement de capacité numérique
- `ArgumentException` : Argument invalide passé à une méthode
- `ArgumentNullException` : Argument null non autorisé

### Exceptions liées aux ressources
- `FileNotFoundException` : Fichier introuvable
- `DirectoryNotFoundException` : Dossier introuvable
- `UnauthorizedAccessException` : Accès refusé
- `OutOfMemoryException` : Mémoire insuffisante

### Exceptions logiques
- `DivideByZeroException` : Division par zéro
- `IndexOutOfRangeException` : Index hors limites d'un tableau
- `NullReferenceException` : Tentative d'utilisation d'un objet null

### Exception générale
- `Exception` : Classe de base pour toutes les exceptions

## La structure try-catch

La gestion des exceptions utilise la structure `try-catch` qui permet de "tenter" une opération et de "capturer" les erreurs :

### Syntaxe de base

```csharp
try
{
    // Code qui peut lever une exception
    int resultat = int.Parse("abc");
}
catch (FormatException)
{
    // Code exécuté si une FormatException se produit
    Console.WriteLine("Erreur : format invalide !");
}
```

### Exemple pratique : Division sécurisée

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.Write("Entrez le premier nombre : ");
        string input1 = Console.ReadLine();
        
        Console.Write("Entrez le second nombre : ");
        string input2 = Console.ReadLine();
        
        try
        {
            double nombre1 = double.Parse(input1);
            double nombre2 = double.Parse(input2);
            
            if (nombre2 == 0)
                throw new DivideByZeroException("Division par zéro détectée !");
            
            double resultat = nombre1 / nombre2;
            Console.WriteLine($"Résultat : {nombre1} / {nombre2} = {resultat}");
        }
        catch (FormatException)
        {
            Console.WriteLine("Erreur : Veuillez entrer des nombres valides.");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Erreur : {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur inattendue : {ex.Message}");
        }
    }
}
```

## Multiples blocs catch

Vous pouvez avoir plusieurs blocs `catch` pour gérer différents types d'exceptions :

### Ordre d'importance

⚠️ **Important** : Les blocs `catch` sont évalués **de haut en bas**. Placez toujours les exceptions **les plus spécifiques en premier** et la plus générale (`Exception`) en dernier.

```csharp
try
{
    int[] nombres = { 1, 2, 3 };
    string input = Console.ReadLine();
    int index = int.Parse(input);
    Console.WriteLine(nombres[index]);
}
catch (FormatException)
{
    Console.WriteLine("Erreur : L'index doit être un nombre entier.");
}
catch (IndexOutOfRangeException)
{
    Console.WriteLine("Erreur : Index hors limites du tableau.");
}
catch (Exception ex)
{
    Console.WriteLine($"Erreur générale : {ex.Message}");
}
```

### Récupérer les détails de l'exception

```csharp
try
{
    // Code risqué
    int resultat = int.Parse("invalid");
}
catch (FormatException ex)
{
    Console.WriteLine($"Message : {ex.Message}");
    Console.WriteLine($"Type : {ex.GetType().Name}");
    Console.WriteLine($"Stack trace : {ex.StackTrace}");
}
```

## Le bloc finally

Le bloc `finally` s'exécute **toujours**, qu'une exception soit levée ou non. Il est utilisé pour le code de nettoyage :

```csharp
FileStream fichier = null;
try
{
    fichier = new FileStream("data.txt", FileMode.Open);
    // Traitement du fichier
}
catch (FileNotFoundException)
{
    Console.WriteLine("Fichier non trouvé.");
}
finally
{
    // Ce code s'exécute TOUJOURS
    if (fichier != null)
    {
        fichier.Close();
        Console.WriteLine("Fichier fermé proprement.");
    }
}
```

### Ordre d'exécution

```csharp
try
{
    Console.WriteLine("1. Dans try");
    throw new Exception("Test");
    Console.WriteLine("2. Après exception (jamais exécuté)");
}
catch (Exception)
{
    Console.WriteLine("3. Dans catch");
}
finally
{
    Console.WriteLine("4. Dans finally (toujours exécuté)");
}
Console.WriteLine("5. Après try-catch-finally");

// Sortie :
// 1. Dans try
// 3. Dans catch
// 4. Dans finally (toujours exécuté)
// 5. Après try-catch-finally
```

## Lancer des exceptions avec throw

Vous pouvez créer et lancer vos propres exceptions avec le mot-clé `throw` :

### Lancer une exception standard

```csharp
static double CalculerRacine(double nombre)
{
    if (nombre < 0)
    {
        throw new ArgumentException("Impossible de calculer la racine d'un nombre négatif.");
    }
    return Math.Sqrt(nombre);
}
```

### Relancer une exception

```csharp
try
{
    // Code qui peut échouer
    ProcessData();
}
catch (FileNotFoundException ex)
{
    // Enregistrer l'erreur dans un log
    LogError(ex);
    
    // Relancer l'exception pour qu'elle soit gérée plus haut
    throw;  // Préserve la stack trace originale
}
```

### Lancer une nouvelle exception avec cause

```csharp
try
{
    int.Parse("invalid");
}
catch (FormatException ex)
{
    // Encapsuler dans une exception plus spécifique
    throw new ApplicationException("Erreur lors du traitement des données", ex);
}
```

## Exemple complet : Calculatrice robuste

```csharp
using System;

class CalculatriceRobuste
{
    static void Main()
    {
        bool continuer = true;
        
        while (continuer)
        {
            try
            {
                Console.WriteLine("\n=== Calculatrice ===");
                Console.Write("Premier nombre : ");
                double a = LireNombre();
                
                Console.Write("Opération (+, -, *, /) : ");
                char operation = LireOperation();
                
                Console.Write("Second nombre : ");
                double b = LireNombre();
                
                double resultat = Calculer(a, operation, b);
                Console.WriteLine($"Résultat : {a} {operation} {b} = {resultat}");
            }
            catch (FormatException)
            {
                Console.WriteLine("❌ Erreur : Format de nombre invalide.");
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("❌ Erreur : Division par zéro impossible.");
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"❌ Erreur : {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Erreur inattendue : {ex.Message}");
            }
            finally
            {
                Console.Write("Continuer ? (o/n) : ");
                string reponse = Console.ReadLine();
                continuer = reponse?.ToLower() == "o";
            }
        }
        
        Console.WriteLine("Au revoir !");
    }
    
    static double LireNombre()
    {
        string input = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(input))
            throw new FormatException("Entrée vide.");
        
        return double.Parse(input);
    }
    
    static char LireOperation()
    {
        string input = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(input) || input.Length != 1)
            throw new ArgumentException("Opération invalide.");
        
        char op = input[0];
        if (op != '+' && op != '-' && op != '*' && op != '/')
            throw new ArgumentException($"Opération '{op}' non supportée.");
        
        return op;
    }
    
    static double Calculer(double a, char operation, double b)
    {
        switch (operation)
        {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b == 0)
                    throw new DivideByZeroException();
                return a / b;
            default:
                throw new ArgumentException($"Opération non supportée : {operation}");
        }
    }
}
```

## Bonnes pratiques

### 1. Ne pas ignorer les exceptions

```csharp
// ❌ Mauvais : Ignorer silencieusement les erreurs
try
{
    int.Parse("invalid");
}
catch
{
    // Ne rien faire - DANGEREUX !
}

// ✅ Bon : Au minimum, enregistrer l'erreur
try
{
    int.Parse("invalid");
}
catch (Exception ex)
{
    Console.WriteLine($"Erreur capturée : {ex.Message}");
    // Ou logger dans un fichier
}
```

### 2. Être spécifique avec les exceptions

```csharp
// ❌ Trop général
try
{
    // Code complexe
}
catch (Exception ex)
{
    // Gère tout pareil
}

// ✅ Spécifique
try
{
    // Code complexe
}
catch (FileNotFoundException)
{
    // Gestion spécifique pour fichier manquant
}
catch (UnauthorizedAccessException)
{
    // Gestion spécifique pour accès refusé
}
catch (Exception ex)
{
    // Gestion générale en dernier recours
}
```

### 3. Messages d'erreur informatifs

```csharp
// ❌ Message peu utile
throw new Exception("Erreur");

// ✅ Message descriptif
throw new ArgumentException($"La valeur {valeur} n'est pas valide. Doit être entre 1 et 100.");
```

### 4. Ne pas utiliser les exceptions pour le contrôle de flux

```csharp
// ❌ Mauvais : Utiliser les exceptions pour la logique normale
try
{
    int resultat = int.Parse(input);
    return resultat;
}
catch
{
    return 0; // Valeur par défaut
}

// ✅ Bon : Utiliser TryParse pour éviter l'exception
if (int.TryParse(input, out int resultat))
{
    return resultat;
}
return 0; // Valeur par défaut
```

## Exceptions personnalisées

Pour des besoins spécifiques, vous pouvez créer vos propres types d'exceptions :

```csharp
// Définir une exception personnalisée
public class AgeInvalideException : Exception
{
    public int Age { get; }
    
    public AgeInvalideException(int age) 
        : base($"L'âge {age} n'est pas valide. Doit être entre 0 et 150.")
    {
        Age = age;
    }
    
    public AgeInvalideException(int age, Exception innerException) 
        : base($"L'âge {age} n'est pas valide.", innerException)
    {
        Age = age;
    }
}

// Utilisation
static void ValiderAge(int age)
{
    if (age < 0 || age > 150)
    {
        throw new AgeInvalideException(age);
    }
}

// Dans le code appelant
try
{
    ValiderAge(-5);
}
catch (AgeInvalideException ex)
{
    Console.WriteLine($"Erreur d'âge : {ex.Message}");
    Console.WriteLine($"Âge fourni : {ex.Age}");
}
```

## Debugging avec les exceptions

### Informations utiles d'une exception

```csharp
try
{
    // Code qui lève une exception
    MethodeQuiEchoue();
}
catch (Exception ex)
{
    Console.WriteLine($"Type : {ex.GetType().Name}");
    Console.WriteLine($"Message : {ex.Message}");
    Console.WriteLine($"Source : {ex.Source}");
    Console.WriteLine($"Stack Trace :");
    Console.WriteLine(ex.StackTrace);
    
    // Si c'est une exception encapsulée
    if (ex.InnerException != null)
    {
        Console.WriteLine($"Exception interne : {ex.InnerException.Message}");
    }
}
```

### Exemple de stack trace

```
System.FormatException: Input string was not in a correct format.
   at System.Number.ThrowOverflowOrFormatException(ParsingStatus status, TypeCode type)
   at System.Number.ParseInt32(ReadOnlySpan`1 value, NumberStyles styles, NumberFormatInfo info)
   at System.Int32.Parse(String s)
   at Program.Main() in C:\temp\Program.cs:line 12
```

**Lecture** : L'erreur s'est produite ligne 12 dans Main(), qui a appelé Int32.Parse, etc.

## Récapitulatif

### Structure fondamentale
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

### Points clés à retenir

✅ **Utilisez try-catch** pour le code qui peut échouer
✅ **Exceptions spécifiques** avant les générales
✅ **Messages informatifs** pour aider le débogage
✅ **Finally** pour le nettoyage des ressources
✅ **Throw** pour signaler vos propres erreurs
✅ **Ne pas ignorer** les exceptions capturées

### Quand utiliser les exceptions

**✅ Utilisez pour** :
- Erreurs exceptionnelles (fichier manquant, réseau coupé)
- Validation d'arguments de méthodes
- Ressources indisponibles

**❌ N'utilisez pas pour** :
- Le flux de contrôle normal
- Les validations d'entrée utilisateur courantes
- Les performances critiques

La gestion des exceptions est un art qui s'améliore avec l'expérience. Elle rend vos programmes plus robustes et professionnels ! 🛡️