/* Règles d'usage du design system Yeita.
 *
 * STATUT : proposition. Rédigée le 13 octobre 2026 à partir des maquettes
 * Figma (variantes, propriétés, contenus) et de l'usage observé sur yeita.fr.
 * Rien n'a été validé par l'équipe design. Chaque entrée porte statut
 * "proposition" tant que personne ne l'a relue ; passer à "valide" une fois
 * tranché, le Yeitibook retire alors le bandeau.
 *
 * Ce fichier est maintenu à la main. Contrairement aux descriptions portées
 * par data/gen.js, il survit aux ré-extractions depuis Figma.
 *
 * Forme d'une entrée :
 *   quand   : la situation où ce composant est le bon choix
 *   eviter  : les usages qui l'abîment ou qui cassent la cohérence
 *   exemple : un cas réel, de préférence une page de yeita.fr
 */
window.YB_USAGE = {

/* ---------- Atomes ---------- */

"button": {
  statut: "proposition",
  quand: "Une action que la personne déclenche : envoyer un formulaire, ouvrir une prise de rendez-vous, lancer un téléchargement. Primary pour l'action principale d'un écran, Secondary pour une action de même niveau mais moins engageante, Ghost sur fond coloré ou image.",
  eviter: [
    "Un bouton pour aller vers une autre page : c'est un lien, même s'il doit avoir l'air d'un bouton. Le composant link existe pour ça et reste un <a>.",
    "Deux boutons Primary côte à côte : s'il y a deux actions principales, c'est qu'aucune ne l'est.",
    "Changer le libellé en cours de survol autrement que par la propriété prévue : le composant gère déjà le changement de texte au hover."
  ],
  exemple: "« Prenons un call » en bas des pages cas client."
},

"link": {
  statut: "proposition",
  quand: "Toute navigation : vers une autre page, une ancre, un document. Taille M dans le corps de texte, S dans les zones denses (pied de page, métadonnées).",
  eviter: [
    "L'utiliser pour une action destructrice ou un envoi de formulaire : l'absence de rendu de bouton fait rater la cible.",
    "Un lien isolé dont le libellé est « ici » ou « en savoir plus » : hors contexte, un lecteur d'écran n'en tire rien.",
    "Compter sur la seule couleur pour le distinguer du texte : le DS ne souligne pas par défaut, donc à employer dans un contexte où la nature de lien est évidente, sinon ajouter le soulignement."
  ],
  exemple: "Les entrées du pied de page et les renvois en fin d'article."
},

"tag": {
  statut: "proposition",
  quand: "Qualifier un contenu par une catégorie qui sert aussi à filtrer : type de mission, format de contenu, secteur. Large dans une carte, Small dans une liste dense.",
  eviter: [
    "S'en servir comme bouton d'action : un tag classe, il ne déclenche pas.",
    "Plus de trois tags sur une même carte : au-delà, ils cessent d'aider à trier.",
    "Un tag dont le libellé n'existe pas comme filtre réel ailleurs sur le site : il promet un tri qui n'existe pas."
  ],
  exemple: "Les catégories au-dessus du titre sur les cartes de la page use-cases."
},

"Input": {
  statut: "proposition",
  quand: "Toute saisie de texte sur une ligne. Les états Hover, Active, Filled, Disabled et Error sont fournis : ne pas les réinventer.",
  eviter: [
    "Supprimer le libellé au profit du seul placeholder : il disparaît à la saisie et la personne perd le contexte.",
    "N'afficher l'erreur que par la couleur : le texte d'aide en erreur doit dire ce qui ne va pas et comment le corriger.",
    "Détourner Disabled pour un champ qui sera activé plus tard sans l'expliquer : un champ grisé sans raison bloque la personne."
  ],
  exemple: "Le champ e-mail du bloc newsletter et les champs du formulaire de contact."
},

/* ---------- Cartes ---------- */

"card.client": {
  statut: "proposition",
  quand: "Présenter une référence client dans une grille : logo, secteur, accroche. Type Invert sur fond sombre.",
  eviter: [
    "L'employer sans lien vers un cas client réel : la carte promet un contenu derrière.",
    "Mélanger Default et Invert dans la même grille : l'alternance se lit comme une hiérarchie qui n'existe pas."
  ],
  exemple: "La grille de références de la page d'accueil."
},

"card.cta": {
  statut: "proposition",
  quand: "Fermer une page sur une seule action : prendre rendez-vous, télécharger, s'inscrire. Un par page, en bas.",
  eviter: [
    "En placer plusieurs sur une page : le dernier bloc perd sa force.",
    "Y mettre deux actions concurrentes : ce bloc est fait pour une seule décision.",
    "Un titre de plus de trois lignes : au-delà, la taille 64 px casse la mise en page sur mobile, où elle tombe à 32 px."
  ],
  exemple: "Le bloc « Prenons un call » en fin de page cas client."
},

"card.media": {
  statut: "proposition",
  quand: "Renvoyer vers un contenu éditorial : article, replay, podcast. Dans une grille ou un carrousel.",
  eviter: [
    "L'utiliser pour une offre commerciale : le format est éditorial et crée une attente de contenu gratuit.",
    "Laisser le visuel vide : la carte repose sur l'image, sans elle elle est déséquilibrée."
  ],
  exemple: "La liste des articles et des replays de la page media."
},

"card.formation": {
  statut: "proposition",
  quand: "Présenter une formation au catalogue : titre, durée, format, niveau.",
  eviter: [
    "La détourner pour un article : les métadonnées (durée, format) induisent un engagement.",
    "Omettre la durée ou le format : ce sont les deux critères de décision."
  ],
  exemple: "Le catalogue de formations."
},

"card.quote": {
  statut: "proposition",
  quand: "Un verbatim attribué : citation client, retour de participant. Variante text pour une citation seule, image quand on a la photo de la personne.",
  eviter: [
    "Une citation sans auteur identifié : une citation anonyme n'a aucune valeur de preuve.",
    "Un verbatim reformulé : la carte donne à lire des mots prononcés, pas un résumé."
  ],
  exemple: "Le témoignage en milieu de page cas client."
},

"card.people": {
  statut: "proposition",
  quand: "Présenter une personne : prénom nom, rôle, courte biographie, lien de contact. Tailles sm, md, lg selon la densité.",
  eviter: [
    "Une photo absente ou de basse résolution : la carte est construite autour du portrait.",
    "Un rôle de plus de deux lignes : la propriété est bornée à deux lignes dans Figma et le texte est coupé au-delà."
  ],
  exemple: "La présentation des coachs et de l'équipe."
},

"card.gallery.item": {
  statut: "proposition",
  quand: "Un visuel dans une galerie, en complément de section.gallery.",
  eviter: ["L'employer seul hors d'une galerie : il n'a pas de contexte propre."],
  exemple: "Les planches visuelles d'un cas client."
},

"card.gallery.title": {
  statut: "proposition",
  quand: "Titrer une galerie, en première cellule de la grille.",
  eviter: ["En mettre plus d'un par galerie : la grille perd son point d'entrée."],
  exemple: "L'en-tête de la galerie d'un cas client."
},

"card.expertises": {
  statut: "proposition",
  quand: "Une expertise dans la grille d'offres : icône, titre, promesse en une phrase.",
  eviter: [
    "Plus d'une phrase de promesse : la carte est dimensionnée pour un texte court.",
    "Une icône choisie hors de la bibliothèque : le cycle de couleurs au survol suppose les icônes du DS."
  ],
  exemple: "La grille d'expertises de la page d'accueil."
},

"card.expertises.details": {
  statut: "proposition",
  quand: "Le détail d'une expertise une fois dépliée : livrables, durée, interlocuteurs.",
  eviter: ["L'afficher hors du dépliant collapse.expertises, pour lequel il est conçu."],
  exemple: "Le contenu déplié sous une expertise."
},

"card.list.item": {
  statut: "proposition",
  quand: "Une ligne dans une liste ordonnée : étape, livrable, point de méthode.",
  eviter: ["L'utiliser pour des éléments sans ordre : une grille de cartes convient mieux."],
  exemple: "Les étapes d'une mission sur une page cas client."
},

"card.banner.usecase": {
  statut: "proposition",
  quand: "L'en-tête d'un cas client : logo, secteur, résultat chiffré.",
  eviter: ["Un résultat non chiffré ou non validé par le client : ce bandeau est lu comme une preuve."],
  exemple: "Le haut des pages use-case."
},

"card.tape": {
  statut: "proposition",
  quand: "Un bandeau défilant de mots-clés ou de références, en séparation de sections.",
  eviter: ["Y mettre une information nécessaire à la compréhension : le texte défile et n'est pas lisible en entier d'un coup."],
  exemple: "Le bandeau de références sous le hero."
},

"card.banner": {
  statut: "proposition",
  quand: "Une annonce transverse : événement à venir, nouveauté.",
  eviter: ["Le laisser en place une fois l'événement passé : ce bloc date vite."],
  exemple: "L'annonce d'un live à venir."
},

/* ---------- Blocs d'interface ---------- */

"header": {
  statut: "proposition",
  quand: "L'en-tête de toute page du site. Le passage Default/Invert se joue au scroll.",
  eviter: [
    "Changer l'ordre des entrées d'une page à l'autre : la navigation doit être stable.",
    "Plus d'un bouton d'action dans l'en-tête."
  ],
  exemple: "Toutes les pages de yeita.fr."
},

"footer": {
  statut: "proposition",
  quand: "Le pied de toute page : plan du site, mentions, réseaux.",
  eviter: ["Y placer une action principale : ce qui compte ne se met pas en pied de page."],
  exemple: "Toutes les pages de yeita.fr."
},

"collapse.expertises": {
  statut: "proposition",
  quand: "Replier le détail d'une expertise pour garder la grille lisible.",
  eviter: [
    "Replier une information indispensable à la décision : ce qui est plié est rarement ouvert.",
    "Ouvrir tous les panneaux par défaut : le repli n'a plus d'objet."
  ],
  exemple: "La section expertises de la page d'accueil."
},

"form.newsletter": {
  statut: "proposition",
  quand: "Collecter une adresse e-mail. Horizontal en pleine largeur, Vertical en colonne ou en pied de page.",
  eviter: [
    "Demander autre chose que l'e-mail : chaque champ supplémentaire fait chuter le taux d'inscription.",
    "Omettre la mention de fréquence et de désinscription."
  ],
  exemple: "Le bloc d'inscription en pied de page."
},

"form.contact": {
  statut: "proposition",
  quand: "Une demande de contact qualifiée, en trois étapes.",
  eviter: [
    "Fusionner les trois étapes en un seul écran : le découpage existe pour réduire l'abandon.",
    "Rendre obligatoire un champ dont la réponse ne change pas la suite."
  ],
  exemple: "La page de contact."
},

"review": {
  statut: "proposition",
  quand: "Un avis structuré avec note et auteur.",
  eviter: ["Afficher une note sans dire sur quoi elle porte ni combien d'avis la composent."],
  exemple: "Les retours de participants aux formations."
},

"toaster": {
  statut: "proposition",
  quand: "Confirmer qu'une action a abouti, ou signaler une erreur passagère, sans interrompre.",
  eviter: [
    "Y mettre une information qu'il faut relire : le message disparaît.",
    "L'utiliser pour une erreur bloquante : elle doit rester affichée à côté du champ fautif."
  ],
  exemple: "La confirmation après inscription à la newsletter."
},

"pagination-bar": {
  statut: "proposition",
  quand: "Au-delà d'une vingtaine d'éléments dans une liste filtrable.",
  eviter: ["La combiner avec un chargement au défilement : il faut choisir l'un ou l'autre."],
  exemple: "La liste des cas clients."
},

"search + double-filtre": {
  statut: "proposition",
  quand: "Une liste longue qu'on trie selon deux axes, par exemple secteur et type de mission.",
  eviter: [
    "Proposer des filtres qui peuvent mener à zéro résultat sans l'annoncer.",
    "Plus de deux axes : au-delà, le composant ne suffit plus."
  ],
  exemple: "Le filtrage de la page use-cases."
},

/* ---------- Sections de page ---------- */

"section.hero": {
  statut: "proposition",
  quand: "Le premier écran d'une page. Centered pour une page de marque, Left pour une page d'offre, les variantes Media et Use case pour les pages correspondantes.",
  eviter: [
    "Deux actions dans le hero : la seconde est presque jamais cliquée.",
    "Un titre qui dépasse trois lignes en 64 px.",
    "Changer de variante d'une page à l'autre d'un même type : c'est la variante qui signale le type de page."
  ],
  exemple: "Le haut de la page d'accueil (Centered) et des pages d'offre (Left)."
},

"section.clients.usecase": {
  statut: "proposition",
  quand: "Afficher les références clients en bandeau, sur une page d'offre ou un cas client.",
  eviter: ["Afficher un logo client sans accord écrit d'utilisation de la marque."],
  exemple: "Le bandeau de logos sous le hero."
},

"section.collectif": {
  statut: "proposition",
  quand: "Présenter l'équipe. Focus sur une personne, Solo pour un portrait seul, Gallery pour le collectif.",
  eviter: ["Gallery avec moins de quatre personnes : la grille paraît vide."],
  exemple: "La page qui présente le collectif."
},

"section.process": {
  statut: "proposition",
  quand: "Dérouler une méthode en étapes ordonnées.",
  eviter: [
    "Plus de cinq étapes : au-delà, personne ne lit.",
    "Des étapes qui ne se suivent pas vraiment : utiliser une grille à la place."
  ],
  exemple: "La méthode d'intervention sur une page d'offre."
},

"section.quotidien": {
  statut: "proposition",
  quand: "Montrer concrètement à quoi ressemble le travail au jour le jour.",
  eviter: ["Y remettre les arguments déjà donnés plus haut : cette section sert à rendre tangible, pas à convaincre."],
  exemple: "La section « au quotidien » des pages d'offre."
},

"section.contact": {
  statut: "proposition",
  quand: "Le bloc de prise de contact en fin de page, quand card.cta est trop court.",
  eviter: ["L'utiliser en plus de card.cta sur la même page : deux appels à l'action se neutralisent."],
  exemple: "Le bas de la page de contact."
},

"section.content": {
  statut: "proposition",
  quand: "Du texte long structuré : corps d'article, argumentaire.",
  eviter: ["Des paragraphes au-delà d'une dizaine de lignes sans intertitre."],
  exemple: "Le corps des articles de la page media."
},

"section.content.usecase": {
  statut: "proposition",
  quand: "Le corps d'un cas client : contexte, mission, résultats.",
  eviter: ["Omettre le contexte de départ : sans point de départ, le résultat ne veut rien dire."],
  exemple: "Le corps des pages use-case."
},

"section.gallery": {
  statut: "proposition",
  quand: "Montrer des visuels de production. Clickbait pour accrocher, Highlight pour un visuel dominant, les variantes Focus pour déséquilibrer la grille volontairement.",
  eviter: [
    "Mélanger des visuels de qualités inégales : la grille aligne tout au même niveau de lecture.",
    "Une galerie de moins de trois visuels."
  ],
  exemple: "Les planches d'un cas client design."
},

"section.faq": {
  statut: "proposition",
  quand: "Répondre aux objections récurrentes, en fin de page d'offre.",
  eviter: [
    "Des questions que personne ne pose, écrites pour placer un argument : ça se voit.",
    "Plus de huit questions : au-delà, il faut une page d'aide."
  ],
  exemple: "La FAQ des pages de formation."
},

"section.list": {
  statut: "proposition",
  quand: "Une énumération structurée. Simple pour une liste courte, Advanced quand chaque entrée porte une description.",
  eviter: ["Advanced avec des descriptions vides : la mise en page se creuse."],
  exemple: "Les livrables d'une mission."
},

"section.media": {
  statut: "proposition",
  quand: "Une sélection de contenus éditoriaux sur une page qui n'est pas la page media.",
  eviter: ["Y mettre des contenus sans rapport avec la page : cette section est une suite de lecture, pas un fourre-tout."],
  exemple: "Les articles liés en bas d'un cas client."
},

"section.media.usecase": {
  statut: "proposition",
  quand: "Les contenus liés à un cas client précis.",
  eviter: ["L'afficher vide quand aucun contenu n'est associé : masquer la section."],
  exemple: "Le bas des pages use-case."
},

"section.media.gallery": {
  statut: "proposition",
  quand: "La galerie de la page media, pour parcourir par le visuel.",
  eviter: ["Des vignettes sans titre : l'image seule ne dit pas de quoi parle le contenu."],
  exemple: "La page media en vue galerie."
},

"section.media.list": {
  statut: "proposition",
  quand: "La liste des contenus. Default en grille, Vertical pour une colonne, Horizontal pour un défilement latéral.",
  eviter: ["Horizontal avec plus d'une dizaine d'éléments : la fin n'est jamais atteinte."],
  exemple: "La page media en vue liste."
},

"section.newsletter": {
  statut: "proposition",
  quand: "L'inscription à la newsletter en section pleine largeur. Invert sur fond sombre.",
  eviter: ["La répéter plusieurs fois sur une page."],
  exemple: "La section d'inscription en bas des pages media."
},

"section.reviews": {
  statut: "proposition",
  quand: "Rassembler plusieurs avis en preuve sociale.",
  eviter: [
    "Moins de trois avis : un ou deux témoignages isolés affaiblissent au lieu de rassurer.",
    "Des avis non datés : un avis sans date vieillit mal."
  ],
  exemple: "Les retours de participants en bas des pages de formation."
},

/* ---------- Contrôles de formulaire ---------- */

"checkbox": {
  statut: "proposition",
  quand: "La case seule, quand le libellé est porté par la ligne qui l'entoure, par exemple dans un tableau ou une liste à cocher.",
  eviter: ["L'employer dans un formulaire sans libellé associé : utiliser checkbox.input, qui porte le label et les états d'erreur."],
  exemple: "Une colonne de sélection dans une liste."
},

"checkbox.input": {
  statut: "proposition",
  quand: "Un choix multiple dans un formulaire : consentements, options cumulables. Les états Hover, Active, Disabled et Error sont fournis.",
  eviter: [
    "Une case pré-cochée pour un consentement : c'est sans valeur juridique et ça se retourne contre vous.",
    "Une case unique pour un choix exclusif : c'est un radio."
  ],
  exemple: "Le consentement au traitement des données du formulaire de contact."
},

"radio": {
  statut: "proposition",
  quand: "Le bouton seul, quand le libellé est porté par la ligne qui l'entoure.",
  eviter: ["L'employer dans un formulaire sans libellé associé : utiliser radio.input."],
  exemple: "Une sélection dans une liste de lignes."
},

"radio.input": {
  statut: "proposition",
  quand: "Un choix unique entre deux et cinq options visibles d'un coup.",
  eviter: [
    "Plus de cinq options : passer au dropdown.",
    "Ne présélectionner aucune option quand une valeur par défaut est évidente."
  ],
  exemple: "Le choix du type de demande dans le formulaire de contact."
},

"dropdown.default": {
  statut: "proposition",
  quand: "Choisir dans une liste de deux à six entrées, quand la place manque pour des radios.",
  eviter: [
    "Moins de deux entrées : Figma le déconseille explicitement, préférer un lien.",
    "Plus de six entrées : la liste devient un champ de recherche."
  ],
  exemple: "Un filtre secondaire au-dessus d'une liste."
},

"dropdown.header": {
  statut: "proposition",
  quand: "Un sous-menu de navigation dans l'en-tête, de deux à six liens. Invert sur fond sombre.",
  eviter: [
    "Un seul lien dans le menu déroulant : le mettre directement dans la barre.",
    "Y cacher une page importante : ce qui est dans un déroulant est deux fois moins visité."
  ],
  exemple: "Le sous-menu des offres dans l'en-tête."
},

"linklist": {
  statut: "proposition",
  quand: "La liste de navigation du menu mobile, en états Closed et Open.",
  eviter: ["L'employer sur grand écran : la navigation desktop passe par header et dropdown.header."],
  exemple: "Le menu mobile déplié."
},

"collapse": {
  statut: "proposition",
  quand: "Replier un contenu secondaire, la ligne entière étant cliquable. Invert sur fond sombre.",
  eviter: [
    "Replier un contenu que la personne doit lire pour décider.",
    "Imbriquer deux niveaux de repli."
  ],
  exemple: "Les questions d'une FAQ."
},

"filter-tag": {
  statut: "proposition",
  quand: "Un filtre actionnable dans une barre de tri. Invert sur fond noir ou bleu foncé.",
  eviter: [
    "Le confondre avec tag, qui qualifie sans filtrer.",
    "Laisser un filtre actif sans moyen visible de le retirer."
  ],
  exemple: "Les filtres de la page use-cases."
},

"filter-tag-bar": {
  statut: "proposition",
  quand: "La barre qui regroupe les filtres au-dessus d'une liste.",
  eviter: ["Plus d'une dizaine de filtres visibles : grouper par axe ou passer à la recherche."],
  exemple: "La barre de filtres de la page media."
},

"click-area-tag": {
  statut: "proposition",
  quand: "Agrandir la zone cliquable autour d'un tag, pour atteindre la cible minimale au doigt.",
  eviter: ["L'utiliser comme espacement visuel : c'est une zone d'interaction, elle intercepte les clics."],
  exemple: "Les tags d'une carte sur mobile."
},

/* ---------- En-têtes et navigation ---------- */

"header.mobile.open": {
  statut: "proposition",
  quand: "Le menu mobile déployé, qui occupe tout l'écran disponible.",
  eviter: [
    "Laisser la page défiler derrière le menu ouvert.",
    "Omettre la fermeture explicite : le geste de retour ne suffit pas sur tous les appareils."
  ],
  exemple: "La navigation mobile de yeita.fr."
},

"header.media": {
  statut: "proposition",
  quand: "La barre secondaire des pages media, collante sous l'en-tête principal. De trois à sept liens.",
  eviter: [
    "Plus de sept liens : la barre passe à la ligne et perd sa lisibilité.",
    "La reprendre hors des pages media : elle signale cette section."
  ],
  exemple: "La navigation par rubrique de la page media."
},

/* ---------- Éléments décoratifs ---------- */

"floating.image": {
  statut: "proposition",
  quand: "Une image détourée posée en débord d'un bloc, pour casser la grille.",
  eviter: [
    "Y placer une information : l'élément est décoratif, il est recadré ou masqué selon la largeur.",
    "Plus d'un par section : l'effet s'annule."
  ],
  exemple: "Le visuel en débord du hero de la page d'accueil."
},

"floating.peeps": {
  statut: "proposition",
  quand: "Les silhouettes illustratives qui accompagnent un bloc.",
  eviter: ["Les utiliser pour représenter des personnes réelles : ce sont des illustrations génériques."],
  exemple: "L'illustration du bloc collectif."
},

"floating.badge": {
  statut: "proposition",
  quand: "Une pastille posée sur un visuel : chiffre clé, label court.",
  eviter: [
    "Un texte de plus de trois mots : la pastille fait 64 px.",
    "La poser sur une zone chargée du visuel : le contraste n'est plus garanti."
  ],
  exemple: "Le chiffre de résultat posé sur l'image d'un cas client."
},

"Cursor": {
  statut: "proposition",
  quand: "Le curseur décoratif qui signale une zone interactive ou anime une capture. Six couleurs, quatre orientations.",
  eviter: [
    "Le style Black sur fond sombre : Figma signale déjà le problème de contraste.",
    "Le poser à côté d'un élément qui n'est pas cliquable : il promet une interaction."
  ],
  exemple: "Les captures animées de la page d'accueil."
},

"pattern.grid": {
  statut: "proposition",
  quand: "Un fond quadrillé, appliqué en motif répété. Le workflow Figma : importer une instance, régler la couleur, appliquer en pattern.",
  eviter: [
    "Le poser sous du texte long sans voile : la lisibilité tombe.",
    "Mélanger deux motifs dans une même section."
  ],
  exemple: "Le fond des sections techniques."
},

"pattern.dots": {
  statut: "proposition",
  quand: "Un fond pointillé, même workflow que les autres motifs.",
  eviter: ["L'employer à pleine opacité derrière un bloc de texte."],
  exemple: "Le fond d'un bloc de citation."
},

"pattern.y": {
  statut: "proposition",
  quand: "Le motif formé par le Y de la marque, pour les fonds de marque et les jaquettes.",
  eviter: [
    "Le déformer pour l'adapter à un cadre : il se répète, il ne s'étire pas.",
    "L'employer en même temps que le logo complet dans la même zone : la marque se répète deux fois."
  ],
  exemple: "Le fond des jaquettes Live produites par Y.Cover."
},

"illustrations.source": {
  statut: "proposition",
  quand: "Les illustrations vectorielles éditables, à reprendre dans Figma.",
  eviter: ["Les exporter en image pour le web : utiliser illustrations.png, calibrées pour ça."],
  exemple: "La bibliothèque d'illustrations dans Figma."
},

"illustrations.png": {
  statut: "proposition",
  quand: "Les illustrations prêtes à poser sur le site.",
  eviter: ["Les agrandir au-delà de leur taille d'export : elles sont matricielles."],
  exemple: "Les visuels d'accompagnement des pages d'offre."
},

"Player": {
  statut: "proposition",
  quand: "La lecture d'un contenu audio ou vidéo intégré : replay, podcast.",
  eviter: [
    "Le lancement automatique avec le son.",
    "Un lecteur sans durée affichée : la personne ne sait pas dans quoi elle s'engage."
  ],
  exemple: "Les replays de live sur la page media."
},

/* ---------- Sections restantes ---------- */

"section.clients.logos": {
  statut: "proposition",
  quand: "Le bandeau de logos clients qui défile lentement en boucle. Invert sur fond sombre.",
  eviter: [
    "Rendre les logos cliquables : le défilement rend la cible impossible à viser.",
    "Un défilement sans pause au survol ni respect de prefers-reduced-motion."
  ],
  exemple: "Le bandeau de références de la page d'accueil."
},

"section.collapse.expertises": {
  statut: "proposition",
  quand: "La section qui regroupe les expertises dépliables.",
  eviter: ["Ouvrir plusieurs panneaux à la fois par défaut."],
  exemple: "La section expertises de la page d'accueil."
},

"section.collapse.offres": {
  statut: "proposition",
  quand: "La section qui regroupe les offres dépliables.",
  eviter: ["Y masquer le prix ou la durée : ce sont les informations qu'on vient chercher."],
  exemple: "La page des offres."
},

"section.collapse.collectif": {
  statut: "proposition",
  quand: "La section qui déplie les profils du collectif.",
  eviter: ["Replier la photo : le portrait est ce qui identifie la personne."],
  exemple: "La page du collectif."
},

/* ---------- Marque ---------- */

"logo.letter": {
  statut: "proposition",
  quand: "Les lettres modulaires Y, E, I, T, A, en styles Classic et Crazy et en trois graisses. Elles servent à composer le logo, pas à écrire du texte.",
  eviter: [
    "Composer un autre mot que Yeita.",
    "Mélanger plus de deux styles dans une même composition."
  ],
  exemple: "La construction du logo dans Figma."
},

"logo": {
  statut: "proposition",
  quand: "Le logo assemblé. Long pour les en-têtes et les documents, Short quand la place manque. All Classic pour les usages institutionnels, les variantes Mix pour les usages éditoriaux.",
  eviter: [
    "Le redessiner ou en changer les proportions.",
    "Une variante Crazy sur un document contractuel ou commercial."
  ],
  exemple: "L'en-tête du site et les jaquettes."
},

"logo.animate": {
  statut: "proposition",
  quand: "L'animation du logo en cinq étapes, pour une introduction ou un écran de chargement.",
  eviter: [
    "La rejouer à chaque navigation : elle se regarde une fois.",
    "L'employer sans respecter prefers-reduced-motion."
  ],
  exemple: "L'animation d'ouverture d'une vidéo."
}

};
