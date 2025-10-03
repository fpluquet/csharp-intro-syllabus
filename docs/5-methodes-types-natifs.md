# Méthodes des Types Natifs

## Introduction

En C#, chaque type de données possède des méthodes intégrées qui permettent de manipuler et d'interroger les valeurs de ce type. Ces méthodes sont très utiles pour effectuer des opérations courantes sans avoir à écrire du code complexe.

Dans ce chapitre, nous allons explorer les méthodes les plus importantes des types natifs de C# : `string`, `int`, `double`, `bool`, `char`, et `DateTime`.

## 1. Type `string`

Le type `string` est l'un des plus riches en méthodes utiles pour manipuler du texte.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `Length` | `int Length { get; }` | Propriété qui retourne la longueur de la chaîne |
| `ToUpper()` | `string ToUpper()` | Convertit tous les caractères en majuscules |
| `ToLower()` | `string ToLower()` | Convertit tous les caractères en minuscules |
| `Trim()` | `string Trim()` | Supprime les espaces en début et fin de chaîne |
| `Substring()` | `string Substring(int startIndex, int length)` | Extrait une sous-chaîne |
| `IndexOf()` | `int IndexOf(string value)` | Trouve l'index de la première occurrence d'une sous-chaîne |
| `Contains()` | `bool Contains(string value)` | Vérifie si la chaîne contient une sous-chaîne |
| `StartsWith()` | `bool StartsWith(string value)` | Vérifie si la chaîne commence par une sous-chaîne |
| `EndsWith()` | `bool EndsWith(string value)` | Vérifie si la chaîne se termine par une sous-chaîne |
| `Replace()` | `string Replace(string oldValue, string newValue)` | Remplace toutes les occurrences d'une sous-chaîne |
| `Split()` | `string[] Split(char separator)` | Divise la chaîne en tableau selon un séparateur |
| `IsNullOrEmpty()` | `static bool IsNullOrEmpty(string value)` | Vérifie si une chaîne est null ou vide |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        string texte = "  Bonjour le Monde!  ";
        
        // Length - Obtenir la longueur
        Console.WriteLine($"Longueur: {texte.Length}"); // Affiche: 20
        
        // Cas d'usage pratique : vérifier si un mot de passe a la bonne longueur
        string motDePasse = "MonMotDePasse123";
        if (motDePasse.Length >= 8)
        {
            Console.WriteLine("Mot de passe assez long");
        }
        
        // ToUpper() - Convertir en majuscules
        Console.WriteLine($"Majuscules: {texte.ToUpper()}"); // Affiche: "  BONJOUR LE MONDE!  "
        
        // Cas d'usage : comparaison insensible à la casse
        string nom1 = "ALICE";
        string nom2 = "alice";
        if (nom1.ToUpper() == nom2.ToUpper())
        {
            Console.WriteLine("Les noms sont identiques (insensible à la casse)");
        }
        
        // ToLower() - Convertir en minuscules
        Console.WriteLine($"Minuscules: {texte.ToLower()}"); // Affiche: "  bonjour le monde!  "
        
        // Cas d'usage : normaliser l'entrée utilisateur
        string entreeUtilisateur = "OUI";
        string reponseNormalisee = entreeUtilisateur.ToLower();
        if (reponseNormalisee == "oui" || reponseNormalisee == "yes")
        {
            Console.WriteLine("L'utilisateur a dit oui");
        }
        
        // Trim() - Supprimer les espaces
        string textePropre = texte.Trim();
        Console.WriteLine($"Sans espaces: '{textePropre}'"); // Affiche: "Bonjour le Monde!"
        
        // Cas d'usage : nettoyer l'entrée utilisateur
        string entree = "   alice@example.com   ";
        string emailPropre = entree.Trim();
        Console.WriteLine($"Email nettoyé: '{emailPropre}'");
        
        // Trim avec caractères spécifiques
        string texteAvecPoints = "...Bonjour...";
        string sansPoints = texteAvecPoints.Trim('.');
        Console.WriteLine($"Sans points: '{sansPoints}'"); // "Bonjour"
        
        // Substring() - Extraire une partie
        Console.WriteLine($"Sous-chaîne: {textePropre.Substring(0, 7)}"); // Affiche: "Bonjour"
        Console.WriteLine($"À partir de l'index 8: {textePropre.Substring(8)}"); // Affiche: "le Monde!"
        
        // Cas d'usage : extraire le nom de domaine d'un email
        string email = "utilisateur@example.com";
        int positionArobase = email.IndexOf('@');
        if (positionArobase >= 0)
        {
            string nomUtilisateur = email.Substring(0, positionArobase);
            string domaine = email.Substring(positionArobase + 1);
            Console.WriteLine($"Utilisateur: {nomUtilisateur}, Domaine: {domaine}");
        }
        
        // Cas d'usage : extraire l'extension d'un fichier
        string nomFichier = "document.pdf";
        int positionPoint = nomFichier.LastIndexOf('.');
        if (positionPoint >= 0)
        {
            string extension = nomFichier.Substring(positionPoint + 1);
            Console.WriteLine($"Extension: {extension}"); // "pdf"
        }
        
        // IndexOf() - Trouver une position
        int position = textePropre.IndexOf("Monde");
        Console.WriteLine($"Position de 'Monde': {position}"); // Affiche: 11
        
        // Cas d'usage : vérifier si un texte contient un mot interdit
        string commentaire = "Ce produit est vraiment nul";
        string[] motsInterdits = {"nul", "mauvais", "horrible"};
        foreach (string motInterdit in motsInterdits)
        {
            if (commentaire.ToLower().IndexOf(motInterdit) >= 0)
            {
                Console.WriteLine($"Mot interdit trouvé: {motInterdit}");
                break;
            }
        }
        
        // LastIndexOf() - Trouver la dernière occurrence
        string phrase = "Le chat mange le poisson";
        int dernierLe = phrase.LastIndexOf("le");
        Console.WriteLine($"Dernière position de 'le': {dernierLe}");
        
        // Contains() - Vérifier la présence
        bool contient = textePropre.Contains("Bonjour");
        Console.WriteLine($"Contient 'Bonjour': {contient}"); // Affiche: True
        
        // Cas d'usage : filtrer des éléments
        string[] produits = {"iPhone", "Samsung Galaxy", "Google Pixel", "Huawei P40"};
        Console.WriteLine("Produits contenant 'Phone':");
        foreach (string produit in produits)
        {
            if (produit.ToLower().Contains("phone"))
            {
                Console.WriteLine($"- {produit}");
            }
        }
        
        // StartsWith() et EndsWith() - Vérifier le début et la fin
        Console.WriteLine($"Commence par 'Bonjour': {textePropre.StartsWith("Bonjour")}"); // True
        Console.WriteLine($"Se termine par '!': {textePropre.EndsWith("!")}"); // True
        
        // Cas d'usage : traiter différents types de fichiers
        string[] fichiers = {"document.pdf", "image.jpg", "script.js", "style.css"};
        foreach (string fichier in fichiers)
        {
            if (fichier.EndsWith(".pdf"))
            {
                Console.WriteLine($"{fichier} est un document PDF");
            }
            else if (fichier.EndsWith(".jpg") || fichier.EndsWith(".png"))
            {
                Console.WriteLine($"{fichier} est une image");
            }
            else if (fichier.EndsWith(".js"))
            {
                Console.WriteLine($"{fichier} est un script JavaScript");
            }
        }
        
        // Cas d'usage : valider les URLs
        string[] urls = {"https://example.com", "http://test.org", "ftp://files.com"};
        foreach (string url in urls)
        {
            if (url.StartsWith("https://"))
            {
                Console.WriteLine($"{url} est sécurisé (HTTPS)");
            }
            else if (url.StartsWith("http://"))
            {
                Console.WriteLine($"{url} n'est pas sécurisé (HTTP)");
            }
        }
        
        // Replace() - Remplacer du texte
        string nouveau = textePropre.Replace("Monde", "Univers");
        Console.WriteLine($"Remplacé: {nouveau}"); // Affiche: "Bonjour le Univers!"
        
        // Cas d'usage : nettoyer un texte
        string texteAvecErreurs = "Bnojour tout le mnde!";
        string texteCorrige = texteAvecErreurs.Replace("Bnojour", "Bonjour")
                                             .Replace("mnde", "monde");
        Console.WriteLine($"Texte corrigé: {texteCorrige}");
        
        // Cas d'usage : formater un numéro de téléphone
        string numeroTelephone = "0123456789";
        string numeroFormate = numeroTelephone.Replace("", "-"); // Ne fonctionne pas ainsi
        // Meilleure approche pour formater un numéro :
        if (numeroTelephone.Length == 10)
        {
            numeroFormate = $"{numeroTelephone.Substring(0, 2)}-{numeroTelephone.Substring(2, 2)}-{numeroTelephone.Substring(4, 2)}-{numeroTelephone.Substring(6, 2)}-{numeroTelephone.Substring(8, 2)}";
            Console.WriteLine($"Numéro formaté: {numeroFormate}");
        }
        
        // Replace multiple
        string texteHTML = "<p>Bonjour <b>monde</b></p>";
        string textePropre2 = texteHTML.Replace("<p>", "")
                                      .Replace("</p>", "")
                                      .Replace("<b>", "")
                                      .Replace("</b>", "");
        Console.WriteLine($"Texte sans HTML: {textePropre2}");
        
        // Split() - Diviser en mots
        string phrase2 = "pomme,banane,orange";
        string[] fruits = phrase2.Split(',');
        Console.WriteLine("Fruits:");
        foreach (string fruit in fruits)
        {
            Console.WriteLine($"- {fruit}");
        }
        
        // Cas d'usage : parser un fichier CSV
        string lignCSV = "Jean,Dupont,30,Bruxelles";
        string[] donnees = lignCSV.Split(',');
        if (donnees.Length >= 4)
        {
            Console.WriteLine($"Prénom: {donnees[0]}");
            Console.WriteLine($"Nom: {donnees[1]}");
            Console.WriteLine($"Âge: {donnees[2]}");
            Console.WriteLine($"Ville: {donnees[3]}");
        }
        
        // Split avec plusieurs séparateurs
        string phraseComplexe = "pomme;banane,orange:fraise";
        string[] fruitsComplexes = phraseComplexe.Split(new char[] {';', ',', ':'});
        Console.WriteLine("Fruits complexes:");
        foreach (string fruit in fruitsComplexes)
        {
            Console.WriteLine($"- {fruit}");
        }
        
        // Split pour diviser en mots
        string phraseComplete = "Bonjour tout le monde";
        string[] mots = phraseComplete.Split(' ');
        Console.WriteLine($"Cette phrase contient {mots.Length} mots:");
        for (int i = 0; i < mots.Length; i++)
        {
            Console.WriteLine($"Mot {i + 1}: {mots[i]}");
        }
        
        // IsNullOrEmpty() - Vérifier si vide ou null
        string vide = "";
        string nulle = null;
        string avecEspaces = "   ";
        Console.WriteLine($"Chaîne vide: {string.IsNullOrEmpty(vide)}"); // True
        Console.WriteLine($"Chaîne null: {string.IsNullOrEmpty(nulle)}"); // True
        Console.WriteLine($"Chaîne normale: {string.IsNullOrEmpty(textePropre)}"); // False
        Console.WriteLine($"Chaîne avec espaces: {string.IsNullOrEmpty(avecEspaces)}"); // False
        
        // IsNullOrWhiteSpace() - Plus strict
        Console.WriteLine($"Chaîne avec espaces (WhiteSpace): {string.IsNullOrWhiteSpace(avecEspaces)}"); // True
        
        // Cas d'usage : valider l'entrée utilisateur
        Console.WriteLine("Entrez votre nom:");
        string nomUtilisateur = ""; // Simuler une entrée vide
        if (string.IsNullOrWhiteSpace(nomUtilisateur))
        {
            Console.WriteLine("Erreur: Le nom ne peut pas être vide");
        }
        else
        {
            Console.WriteLine($"Bonjour {nomUtilisateur.Trim()}!");
        }
        
        // Exemple complet : valider et formater une adresse email
        string emailAValider = "  ALICE@EXAMPLE.COM  ";
        string emailValide = "";
        
        if (!string.IsNullOrWhiteSpace(emailAValider))
        {
            emailValide = emailAValider.Trim().ToLower();
            
            if (emailValide.Contains("@") && emailValide.Contains("."))
            {
                Console.WriteLine($"Email valide: {emailValide}");
                
                // Extraire les parties
                string[] partiesEmail = emailValide.Split('@');
                if (partiesEmail.Length == 2)
                {
                    string utilisateur = partiesEmail[0];
                    string domaine = partiesEmail[1];
                    Console.WriteLine($"Utilisateur: {utilisateur}, Domaine: {domaine}");
                }
            }
            else
            {
                Console.WriteLine("Format d'email invalide");
            }
        }
        else
        {
            Console.WriteLine("Email ne peut pas être vide");
        }
    }
}
```

## 2. Type `int`

Le type `int` possède plusieurs méthodes utiles pour la manipulation des nombres entiers.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `ToString()` | `string ToString()` | Convertit l'entier en chaîne de caractères |
| `Parse()` | `static int Parse(string s)` | Convertit une chaîne en entier |
| `TryParse()` | `static bool TryParse(string s, out int result)` | Tente de convertir une chaîne en entier |
| `CompareTo()` | `int CompareTo(int value)` | Compare deux entiers |
| `Equals()` | `bool Equals(int obj)` | Vérifie l'égalité avec un autre entier |
| `GetHashCode()` | `int GetHashCode()` | Retourne le code de hachage |
| `MaxValue` | `const int MaxValue` | Valeur maximale d'un int |
| `MinValue` | `const int MinValue` | Valeur minimale d'un int |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        int nombre = 42;
        
        // ToString() - Convertir en chaîne
        string texte = nombre.ToString();
        Console.WriteLine($"En texte: '{texte}'"); // Affiche: "42"
        
        // Cas d'usage : afficher un score
        int score = 1250;
        Console.WriteLine("Votre score est: " + score.ToString());
        
        // Formatage avec ToString()
        int argent = 1234567;
        Console.WriteLine($"Montant: {argent.ToString("N0")}"); // Affiche: "1,234,567"
        Console.WriteLine($"Montant: {argent.ToString("C")}"); // Affiche le montant en devise locale
        
        // Parse() - Convertir depuis une chaîne
        string chaine = "123";
        int converti = int.Parse(chaine);
        Console.WriteLine($"Converti: {converti}"); // Affiche: 123
        
        // Cas d'usage : calculer avec des entrées utilisateur
        string age1 = "25";
        string age2 = "30";
        int sommeAges = int.Parse(age1) + int.Parse(age2);
        Console.WriteLine($"Somme des âges: {sommeAges}"); // 55
        
        // Attention aux exceptions avec Parse()
        try
        {
            string chaineInvalide = "abc";
            int resultatErreur = int.Parse(chaineInvalide); // Lève une exception
        }
        catch (FormatException)
        {
            Console.WriteLine("Erreur: Format invalide pour Parse()");
        }
        
        // TryParse() - Conversion sécurisée
        string chaineInvalide2 = "abc";
        bool succes = int.TryParse(chaineInvalide2, out int resultat);
        Console.WriteLine($"Conversion réussie: {succes}"); // False
        Console.WriteLine($"Résultat: {resultat}"); // 0 (valeur par défaut)
        
        string chaineValide = "456";
        succes = int.TryParse(chaineValide, out resultat);
        Console.WriteLine($"Conversion réussie: {succes}"); // True
        Console.WriteLine($"Résultat: {resultat}"); // 456
        
        // Cas d'usage pratique : saisie sécurisée
        string[] entrees = {"42", "abc", "0", "-15", "999999999999"}; // Simule différentes entrées
        foreach (string entree in entrees)
        {
            if (int.TryParse(entree, out int valeur))
            {
                if (valeur >= 0)
                {
                    Console.WriteLine($"Valeur valide: {valeur}");
                }
                else
                {
                    Console.WriteLine($"Valeur négative: {valeur}");
                }
            }
            else
            {
                Console.WriteLine($"'{entree}' n'est pas un nombre valide");
            }
        }
        
        // Cas d'usage : menu interactif
        string[] options = {"1", "2", "abc", "3"};
        foreach (string choix in options)
        {
            if (int.TryParse(choix, out int option))
            {
                switch (option)
                {
                    case 1:
                        Console.WriteLine("Option 1 sélectionnée");
                        break;
                    case 2:
                        Console.WriteLine("Option 2 sélectionnée");
                        break;
                    case 3:
                        Console.WriteLine("Option 3 sélectionnée");
                        break;
                    default:
                        Console.WriteLine($"Option {option} non reconnue");
                        break;
                }
            }
            else
            {
                Console.WriteLine($"'{choix}' n'est pas une option valide");
            }
        }
        
        // CompareTo() - Comparer
        int autre = 30;
        int comparaison = nombre.CompareTo(autre);
        Console.WriteLine($"42 comparé à 30: {comparaison}"); // 1 (42 > 30)
        
        comparaison = autre.CompareTo(nombre);
        Console.WriteLine($"30 comparé à 42: {comparaison}"); // -1 (30 < 42)
        
        comparaison = nombre.CompareTo(42);
        Console.WriteLine($"42 comparé à 42: {comparaison}"); // 0 (égal)
        
        // Cas d'usage : trier des nombres
        int[] nombres = {15, 3, 42, 8, 23};
        Console.WriteLine("Nombres avant tri:");
        foreach (int n in nombres)
        {
            Console.Write($"{n} ");
        }
        Console.WriteLine();
        
        // Tri simple avec CompareTo (tri à bulles)
        for (int i = 0; i < nombres.Length - 1; i++)
        {
            for (int j = 0; j < nombres.Length - i - 1; j++)
            {
                if (nombres[j].CompareTo(nombres[j + 1]) > 0)
                {
                    // Échanger
                    int temp = nombres[j];
                    nombres[j] = nombres[j + 1];
                    nombres[j + 1] = temp;
                }
            }
        }
        
        Console.WriteLine("Nombres après tri:");
        foreach (int n in nombres)
        {
            Console.Write($"{n} ");
        }
        Console.WriteLine();
        
        // Cas d'usage : trouver le minimum et maximum
        int[] valeurs = {42, 15, 88, 3, 67};
        int min = valeurs[0];
        int max = valeurs[0];
        
        foreach (int valeur in valeurs)
        {
            if (valeur.CompareTo(min) < 0)
            {
                min = valeur;
            }
            if (valeur.CompareTo(max) > 0)
            {
                max = valeur;
            }
        }
        Console.WriteLine($"Minimum: {min}, Maximum: {max}");
        
        // Equals() - Vérifier l'égalité
        bool egal = nombre.Equals(42);
        Console.WriteLine($"42 égal à 42: {egal}"); // True
        
        // Cas d'usage : vérifier des conditions spécifiques
        int[] scoresGagnants = {100, 200, 500, 1000};
        int scoreJoueur = 500;
        
        bool scoreGagnant = false;
        foreach (int scoreGagnant in scoresGagnants)
        {
            if (scoreJoueur.Equals(scoreGagnant))
            {
                scoreGagnant = true;
                Console.WriteLine($"Félicitations! Vous avez atteint un score gagnant: {scoreJoueur}");
                break;
            }
        }
        
        if (!scoreGagnant)
        {
            Console.WriteLine($"Score actuel: {scoreJoueur}. Continuez à jouer!");
        }
        
        // MaxValue et MinValue - Limites
        Console.WriteLine($"Valeur max d'un int: {int.MaxValue}"); // 2147483647
        Console.WriteLine($"Valeur min d'un int: {int.MinValue}"); // -2147483648
        
        // Cas d'usage : vérifier les débordements
        int grandNombre = int.MaxValue;
        Console.WriteLine($"Grand nombre: {grandNombre}");
        
        // Vérifier avant d'additionner pour éviter le débordement
        int aAjouter = 10;
        if (grandNombre <= int.MaxValue - aAjouter)
        {
            grandNombre += aAjouter;
            Console.WriteLine($"Addition réussie: {grandNombre}");
        }
        else
        {
            Console.WriteLine("Addition impossible: risque de débordement");
        }
        
        // Cas d'usage : validation de plages
        int ageUtilisateur = 150;
        if (ageUtilisateur >= 0 && ageUtilisateur <= 120)
        {
            Console.WriteLine($"Âge valide: {ageUtilisateur}");
        }
        else
        {
            Console.WriteLine($"Âge invalide: {ageUtilisateur}");
        }
        
        // Exemple pratique : calculatrice simple
        string[] expressions = {"10+5", "20-8", "abc+5", "15*3"};
        foreach (string expr in expressions)
        {
            Console.WriteLine($"Expression: {expr}");
            
            if (expr.Contains("+"))
            {
                string[] parties = expr.Split('+');
                if (parties.Length == 2 && 
                    int.TryParse(parties[0], out int a) && 
                    int.TryParse(parties[1], out int b))
                {
                    Console.WriteLine($"Résultat: {a + b}");
                }
                else
                {
                    Console.WriteLine("Format invalide pour addition");
                }
            }
            else if (expr.Contains("-"))
            {
                string[] parties = expr.Split('-');
                if (parties.Length == 2 && 
                    int.TryParse(parties[0], out int a) && 
                    int.TryParse(parties[1], out int b))
                {
                    Console.WriteLine($"Résultat: {a - b}");
                }
                else
                {
                    Console.WriteLine("Format invalide pour soustraction");
                }
            }
            else
            {
                Console.WriteLine("Opération non supportée");
            }
            Console.WriteLine();
        }
    }
}
```

