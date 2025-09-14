# Les fonctions

## Concept de base

Imaginez une fonction comme une petite machine à laquelle on confie une tâche précise. On lui fournit des éléments en entrée, elle exécute des étapes bien définies, puis elle nous renvoie éventuellement un résultat. C’est une manière d’organiser sa pensée et son code : on découpe un problème en gestes simples, réutilisables, et on leur donne un nom parlant.

- Une **fonction** est un bloc d'instructions qui porte un nom, qui peut prendre des **paramètres** (int, char, string, ...) en entrée et peut renvoyer une **valeur** en sortie.

Pourquoi des fonctions ?
- Clarifier le code en le découpant en morceaux cohérents et faciles à lire.
- Éviter la répétition (DRY: Don’t Repeat Yourself) et donc réduire les erreurs.
- Nommer l’intention: un bon nom raconte ce que fait le code.
- Tester plus facilement chaque pièce du programme, indépendamment des autres.

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

## Fonction avec valeur de retour

Reprenons notre métaphore de la « petite machine » : parfois, on lui demande simplement d’agir (afficher un texte), parfois on lui demande de calculer et de nous rapporter un résultat. Dans ce second cas, la fonction s’engage à « rendre » une valeur à l’aide du mot-clé `return`.

Une fonction peut donc **renvoyer une valeur** avec `return` :
```csharp
int Somme(int a, int b)
{
    int resultat = a + b;
    return resultat;
}
```

Astuce de lecture: le type placé avant le nom de la fonction (`int` ici) annonce la nature de la valeur promise en retour. Si la fonction ne renvoie rien, on écrit `void`.

Pour utiliser la valeur renvoyée :
```csharp
int total = Somme(5, 3);
Console.WriteLine(total);  // Affiche 8
```

## Le passage de paramètres

Quand on appelle une fonction, on lui « apporte » des informations: ce sont les paramètres. Deux manières principales existent pour les transmettre, et elles ne racontent pas la même histoire.
- Par valeur: on donne une copie. La fonction travaille sur son exemplaire à elle.
- Par référence: on donne un lien vers l’original. La fonction peut alors modifier la chose d’origine.

Métaphore: prêter un livre
- Par valeur, c’est comme donner une photocopie: si l’autre surligne, votre livre reste intact.
- Par référence, c’est prêter votre vrai livre: s’il est annoté, votre exemplaire change.

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

### Par référence

La variable locale et le paramètre partagent la même instance. On utilise `ref` ou `out`.

#### Avec ref

```csharp
void Increment(ref int nombre)
{
    nombre++;  // Modifie la variable d'origine
}

int x = 5;
Increment(ref x);
Console.WriteLine(x);  // Affiche 6
```

:::: tip Erreurs fréquentes
- Oublier d’écrire `ref` à l’appel comme dans la définition: `Increment(ref x)`.
- Confondre « modifier la chose » et « changer vers une nouvelle chose »: sur un type référence, on peut modifier l’objet pointé même si on a passé « par valeur » (voir plus bas).
- Utiliser `out` sans initialiser la variable à l’appel: c’est normal, `out` promet qu’elle sera assignée dans la fonction.
::::

### Visualisation du passage de paramètres

```mermaid
flowchart TD
    subgraph "Passage_par_valeur"
        A1[Appelant: x = 5] --> A2["Copie vers paramètre"]
        A2 --> A3[Fonction: nombre = 5]
        A3 --> A4[Fonction: nombre++ = 6]
        A4 -.- A5[Appelant: x reste 5]
    end
    
    subgraph "Passage_par_reference"
        B1[Appelant: x = 5] --> B2["référence vers paramètre"]
        B2 --> B3[Fonction: nombre = 5]
        B3 --> B4[Fonction: nombre++ = 6]
        B4 --> B5[Appelant: x devient 6]
    end
    
    %% Styles pour meilleure lisibilité
    classDef valeur fill:#4d94ff,stroke:#0047b3,stroke-width:2px,color:#fff,font-weight:bold
    classDef fonction fill:#ff9980,stroke:#cc3300,stroke-width:2px,color:#fff,font-weight:bold
    classDef resultat fill:#5cd65c,stroke:#267326,stroke-width:2px,color:#fff,font-weight:bold
    
    class A1,A5,B1,B5 valeur
    class A3,A4,B3,B4 fonction
    
    linkStyle 0,1,2,4,5,6,7 stroke:#333333,stroke-width:2px
    linkStyle 3 stroke:#333333,stroke-width:2px,stroke-dasharray: 5 5
```

