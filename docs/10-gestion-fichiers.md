# Gestion des Fichiers

## Introduction

La gestion des fichiers constitue l'une des compétences fondamentales en programmation moderne. Dans le monde réel, les applications doivent constamment interagir avec le système de fichiers : sauvegarder des configurations, traiter des données, générer des rapports, ou encore analyser des logs. C# offre un écosystème riche et bien structuré pour ces opérations à travers l'espace de noms `System.IO`.

### Pourquoi la gestion des fichiers est-elle importante ?

Dans la pratique, vous rencontrerez de nombreux scénarios où la manipulation de fichiers est nécessaire :
- **Persistance des données** : sauvegarder l'état d'une application entre deux exécutions
- **Configuration** : lire des paramètres depuis des fichiers de configuration
- **Import/Export** : traiter des données provenant d'autres systèmes (CSV, JSON, XML)
- **Logs et diagnostics** : enregistrer et analyser les activités d'une application
- **Traitement par lots** : automatiser le traitement de grandes quantités de fichiers

### Architecture du système de fichiers en .NET

Le framework .NET organise les opérations sur les fichiers autour de plusieurs classes spécialisées, chacune ayant un rôle spécifique :

**Classes statiques (méthodes utilitaires)** :
- `File` : opérations simples et directes sur les fichiers (lecture/écriture complète)
- `Directory` : opérations sur les dossiers et navigation dans l'arborescence
- `Path` : manipulation sécurisée des chemins d'accès, indépendante de l'OS

**Classes d'information (orientées objet)** :
- `FileInfo` : représentation orientée objet d'un fichier avec métadonnées détaillées
- `DirectoryInfo` : représentation orientée objet d'un dossier avec navigation

**Classes de flux (streaming)** :
- `StreamReader/StreamWriter` : lecture/écriture optimisée, particulièrement pour les gros fichiers
- `FileStream` : accès de bas niveau avec contrôle précis du positionnement

### Concepts clés à maîtriser

Avant de plonger dans les détails techniques, il est important de comprendre quelques concepts fondamentaux :

1. **Chemins absolus vs relatifs** : différence entre `C:\temp\fichier.txt` et `.\fichier.txt`
2. **Gestion des ressources** : pourquoi utiliser `using` pour éviter les fuites mémoire
3. **Gestion d'erreurs** : les exceptions courantes et comment les traiter
4. **Performance** : quand utiliser les méthodes "All" vs le streaming
5. **Sécurité** : vérifications d'existence et gestion des permissions

## 1. Lecture de fichiers

La lecture de fichiers est probablement l'opération la plus courante en gestion de fichiers. C# propose plusieurs approches, chacune adaptée à des contextes spécifiques. Le choix de la méthode dépend principalement de la taille du fichier, de l'utilisation mémoire souhaitée, et du type de traitement à effectuer.

### Comprendre les différentes approches de lecture

**Lecture complète en mémoire** : idéale pour les petits fichiers (< 10 MB) où vous avez besoin d'accéder rapidement à tout le contenu. L'ensemble du fichier est chargé en mémoire d'un coup.

**Lecture streaming (flux)** : recommandée pour les gros fichiers ou lorsque vous traitez le contenu ligne par ligne. Cette approche consomme une quantité de mémoire constante, indépendamment de la taille du fichier.

**Lecture asynchrone** : pour les applications avec interface utilisateur ou les services web, où vous ne voulez pas bloquer le thread principal pendant la lecture.

### Lire toutes les lignes d'un fichier

La méthode `File.ReadAllLines()` est la plus simple pour lire un fichier texte complet. Elle lit tout le contenu d'un fichier et le retourne sous forme de tableau de chaînes, où chaque élément représente une ligne du fichier original.

**Avantages** :
- Simplicité d'utilisation (une seule ligne de code)
- Accès direct à n'importe quelle ligne par index
- Idéal pour les fichiers de configuration, les petits datasets

