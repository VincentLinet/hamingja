const RANKS = [
  {
    title: "Recruit",
    actions: [
      "Ton nom circule autour du feu, et Hamingja se pose sur une branche proche, manifestement à l'écoute.",
      "Tu surprends Hamingja à t'observer t'entraîner, la tête inclinée avec quelque chose qui ressemble à de la curiosité.",
      "Hamingja laisse tomber un caillou pile dans ton champ de vision pendant que tu enchaînes les exercices, histoire de voir si tu perdras ta concentration pour le regarder.",
      "Encore piqué par un échec qui t'a blessé plus qu'il ne le devrait, tu remarques une petite perle runique finement sculptée reposant dans ta paume, visiblement ancienne, visiblement précieuse, sans la moindre explication sur la raison pour laquelle elle t'appartient désormais."
    ]
  },
  {
    title: "Squire",
    actions: [
      "Hamingja se perche assez près pour que tu puisses presque le toucher, presque.",
      "On te confie une vraie responsabilité, et Hamingja observe en silence, comme s'iel attendait quelque chose.",
      "Tu consacres des heures supplémentaires à ton entraînement, et Hamingja reste plus longtemps que la simple curiosité ne pourrait l'expliquer.",
      "Le regard de Hamingja t'inspire un salut de la tête, et iel te répond d'un petit signe du sien.",
      "Hamingja se pose sur un poteau tout proche pendant que tu travailles, sans même feindre l'indifférence.",
      "Tu donnes tout ce que tu as pour aider %higher, et Hamingja laisse tomber une noix à tes pieds, qui s'ouvre sous le choc.",
      "Alors que tu t'entraînes avec %equal, Hamingja plonge sous ton talon juste avant qu'il ne retombe, et tout ce que tu aperçois, c'est un caillou qui roule au loin dans une traînée de poussière bleue.",
      "Hamingja laisse tomber une pierre d'en haut pendant que tu t'exerces, histoire de voir si tu peux la dévier à temps.",
      "Après une leçon qui te laisse plus frustré que fier, tu trouves une pierre lisse glissée dans ta main, petite et simple, mais suffisante, on ne sait comment, pour tenir le reste de la journée."
    ]
  },
  {
    title: "Skipari",
    actions: [
      "Une vague s'écrase sur la proue, et Hamingja encaisse les embruns depuis la vergue du mât sans le moindre frisson.",
      "Tu tends un cordage, et Hamingja s'y pose dès qu'il cesse de bouger, inspectant ton nœud.",
      "Hamingja observe l'horizon à tes côtés, étrangement immobile, comme si cela comptait pour iel aussi.",
      "Tu es le premier à toucher terre après une traversée difficile, et Hamingja t'attend déjà, perché sur le poteau du quai.",
      "Hamingja se blottit dans les plis d'un cordage enroulé près de toi, traversant une mer agitée sans se plaindre.",
      "Hamingja dénoue d'un coup de bec le nœud que tu viens de faire, observant attentivement pour voir à quelle vitesse tu t'en aperçois.",
      "Alors que tu comptes ce que la traversée a coûté à l'équipage, plus qu'elle n'aurait dû, tu trouves une petite flamme nichée dans ta paume, chaude comme un feu de foyer mais qui ne brûle jamais, luisant d'un faible bleu-violet jusqu'à s'éteindre."
    ]
  },
  {
    title: "Guard",
    actions: [
      "Hamingja se pose juste hors de portée de ta main au début de ton tour de garde, compagnie silencieuse pour les longues heures à venir.",
      "L'aube se lève après une nuit calme et sans histoire, et Hamingja est toujours là, à tes côtés, n'étant jamais parti.",
      "Hamingja se pose sur la palissade à côté de toi, fixant la même lisière sombre que toi.",
      "Des heures après ta prise de poste, tu n'as pas bougé d'un pouce, et Hamingja non plus.",
      "Hamingja semble faire assez confiance à ta garde pour somnoler, sans défense, à portée de ta main.",
      "Une silhouette se détache d'un buisson au loin, de quoi t'inquiéter, jusqu'à ce que tu réalises que ce n'est que Hamingja, en train de tester si tu veilles vraiment.",
      "Après une garde qui t'a mis les nerfs à vif, tu trouves une brindille calcinée près de ta botte, tirée d'un feu éteint depuis longtemps."
    ]
  },
  {
    title: "Raid Companion",
    actions: [
      "Tu pénètres en territoire hostile, et Hamingja se tapit contre ton sac, comme s'iel refusait d'être laissé derrière.",
      "Tu partages tes rations sans qu'on te le demande, et Hamingja semble désormais s'y attendre.",
      "Hamingja s'élance en éclaireur jusqu'au tournant du chemin, puis revient tout droit vers toi spécifiquement, pour une raison qui t'échappe.",
      "Tu reviens de rivages lointains, et Hamingja est le premier à t'accueillir, avant même que quiconque ne remarque ton retour.",
      "Tu hisses ton équipement sur ton épaule pour le trajet du retour, et Hamingja s'y pose aussitôt, montant lui-même la garde dessus.", // too close, a raid companion doesn't have that trust yet
      "Hamingja imite le signal du raid depuis une direction totalement fausse, juste pour te voir te retourner pour rien.",
      "Alors que tu fais le compte de ce que ce voyage t'a coûté, une arme à laquelle tu tenais parmi les pertes, tu trouves une unique plume sombre plantée sur ton sac, sans la moindre explication nécessaire."
    ]
  },
  {
    title: "Banner",
    actions: [
      "Hamingja se perche au sommet de la bannière que tu portes, la chevauchant comme si elle avait été hissée dans ce seul but.",
      "Tu plantes les couleurs du Clan, et Hamingja se pose sur la hampe avant même que le tissu ne retombe.",
      "Tu dresses la bannière face au vent, et Hamingja se glisse droit dans son ombre, ne s'éloignant jamais bien loin de la couleur.",
      "Les autres se rallient à ta bannière plantée sans qu'on ait eu besoin de le leur dire, et Hamingja semble avoir discrètement fait le même choix.",
      "La colonne s'ébranle, et Hamingja se pose sur le bord de ta bannière et y reste, tel un second étendard, plus petit, bien à lui.",
      "Tu plantes la bannière au sommet d'une colline en hurlant ton cri de guerre, et Hamingja fonce droit dans l'étoffe, et dans un nuage de poussière runique, anime les couleurs du Clan d'un chatoiement bleu et violet.",
      "Hamingja tire la bannière de côté dans une rafale qui n'en est pas vraiment une, juste pour voir si tu vas courir après la couleur avant de comprendre.",
      "Après que la bannière a failli tomber et que tu l'as rattrapée de justesse, tu trouves un morceau de son tissu déchiré glissé dans ta paume, assez petit pour être gardé, assez lourd pour ne jamais être oublié."
    ]
  },
  {
    title: "Master at Arms",
    actions: [
      "Hamingja se perche sur le râtelier d'entraînement le plus proche, te regardant corriger %lower avec la vraie patience d'un officier aguerri.",
      "Alors que tu enseignes sans jamais élever la voix, Hamingja écoute depuis les poutres comme si la leçon lui était destinée aussi.",
      "Hamingja étudie ta posture pendant que tu enchaînes l'exercice, la tête inclinée, comme s'iel gravait chaque mouvement dans sa mémoire.",
      "Tu désarmes %warrior par la seule technique, et le silence de Hamingja qui suit ressemble à des applaudissements.",
      "Tu annonces l'exercice suivant, et Hamingja se pose sur le râtelier juste à côté de toi, spectateur silencieux du bruyant échange de coups.",
      "Hamingja entrechoque deux branches mortes juste derrière %lower en plein milieu de la leçon, histoire de voir si tu romps ta position pour regarder.",
      "À l'instant même où t'arrive la nouvelle qu'un élève que tu as formé est tombé au combat, tu trouves une lame d'entraînement ébréchée reposant dans tes mains, teintée d'une faible lumière bleue, polie par des prises qui ne la tiendront plus."
    ]
  },
  {
    title: "Húskarl",
    actions: [
      "Tu entres dans la Grande Salle, et Hamingja est simplement là, comme s'iel t'attendait.",
      "On te confie un secret trop lourd pour la plupart des oreilles, et Hamingja se fige à tes côtés, comme s'iel en avait déjà deviné la forme.",
      "Alors que le conseil se réunit, Hamingja se pose à tes côtés, étrangement attentif à chaque mot prononcé.",
      "Au souvenir d'un secret que tu as bien gardé, tu croises le regard de Hamingja et y lis une approbation, venant de celui qui garde les secrets mieux que quiconque.",
      "Tu traverses le couloir le plus silencieux du Cercle Restreint sans un bruit, et Hamingja ne sursaute même pas.",
      "Hamingja soulève un sceau directement sur la table du conseil en pleine réunion, puis le repose exactement à sa place, juste pour voir si quelqu'un remarquera qu'il a disparu.",
      "Après qu'un secret s'est révélé plus lourd à porter que prévu, tu trouves un petit morceau de parchemin scellé sous ton oreiller, vierge à l'intérieur, comme pour t'offrir d'en porter une part à ta place."
    ]
  },
  {
    title: "Hersir",
    actions: [
      "Alors que ton Hugr s'éveille de façon perceptible avec une décision que tu viens de prendre, Hamingja est là pour voir la vague d'énergie brute te traverser.",
      "Tu croises le regard de Hamingja et ressens soudain une bouffée de fierté envers toi-même.",
      "Ton Hugr se met en place comme un souffle enfin relâché, et quelque part au-dessus de toi, les ailes de Hamingja font de même.",
      "Hamingja se pose droit devant toi et soutient ton regard sans ciller, le même regard inébranlable que iel t'a offert le jour où le Clan t'a nommé Hersir.",
      "Une menace passe près de toi sans que tu la remarques, et Hamingja s'est déjà interposé avant même que tu ne lèves les yeux.",
      "Hamingja pousse un cri d'alarme hors de ta vue, histoire de voir quel réflexe ton instinct mettra en mouvement.",
      "Pour une raison ou une autre, Hamingja te rapporte la même brindille gravée de runes qu'iel t'avait offerte la nuit où ton Hugr s'est éveillé, intacte, assez petite pour passer inaperçue, assez importante pour être gardée."
    ]
  },
  {
    title: "Thane",
    actions: [
      "Hamingja se perche sur un rocher de tes terres, comme pour en marquer la garde comme sienne aussi.",
      "Tu endosses le poids du serment et de la responsabilité, et Hamingja se pose tout près, étrangement solennel.",
      "Tu pars inspecter tes terres à cheval, et Hamingja te suit tout du long, témoin silencieux du travail que tu supervises.",
      "Quelqu'un vient te confier ses soucis près du feu, et Hamingja, posé tout près, écoute chaque mot.",
      "Tu rentres plus tard que prévu, et Hamingja t'attend, silhouette découpée sur le faîte de ton toit.",
      "Hamingja déplace une borne de quelques centimètres, juste pour voir combien de temps il te faudra pour remarquer que tes propres terres ont bougé.",
      "Une décision pesant sur toi tard dans la nuit, tu trouves un gland poli posé près de ta bougie, simple, mais apaisant on ne sait comment."
    ]
  },
  {
    title: "Skaldic Whisper",
    actions: [
      "Tu entends ton nom tissé dans le vers de %skald, et Hamingja se fige, à l'écoute.",
      "%skald entonne un vers qui porte ton nom, et Hamingja fredonne presque en retour, à voix basse.",
      "Tu passes près du cercle des skalds et surprends Hamingja perché juste parmi eux, comme s'iel récoltait de la matière à ton sujet.",
      "Hamingja répète, dans son propre langage, un fragment de ton propre vers, comme pour te rappeler tes propres valeurs.",
      "Tu réalises soudain que le vers que %skald chante à ton sujet, Hamingja l'a vécu de ses propres yeux.",
      "Hamingja tranche la pause la plus théâtrale de %skald d'un cri perçant et à contretemps, brisant le moment dans un éclat de rire général, et a l'air parfaitement satisfait de son effet.",
      "Après qu'un vers à ton sujet s'est révélé plus cruel que bienveillant, ton regard tombe sur une fleur séchée glissée dans ta cape, petite et douce face à ce qui vient d'être dit."
    ]
  },
  {
    title: "Champion",
    actions: [
      "Hamingja se pose au-dessus du dossier de ton siège comme pour marquer l'honneur, observant le Clan te célébrer avec une attention discrète.",
      "%higher porte un toast en ton nom devant le feu de joie, et Hamingja plonge droit à travers les flammes dans une explosion de couleur, soulignant l'honneur.",
      "Quelqu'un prononce ton nom de Champion à travers la salle, et Hamingja se gonfle, marchant plus fièrement, si tant est qu'un oiseau le puisse.",
      "Tu es assis à côté de %higher à la table d'honneur, et Hamingja, pour une fois, ne se donne même pas la peine de cacher à quel point iel t'observe.",
      "Hamingja se perche sur ton trophée avant que quiconque n'ose y toucher, comme pour se l'approprier.",
      "Hamingja échange ta coupe contre une vide pendant le toast, puis la remet en place avant même que tu n'aies remarqué sa disparition.",
      "Pesant ce que la victoire a coûté, plus qu'elle n'aurait dû, tu trouves une pièce ternie posée sur ton assiette, qui ne vaut rien et signifie tout."
    ]
  },
  {
    title: "Veteran",
    actions: [
      "Tu arrives dans le dos de Hamingja sans vouloir le surprendre, et pour une fois, iel ne sursaute même pas.",
      "Tu portes de vieilles cicatrices et des histoires plus vieilles encore, et Hamingja écoute les deux avec la même patience tranquille.",
      "Hamingja se pose à tes côtés comme iel le ferait avec quelqu'un qu'iel aurait toujours connu.",
      "Tu ignores une blessure qui terrasserait la plupart des gens, et Hamingja fond sur toi avec une étrange feuille cireuse, la presse contre la plaie, puis disparaît dans une volée de poussière scintillante.",
      "Hamingja se pose à côté de toi sans l'hésitation qu'iel montrerait à presque n'importe qui d'autre, et reste, tout simplement.",
      "Hamingja feint un geste vers ton visage et dévie à la dernière seconde, juste pour vérifier si le vieux réflexe de sursauter est toujours là.",
      "Alors que de vieilles épreuves te rattrapent toutes à la fois, tu trouves une antique pointe de flèche tordue posée contre ta main, tirée on ne sait d'où."
    ]
  },
  {
    title: "Hero",
    actions: [
      "%anyone raconte à nouveau tes exploits près du feu pour la troisième fois ce soir, enjolivant un peu plus à chaque tour, et Hamingja écoute avec un amusement visible, comme s'iel avait déjà entendu chaque version.",
      "Hamingja se pose tout près pendant qu'on raconte ton histoire, comme pour en suivre chaque détail.",
      "%lower t'arrête pour te demander si tu es vraiment le Héros des récits, et Hamingja se pose entre vous, étrangement protecteur de l'attention.",
      "Hamingja se pose sur ton épaule devant une foule, indifférent à être vu.",
      "Tu es devenu quelqu'un qu'on montre du doigt, et Hamingja se perche là aussi, discrètement inclus dans le geste.",
      "Hamingja imite ta propre voix, en sons approximatifs tenant lieu de mots, depuis un toit voisin, avec une tonalité juste assez fausse pour être dérangeante.",
      "Après que le poids des attentes de tous devient trop lourd pour une soirée, tu ouvres la main sur un simple caillou ordinaire, délibérément, farouchement quelconque."
    ]
  },
  {
    title: "Saga Hero",
    actions: [
      "Tu apprends que ta saga se raconte dans une colonie que tu n'as jamais visitée, et Hamingja revient d'un vol bien plus long que d'habitude, comme pour le confirmer.",
      "Tu remarques que Hamingja a disparu depuis des jours, et au moment même où tu t'en aperçois, iel réapparaît comme si de rien n'était, traînant derrière lui le parfum d'un autre monde.",
      "Tu entends ta propre saga récitée dans un lieu où tu n'as jamais mis les pieds, et pourtant, Hamingja en connaissait déjà le vers.",
      "Tu traverses une colonie qui n'a jamais entendu parler de toi, et Hamingja se perche tout de même à la lisière de son rassemblement, guettant ton nom parmi les inconnus.",
      "Un enfant qui n'était pas né quand ta saga a commencé demande à l'entendre encore, et Hamingja se pose tout près, déterminé à assister à ce récit aussi.",
      "Hamingja se pose sur l'instrument d'un skald errant et pince une corde, juste assez faux pour gâcher le vers le plus exagéré de ta saga.",
      "Après avoir entendu ta propre histoire déformée en quelque chose que tu ne reconnais plus, tu trouves sur ton chemin une plume vraie, sans fard, légèrement voilée de bleu mais aussi solide que tout le reste, simple comme la vérité dont tu te souviens."
    ]
  },
  {
    title: "Odin's Brand",
    actions: [
      "Hamingja étudie la marque que le destin a brûlée en toi, à parts égales d'émerveillement et de malaise.",
      "Ta marque s'embrase soudain dans ta peau avec un poids que tu peux sentir, et Hamingja se pose sur ton épaule à l'instant même, refusant de bouger.",
      "Hamingja fait un tour autour de toi, lent et posé, comme iel le ferait autour de quelque chose de sacré.",
      "Tu portes désormais le sceau d'Odin, et l'espièglerie habituelle de Hamingja se tait en ta présence, ne serait-ce que brièvement.",
      "Hamingja se perche tout près, étudiant ta marque comme s'iel essayait d'y lire ce qu'elle annonce de la suite.",
      "Hamingja plane au-dessus de la Marque, l'étudiant de près, puis se pose directement dans l'empreinte en un nuage de poussière runique, et pour un temps, son poids brûlant se change en quelque chose d'apaisant, comme si tout le Clan le portait avec toi.",
      "Alors que le poids de la Marque t'empêche de trouver le repos, Hamingja revient trempé d'un ruisseau voisin et secoue ses plumes humides directement contre la marque, le froid apaisant la brûlure, ne serait-ce qu'un instant."
    ]
  },
  {
    title: "Ascended",
    actions: [
      "Tu franchis un seuil que peu de mortels atteignent jamais, et Hamingja te regarde comme si tu n'étais plus tout à fait mortel.",
      "Tu as marché au-delà de là où s'arrêtent la plupart des chemins, et Hamingja semble, pour une fois, incertain de la distance encore permise.",
      "Tu traverses le camp, et Hamingja abandonne ce qu'iel était en train de faire pour te suivre, essayant de comprendre ce que tu es devenu.",
      "Tes pieds quittent le sol l'espace d'un instant, à peine un souffle, et quelque part au-dessus, Hamingja ressent le même appel et s'élève avec toi.",
      "Hamingja se pose devant toi et se contente de regarder, pour une fois, avec quelque chose qui n'est pas tout à fait de la révérence, mais qui n'en est pas loin non plus.",
      "Hamingja t'arrache une rune du futhark directement de la paume, juste pour voir si tu tiens encore à quelque chose d'aussi petit.",
      "Alors que tu te sens plus éloigné de tous que tu ne voudrais l'admettre, tu entends un froissement dans les branches au-dessus de toi, et une pluie de cônes dégringole sur ton visage, éparpillant leurs graines au sol comme un minuscule Clan trouvant son propre ordre."
    ]
  },
  {
    title: "Legend",
    actions: [
      "Tu quittes la salle, mais ton nom reste derrière toi dans le chant de %skald, et Hamingja s'attarde sous les poutres pour l'entendre jusqu'au bout.",
      "Quelque part, %skald raconte ton histoire à des gens qui ne t'ont jamais rencontré, et Hamingja est déjà perché là, gardien de ce souvenir.",
      "Le feu baisse et %anyone continue malgré tout de raconter ton histoire, et Hamingja se pose parmi les auditeurs, prêtant au récit la force et la couleur que ta saga mérite.",
      "Hamingja reproduit l'un de tes gestes à l'intention de personne en particulier, à la perfection, comme pour le graver volontairement dans sa mémoire.",
      "Tu surprends Hamingja en train de rejouer un fragment de ta légende devant %anyone qui ne t'a jamais rencontré, scène par scène, raconté dans un langage qui n'est pas tout à fait fait de mots.",
      "Hamingja mime le moment le plus dramatique de ta légende en plein vol, les ailes déployées tout au long de la performance, juste pour voir si tu vas rire ou contester les détails.",
      "Tu te sens davantage comme une histoire que comme une personne, et tu trouves un unique fil effiloché dans ta paume, tiré d'une cape que tu portais à l'époque où tu n'étais encore la légende de personne, preuve que tu es toujours quelque chose de réel."
    ]
  },
  {
    title: "Immortal",
    actions: [
      "Hamingja se pose sur ton épaule de la même façon qu'iel se pose sur celle de Mark ou d'Ásrunn, non pas comme quelqu'un qu'iel protège, mais comme quelqu'un à côté de qui iel marche.",
      "Tu survis aux mortels qui ont raconté ton histoire en premier, et Hamingja, intemporel à sa manière, trouve enfin un égal à qui tenir le rythme.",
      "Hamingja se perche à tes côtés dans un silence qui ressemble moins à de la distance qu'à une vieille compagnie, facile et familière.",
      "Tu te tiens parmi la poignée de ceux qui sont jamais allés aussi loin, et Hamingja se pose à tes côtés, pour la première fois, en tant que parent plutôt que protégé.",
      "Hamingja se pose sur ton épaule, et l'espace d'un instant, ressemble moins à un oiseau qu'à tout ce que le Clan est devenu, toi comptant parmi les raisons pour lesquelles.",
      "Hamingja laisse tomber une pierre d'en haut, exactement comme iel le faisait quand tu n'étais encore qu'Écuyer, et tu la rattrapes aussi facilement qu'à l'époque.",
      "Le poids d'avoir survécu à tous ceux que tu as connus se pose sur toi, et tu trouves un cordon tressé déjà noué à ton poignet, identique à ceux que portent aussi Mark et Ásrunn, sans que tu n'aies jamais remarqué quand."
    ]
  }
];

export default RANKS;