## Types valeur vs types référence

Pour bien comprendre ce qui se passe « sous le capot », il faut distinguer deux familles de types. Cette distinction explique pourquoi, parfois, une modification semble « rester » après l’appel d’une fonction… et parfois pas.

Les comportements du passage de paramètres varient selon qu'il s'agit de types valeur (int, bool, struct...) ou de types référence (objets, tableaux, chaînes...).

### Types valeur : passage par valeur vs référence

```mermaid
flowchart TD
    %% Type valeur passé par valeur
    subgraph tvv["Type valeur par valeur"]
        A1("Appelant: int x = 5")
        A2["Fonction: int nombre = 5 (copie)"]
        A1 --> A2
        A2 --> A3["Fonction: nombre devient 6"]
        A3 -.- A1
    end

    %% Type valeur passé par référence
    subgraph tvr["Type valeur par référence"]
        B1["Appelant: int y = 5"]
        B2["Fonction: ref int nombre = 5"]
        B1 <--> B2
        B2 --> B3["Fonction: nombre devient 6"]
        B3 --> B1
    end

    %% Styles pour meilleure lisibilité
    classDef stack fill:#f0f0f0,stroke:#2B6087,stroke-width:1px
    classDef section fill:#E1F5FE,stroke:#2B6087,stroke-width:1px
    classDef variable fill:#4d94ff,stroke:#0047b3,stroke-width:2px,color:#fff,font-weight:bold

    class A1,A2,A3,B1,B2,B3 variable

    %% Style des flèches
    linkStyle 0,1,3,4,5 stroke:#333333,stroke-width:2px
    linkStyle 2 stroke:#333333,stroke-width:2px,stroke-dasharray: 5 5
```

### Types référence : passage par valeur vs référence

```mermaid
flowchart LR
    subgraph "Stack"
        subgraph "Type référence par valeur"
            A1["int[] arr = [1,2,3]"]
            A2["int[] param (copie de référence)"]
        end
        
        subgraph "Type référence par reference"
            B1["int[] arr = [1,2,3]"]
            B2["ref int[] param (même référence)"]
        end
    end
    
    subgraph "Heap"
        C1["[1,2,3]"] 
        C2["[1,2,3 devient 1,2,9]"]
    end
    
    %% Connexions90
    A1 --> C1
    A2 --> C1
    A2 --> C2
    
    B1 <--> B2
    B1 --> C1
    B2 --> C2
    
    %% Styles pour meilleure lisibilité
    classDef stack fill:#f0f0f0,stroke:#2B6087,stroke-width:1px
    classDef section fill:#E1F5FE,stroke:#2B6087,stroke-width:1px
    classDef heap fill:#fff0f0,stroke:#CC3300,stroke-width:1px
    classDef stackVar fill:#4d94ff,stroke:#0047b3,stroke-width:2px,color:#fff,font-weight:bold
    classDef heapVar fill:#ff9980,stroke:#cc3300,stroke-width:2px,color:#fff,font-weight:bold
    
    class Stack stack
    class Heap heap
    class Type_reference_par_valeur,Type_reference_par_reference section
    class A1,A2,B1,B2 stackVar
    class C1,C2 heapVar
```

### Exemple concret avec tableau

Voici comment les tableaux (types référence) se comportent avec différentes approches :

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