**Inconvénients** :
- Charge tout le fichier en mémoire (problématique pour les gros fichiers)
- Peut lever une `OutOfMemoryException` pour de très gros fichiers

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        try
        {
            string cheminFichier = @"C:\temp\monFichier.txt";
            string[] lignes = File.ReadAllLines(cheminFichier);
            
            Console.WriteLine($"Le fichier contient {lignes.Length} lignes:");
            for (int i = 0; i < lignes.Length; i++)
            {
                Console.WriteLine($"Ligne {i + 1}: {lignes[i]}");
            }
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("Fichier non trouvé!");
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("Accès refusé au fichier!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur: {ex.Message}");
        }
    }
}
```

### Lire tout le contenu d'un fichier

Parfois, vous avez besoin de traiter le fichier comme une seule chaîne de caractères plutôt qu'un tableau de lignes. C'est particulièrement utile pour les fichiers de configuration JSON, XML, ou pour des opérations de recherche/remplacement globales.

```csharp
string contenu = File.ReadAllText(@"C:\temp\monFichier.txt");
Console.WriteLine(contenu);
```

### Lire un fichier ligne par ligne

La lecture ligne par ligne est une technique fondamentale pour traiter efficacement de gros fichiers. Cette approche utilise le pattern **streaming**, qui permet de traiter des fichiers de plusieurs gigaoctets sans saturer la mémoire de votre système.

**Principe du streaming** :
Le `StreamReader` maintient un buffer interne (généralement 4KB) et lit le fichier par petits blocs. Quand vous appelez `ReadLine()`, il retourne la prochaine ligne disponible dans le buffer, et recharge automatiquement le buffer quand nécessaire.

**Avantages** :
- Consommation mémoire constante et minimale
- Peut traiter des fichiers de taille arbitraire
- Permet l'arrêt prématuré du traitement (break dans la boucle)
- Idéal pour les analyses séquentielles (logs, CSV, données structurées)

**Quand l'utiliser** :
- Fichiers > 10 MB
- Traitement séquentiel (vous n'avez pas besoin d'accès aléatoire)
- Analyses en temps réel ou traitement par lots
- Quand la mémoire disponible est limitée

Pour les gros fichiers, il est préférable de lire ligne par ligne pour économiser la mémoire :

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string cheminFichier = @"C:\temp\monFichier.txt";
        
        try
        {
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
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur lors de la lecture: {ex.Message}");
        }
    }
}
```

### Exemple pratique : Analyser un fichier de logs

```csharp
static void AnalyserLogs(string cheminFichier)
{
    try
    {
        string[] lignes = File.ReadAllLines(cheminFichier);
        int erreurs = 0;
        int avertissements = 0;
        int infos = 0;
        
        foreach (string ligne in lignes)
        {
            if (ligne.ToUpper().Contains("ERROR"))
                erreurs++;
            else if (ligne.ToUpper().Contains("WARNING"))
                avertissements++;
            else if (ligne.ToUpper().Contains("INFO"))
                infos++;
        }
        
        Console.WriteLine($"Analyse du fichier de logs:");
        Console.WriteLine($"- Erreurs: {erreurs}");
        Console.WriteLine($"- Avertissements: {avertissements}");
        Console.WriteLine($"- Informations: {infos}");
        Console.WriteLine($"- Total de lignes: {lignes.Length}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}
```

## 2. Écriture de fichiers

L'écriture de fichiers est l'opération complémentaire de la lecture et tout aussi importante dans le développement d'applications. Comme pour la lecture, plusieurs stratégies s'offrent à vous selon le contexte d'usage. La compréhension des différents modes d'écriture est cruciale pour développer des applications robustes et performantes.

### Modes d'écriture : écrasement vs ajout

**Mode écrasement (overwrite)** : 
- Le contenu existant du fichier est complètement remplacé
- Utilisé par `WriteAllLines()`, `WriteAllText()`
- Idéal pour sauvegarder l'état complet d'une application

**Mode ajout (append)** :
- Le nouveau contenu est ajouté à la fin du fichier existant
- Utilisé par `AppendAllText()`, `AppendAllLines()`
- Parfait pour les logs, journaux d'activité, historiques

### Gestion automatique des ressources

L'écriture de fichiers implique souvent l'ouverture de handles (poignées) sur le système de fichiers. C# gère automatiquement ces ressources dans les méthodes statiques `File.*`, mais il est important de comprendre ce qui se passe en arrière-plan pour diagnostiquer d'éventuels problèmes de performance ou de blocage.

### Écrire toutes les lignes dans un fichier

