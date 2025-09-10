# Exemples de diagrammes Mermaid

Cette page démontre comment utiliser [Mermaid.js](https://mermaid.js.org/) pour créer des diagrammes dans le syllabus.

## Diagrammes de flux

Les diagrammes de flux sont utiles pour illustrer des algorithmes ou des processus.

```mermaid
flowchart TD
    A[Début] --> B{Est-ce que x > 10?}
    B -->|Oui| C[x est grand]
    B -->|Non| D[x est petit]
    C --> E[Fin]
    D --> E
```

## Diagrammes de classe

Les diagrammes de classe sont parfaits pour expliquer les concepts de programmation orientée objet.

```mermaid
classDiagram
    class Animal {
        +string nom
        +int age
        +manger()
        +dormir()
    }
    class Chat {
        +miauler()
    }
    class Chien {
        +aboyer()
    }
    Animal <|-- Chat
    Animal <|-- Chien
```

## Diagrammes de séquence

Utiles pour montrer l'ordre des opérations et les interactions entre objets.

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant P as Programme
    participant BD as BaseDeDonnées
    
    U->>P: Entrer nom d'utilisateur
    U->>P: Entrer mot de passe
    P->>BD: Vérifier identifiants
    BD-->>P: Identifiants valides
    P-->>U: Accès autorisé
```

## Diagrammes d'état

Parfaits pour illustrer les différents états d'un objet ou d'un système.

```mermaid
stateDiagram-v2
    [*] --> Inactif
    Inactif --> EnCours: démarrer()
    EnCours --> EnPause: pause()
    EnPause --> EnCours: reprendre()
    EnCours --> Terminé: terminer()
    Terminé --> [*]
```

## Diagramme d'organisation de la mémoire

```mermaid
graph LR
    subgraph "Pile (Stack)"
        A[Variables locales] --> B[Appels de fonction]
        B --> C[Types valeur]
    end
    
    subgraph "Tas (Heap)"
        D[Objets] --> E[Tableaux]
        E --> F[Types référence]
    end
    
    C -.-> F
```

## Comment utiliser Mermaid dans le syllabus

Pour créer un diagramme Mermaid dans une page Markdown, utilisez la syntaxe suivante :

```
```mermaid
graph TD
    A[Début] --> B[Fin]
```
```

Vous pouvez copier ces exemples et les adapter à vos besoins dans les différentes sections du syllabus.