```mermaid
flowchart LR
    %% Ce qui se passe dans le programme
    subgraph prog["Programme"]
        direction TB
        P1["Main: int[] arr = [1,2,3]"] --> P2["ModifierTableau(arr)"]
        P3["arr devient [1,2,9]"] --- P2

        P4["Main: int[] arr = [1,2,3]"] --> P5["ModifierNouveauTableau(arr)"]
        P6["arr reste [1,2,3]"] --- P5
    end

    %% Explication mémoire
    subgraph "Mémoire"
        direction TB
        subgraph "Stack"
            S1["arr (référence)"]
            S2["param (copie de la référence)"]
            S3["nouveauArr (nouvelle référence)"]
        end

        subgraph "Heap"
            H1["Tableau [1,2,3]"]
            H2["Tableau [1,2,9]"]
            H3["Nouveau tableau [1,2,9]"]
        end

        %% Connexions
        S1 --> H1
        S2 --> H1
        S2 --> H2
        S3 --> H3
    end



    %% Styles
    classDef program fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef stack fill:#e1f5fe,stroke:#2B6087,stroke-width:1px
    classDef heap fill:#ffebe6,stroke:#CC3300,stroke-width:1px
    classDef code fill:#4d94ff,stroke:#0047b3,stroke-width:2px,color:#fff,font-weight:bold
    classDef memory fill:#5cd65c,stroke:#267326,stroke-width:2px,color:#fff,font-weight:bold
    classDef heapObj fill:#ff9980,stroke:#cc3300,stroke-width:2px,color:#fff,font-weight:bold

    class Programme program
    class Stack stack
    class Heap heap
    class P1,P2,P3,P4,P5,P6 code
    class S1,S2,S3 memory
    class H1,H2,H3 heapObj
```

::: tip Points importants à retenir
1. **Types valeur** (int, bool, char, struct...) :
   - Passés par valeur : la fonction reçoit une copie, les modifications sont locales
   - Passés par référence (ref/out) : la fonction modifie la variable originale

2. **Types référence** (tableaux, objets, listes...) :
   - Passés par valeur : la fonction reçoit une copie de la référence, mais peut modifier l'objet original
   - Passés par référence (ref/out) : la fonction peut changer la référence elle-même
:::

### Quand utiliser le passage par référence ?

- Pour modifier plusieurs valeurs dans une fonction
- Pour éviter la copie de grandes structures de données
- Pour retourner plusieurs valeurs depuis une fonction

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

#### Avec out

```csharp
void ObtenirDonnees(out int valeur)
{
    valeur = 42;  // Doit assigner une valeur
}

int resultat;
ObtenirDonnees(out resultat);
Console.WriteLine(resultat);  // Affiche 42
```

::: warning Différence entre ref et out
- `ref` : la variable doit être initialisée avant l'appel
- `out` : la variable peut ne pas être initialisée, mais doit recevoir une valeur dans la fonction
:::

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

::: danger Attention
Les fonctions récursives doivent toujours avoir une condition de sortie pour éviter un débordement de pile.
:::

## Fonctions anonymes et expressions lambda

Les fonctions anonymes et expressions lambda permettent de définir des fonctions sans nom.

```csharp
// Fonction anonyme
Func<int, int, int> addition = delegate(int a, int b) { return a + b; };

// Expression lambda équivalente
Func<int, int, int> addition = (a, b) => a + b;

Console.WriteLine(addition(5, 3));  // Affiche 8
```

## En résumé

- Une fonction est une pièce de code qui porte un nom, peut recevoir des paramètres et, parfois, rend une valeur avec `return`.
- Passer « par valeur », c’est donner une copie; passer « par référence », c’est prêter l’original.
- Les types valeur (int, bool, struct) se comportent différemment des types référence (tableaux, objets): gardez cette différence à l’esprit.
- `ref` et `out` permettent à une fonction d’influencer des variables définies à l’extérieur: `ref` nécessite une variable initialisée; `out` promet de l’initialiser.

Petite checklist avant d’écrire une fonction
- Ai-je un nom clair qui dit ce que la fonction fait ?
- Quels paramètres sont vraiment nécessaires et de quel type ?
- La fonction doit-elle renvoyer une valeur ? Laquelle ?
- Y a-t-il des effets de bord attendus (modifications d’objets) ? Sont-ils souhaitables et documentés ?