## 3. Type `double`

Le type `double` partage beaucoup de méthodes avec `int`, mais possède des spécificités pour les nombres à virgule flottante.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `ToString()` | `string ToString()` | Convertit le double en chaîne |
| `Parse()` | `static double Parse(string s)` | Convertit une chaîne en double |
| `TryParse()` | `static bool TryParse(string s, out double result)` | Tente de convertir une chaîne en double |
| `CompareTo()` | `int CompareTo(double value)` | Compare deux doubles |
| `Equals()` | `bool Equals(double obj)` | Vérifie l'égalité |
| `IsNaN()` | `static bool IsNaN(double d)` | Vérifie si la valeur est "Not a Number" |
| `IsInfinity()` | `static bool IsInfinity(double d)` | Vérifie si la valeur est infinie |
| `MaxValue` | `const double MaxValue` | Valeur maximale d'un double |
| `MinValue` | `const double MinValue` | Valeur minimale d'un double |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        double nombre = 3.14159;
        
        // ToString() - Convertir en chaîne
        Console.WriteLine($"En texte: {nombre.ToString()}"); // Affiche: "3.14159"
        
        // Formatage personnalisé
        Console.WriteLine($"2 décimales: {nombre.ToString("F2")}"); // "3.14"
        Console.WriteLine($"4 décimales: {nombre.ToString("F4")}"); // "3.1416"
        Console.WriteLine($"Format pourcentage: {(0.85).ToString("P")}"); // "85.00%"
        Console.WriteLine($"Format scientifique: {(123456.789).ToString("E")}"); // "1.234568E+005"
        
        // Cas d'usage : afficher des prix
        double prix = 19.99;
        Console.WriteLine($"Prix: {prix.ToString("C")}"); // Format devise locale
        Console.WriteLine($"Prix: {prix.ToString("F2")} €"); // "19.99 €"
        
        // Parse() - Convertir depuis une chaîne
        double converti = double.Parse("2.718");
        Console.WriteLine($"Converti: {converti}"); // 2.718
        
        // Parse avec différents formats
        double nombre1 = double.Parse("3.14");
        double nombre2 = double.Parse("2.5e3"); // Notation scientifique: 2500
        Console.WriteLine($"Nombre1: {nombre1}, Nombre2: {nombre2}");
        
        // Attention aux séparateurs décimaux selon la culture
        try
        {
            double test1 = double.Parse("3.14"); // Point décimal (EN-US)
            double test2 = double.Parse("3,14"); // Virgule décimale (FR-FR)
            Console.WriteLine($"Test1: {test1}, Test2: {test2}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Erreur de format: {ex.Message}");
        }
        
        // TryParse() - Conversion sécurisée
        bool succes = double.TryParse("1.5", out double resultat);
        Console.WriteLine($"Conversion réussie: {succes}, Résultat: {resultat}"); // True, 1.5
        
        succes = double.TryParse("abc", out resultat);
        Console.WriteLine($"Conversion échouée: {succes}, Résultat: {resultat}"); // False, 0
        
        // Cas d'usage : calcul de moyennes
        string[] notesTexte = {"15.5", "12.0", "18.25", "abc", "14.75"};
        double somme = 0;
        int nombreNotes = 0;
        
        Console.WriteLine("Traitement des notes:");
        foreach (string noteTexte in notesTexte)
        {
            if (double.TryParse(noteTexte, out double note))
            {
                if (note >= 0 && note <= 20)
                {
                    somme += note;
                    nombreNotes++;
                    Console.WriteLine($"Note valide: {note}");
                }
                else
                {
                    Console.WriteLine($"Note hors limites: {note}");
                }
            }
            else
            {
                Console.WriteLine($"Format invalide: {noteTexte}");
            }
        }
        
        if (nombreNotes > 0)
        {
            double moyenne = somme / nombreNotes;
            Console.WriteLine($"Moyenne: {moyenne.ToString("F2")}");
        }
        
        // CompareTo() - Comparer
        double autre = 2.5;
        int comparaison = nombre.CompareTo(autre);
        Console.WriteLine($"3.14159 comparé à 2.5: {comparaison}"); // 1 (plus grand)
        
        // Attention avec les nombres à virgule flottante
        double a = 0.1 + 0.2;
        double b = 0.3;
        Console.WriteLine($"0.1 + 0.2 = {a}");
        Console.WriteLine($"0.3 = {b}");
        Console.WriteLine($"Sont-ils égaux? {a == b}"); // Probablement False !
        
        // Meilleure approche pour comparer les doubles
        double tolerance = 0.0001;
        bool approximativementEgaux = Math.Abs(a - b) < tolerance;
        Console.WriteLine($"Approximativement égaux? {approximativementEgaux}");
        
        // Cas d'usage : calculateur scientifique
        double[] valeurs = {2.5, 3.7, 1.2, 5.8, 4.1};
        
        // Trouver min et max
        double min = valeurs[0];
        double max = valeurs[0];
        
        foreach (double valeur in valeurs)
        {
            if (valeur.CompareTo(min) < 0) min = valeur;
            if (valeur.CompareTo(max) > 0) max = valeur;
        }
        
        Console.WriteLine($"Minimum: {min}, Maximum: {max}");
        Console.WriteLine($"Étendue: {(max - min).ToString("F2")}");
        
        // Gestion des valeurs spéciales
        double divisionParZero = 1.0 / 0.0; // Infinity
        double operationInvalide = Math.Sqrt(-1); // NaN
        double infiniNegatif = -1.0 / 0.0; // -Infinity
        
        Console.WriteLine($"Division par zéro: {divisionParZero}");
        Console.WriteLine($"Racine de -1: {operationInvalide}");
        Console.WriteLine($"Infini négatif: {infiniNegatif}");
        
        Console.WriteLine($"Est infini: {double.IsInfinity(divisionParZero)}"); // True
        Console.WriteLine($"Est NaN: {double.IsNaN(operationInvalide)}"); // True
        Console.WriteLine($"Est infini positif: {double.IsPositiveInfinity(divisionParZero)}"); // True
        Console.WriteLine($"Est infini négatif: {double.IsNegativeInfinity(infiniNegatif)}"); // True
        
        // Cas d'usage : validation de calculs
        double[] operations = {Math.Sqrt(4), Math.Sqrt(-1), 10.0/0.0, 0.0/0.0};
        string[] descriptions = {"Racine de 4", "Racine de -1", "10/0", "0/0"};
        
        for (int i = 0; i < operations.Length; i++)
        {
            double operation = operations[i];
            string description = descriptions[i];
            
            Console.WriteLine($"{description}: {operation}");
            
            if (double.IsNaN(operation))
            {
                Console.WriteLine("  → Résultat invalide (NaN)");
            }
            else if (double.IsInfinity(operation))
            {
                Console.WriteLine("  → Résultat infini");
            }
            else
            {
                Console.WriteLine($"  → Résultat valide: {operation.ToString("F2")}");
            }
        }
        
        // Cas d'usage : calculs financiers
        double capitalInitial = 1000.0;
        double tauxInteret = 0.05; // 5%
        int annees = 10;
        
        double capitalFinal = capitalInitial;
        Console.WriteLine($"Capital initial: {capitalInitial.ToString("C")}");
        Console.WriteLine($"Taux d'intérêt: {tauxInteret.ToString("P")}");
        
        for (int annee = 1; annee <= annees; annee++)
        {
            capitalFinal *= (1 + tauxInteret);
            Console.WriteLine($"Année {annee}: {capitalFinal.ToString("C")}");
        }
        
        double benefice = capitalFinal - capitalInitial;
        Console.WriteLine($"Bénéfice total: {benefice.ToString("C")}");
        
        // Limites
        Console.WriteLine($"Valeur max: {double.MaxValue}");
        Console.WriteLine($"Valeur min: {double.MinValue}");
        Console.WriteLine($"Plus petite valeur positive: {double.Epsilon}");
        
        // Cas d'usage : détection de débordement
        double grandNombre = double.MaxValue;
        double resultatMultiplication = grandNombre * 2;
        
        if (double.IsInfinity(resultatMultiplication))
        {
            Console.WriteLine("Attention: Débordement détecté, résultat infini");
        }
        else
        {
            Console.WriteLine($"Multiplication réussie: {resultatMultiplication}");
        }
    }
}
```

## 4. Type `bool`

Le type `bool` a des méthodes simples mais importantes.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `ToString()` | `string ToString()` | Convertit le booléen en chaîne |
| `Parse()` | `static bool Parse(string value)` | Convertit une chaîne en booléen |
| `TryParse()` | `static bool TryParse(string value, out bool result)` | Tente de convertir une chaîne en booléen |
| `CompareTo()` | `int CompareTo(bool value)` | Compare deux booléens |
| `Equals()` | `bool Equals(bool obj)` | Vérifie l'égalité |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        bool vrai = true;
        bool faux = false;
        
        // ToString() - Convertir en chaîne
        Console.WriteLine($"Vrai en texte: {vrai.ToString()}"); // "True"
        Console.WriteLine($"Faux en texte: {faux.ToString()}"); // "False"
        
        // Cas d'usage : afficher l'état d'un système
        bool serveurActif = true;
        bool maintenanceEnCours = false;
        Console.WriteLine($"Serveur actif: {serveurActif.ToString()}");
        Console.WriteLine($"Maintenance: {maintenanceEnCours.ToString()}");
        
        // Parse() - Convertir depuis une chaîne
        bool converti1 = bool.Parse("True");
        bool converti2 = bool.Parse("false"); // Insensible à la casse
        bool converti3 = bool.Parse("TRUE");
        Console.WriteLine($"Converti1: {converti1}"); // True
        Console.WriteLine($"Converti2: {converti2}"); // False
        Console.WriteLine($"Converti3: {converti3}"); // True
        
        // Attention aux exceptions avec Parse()
        try
        {
            bool erreur = bool.Parse("yes"); // Lève une exception
        }
        catch (FormatException)
        {
            Console.WriteLine("Erreur: seuls 'true' et 'false' sont acceptés par Parse()");
        }
        
        // TryParse() - Conversion sécurisée
        bool succes = bool.TryParse("yes", out bool resultat);
        Console.WriteLine($"Conversion de 'yes' réussie: {succes}"); // False
        Console.WriteLine($"Résultat: {resultat}"); // False (valeur par défaut)
        
        succes = bool.TryParse("TRUE", out resultat);
        Console.WriteLine($"Conversion de 'TRUE' réussie: {succes}, Résultat: {resultat}"); // True, True
        
        // Cas d'usage : traitement d'entrées utilisateur variées
        string[] entrees = {"true", "false", "TRUE", "False", "yes", "no", "1", "0", "oui"};
        
        foreach (string entree in entrees)
        {
            Console.WriteLine($"Traitement de '{entree}':");
            
            if (bool.TryParse(entree, out bool valeurBool))
            {
                Console.WriteLine($"  → Valeur booléenne: {valeurBool}");
            }
            else
            {
                // Logique personnalisée pour d'autres formats
                string entreeLower = entree.ToLower();
                if (entreeLower == "yes" || entreeLower == "oui" || entreeLower == "1")
                {
                    Console.WriteLine($"  → Interprété comme: True");
                }
                else if (entreeLower == "no" || entreeLower == "non" || entreeLower == "0")
                {
                    Console.WriteLine($"  → Interprété comme: False");
                }
                else
                {
                    Console.WriteLine($"  → Format non reconnu");
                }
            }
        }
        
        // CompareTo() - Comparer (false < true)
        int comparaison = vrai.CompareTo(faux);
        Console.WriteLine($"true comparé à false: {comparaison}"); // 1
        
        comparaison = faux.CompareTo(vrai);
        Console.WriteLine($"false comparé à true: {comparaison}"); // -1
        
        comparaison = vrai.CompareTo(true);
        Console.WriteLine($"true comparé à true: {comparaison}"); // 0
        
        // Cas d'usage : tri de valeurs booléennes
        bool[] valeurs = {true, false, true, false, true};
        Console.WriteLine("Avant tri:");
        foreach (bool val in valeurs)
        {
            Console.Write($"{val} ");
        }
        Console.WriteLine();
        
        // Tri simple (false en premier, true en second)
        Array.Sort(valeurs); // Utilise CompareTo automatiquement
        Console.WriteLine("Après tri:");
        foreach (bool val in valeurs)
        {
            Console.Write($"{val} ");
        }
        Console.WriteLine();
        
        // Equals() - Vérifier l'égalité
        bool egal = vrai.Equals(true);
        Console.WriteLine($"Égalité: {egal}"); // True
        
        bool different = faux.Equals(true);
        Console.WriteLine($"Différent: {different}"); // False
        
        // Cas d'usage : système de permissions
        bool estAdministrateur = true;
        bool estConnecte = true;
        bool aAccesFichier = false;
        
        Console.WriteLine("Vérification des permissions:");
        
        if (estConnecte.Equals(true))
        {
            Console.WriteLine("✓ Utilisateur connecté");
            
            if (estAdministrateur.Equals(true))
            {
                Console.WriteLine("✓ Droits administrateur");
                Console.WriteLine("→ Accès total autorisé");
            }
            else if (aAccesFichier.Equals(true))
            {
                Console.WriteLine("✓ Accès fichier autorisé");
                Console.WriteLine("→ Accès limité aux fichiers");
            }
            else
            {
                Console.WriteLine("✗ Aucun droit spécial");
                Console.WriteLine("→ Accès de base seulement");
            }
        }
        else
        {
            Console.WriteLine("✗ Utilisateur non connecté");
            Console.WriteLine("→ Accès refusé");
        }
        
        // Cas d'usage pratique : validation de formulaire
        bool nomValide = true;
        bool emailValide = false;
        bool ageValide = true;
        bool conditionsAcceptees = false;
        
        Console.WriteLine("\nValidation du formulaire:");
        Console.WriteLine($"Nom valide: {nomValide}");
        Console.WriteLine($"Email valide: {emailValide}");
        Console.WriteLine($"Âge valide: {ageValide}");
        Console.WriteLine($"Conditions acceptées: {conditionsAcceptees}");
        
        bool formulaireValide = nomValide && emailValide && ageValide && conditionsAcceptees;
        Console.WriteLine($"Formulaire complet: {formulaireValide}");
        
        if (formulaireValide.Equals(false))
        {
            Console.WriteLine("Erreurs à corriger:");
            if (!nomValide) Console.WriteLine("- Nom invalide");
            if (!emailValide) Console.WriteLine("- Email invalide");
            if (!ageValide) Console.WriteLine("- Âge invalide");
            if (!conditionsAcceptees) Console.WriteLine("- Conditions non acceptées");
        }
        
        // Cas d'usage : système de configuration
        bool[] parametres = new bool[5];
        string[] descriptions = {
            "Notifications activées",
            "Mode sombre",
            "Sauvegarde automatique",
            "Sons activés",
            "Mise à jour automatique"
        };
        
        // Simuler quelques paramètres activés
        parametres[0] = true;  // Notifications
        parametres[2] = true;  // Sauvegarde auto
        parametres[4] = false; // Pas de MAJ auto
        
        Console.WriteLine("\nConfiguration actuelle:");
        for (int i = 0; i < parametres.Length; i++)
        {
            string statut = parametres[i].ToString();
            string icone = parametres[i] ? "✓" : "✗";
            Console.WriteLine($"{icone} {descriptions[i]}: {statut}");
        }
        
        // Compter les fonctionnalités activées
        int fonctionnalitesActivees = 0;
        foreach (bool parametre in parametres)
        {
            if (parametre.Equals(true))
            {
                fonctionnalitesActivees++;
            }
        }
        
        Console.WriteLine($"Fonctionnalités activées: {fonctionnalitesActivees}/{parametres.Length}");
        
        // Cas d'usage : système de validation en chaîne
        bool etape1Complete = true;
        bool etape2Complete = true;
        bool etape3Complete = false;
        bool etape4Complete = false;
        
        Console.WriteLine("\nProcessus de validation:");
        
        if (etape1Complete)
        {
            Console.WriteLine("Étape 1: ✓ Complète");
            
            if (etape2Complete)
            {
                Console.WriteLine("Étape 2: ✓ Complète");
                
                if (etape3Complete)
                {
                    Console.WriteLine("Étape 3: ✓ Complète");
                    
                    if (etape4Complete)
                    {
                        Console.WriteLine("Étape 4: ✓ Complète");
                        Console.WriteLine("→ Processus entièrement terminé!");
                    }
                    else
                    {
                        Console.WriteLine("Étape 4: ✗ En attente");
                        Console.WriteLine("→ Processus en cours...");
                    }
                }
                else
                {
                    Console.WriteLine("Étape 3: ✗ En attente");
                    Console.WriteLine("→ Arrêt à l'étape 3");
                }
            }
            else
            {
                Console.WriteLine("Étape 2: ✗ En attente");
                Console.WriteLine("→ Arrêt à l'étape 2");
            }
        }
        else
        {
            Console.WriteLine("Étape 1: ✗ En attente");
            Console.WriteLine("→ Le processus ne peut pas commencer");
        }
    }
}
```

