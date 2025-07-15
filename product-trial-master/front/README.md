# ALTEN SHOP - Frontend

## Lancement du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/front-react/front-react.git
cd alten-shop-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l’environnement

Créer un fichier `.env` à la racine du projet à partir du modèle suivant :

```env
# .env.example
REACT_APP_API_URL=http://localhost:4000
```

Puis copier ce modèle en `.env` :

```bash
cp .env.example .env
```

## Lancer l'application en développement

```bash
npx nodemon
```

L'application sera disponible sur :

```
http://localhost:3000
```
