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

## Rôle de chaque dossiers

### les routes : aiguilleur

C'est le point d'entrée de notre API. Les routes définissent les URL ou endpoints accessibles par les utilisateurs (ex : `GET /api/quotes` ou `POST /api/auth/login`)
Quand un personne fait une requête vers l'API, la route reçoit cet appel, comprend ce que l'utilisateur veut faire, et dirige l'appel vers le bon controller. Une route no contient aucune logique complexe, elle se contente de transférer la demande à la bonne personne. 

### Les models

C'est la représentation structurelle de nos données en code. Il fait le lien (grâce à mongoose) avec la base de données MongoDB.
Il définit le schéma de nos données. C'est lui qui décide qu'un utilisateur doit avoir un email, par exemple (de type de chaine de caractère, défini comme obligatoire et unique). C'est le modèle qui se charge de faire toues les actions d'écriture et lecture directe dans la bdo (crud en gros). 

### Les controllers (le cerveau)

C'est ici que se trouve la logique métier de notre app. 
Le contrôleur reçoit la demande transmise par la route. C'est lui qui fait le travail. Il lit les infos envoyées par l'utilisateur (le body), il demande au model d'intégarir avec la bdo puis **prépare et renvoie la réponse** finale à l'utilisateur au format JSON en gérant des différences cas de succès ou d'erreurs. 

### Les middlewares : la douane / le vigile

C'est une fonction qui s'exécute au milieu de la requête. Elle a lieu juste après que la route ai été appelée mais juste avant que la requête n'arrive dans le controller. 
Il effectue des vérification à la volée. L'exemple le plus courant en API est la **middleware d'authentification** : il vérifie qu'un utilisateur possède un token valide avant de le laisser accéder à des infos privées. Si ticket pas bon, bloque et renvoie erruer 401 accès refusé. Si tout va bien, il appel la fonction `next()` qui laisse passer la requête vers le controller. 

## Résumé des commandes pour un nouveau projet et config

```bash
npm init
npm i express
npm i mongoose
npm i jsonwebtoken
npm i bcryptjs
npm i dotenv
```
On peut aussi faire en 1 fois : 

```bash
npm init
npm i express mongoose jsonwebtoken bcryptjs dotenv
```

### Configuration

Ouvrir le fichier package.json, et faire en sorte d'avoir la ligne `"type" : "module"`.

### Petite astuce

Quand on demarre le serveur avec `node server` ou `npm run dev` si on a configuré le script. Le serveur sera lancé et figé à l'état du lancement. Cv dire que si on fait une modif sur le code, on doit couper le serveur et le relancer.
Pour éviter ça, on peut installer de manière globale l'outil nodemon. Pour cela on fait 1 fois sur la machine : `npm i -g nodemon`

Cette fois au lieu de lancer le serveur avec `node server`, on lance avec `nodemon server`. 