## 5. Type `char`

Le type `char` représente un caractère Unicode et possède des méthodes utiles pour la manipulation des caractères.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `ToString()` | `string ToString()` | Convertit le caractère en chaîne |
| `IsLetter()` | `static bool IsLetter(char c)` | Vérifie si c'est une lettre |
| `IsDigit()` | `static bool IsDigit(char c)` | Vérifie si c'est un chiffre |
| `IsWhiteSpace()` | `static bool IsWhiteSpace(char c)` | Vérifie si c'est un espace |
| `IsUpper()` | `static bool IsUpper(char c)` | Vérifie si c'est une majuscule |
| `IsLower()` | `static bool IsLower(char c)` | Vérifie si c'est une minuscule |
| `ToUpper()` | `static char ToUpper(char c)` | Convertit en majuscule |
| `ToLower()` | `static char ToLower(char c)` | Convertit en minuscule |
| `CompareTo()` | `int CompareTo(char value)` | Compare deux caractères |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        char lettre = 'A';
        char chiffre = '5';
        char espace = ' ';
        char minuscule = 'b';
        char caractereSpecial = '@';
        
        // ToString() - Convertir en chaîne
        Console.WriteLine($"Lettre en texte: '{lettre.ToString()}'"); // "A"
        
        // Cas d'usage : construire une chaîne caractère par caractère
        char[] caracteres = {'H', 'e', 'l', 'l', 'o'};
        string motConstruit = "";
        foreach (char c in caracteres)
        {
            motConstruit += c.ToString();
        }
        Console.WriteLine($"Mot construit: {motConstruit}");
        
        // IsLetter() - Vérifier si c'est une lettre
        Console.WriteLine($"'{lettre}' est une lettre: {char.IsLetter(lettre)}"); // True
        Console.WriteLine($"'{chiffre}' est une lettre: {char.IsLetter(chiffre)}"); // False
        Console.WriteLine($"'{caractereSpecial}' est une lettre: {char.IsLetter(caractereSpecial)}"); // False
        
        // IsDigit() - Vérifier si c'est un chiffre
        Console.WriteLine($"'{chiffre}' est un chiffre: {char.IsDigit(chiffre)}"); // True
        Console.WriteLine($"'{lettre}' est un chiffre: {char.IsDigit(lettre)}"); // False
        
        // Cas d'usage : extraire les chiffres d'une chaîne
        string texteAvecChiffres = "Mon code est ABC123XYZ789";
        string chiffresExtraits = "";
        foreach (char c in texteAvecChiffres)
        {
            if (char.IsDigit(c))
            {
                chiffresExtraits += c;
            }
        }
        Console.WriteLine($"Chiffres extraits: {chiffresExtraits}"); // "123789"
        
        // IsWhiteSpace() - Vérifier si c'est un espace
        Console.WriteLine($"Espace détecté: {char.IsWhiteSpace(espace)}"); // True
        Console.WriteLine($"Tab détecté: {char.IsWhiteSpace('\t')}"); // True
        Console.WriteLine($"Nouvelle ligne détectée: {char.IsWhiteSpace('\n')}"); // True
        
        // Cas d'usage : compter les espaces dans un texte
        string phrase = "Bonjour tout le monde!";
        int nombreEspaces = 0;
        foreach (char c in phrase)
        {
            if (char.IsWhiteSpace(c))
            {
                nombreEspaces++;
            }
        }
        Console.WriteLine($"Nombre d'espaces dans '{phrase}': {nombreEspaces}");
        
        // IsUpper() et IsLower() - Vérifier la casse
        Console.WriteLine($"'{lettre}' est majuscule: {char.IsUpper(lettre)}"); // True
        Console.WriteLine($"'{minuscule}' est minuscule: {char.IsLower(minuscule)}"); // True
        
        // Cas d'usage : analyser la casse d'un mot de passe
        string motDePasse = "MonMotDePasse123!";
        bool aMajuscule = false;
        bool aMinuscule = false;
        bool aChiffre = false;
        bool aSpecial = false;
        
        foreach (char c in motDePasse)
        {
            if (char.IsUpper(c)) aMajuscule = true;
            else if (char.IsLower(c)) aMinuscule = true;
            else if (char.IsDigit(c)) aChiffre = true;
            else if (!char.IsWhiteSpace(c)) aSpecial = true;
        }
        
        Console.WriteLine($"Analyse du mot de passe '{motDePasse}':");
        Console.WriteLine($"  Majuscules: {aMajuscule}");
        Console.WriteLine($"  Minuscules: {aMinuscule}");
        Console.WriteLine($"  Chiffres: {aChiffre}");
        Console.WriteLine($"  Caractères spéciaux: {aSpecial}");
        
        int criteres = (aMajuscule ? 1 : 0) + (aMinuscule ? 1 : 0) + (aChiffre ? 1 : 0) + (aSpecial ? 1 : 0);
        Console.WriteLine($"  Force: {criteres}/4 critères respectés");
        
        // ToUpper() et ToLower() - Changer la casse
        char majuscule = char.ToUpper(minuscule);
        char nouveauMinuscule = char.ToLower(lettre);
        Console.WriteLine($"'{minuscule}' en majuscule: '{majuscule}'"); // 'B'
        Console.WriteLine($"'{lettre}' en minuscule: '{nouveauMinuscule}'"); // 'a'
        
        // Cas d'usage : normaliser la casse d'une chaîne
        string entreeUtilisateur = "hElLo WoRlD";
        string normalise = "";
        foreach (char c in entreeUtilisateur)
        {
            normalise += char.ToLower(c);
        }
        Console.WriteLine($"Entrée normalisée: '{normalise}'");
        
        // Cas d'usage : créer un titre avec première lettre majuscule
        string[] mots = {"bonjour", "tout", "le", "monde"};
        string titre = "";
        foreach (string mot in mots)
        {
            if (mot.Length > 0)
            {
                string motFormate = char.ToUpper(mot[0]) + mot.Substring(1).ToLower();
                titre += motFormate + " ";
            }
        }
        Console.WriteLine($"Titre formaté: '{titre.Trim()}'"); // "Bonjour Tout Le Monde"
        
        // CompareTo() - Comparer (ordre ASCII)
        int comparaison = lettre.CompareTo(minuscule);
        Console.WriteLine($"'{lettre}' comparé à '{minuscule}': {comparaison}"); // -33 (A < b en ASCII)
        
        char a1 = 'A';
        char a2 = 'B';
        char a3 = 'a';
        
        Console.WriteLine($"'{a1}' comparé à '{a2}': {a1.CompareTo(a2)}"); // -1 (A < B)
        Console.WriteLine($"'{a2}' comparé à '{a1}': {a2.CompareTo(a1)}"); // 1 (B > A)
        Console.WriteLine($"'{a1}' comparé à '{a3}': {a1.CompareTo(a3)}"); // -32 (A < a)
        
        // Cas d'usage : tri de caractères
        char[] caracteresTri = {'z', 'A', 'm', 'B', 'c'};
        Console.WriteLine("Avant tri:");
        foreach (char c in caracteresTri)
        {
            Console.Write($"{c} ");
        }
        Console.WriteLine();
        
        Array.Sort(caracteresTri); // Utilise CompareTo
        Console.WriteLine("Après tri (ASCII):");
        foreach (char c in caracteresTri)
        {
            Console.Write($"{c} ");
        }
        Console.WriteLine();
        
        // IsLetterOrDigit() - Combiner les vérifications
        string chaineComplexe = "Abc123!@#";
        Console.WriteLine($"Analyse de '{chaineComplexe}':");
        foreach (char c in chaineComplexe)
        {
            if (char.IsLetterOrDigit(c))
            {
                Console.WriteLine($"  '{c}' est alphanumérique");
            }
            else
            {
                Console.WriteLine($"  '{c}' est un caractère spécial");
            }
        }
        
        // IsPunctuation() - Vérifier la ponctuation
        string texteAvecPonctuation = "Bonjour, comment allez-vous?";
        int nombrePonctuations = 0;
        foreach (char c in texteAvecPonctuation)
        {
            if (char.IsPunctuation(c))
            {
                nombrePonctuations++;
                Console.WriteLine($"Ponctuation trouvée: '{c}'");
            }
        }
        Console.WriteLine($"Nombre total de ponctuations: {nombrePonctuations}");
        
        // IsSymbol() - Vérifier les symboles
        string texteAvecSymboles = "Prix: 50€ + 10% = 55€";
        foreach (char c in texteAvecSymboles)
        {
            if (char.IsSymbol(c))
            {
                Console.WriteLine($"Symbole trouvé: '{c}'");
            }
        }
        
        // Exemple pratique : analyser une chaîne complète
        string texte = "Hello World 123! @#$";
        int lettres = 0, chiffres = 0, espaces = 0, ponctuation = 0, symboles = 0, autres = 0;
        
        foreach (char c in texte)
        {
            if (char.IsLetter(c)) lettres++;
            else if (char.IsDigit(c)) chiffres++;
            else if (char.IsWhiteSpace(c)) espaces++;
            else if (char.IsPunctuation(c)) ponctuation++;
            else if (char.IsSymbol(c)) symboles++;
            else autres++;
        }
        
        Console.WriteLine($"\nAnalyse complète de '{texte}':");
        Console.WriteLine($"  Lettres: {lettres}");
        Console.WriteLine($"  Chiffres: {chiffres}");
        Console.WriteLine($"  Espaces: {espaces}");
        Console.WriteLine($"  Ponctuation: {ponctuation}");
        Console.WriteLine($"  Symboles: {symboles}");
        Console.WriteLine($"  Autres: {autres}");
        Console.WriteLine($"  Total: {texte.Length} caractères");
        
        // Cas d'usage : valider un nom d'utilisateur
        string[] nomsUtilisateurs = {"Alice123", "Bob_Smith", "Charlie!", "user@domain", "valid_user"};
        
        foreach (string nom in nomsUtilisateurs)
        {
            bool estValide = true;
            string raison = "";
            
            // Règles: seulement lettres, chiffres et underscore
            foreach (char c in nom)
            {
                if (!char.IsLetterOrDigit(c) && c != '_')
                {
                    estValide = false;
                    raison = $"Caractère invalide: '{c}'";
                    break;
                }
            }
            
            if (estValide && nom.Length < 3)
            {
                estValide = false;
                raison = "Trop court (minimum 3 caractères)";
            }
            
            if (estValide && char.IsDigit(nom[0]))
            {
                estValide = false;
                raison = "Ne peut pas commencer par un chiffre";
            }
            
            Console.WriteLine($"Nom d'utilisateur '{nom}': {(estValide ? "✓ Valide" : "✗ Invalide - " + raison)}");
        }
        
        // Exemple : générer un mot de passe aléatoire
        Random random = new Random();
        string motDePasseGenere = "";
        string caracteresPossibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        
        for (int i = 0; i < 12; i++) // Mot de passe de 12 caractères
        {
            int index = random.Next(caracteresPossibles.Length);
            motDePasseGenere += caracteresPossibles[index];
        }
        
        Console.WriteLine($"\nMot de passe généré: {motDePasseGenere}");
        
        // Vérifier qu'il respecte les critères
        bool genereMajuscule = false, genereMinuscule = false, genereChiffre = false, genereSpecial = false;
        foreach (char c in motDePasseGenere)
        {
            if (char.IsUpper(c)) genereMajuscule = true;
            else if (char.IsLower(c)) genereMinuscule = true;
            else if (char.IsDigit(c)) genereChiffre = true;
            else genereSpecial = true;
        }
        
        Console.WriteLine("Vérification du mot de passe généré:");
        Console.WriteLine($"  ✓ Longueur suffisante: {motDePasseGenere.Length >= 8}");
        Console.WriteLine($"  {(genereMajuscule ? "✓" : "✗")} Contient majuscules: {genereMajuscule}");
        Console.WriteLine($"  {(genereMinuscule ? "✓" : "✗")} Contient minuscules: {genereMinuscule}");
        Console.WriteLine($"  {(genereChiffre ? "✓" : "✗")} Contient chiffres: {genereChiffre}");
        Console.WriteLine($"  {(genereSpecial ? "✓" : "✗")} Contient caractères spéciaux: {genereSpecial}");
    }
}
```

## 6. Type `DateTime`

Le type `DateTime` est très riche en méthodes pour manipuler les dates et heures.

### Tableau des méthodes principales

| Méthode | Signature | Description |
|---------|-----------|-------------|
| `Now` | `static DateTime Now { get; }` | Date et heure actuelles |
| `Today` | `static DateTime Today { get; }` | Date d'aujourd'hui (minuit) |
| `ToString()` | `string ToString()` | Convertit en chaîne |
| `AddDays()` | `DateTime AddDays(double value)` | Ajoute des jours |
| `AddHours()` | `DateTime AddHours(double value)` | Ajoute des heures |
| `AddMinutes()` | `DateTime AddMinutes(double value)` | Ajoute des minutes |
| `AddYears()` | `DateTime AddYears(int value)` | Ajoute des années |
| `Subtract()` | `TimeSpan Subtract(DateTime value)` | Calcule la différence |
| `CompareTo()` | `int CompareTo(DateTime value)` | Compare deux dates |
| `Parse()` | `static DateTime Parse(string s)` | Convertit une chaîne en DateTime |
| `Year` | `int Year { get; }` | Année |
| `Month` | `int Month { get; }` | Mois |
| `Day` | `int Day { get; }` | Jour |
| `Hour` | `int Hour { get; }` | Heure |
| `Minute` | `int Minute { get; }` | Minute |
| `Second` | `int Second { get; }` | Seconde |

### Exemples pratiques

```csharp
using System;

