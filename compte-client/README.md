# Client React - Gestion des Comptes Bancaires

Application React pour la gestion des comptes bancaires qui consomme une API REST Spring Boot.

## Description

Cette application permet de gérer des comptes bancaires avec les fonctionnalités CRUD complètes :
- Afficher la liste de tous les comptes
- Ajouter un nouveau compte
- Modifier un compte existant
- Supprimer un compte

## Technologies utilisées

- **React** 19.2.0
- **Axios** 1.13.1 - Client HTTP pour les requêtes API
- **Bootstrap** 5.3.8 - Framework CSS pour l'interface utilisateur
- **Bootstrap Icons** - Icônes pour l'interface

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Backend Spring Boot en cours d'exécution sur `http://localhost:8082`

## Installation

1. Cloner le projet et naviguer vers le dossier :
```bash
cd compte-client
```

2. Installer les dépendances :
```bash
npm install
```

## Configuration

La configuration de l'URL de l'API se trouve dans le fichier `src/config.js` :

```javascript
const API_BASE_URL = "http://localhost:8082/api";
```

Modifiez cette URL si votre backend utilise un port différent.

## Lancement de l'application

Démarrer l'application en mode développement :

```bash
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
compte-client/
├── public/
│   └── index.html          # Page HTML principale
├── src/
│   ├── components/
│   │   ├── CompteForm.js   # Formulaire d'ajout/modification
│   │   └── CompteList.js   # Liste des comptes
│   ├── App.js              # Composant principal
│   ├── config.js           # Configuration de l'API
│   └── index.js            # Point d'entrée de l'application
└── package.json            # Dépendances du projet
```

## Fonctionnalités

### 1. Affichage des comptes
- Liste de tous les comptes avec leurs détails (ID, Solde en DH, Date de création, Type)
- Formatage automatique du solde en Dirham marocain (DH)
- Formatage de la date en français
- Badges de couleur pour différencier les types de comptes


[Affichage des comptes](Screen/UI.png)



### 2. Ajout d'un compte
- Formulaire avec validation des champs
- Champs requis : Solde, Date de création, Type
- Types disponibles : COURANT, EPARGNE
- Confirmation après ajout


[Ajout d'un compte](Screen/Ajouter.png)






### 3. Modification d'un compte
- Cliquer sur "Modifier" pour pré-remplir le formulaire
- Possibilité d'annuler la modification
- Mise à jour en temps réel dans la liste


[Modification d'un compte](Screen/Modifier.png)





### 4. Suppression d'un compte
- Confirmation avant suppression
- Mise à jour automatique de la liste


[Suppression d'un compte](Screen/Supprimer.png)








## API Endpoints utilisés

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/comptes` | Récupérer tous les comptes |
| GET | `/api/comptes/{id}` | Récupérer un compte par ID |
| POST | `/api/comptes` | Créer un nouveau compte |
| PUT | `/api/comptes/{id}` | Mettre à jour un compte |
| DELETE | `/api/comptes/{id}` | Supprimer un compte |

## Scripts disponibles

- `npm start` - Lance l'application en mode développement
- `npm build` - Crée une version optimisée pour la production
- `npm test` - Lance les tests
- `npm eject` - Éjecte la configuration (irréversible)

## Dépannage

### Erreur "Network Error"
- Vérifiez que le backend Spring Boot est démarré sur le port 8082
- Vérifiez que CORS est configuré dans le backend
- Vérifiez l'URL de l'API dans `src/config.js`

### Les données ne s'affichent pas
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que l'API retourne bien des données (testez avec Postman ou curl)

## Auteur

Boussyf Abderrahim

## Licence

Projet pédagogique - Spring TPs
