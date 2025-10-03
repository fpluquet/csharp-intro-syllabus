---
marp: true
theme: default
paginate: true
header: 'Chapitre 10 : Gestion des Fichiers'
footer: 'Programmation C# - BA1'
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