La méthode `File.WriteAllLines()` est l'équivalent en écriture de `ReadAllLines()`. Elle prend un tableau de chaînes et crée un fichier où chaque élément du tableau devient une ligne.

**Comportement important** :
- Si le fichier existe, il est complètement écrasé
- Si le fichier n'existe pas, il est créé automatiquement
- Si le dossier parent n'existe pas, une exception est levée
- L'encodage par défaut est UTF-8 (recommandé pour la compatibilité internationale)

La méthode `File.WriteAllLines()` écrit un tableau de chaînes dans un fichier :

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string cheminFichier = @"C:\temp\nouveauFichier.txt";
        string[] lignes = {
            "Première ligne",
            "Deuxième ligne",
            "Troisième ligne avec la date: " + DateTime.Now.ToString()
        };
        
        try
        {
            File.WriteAllLines(cheminFichier, lignes);
            Console.WriteLine("Fichier créé avec succès!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur lors de l'écriture: {ex.Message}");
        }
    }
}
```

### Écrire tout le contenu d'un fichier

Pour écrire une seule chaîne :

```csharp
string contenu = "Ceci est le contenu de mon fichier.\nDeuxième ligne.";
File.WriteAllText(@"C:\temp\monFichier.txt", contenu);
```

### Ajouter du contenu à un fichier existant

```csharp
string nouvelleInformation = "\nNouvelle ligne ajoutée le " + DateTime.Now;
File.AppendAllText(@"C:\temp\monFichier.txt", nouvelleInformation);
```

### Écrire ligne par ligne avec contrôle

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string cheminFichier = @"C:\temp\journalActivites.txt";
        
        try
        {
            using (StreamWriter ecrivain = new StreamWriter(cheminFichier, append: true))
            {
                ecrivain.WriteLine($"Session démarrée le {DateTime.Now}");
                ecrivain.WriteLine("Action 1: Connexion utilisateur");
                ecrivain.WriteLine("Action 2: Chargement des données");
                ecrivain.WriteLine($"Session terminée le {DateTime.Now}");
            }
            
            Console.WriteLine("Journal mis à jour!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur: {ex.Message}");
        }
    }
}
```

### Exemple pratique : Sauvegarder des scores de jeu

```csharp
static void SauvegarderScore(string nomJoueur, int score)
{
    string cheminFichier = @"C:\temp\scores.txt";
    string ligneScore = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {nomJoueur}: {score} points";
    
    try
    {
        File.AppendAllLines(cheminFichier, new string[] { ligneScore });
        Console.WriteLine("Score sauvegardé!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur lors de la sauvegarde: {ex.Message}");
    }
}

static void AfficherMeilleursScores()
{
    string cheminFichier = @"C:\temp\scores.txt";
    
    try
    {
        if (File.Exists(cheminFichier))
        {
            string[] lignes = File.ReadAllLines(cheminFichier);
            Console.WriteLine("Historique des scores:");
            
            foreach (string ligne in lignes)
            {
                Console.WriteLine(ligne);
            }
        }
        else
        {
            Console.WriteLine("Aucun score enregistré.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}
```

## 3. Manipulation des chemins

