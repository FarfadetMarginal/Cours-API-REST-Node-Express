# Cours création d'API REST avec Node et express

outil qui permet d'utiliser JS pour créer des projets back, cela signifie que le code est bien exécuté coté serveur. L'utilisateur n'a pas accès à votre code, contrairement a JS coté front.

## Prérequis

-**Runtime** : node.js installé (ici on va utiliser les modules ES)
-**Framework** : Express.js
-**Base de données** : MongoDB (via Mongoose)
-**Authentification** : JSON Web Tokens (jsonwebtoken), bcryptjs pour le hachage
-**Variable d'environnement** : dotenv

## Mise en place de l'environnement de travail

### Initialisation du projet

On commence par initialiser le projet NODE. Sur le terminal : `npm init`
Cette commande va créer un fichier package.json.
Le package.json contient des infos importantes sur le projet, notamment :
- le nom du projet
- le type de code (commonjs (CJS) ou ecma script(ES))
- les scripts du projet (pour pouvoir lancer des tests, déployer etc)
- les dépendances du projet

#### Les dépendances : 

Pour fonctionner, le projet a besoin de certaines choses.
Dans le cas d'un pj avec express, il a besoin de framework express.
Si besoin de hacher mdp, besoin de la dépendance bcryptjs, ect

Selon le projet, pas besoin des mêmes dépendances. C'est le package.json qui s'occupe de ça. 
Nous on **installe** des dépendances grâce à la commande `npm install NomDeLaDependance`

### Installation des dépendances nécessaires

```bash
npm install
npm i
```
(les 2 c pareil)

- `npm i express` : permet d'installer le framework express, pour pouvoir gérer directement le serveur back avec node.
- `npm i mongoose` : permet de faire la connexion à la base de données mongoDB et de gérer les requêtes (CRUD)
- `npm i jsonwebtoken` : permet de gérer un token d'authentification unique
- `npm i bcryptjs` : permet de gérer les hash de mdp
- `npm i dotenv` : permet de gérer les variables d'environnement

#### Variable d'environnement

C'est une donnée qui est potentiellement sensible. En gros c'est un mdp, accès à bdo, ect
Ou tout simplement des variables qui servent à la configuration pour notre app. 
Sur nos webapp, les variables d'environnement sont créées dans in fichier .env

Exemple de contenu :
```
HOST = localhost
DBNAME = masuserdb
DBUSER = userquitue
DBPASS = monpasscool
```
**IMPORTANT** : mon fichier de variable d'environnement doit être noté dans le fichier .gitignore
On n'envoi jamais un fichier variable d'environnement sur github. 
Au pire on peut créer un fichier .env.example qu'on peut envoyer sur github pour la structure attendue. (genre si on doit getclone ya plus qu'a peupler)

### Structure des fichiers et dossiers

```text
    src/
        config/
            - db.js                   # connexion à MongoDB
        controllers/                  # la logique de code de l'app
            -authController.js
        middlewares/                  # tout ce qui s'exécute avant un controller
            - authMiddleware.js
        models/                       # configuration des schemas de base de données
            - authModel.js
        routes/                       # contient la logique des endpoints (url)
            -authRoutes.js
    - app.js                          # configuration de Express
- env.js                              # Variables d'environnement
- package.json
- server.js                           # point d'entrée de l'app
```
