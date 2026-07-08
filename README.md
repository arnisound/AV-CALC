# AV CALC by Arnisound Tools

Multi-calculateur pour techniciens du spectacle : son, vidéo, éclairage, électricité, réseau et structure.

Web app installable (PWA), 100 % autonome — zéro dépendance externe, fonctionne hors-ligne une fois ouverte.

## Contenu du dépôt

```
index.html                 → l'application (tout est dedans : HTML, CSS, JS)
manifest.webmanifest        → métadonnées PWA (nom, icônes, couleurs)
sw.js                       → service worker (mise en cache hors-ligne)
icon-192.png                 → icône PWA 192×192
icon-512.png                 → icône PWA 512×512
icon-512-maskable.png        → icône PWA 512×512 (format "maskable" pour Android)
```

Les 6 fichiers doivent rester **à la racine du site**, côte à côte (chemins relatifs).

## Déploiement sur GitHub Pages

1. Crée un dépôt GitHub (public ou privé avec Pages activé sur les plans qui le permettent).
2. Mets ces 6 fichiers à la racine du dépôt (pas dans un sous-dossier), sur la branche par défaut (`main`).
3. Dans **Settings → Pages** :
   - Source : `Deploy from a branch`
   - Branch : `main` / dossier `/ (root)`
4. Attends 1–2 minutes, l'URL sera du type `https://<utilisateur>.github.io/<nom-du-repo>/`.
5. Ouvre cette URL sur ton téléphone → menu du navigateur → **Ajouter à l'écran d'accueil**. L'app s'installe avec son icône et s'ouvre en plein écran.

⚠️ Le service worker (mode hors-ligne + installation) ne fonctionne qu'en **HTTPS** — GitHub Pages le fournit automatiquement, aucune configuration nécessaire.

## Mettre à jour l'app après modification

Le service worker met les fichiers en cache. Après avoir modifié `index.html`, incrémente la variable `CACHE` en haut de `sw.js` (ex. `avcalc-v1` → `avcalc-v2`) pour forcer la mise à jour du cache chez les utilisateurs qui ont déjà installé l'app. Sans ça, ils peuvent continuer à voir l'ancienne version pendant un moment.

## Développement local

Comme le service worker exige HTTPS (ou `localhost`), un simple double-clic sur `index.html` (`file://`) fonctionne pour tester les calculs, mais l'installation PWA et le cache hors-ligne ne s'activeront qu'en le servant via un petit serveur local, par exemple :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Licence

À définir — ajoute ici la licence de ton choix (ex. licence non-commerciale personnalisée, comme pour tes autres outils Arnisound).