La manipulation des chemins de fichiers est l'une des sources les plus communes d'erreurs en programmation, particulièrement dans des environnements multi-plateformes. Les systèmes Windows utilisent le backslash (`\`) comme séparateur, tandis que Linux et macOS utilisent le slash (`/`). La classe `Path` résout élégamment ce problème en fournissant des méthodes qui s'adaptent automatiquement à la plateforme d'exécution.

### Pourquoi éviter la concaténation manuelle ?

**Problèmes courants avec la concaténation manuelle** :
```csharp
// ❌ Problématique - ne fonctionne que sur Windows
string chemin = dossier + "\\" + nomFichier;

// ❌ Problématique - risque de double séparateur
string chemin = dossier + "/" + nomFichier; // peut donner "dossier//fichier"
```

**Avantages de la classe Path** :
- Gestion automatique des séparateurs selon l'OS
- Normalisation des chemins (suppression des doublons de séparateurs)
- Validation de base des caractères interdits
- Méthodes spécialisées pour extraire les composants

### Construction de chemins avec Path

La classe `Path` offre des méthodes robustes et cross-platform pour manipuler les chemins. Son utilisation est considérée comme une **bonne pratique obligatoire** dans le développement .NET moderne.

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        // Construire un chemin
        string dossierBase = @"C:\temp";
        string nomFichier = "monFichier.txt";
        string cheminComplet = Path.Combine(dossierBase, nomFichier);
        Console.WriteLine($"Chemin complet: {cheminComplet}");
        
        // Extraire les composants d'un chemin
        string chemin = @"C:\Users\Alice\Documents\rapport.pdf";
        Console.WriteLine($"Nom du fichier: {Path.GetFileName(chemin)}");
        Console.WriteLine($"Nom sans extension: {Path.GetFileNameWithoutExtension(chemin)}");
        Console.WriteLine($"Extension: {Path.GetExtension(chemin)}");
        Console.WriteLine($"Répertoire: {Path.GetDirectoryName(chemin)}");
        
        // Créer un nom de fichier temporaire
        string fichierTemp = Path.GetTempFileName();
        Console.WriteLine($"Fichier temporaire: {fichierTemp}");
        
        // Changer l'extension
        string nouveauChemin = Path.ChangeExtension(chemin, ".docx");
        Console.WriteLine($"Nouveau chemin: {nouveauChemin}");
    }
}
```

### Exemple pratique : Organiser des fichiers par extension

```csharp
static void OrganiserFichiers(string dossierSource)
{
    try
    {
        string[] fichiers = Directory.GetFiles(dossierSource);
        
        foreach (string fichier in fichiers)
        {
            string extension = Path.GetExtension(fichier).ToLower();
            string nomFichier = Path.GetFileName(fichier);
            
            if (!string.IsNullOrEmpty(extension))
            {
                // Créer un dossier pour l'extension (sans le point)
                string dossierExtension = Path.Combine(dossierSource, extension.Substring(1).ToUpper());
                
                if (!Directory.Exists(dossierExtension))
                {
                    Directory.CreateDirectory(dossierExtension);
                    Console.WriteLine($"Dossier créé: {dossierExtension}");
                }
                
                // Déplacer le fichier
                string destinationFichier = Path.Combine(dossierExtension, nomFichier);
                File.Move(fichier, destinationFichier);
                Console.WriteLine($"Déplacé: {nomFichier} → {dossierExtension}");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}
```

## 4. Manipulation des dossiers

La manipulation des dossiers (répertoires) est fondamentale pour organiser et naviguer dans le système de fichiers. Contrairement aux fichiers qui contiennent des données, les dossiers servent de conteneurs organisationnels qui structurent l'information de manière hiérarchique.

### Concepts fondamentaux de navigation

**Parcours simple vs récursif** :
- **Parcours simple** : examine uniquement le contenu direct d'un dossier (fichiers et sous-dossiers de premier niveau)
- **Parcours récursif** : explore en profondeur toute l'arborescence, descendant dans chaque sous-dossier

**Patterns de navigation courants** :
- **Inventaire** : lister le contenu pour affichage ou traitement
- **Recherche** : trouver des fichiers selon des critères spécifiques
- **Migration** : déplacer ou copier des structures complètes
- **Nettoyage** : supprimer des fichiers temporaires ou obsolètes

### Gestion des permissions et erreurs

Le parcours de dossiers peut rencontrer diverses restrictions système :
- **Permissions insuffisantes** : certains dossiers système sont protégés
- **Liens symboliques** : peuvent créer des boucles infinies dans le parcours récursif
- **Fichiers verrouillés** : en cours d'utilisation par d'autres processus
- **Chemins trop longs** : limitation Windows historique de 260 caractères

### Parcourir un dossier

L'exploration du contenu d'un dossier est une opération de base qui permet d'inventorier les ressources disponibles. Cette opération est non-destructive et constitue souvent la première étape de traitements plus complexes.

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string dossier = @"C:\temp";
        
        try
        {
            // Lister tous les fichiers
            string[] fichiers = Directory.GetFiles(dossier);
            Console.WriteLine($"Fichiers dans {dossier}:");
            foreach (string fichier in fichiers)
            {
                Console.WriteLine($"- {Path.GetFileName(fichier)}");
            }
            
            // Lister tous les sous-dossiers
            string[] sousDossiers = Directory.GetDirectories(dossier);
            Console.WriteLine($"\nSous-dossiers:");
            foreach (string sousDossier in sousDossiers)
            {
                Console.WriteLine($"- {Path.GetFileName(sousDossier)}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur: {ex.Message}");
        }
    }
}
```

### Parcours récursif

```csharp
static void ParcoursRecursif(string dossier, int niveau = 0)
{
    try
    {
        string indentation = new string(' ', niveau * 2);
        
        // Afficher les fichiers
        string[] fichiers = Directory.GetFiles(dossier);
        foreach (string fichier in fichiers)
        {
            Console.WriteLine($"{indentation}📄 {Path.GetFileName(fichier)}");
        }
        
        // Parcourir les sous-dossiers
        string[] sousDossiers = Directory.GetDirectories(dossier);
        foreach (string sousDossier in sousDossiers)
        {
            Console.WriteLine($"{indentation}📁 {Path.GetFileName(sousDossier)}/");
            ParcoursRecursif(sousDossier, niveau + 1);
        }
    }
    catch (UnauthorizedAccessException)
    {
        Console.WriteLine($"{new string(' ', niveau * 2)}❌ Accès refusé");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"{new string(' ', niveau * 2)}❌ Erreur: {ex.Message}");
    }
}
```

### Créer et supprimer des dossiers

```csharp
static void GererDossiers()
{
    string dossierTest = @"C:\temp\TestDossier";
    
    try
    {
        // Créer un dossier
        if (!Directory.Exists(dossierTest))
        {
            Directory.CreateDirectory(dossierTest);
            Console.WriteLine($"Dossier créé: {dossierTest}");
        }
        
        // Créer des sous-dossiers
        string sousDossier1 = Path.Combine(dossierTest, "Images");
        string sousDossier2 = Path.Combine(dossierTest, "Documents");
        
        Directory.CreateDirectory(sousDossier1);
        Directory.CreateDirectory(sousDossier2);
        Console.WriteLine("Sous-dossiers créés");
        
        // Supprimer un dossier (doit être vide)
        Directory.Delete(sousDossier1);
        Console.WriteLine("Sous-dossier Images supprimé");
        
        // Supprimer un dossier et tout son contenu
        Directory.Delete(dossierTest, recursive: true);
        Console.WriteLine("Dossier de test supprimé avec tout son contenu");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}
```

## 5. Informations sur les fichiers et dossiers

L'obtention de métadonnées sur les fichiers et dossiers est cruciale pour de nombreuses applications : systèmes de sauvegarde, outils de synchronisation, analyseurs d'espace disque, ou systèmes de gestion documentaire. Ces informations permettent de prendre des décisions intelligentes sur le traitement des fichiers.

### Métadonnées disponibles

**Informations temporelles** :
- **CreationTime** : date de création du fichier/dossier
- **LastWriteTime** : dernière modification du contenu
- **LastAccessTime** : dernier accès en lecture (attention : peut être désactivé pour les performances)

**Informations de taille et structure** :
- **Length** : taille en octets (fichiers uniquement)
- **Attributes** : attributs système (ReadOnly, Hidden, System, Archive, etc.)
- **Directory/Parent** : dossier conteneur

**Applications pratiques** :
- **Systèmes de backup** : identifier les fichiers modifiés depuis la dernière sauvegarde
- **Nettoyage automatique** : supprimer les fichiers temporaires anciens
- **Audit de sécurité** : détecter les modifications suspectes
- **Optimisation stockage** : identifier les gros fichiers inutilisés

### Différence entre classes statiques et classes d'information

**Classes statiques (`File`, `Directory`)** :
- Méthodes utilitaires rapides
- Une méthode = une opération système
- Idéales pour des vérifications ponctuelles

**Classes d'information (`FileInfo`, `DirectoryInfo`)** :
- Représentation orientée objet
- Cache les informations après la première lecture
- Plus efficaces pour multiple accès aux métadonnées

### Obtenir des informations sur un fichier

L'inspection des propriétés d'un fichier permet de comprendre son historique et ses caractéristiques. Ces informations sont essentielles pour développer des outils de gestion de fichiers robustes.

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        string cheminFichier = @"C:\temp\monFichier.txt";
        
        try
        {
            if (File.Exists(cheminFichier))
            {
                // Informations de base
                FileInfo info = new FileInfo(cheminFichier);
                
                Console.WriteLine($"Informations sur le fichier:");
                Console.WriteLine($"- Nom: {info.Name}");
                Console.WriteLine($"- Chemin complet: {info.FullName}");
                Console.WriteLine($"- Taille: {info.Length} octets ({info.Length / 1024.0:F2} KB)");
                Console.WriteLine($"- Créé le: {info.CreationTime}");
                Console.WriteLine($"- Modifié le: {info.LastWriteTime}");
                Console.WriteLine($"- Dernier accès: {info.LastAccessTime}");
                Console.WriteLine($"- Lecture seule: {info.IsReadOnly}");
                Console.WriteLine($"- Attributs: {info.Attributes}");
                
                // Vérifier l'âge du fichier
                TimeSpan age = DateTime.Now - info.LastWriteTime;
                Console.WriteLine($"- Âge: {age.Days} jours");
            }
            else
            {
                Console.WriteLine("Le fichier n'existe pas.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur: {ex.Message}");
        }
    }
}
```

### Obtenir des informations sur un dossier

```csharp
static void InfosDossier(string cheminDossier)
{
    try
    {
        if (Directory.Exists(cheminDossier))
        {
            DirectoryInfo info = new DirectoryInfo(cheminDossier);
            
            Console.WriteLine($"Informations sur le dossier:");
            Console.WriteLine($"- Nom: {info.Name}");
            Console.WriteLine($"- Chemin complet: {info.FullName}");
            Console.WriteLine($"- Créé le: {info.CreationTime}");
            Console.WriteLine($"- Dossier parent: {info.Parent?.Name ?? "Aucun"}");
            
            // Compter les fichiers et dossiers
            int nombreFichiers = Directory.GetFiles(cheminDossier).Length;
            int nombreDossiers = Directory.GetDirectories(cheminDossier).Length;
            
            Console.WriteLine($"- Nombre de fichiers: {nombreFichiers}");
            Console.WriteLine($"- Nombre de sous-dossiers: {nombreDossiers}");
            
            // Calculer la taille totale
            long tailleTotale = CalculerTailleDossier(cheminDossier);
            Console.WriteLine($"- Taille totale: {tailleTotale} octets ({tailleTotale / 1024.0 / 1024.0:F2} MB)");
        }
        else
        {
            Console.WriteLine("Le dossier n'existe pas.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}

static long CalculerTailleDossier(string dossier)
{
    long taille = 0;
    
    try
    {
        // Additionner la taille de tous les fichiers
        string[] fichiers = Directory.GetFiles(dossier);
        foreach (string fichier in fichiers)
        {
            FileInfo info = new FileInfo(fichier);
            taille += info.Length;
        }
        
        // Récursion pour les sous-dossiers
        string[] sousDossiers = Directory.GetDirectories(dossier);
        foreach (string sousDossier in sousDossiers)
        {
            taille += CalculerTailleDossier(sousDossier);
        }
    }
    catch (UnauthorizedAccessException)
    {
        // Ignorer les dossiers inaccessibles
    }
    
    return taille;
}
```

## 6. Opérations avancées

Une fois maîtrisées les opérations de base, vous pouvez aborder des fonctionnalités plus sophistiquées qui transforment vos applications en outils puissants de gestion de fichiers. Ces opérations avancées sont essentielles pour développer des systèmes robustes de traitement de données.

### Stratégies de copie et déplacement

**Copie vs Déplacement** :
- **Copie** (`File.Copy`) : crée un duplicata, l'original reste intact
- **Déplacement** (`File.Move`) : transfert l'emplacement, l'original disparaît

**Gestion des conflits** :
- Par défaut, une exception est levée si la destination existe
- Le paramètre `overwrite: true` permet d'écraser la destination
- Vérification préalable avec `File.Exists()` pour une gestion fine

**Considérations de performance** :
- **Même volume** : déplacement = renommage (très rapide)
- **Volumes différents** : déplacement = copie + suppression (plus lent)
- **Gros fichiers** : surveiller l'espace disque disponible

### Surveillance en temps réel avec FileSystemWatcher

Le `FileSystemWatcher` permet de créer des applications réactives qui répondent instantanément aux modifications du système de fichiers. Cette fonctionnalité est la base de nombreux outils professionnels : éditeurs de code avec rechargement automatique, systèmes de synchronisation, outils de surveillance de sécurité.

**Événements surveillés** :
- **Created** : nouveau fichier/dossier
- **Changed** : modification du contenu ou des métadonnées  
- **Deleted** : suppression
- **Renamed** : changement de nom ou déplacement

**Applications pratiques** :
- **Hot reload** en développement web
- **Synchronisation automatique** de dossiers
- **Surveillance de sécurité** (détection d'intrusion)
- **Traitement automatique** de fichiers déposés

### Copier et déplacer des fichiers

Les opérations de copie et déplacement sont fondamentales pour l'organisation et la sauvegarde des données. Une compréhension approfondie de ces mécanismes est essentielle pour développer des applications fiables.

```csharp
static void CopierDeplacerFichiers()
{
    string fichierSource = @"C:\temp\original.txt";
    string fichierCopie = @"C:\temp\copie.txt";
    string fichierDeplace = @"C:\temp\archive\deplace.txt";
    
    try
    {
        // Créer un fichier de test
        File.WriteAllText(fichierSource, "Contenu du fichier original");
        
        // Copier un fichier
        File.Copy(fichierSource, fichierCopie);
        Console.WriteLine("Fichier copié");
        
        // Créer le dossier de destination s'il n'existe pas
        string dossierArchive = Path.GetDirectoryName(fichierDeplace);
        if (!Directory.Exists(dossierArchive))
        {
            Directory.CreateDirectory(dossierArchive);
        }
        
        // Déplacer un fichier
        File.Move(fichierCopie, fichierDeplace);
        Console.WriteLine("Fichier déplacé");
        
        // Vérifier l'existence
        Console.WriteLine($"Fichier original existe: {File.Exists(fichierSource)}");
        Console.WriteLine($"Fichier copie existe: {File.Exists(fichierCopie)}");
        Console.WriteLine($"Fichier déplacé existe: {File.Exists(fichierDeplace)}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}
```

### Surveiller les modifications de fichiers

```csharp
using System;
using System.IO;

class SurveillerFichiers
{
    static void Main()
    {
        string dossierSurveille = @"C:\temp";
        
        // Créer un surveillant de fichiers
        FileSystemWatcher surveillant = new FileSystemWatcher();
        surveillant.Path = dossierSurveille;
        surveillant.Filter = "*.txt"; // Surveiller seulement les fichiers .txt
        
        // S'abonner aux événements
        surveillant.Created += SurFichierCree;
        surveillant.Changed += SurFichierModifie;
        surveillant.Deleted += SurFichierSupprime;
        
        // Activer la surveillance
        surveillant.EnableRaisingEvents = true;
        
        Console.WriteLine($"Surveillance du dossier: {dossierSurveille}");
        Console.WriteLine("Appuyez sur une touche pour arrêter...");
        Console.ReadKey();
        
        surveillant.Dispose();
    }
    
    static void SurFichierCree(object sender, FileSystemEventArgs e)
    {
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Fichier créé: {e.Name}");
    }
    
    static void SurFichierModifie(object sender, FileSystemEventArgs e)
    {
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Fichier modifié: {e.Name}");
    }
    
    static void SurFichierSupprime(object sender, FileSystemEventArgs e)
    {
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] Fichier supprimé: {e.Name}");
    }
}
```

### Rechercher des fichiers

```csharp
static void RechercherFichiers(string dossierBase, string motif)
{
    try
    {
        Console.WriteLine($"Recherche de '{motif}' dans {dossierBase}:");
        
        // Recherche dans le dossier courant
        string[] fichiers = Directory.GetFiles(dossierBase, motif);
        foreach (string fichier in fichiers)
        {
            Console.WriteLine($"Trouvé: {fichier}");
        }
        
        // Recherche récursive
        string[] fichiersRecursifs = Directory.GetFiles(dossierBase, motif, SearchOption.AllDirectories);
        Console.WriteLine($"\nRecherche récursive - {fichiersRecursifs.Length} fichiers trouvés:");
        
        foreach (string fichier in fichiersRecursifs)
        {
            FileInfo info = new FileInfo(fichier);
            Console.WriteLine($"- {fichier} ({info.Length} octets, modifié le {info.LastWriteTime:yyyy-MM-dd})");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erreur: {ex.Message}");
    }
}

// Exemples d'appel
// RechercherFichiers(@"C:\temp", "*.txt");
// RechercherFichiers(@"C:\temp", "rapport*");
// RechercherFichiers(@"C:\temp", "*.pdf");
```

## Bonnes pratiques

### 1. Gestion des erreurs
Toujours utiliser des blocs `try-catch` pour les opérations sur les fichiers :

```csharp
try
{
    // Opération sur fichier
}
catch (FileNotFoundException)
{
    // Fichier non trouvé
}
catch (UnauthorizedAccessException)
{
    // Accès refusé
}
catch (IOException)
{
    // Erreur d'entrée/sortie
}
catch (Exception ex)
{
    // Autres erreurs
    Console.WriteLine($"Erreur inattendue: {ex.Message}");
}
```

### 2. Utilisation de `using` pour les ressources
```csharp
using (StreamReader lecteur = new StreamReader(cheminFichier))
{
    // Utiliser le lecteur
} // Automatiquement fermé et libéré
```

### 3. Vérification d'existence
```csharp
if (File.Exists(cheminFichier))
{
    // Traiter le fichier
}

if (Directory.Exists(cheminDossier))
{
    // Traiter le dossier
}
```

### 4. Utilisation de Path.Combine
```csharp
// ✅ Correct
string chemin = Path.Combine(dossier, nomFichier);

// ❌ Éviter (problèmes avec les séparateurs)
string chemin = dossier + "\\" + nomFichier;
```

## Conclusion

La maîtrise de la gestion des fichiers en C# représente un saut qualitatif significatif dans votre parcours de développeur. Ces compétences transforment vos programmes de simples calculatrices en applications capables d'interagir avec le monde réel, de persister des données, et de s'intégrer dans des écosystèmes complexes.

### Récapitulatif des concepts essentiels

**Architecture en couches** :
Le système de gestion de fichiers .NET est organisé en couches d'abstraction, des opérations simples (`File.ReadAllText`) aux contrôles fins (`FileStream`). Cette architecture vous permet de choisir le niveau d'abstraction approprié à chaque situation.

**Stratégies de performance** :
- **Petits fichiers** : privilégier les méthodes "All" pour la simplicité
- **Gros fichiers** : utiliser le streaming pour l'efficacité mémoire  
- **Opérations multiples** : considérer les classes d'information pour réduire les appels système

**Robustesse et fiabilité** :
- La gestion d'exceptions n'est pas optionnelle en manipulation de fichiers
- Le pattern `using` garantit la libération des ressources système
- La validation préalable évite de nombreux problèmes en production

### Perspectives d'approfondissement

Cette base solide vous ouvre la voie vers des sujets plus avancés :
- **Programmation asynchrone** : `async/await` pour les opérations non-bloquantes
- **Sérialisation** : JSON, XML, Binary pour structurer les données
- **Bases de données** : transition naturelle vers SQLite, SQL Server
- **APIs Web** : lecture/écriture via HTTP pour les applications distribuées
- **Cryptographie** : chiffrement des données sensibles

### Application dans le monde professionnel

Les compétences acquises dans ce chapitre sont directement transférables vers :
- **Développement d'applications métier** : import/export de données
- **Outils de productivité** : générateurs de rapports, convertisseurs de formats
- **Systèmes de gestion** : applications de sauvegarde, outils d'administration
- **DevOps** : scripts d'automatisation, outils de déploiement

**Points clés à retenir pour votre carrière** :
- Toujours gérer les exceptions lors des opérations sur fichiers (fiabilité)
- Utiliser `using` pour libérer automatiquement les ressources (bonnes pratiques)
- Préférer `Path.Combine()` pour construire des chemins (portabilité)
- Vérifier l'existence avant de manipuler fichiers et dossiers (défense en profondeur)
- Adapter la méthode à la taille des fichiers - ReadAllLines vs ReadLine (performance)
- Comprendre les implications de sécurité et de permissions (sécurité)

La gestion des fichiers est une compétence transversale qui vous accompagnera tout au long de votre carrière de développeur, indépendamment des technologies et frameworks que vous utiliserez.