class Program
{
    static void Main()
    {
        // Now et Today - Obtenir la date/heure actuelle
        DateTime maintenant = DateTime.Now;
        DateTime aujourdhui = DateTime.Today;
        
        Console.WriteLine($"Maintenant: {maintenant}");
        Console.WriteLine($"Aujourd'hui: {aujourdhui}");
        
        // Propriétés de date
        Console.WriteLine($"Année: {maintenant.Year}");
        Console.WriteLine($"Mois: {maintenant.Month}");
        Console.WriteLine($"Jour: {maintenant.Day}");
        Console.WriteLine($"Heure: {maintenant.Hour}");
        Console.WriteLine($"Minute: {maintenant.Minute}");
        Console.WriteLine($"Seconde: {maintenant.Second}");
        Console.WriteLine($"Jour de la semaine: {maintenant.DayOfWeek}");
        Console.WriteLine($"Jour de l'année: {maintenant.DayOfYear}");
        
        // Cas d'usage : afficher la date en français
        string[] joursEnFrancais = {"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"};
        string[] moisEnFrancais = {"", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                                  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"};
        
        string jourFrancais = joursEnFrancais[(int)maintenant.DayOfWeek];
        string moisFrancais = moisEnFrancais[maintenant.Month];
        Console.WriteLine($"Aujourd'hui c'est {jourFrancais} {maintenant.Day} {moisFrancais} {maintenant.Year}");
        
        // ToString() - Formatage
        Console.WriteLine($"Format par défaut: {maintenant.ToString()}");
        Console.WriteLine($"Date courte: {maintenant.ToString("d")}");
        Console.WriteLine($"Heure courte: {maintenant.ToString("t")}");
        Console.WriteLine($"Date longue: {maintenant.ToString("D")}");
        Console.WriteLine($"Heure longue: {maintenant.ToString("T")}");
        Console.WriteLine($"Format complet: {maintenant.ToString("F")}");
        Console.WriteLine($"Format personnalisé: {maintenant.ToString("dd/MM/yyyy HH:mm")}");
        Console.WriteLine($"Format international: {maintenant.ToString("yyyy-MM-dd HH:mm:ss")}");
        
        // Cas d'usage : formats pour différents contextes
        Console.WriteLine("\nFormats pour différents usages:");
        Console.WriteLine($"Nom de fichier: {maintenant.ToString("yyyyMMdd_HHmmss")}");
        Console.WriteLine($"Format email: {maintenant.ToString("ddd, dd MMM yyyy HH:mm:ss")}");
        Console.WriteLine($"Format pour base de données: {maintenant.ToString("yyyy-MM-dd HH:mm:ss.fff")}");
        
        // Add methods - Ajouter du temps
        DateTime demain = maintenant.AddDays(1);
        DateTime dansUneHeure = maintenant.AddHours(1);
        DateTime lAnneeProchaine = maintenant.AddYears(1);
        DateTime laSemaineProchaine = maintenant.AddDays(7);
        DateTime leMoisProchain = maintenant.AddMonths(1);
        DateTime dansUneMinute = maintenant.AddMinutes(1);
        DateTime dansUneSeconde = maintenant.AddSeconds(1);
        
        Console.WriteLine($"\nCalculs de dates:");
        Console.WriteLine($"Demain: {demain.ToString("d")}");
        Console.WriteLine($"Dans une heure: {dansUneHeure.ToString("t")}");
        Console.WriteLine($"L'année prochaine: {lAnneeProchaine.ToString("d")}");
        Console.WriteLine($"La semaine prochaine: {laSemaineProchaine.ToString("d")}");
        Console.WriteLine($"Le mois prochain: {leMoisProchain.ToString("d")}");
        
        // Cas d'usage : calculer des échéances
        DateTime dateAchat = new DateTime(2024, 1, 15);
        DateTime garantieExpire = dateAchat.AddYears(2);
        DateTime rappelGarantie = garantieExpire.AddMonths(-1); // Un mois avant
        
        Console.WriteLine($"\nGestion de garantie:");
        Console.WriteLine($"Date d'achat: {dateAchat.ToString("d")}");
        Console.WriteLine($"Garantie expire le: {garantieExpire.ToString("d")}");
        Console.WriteLine($"Rappel programmé le: {rappelGarantie.ToString("d")}");
        
        // Subtract() - Calculer des différences
        DateTime anniversaire = new DateTime(2000, 6, 15);
        TimeSpan age = maintenant.Subtract(anniversaire);
        Console.WriteLine($"\nCalcul d'âge:");
        Console.WriteLine($"Anniversaire: {anniversaire.ToString("d")}");
        Console.WriteLine($"Jours depuis le 15/06/2000: {age.Days}");
        Console.WriteLine($"Années approximatives: {age.Days / 365.25:F1}");
        Console.WriteLine($"Heures totales: {age.TotalHours:F0}");
        Console.WriteLine($"Minutes totales: {age.TotalMinutes:F0}");
        
        // Cas d'usage : calculer le temps de travail
        DateTime debutTravail = new DateTime(2024, 1, 1, 9, 0, 0);
        DateTime finTravail = new DateTime(2024, 1, 1, 17, 30, 0);
        TimeSpan dureeeTravail = finTravail.Subtract(debutTravail);
        
        Console.WriteLine($"\nJournée de travail:");
        Console.WriteLine($"Début: {debutTravail.ToString("HH:mm")}");
        Console.WriteLine($"Fin: {finTravail.ToString("HH:mm")}");
        Console.WriteLine($"Durée: {dureeeTravail.Hours}h {dureeeTravail.Minutes}min");
        Console.WriteLine($"Total en heures: {dureeeTravail.TotalHours:F2}h");
        
        // CompareTo() - Comparer des dates
        DateTime dateA = new DateTime(2023, 1, 1);
        DateTime dateB = new DateTime(2023, 12, 31);
        DateTime dateC = new DateTime(2023, 1, 1);
        
        int comparaison = dateA.CompareTo(dateB);
        Console.WriteLine($"\nComparaisons:");
        Console.WriteLine($"01/01/2023 comparé à 31/12/2023: {comparaison}"); // -1 (antérieur)
        Console.WriteLine($"31/12/2023 comparé à 01/01/2023: {dateB.CompareTo(dateA)}"); // 1 (postérieur)
        Console.WriteLine($"01/01/2023 comparé à 01/01/2023: {dateA.CompareTo(dateC)}"); // 0 (égal)
        
        // Cas d'usage : trier des dates
        DateTime[] dates = {
            new DateTime(2023, 5, 15),
            new DateTime(2023, 1, 10),
            new DateTime(2023, 12, 25),
            new DateTime(2023, 3, 8)
        };
        
        Console.WriteLine("Dates avant tri:");
        foreach (DateTime date in dates)
        {
            Console.WriteLine($"  {date.ToString("d")}");
        }
        
        Array.Sort(dates); // Utilise CompareTo
        Console.WriteLine("Dates après tri:");
        foreach (DateTime date in dates)
        {
            Console.WriteLine($"  {date.ToString("d")}");
        }
        
        // Parse() - Convertir depuis une chaîne
        DateTime dateParsee = DateTime.Parse("25/12/2023");
        Console.WriteLine($"\nDate parsée: {dateParsee.ToString("d")}");
        
        // TryParse pour éviter les erreurs
        string[] datesTexte = {"25/12/2023", "2023-12-25", "invalid date", "01/01/2025"};
        foreach (string dateTexte in datesTexte)
        {
            if (DateTime.TryParse(dateTexte, out DateTime dateConvertie))
            {
                Console.WriteLine($"'{dateTexte}' → {dateConvertie.ToString("d")}");
            }
            else
            {
                Console.WriteLine($"'{dateTexte}' → Format invalide");
            }
        }
        
        // Exemple pratique : calculer l'âge exact
        DateTime dateNaissance = new DateTime(1995, 3, 20);
        int ageEnAnnees = DateTime.Today.Year - dateNaissance.Year;
        
        // Ajuster si l'anniversaire n'a pas encore eu lieu cette année
        if (DateTime.Today < dateNaissance.AddYears(ageEnAnnees))
        {
            ageEnAnnees--;
        }
        
        Console.WriteLine($"\nCalcul d'âge précis:");
        Console.WriteLine($"Date de naissance: {dateNaissance.ToString("d")}");
        Console.WriteLine($"Âge calculé: {ageEnAnnees} ans");
        
        // Calculer l'âge en années, mois et jours
        DateTime prochainniversaire = dateNaissance.AddYears(ageEnAnnees + 1);
        DateTime dernierAnniversaire = dateNaissance.AddYears(ageEnAnnees);
        
        int moisDepuisAnniversaire = DateTime.Today.Month - dernierAnniversaire.Month;
        int joursDepuisAnniversaire = DateTime.Today.Day - dernierAnniversaire.Day;
        
        if (joursDepuisAnniversaire < 0)
        {
            moisDepuisAnniversaire--;
            DateTime dernierMois = DateTime.Today.AddMonths(-1);
            joursDepuisAnniversaire += DateTime.DaysInMonth(dernierMois.Year, dernierMois.Month);
        }
        
        if (moisDepuisAnniversaire < 0)
        {
            moisDepuisAnniversaire += 12;
        }
        
        Console.WriteLine($"Âge détaillé: {ageEnAnnees} ans, {moisDepuisAnniversaire} mois, {joursDepuisAnniversaire} jours");
        
        TimeSpan tempsAvantAnniversaire = prochainniversaire.Subtract(DateTime.Today);
        Console.WriteLine($"Jours avant le prochain anniversaire: {tempsAvantAnniversaire.Days}");
        
        // Cas d'usage : planificateur d'événements
        DateTime[] evenements = {
            new DateTime(2024, 12, 25), // Noël
            new DateTime(2024, 7, 14),  // Fête nationale
            new DateTime(2024, 1, 1),   // Nouvel an
            new DateTime(2024, 5, 1)    // Fête du travail
        };
        
        string[] nomsEvenements = {"Noël", "Fête nationale", "Nouvel an", "Fête du travail"};
        
        Console.WriteLine("\nProchainsevénements:");
        for (int i = 0; i < evenements.Length; i++)
        {
            TimeSpan tempsAvantEvenement = evenements[i].Subtract(DateTime.Today);
            
            if (tempsAvantEvenement.Days >= 0)
            {
                Console.WriteLine($"{nomsEvenements[i]}: dans {tempsAvantEvenement.Days} jours ({evenements[i].ToString("d")})");
            }
            else
            {
                Console.WriteLine($"{nomsEvenements[i]}: passé il y a {Math.Abs(tempsAvantEvenement.Days)} jours");
            }
        }
        
        // Cas d'usage : vérifier les jours ouvrables
        DateTime dateTest = DateTime.Today;
        for (int i = 0; i < 7; i++)
        {
            DateTime jourTest = dateTest.AddDays(i);
            bool estJourOuvrable = jourTest.DayOfWeek != DayOfWeek.Saturday && 
                                  jourTest.DayOfWeek != DayOfWeek.Sunday;
            
            string typeJour = estJourOuvrable ? "jour ouvrable" : "week-end";
            Console.WriteLine($"{jourTest.ToString("ddd dd/MM")}: {typeJour}");
        }
        
        // Cas d'usage : calculer des délais de livraison
        DateTime dateCommande = DateTime.Today;
        DateTime livraisonStandard = dateCommande.AddDays(5);
        DateTime livraisonExpress = dateCommande.AddDays(2);
        DateTime livraisonUrgente = dateCommande.AddHours(24);
        
        Console.WriteLine($"\nDélais de livraison pour commande du {dateCommande.ToString("d")}:");
        Console.WriteLine($"Livraison standard: {livraisonStandard.ToString("d")}");
        Console.WriteLine($"Livraison express: {livraisonExpress.ToString("d")}");
        Console.WriteLine($"Livraison urgente: {livraisonUrgente.ToString("dd/MM à HH:mm")}");
        
        // Exemple : système de réservation
        DateTime[] creneauxDisponibles = {
            new DateTime(2024, 10, 5, 9, 0, 0),
            new DateTime(2024, 10, 5, 11, 0, 0),
            new DateTime(2024, 10, 5, 14, 0, 0),
            new DateTime(2024, 10, 5, 16, 0, 0)
        };
        
        Console.WriteLine("\nCréneaux de réservation disponibles:");
        foreach (DateTime creneau in creneauxDisponibles)
        {
            DateTime finCreneau = creneau.AddHours(1.5); // Séance de 1h30
            Console.WriteLine($"De {creneau.ToString("HH:mm")} à {finCreneau.ToString("HH:mm")}");
        }
        
        // Vérifier si un créneau est dans les heures d'ouverture
        TimeSpan ouverture = new TimeSpan(8, 0, 0);  // 8h00
        TimeSpan fermeture = new TimeSpan(18, 0, 0); // 18h00
        
        foreach (DateTime creneau in creneauxDisponibles)
        {
            TimeSpan heureCreneau = creneau.TimeOfDay;
            bool estOuvert = heureCreneau >= ouverture && heureCreneau <= fermeture;
            Console.WriteLine($"Créneau {creneau.ToString("HH:mm")}: {(estOuvert ? "✓ Disponible" : "✗ Fermé")}");
        }
    }
}
```


## Conclusion

Les méthodes des types natifs de C# sont des outils puissants qui simplifient grandement la programmation. Elles permettent de :

- Manipuler et formater les chaînes de caractères efficacement
- Convertir entre différents types de données de manière sécurisée
- Effectuer des opérations sur les dates et heures
- Valider et analyser les données d'entrée

La maîtrise de ces méthodes est essentielle pour écrire du code C# efficace et robuste. N'hésitez pas à consulter la documentation officielle de Microsoft pour découvrir d'autres méthodes et leurs surcharges.