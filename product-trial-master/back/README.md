# 🛠️ ALTEN SHOP - Backend

## 🚀 Lancement du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/mohamedBenma/Alten-Test-Technique/tree/main/product-trial-master/back

```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l’environnement

Créer un fichier `.env` à la racine du projet à partir du modèle :

```bash
cp .env.example .env
```

### 3-1. Lancer le conteneur de BDD

```bash
docker-compose up -d
```

### 4. Générer les types Prisma

```bash
npx prisma generate
```

### 5. Exécuter les migrations Prisma

```bash
npx prisma migrate dev
```

### 5-1. Visualiser les données en BDD

```bash
npx prisma studio
```

### 6. Démarrer le serveur en développement

```bash
npm run start
```

Par défaut, le serveur sera disponible sur `http://localhost:4000`.

## 📚 Documentation Swagger

L’API est disponible à l’adresse suivante après démarrage :

```
http://localhost:4000/api-docs
```
