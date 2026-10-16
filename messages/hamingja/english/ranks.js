const RANKS = [
  {
    title: "Recruit",
    actions: [
      "Your name comes up around the fire, and Hamingja drops onto a nearby branch, clearly listening in.",
      "You catch Hamingja watching you train, head tilted with something like curiosity.",
      "Hamingja drops a pebble right in your eyeline while you're running drills, just to see if you'll break focus to look at it.",
      "Still stinging from a failure that cut deeper than it should, you notice a small, intricately carved rune-bead resting in your palm, clearly old, clearly valuable, with no explanation for why it's yours now."
    ]
  },
  {
    title: "Squire",
    actions: [
      "Hamingja perches close enough that you could almost reach them, almost.",
      "You're handed real responsibility, and Hamingja observes in silence, as if expecting something.",
      "You invest extra hours in your practice, and Hamingja stays longer than curiosity alone would explain.",
      "The stare of Hamingja triggers an urge to nod a greeting, and Hamingja answers with a small dip of their head.",
      "Hamingja settles on a nearby post while you work, not bothering to pretend indifference.",
      "You give everything you have to help %higher, and Hamingja drops a nut at your foot, which cracks open on impact.",
      "As you train with %equal, Hamingja swoops beneath your heel just before it lands, and all you catch is a pebble spinning away in a trail of dusty blue.",
      "Hamingja drops a stone from above while you practice, testing whether you can deflect it in time.",
      "After a lesson that leaves you more frustrated than proud, you find a single smooth stone tucked into your hand, small and simple, but somehow enough to carry you through the rest of the day."
    ]
  },
  {
    title: "Skipari",
    actions: [
      "A wave crashes over the bow, and Hamingja rides out the spray from the mast's crosspiece without so much as a shiver.",
      "You haul a line taut, and Hamingja lands on it the second it stills, inspecting your knotwork.",
      "Hamingja watches the horizon beside you, uncharacteristically still, as if it meant something to them too.",
      "You're the first ashore after a hard crossing, and Hamingja is already there waiting on the dock post.",
      "Hamingja tucks into the folds of a coiled rope near you, riding out a rough sea without complaint.",
      "Hamingja tugs loose a knot you just tied, watching closely to see how fast you catch it.",
      "Counting what the crossing cost the crew, more than it should have, you find a small flame cupped in your palm, warm as a hearth fire but never burning, glowing faint blue-violet until it fades."
    ]
  },
  {
    title: "Guard",
    actions: [
      "Hamingja settles just out of arm's reach at the start of your watch, silent company through the long hours.",
      "Dawn breaks after a quiet, uneventful night, and Hamingja is still there beside you, having never once left.",
      "Hamingja settles on the palisade beside you, watching the same dark treeline you do.",
      "Hours into your post, you haven't moved an inch, and neither has Hamingja.",
      "Hamingja seems to trust your watch enough to doze, undefended, within arm's reach of you.",
      "A silhouette peels away from a bush in the distance, enough to worry you, until you realize it's only Hamingja, testing whether you're truly watching.",
      "After a watch that leaves your nerves worn thin, you find a single scorched twig by your boot, pulled from a fire that's long since gone cold."
    ]
  },
  {
    title: "Raid Companion",
    actions: [
      "You cross into hostile territory, and Hamingja tucks low against your pack, as if refusing to be left behind.",
      "You share your rations without being asked, and Hamingja has clearly come to expect it.",
      "Hamingja flits ahead to scout the bend in the path, then circles straight back to you specifically, for some reason you can't understand.",
      "You return from distant shores, and Hamingja is the first to greet you, before anyone else notices you're back.",
      "You sling your gear over your shoulder for the journey home, and Hamingja lands on it immediately, standing guard over it personally.", // too close, a raid companion doesn't have that trust yet
      "Hamingja mimics the raid's signal call from entirely the wrong direction, just to watch you spin around for nothing.",
      "Taking stock of what the journey cost you, a weapon you valued among it, you find a single dark feather planted on your pack, no explanation needed."
    ]
  },
  {
    title: "Banner",
    actions: [
      "Hamingja perches atop the banner you carry, riding it like it was raised for exactly that purpose.",
      "You plant the clan's colors, and Hamingja lands on the pole before the fabric even settles.",
      "You raise the banner against the wind, and Hamingja ducks straight into its shadow, not straying far from the color.",
      "Others start rallying around your planted banner without needing to be told, and Hamingja seems to have quietly chosen the same.",
      "The column sets off, and Hamingja lands on your banner's edge and stays there, a second, smaller flag of their own.",
      "You plant the banner on a hilltop, shouting your war cry, and Hamingja flies straight into the flag, and with a cloud of runic dust, brings life to the Clan's colors with a blue and violet shimmer.",
      "Hamingja yanks the banner sideways in a gust that isn't really wind, just to see if you'll chase the color before realizing.",
      "After the banner nearly falls and you catch it just in time, you find a scrap of its torn fabric tucked into your palm, small enough to keep, heavy enough to remember."
    ]
  },
  {
    title: "Master at Arms",
    actions: [
      "Hamingja perches on the nearest practice rack, watching you correct %lower with the true patience of an experienced officer.",
      "As you teach without raising your voice, Hamingja listens from the rafters like it's a lesson for them too.",
      "Hamingja studies your form as you run through the drill, head tilted, as if engraving every motion in their head.",
      "You disarm %warrior with technique alone, and Hamingja's silence afterward feels like applause.",
      "You call the next drill, and Hamingja drops onto the rack right beside you, silent spectator of the noisy exchange of blows.",
      "Hamingja clacks two stray branches together just behind %lower in the middle of the lesson, just to see if you'll break stance to look.",
      "The instant word reaches you that a student you trained has fallen in battle, you find a single notched training blade resting in your hands, tinted with a faint blue light, worn smooth by grips no longer there."
    ]
  },
  {
    title: "Húskarl",
    actions: [
      "You enter the Great Hall, and Hamingja is simply standing there, as if they'd been waiting for you.",
      "You're handed a secret too heavy for most ears, and Hamingja goes very still beside you, as if they'd already guessed its shape.",
      "As the council convenes, Hamingja lands at your side, uncharacteristically attentive to every word spoken.",
      "Reminded of a secret you've kept well, you catch Hamingja's eye and read approval in it, from the one who keeps secrets better than anyone.",
      "You cross the Inner Circle's quietest hall without a sound, and Hamingja doesn't so much as startle.",
      "Hamingja lifts a seal right off the council table in the middle of the meeting, then drops it back exactly where it was, just to see if anyone noticed it was ever gone.",
      "After a secret proves heavier to carry than you expected, you find a small, sealed scrap of parchment under your pillow, blank inside, as if offering to hold part of the weight instead.",
      "You watch Hamingja toss an eggshell over their head, catching it square across their beak like a tiny mask, and let out a triumphant, unmistakable VUOLAAAA.",
      "Hamingja stomps across the table on two legs, wings pinned stiff and tiny at their sides, echoing a familiar roar, coming out sounding like DINOTHAUR.",
      "Hamingja drops a raw scrap of meat into your cup and stirs it in with one violent shake of their head, visibly proud of a recipe they've clearly watched someone else swear by.",
      "Hamingja rises onto their toes, wings bent and raised like a mantis's forearms, swaying through a slow, deliberate rhythm unmistakably borrowed from someone else's signature dance.",
      "You find a pickle resting beside your hand. Then another. Then a third. Then an entire mountain of them, and <@112673090038743040> storming after Hamingja, with an upset face.",
      "Hamingja tips whatever's within reach into your water, a petal, an acorn, something unidentifiable, each one dropped in with the utter confidence of a recipe being perfected.* Good soup !*."
    ]
  },
  {
    title: "Hersir",
    actions: [
      "As your Hugr perceptibly awakens with a decision you just made, Hamingja is there to see the surge of raw energy flood through you.",
      "You meet Hamingja's eyes and suddenly feel a surge of pride in yourself.",
      "Your Hugr settles into place like a held breath finally released, and somewhere above, Hamingja's wings do the same.",
      "Hamingja lands directly in front of you and holds your gaze without looking away, the same unflinching look they gave you the day the clan named you Hersir.",
      "A threat passes near you unnoticed, and Hamingja is already between you and it before you even look up.",
      "Hamingja shrieks a false alarm just out of sight, testing which ability will your instinct put in motion in reaction.",
      "For some reason, Hamingja brings you the single rune-carved twig they gifted you the night your Hugr awakened, still, small enough to miss, important enough to keep."
    ]
  },
  {
    title: "Thane",
    actions: [
      "Hamingja perches on a rock in your land, as if marking it theirs to guard as well.",
      "You shoulder the weight of oath and responsibility, and Hamingja settles nearby, unusually solemn.",
      "You ride out to inspect your lands, and Hamingja follows at your shoulder the whole way, silent witness to the work you oversee.",
      "Someone brings you their troubles by the fire, and Hamingja, landed close, listens in on every word.",
      "You return home later than expected, and Hamingja is waiting, silhouetted on the rake of your roof.",
      "Hamingja nudges a boundary stone an inch out of place, just to see how long it takes you to notice your own land has shifted.",
      "A decision weighing on you long into the night, you find a single polished acorn resting beside your candle, plain, but somehow steadying."
    ]
  },
  {
    title: "Skaldic Whisper",
    actions: [
      "You hear your name worked into %skald's verse, and Hamingja goes very still, listening.",
      "%skald strikes up a verse that carries your name, and Hamingja hums along, almost, under their breath.",
      "You pass the skalds' circle and catch Hamingja perched right among them, as if gathering material about you.",
      "Hamingja repeats, in their own language, a fragment of your own verse, as if reminding you of your own values.",
      "You suddenly realize the verse %skald is singing about you is something Hamingja witnessed firsthand.",
      "Hamingja cuts through %skald's most dramatic pause with a loud, off-beat screech, ruining the moment in a general reaction of laughter and looking thoroughly pleased with themself.",
      "After a verse about you turns out crueler than kind, your eye catches a single pressed flower tucked into your cloak, small and soft against whatever was just said."
    ]
  },
  {
    title: "Champion",
    actions: [
      "Hamingja settles above the back of your chair as if marking the honor, watching the Clan celebrate you with quiet attention.",
      "%higher toasts you by name before the bonfire, and Hamingja dives straight through the flames in a burst of color, underlining the honor.",
      "Someone speaks your name as Champion across the hall, and Hamingja puffs up, walking taller, if a bird can.",
      "You're seated beside %higher at the high table, and Hamingja, for once, doesn't bother hiding how closely they watch you.",
      "Hamingja perches on your trophy before anyone else dares touch it, as if claiming it.",
      "Hamingja swaps your cup for an empty one during the toast, then swaps it back before you've even noticed it was gone.",
      "Weighing what the victory cost, more than it should have, you find a single dulled coin resting on your plate, worth nothing, meaning everything."
    ]
  },
  {
    title: "Veteran",
    actions: [
      "You come up behind Hamingja without meaning to startle them, and for once, they don't even flinch.",
      "You carry old scars and older stories, and Hamingja listens to both with the same quiet patience.",
      "Hamingja settles beside you the way they might with someone they've simply always known.",
      "You shrug off a wound that would fell most people, and Hamingja darts down with an odd, waxy leaf, presses it to the injury, and vanishes in a scatter of glittering dust.",
      "Hamingja drops down beside you without the hesitation they'd show almost anyone else, and simply stays.",
      "Hamingja feints toward your face and veers off at the last instant, just to check whether the old reflex to flinch is still there.",
      "As old trials catch up to you all at once, you find a bent, ancient arrowhead resting against your hand, pulled from who knows where."
    ]
  },
  {
    title: "Hero",
    actions: [
      "%anyone retells your deeds by the fire for the third time tonight, embellishing a little more each round, and Hamingja listens with visible amusement, as if they've heard every version already.",
      "Hamingja lands close during the telling of your story, as if keeping track of every detail.",
      "%lower stops you to ask if you're really the Hero from the stories, and Hamingja lands between you, oddly protective of the attention.",
      "Hamingja lands on your shoulder in front of a crowd, unbothered by being seen.",
      "You've become someone people point to, and Hamingja perches there too, quietly included in the gesture.",
      "Hamingja mimics your own voice, with approximate sounds as words, back at you from a nearby rooftop, pitched just wrong enough to be unsettling.",
      "After the weight of everyone's expectations becomes too much for one evening, you open your palm on a single ordinary pebble, deliberately, defiantly unremarkable."
    ]
  },
  {
    title: "Saga Hero",
    actions: [
      "You hear your saga is being told in a settlement you've never visited, and Hamingja returns from a much longer flight than usual, as if confirming it.",
      "You notice Hamingja has been gone for days, and just as you do, they reappear as if nothing happened, trailing the scent of another world.",
      "You hear your own saga recited in a place you've never been, and somehow, Hamingja already knew the verse.",
      "You pass through a settlement that's never heard of you, and Hamingja perches at the edge of its gathering anyway, listening for your name among strangers.",
      "A child who wasn't born when your saga started asks to hear it again, and Hamingja lands close, determined to witness this telling too.",
      "Hamingja lands on a wandering skald's instrument and plucks one string flat, just enough to throw off the most exaggerated verse of your saga.",
      "After you hear your own story twisted into something you don't recognize, you find a single true, unembellished feather on your path, faintly hazed with blue but solid as anything, plain as the truth you remember."
    ]
  },
  {
    title: "Odin's Brand",
    actions: [
      "Hamingja studies the mark fate has burned into you, equal parts awe and unease.",
      "Your brand suddenly burns into your skin with a weight you can feel, and Hamingja lands on your shoulder that same instant, refusing to budge.",
      "Hamingja circles you once, slow and deliberate, the way they might circle something sacred.",
      "You carry Odin's seal now, and Hamingja's usual mischief goes quiet in your presence, if only briefly.",
      "Hamingja perches close, studying your brand like they're trying to read what it says about what comes next.",
      "Hamingja hovers over the Brand, studying it closely, then settles directly into the mark in a cloud of runic dust, and for a while its burning weight cools into something soothing, as if the whole Clan were carrying it with you.",
      "As the Brand's weight keeps you from settling, Hamingja returns dripping from some nearby stream and shakes out their damp feathers right against the mark, the cold easing the burn, if only for a while."
    ]
  },
  {
    title: "Ascended",
    actions: [
      "You cross a threshold few mortals ever reach, and Hamingja looks at you like you're something no longer quite mortal.",
      "You've walked past where most paths end, and Hamingja seems unsure, for once, how close is still allowed.",
      "You pass through camp and Hamingja abandons whatever they were doing to follow, trying to understand what you've become.",
      "Your feet leave the ground for just a moment, barely a breath, and somewhere above, Hamingja feels the same pull and rises with you.",
      "Hamingja lands before you and simply looks, for once, with something that isn't quite reverence, but isn't far from it either.",
      "Hamingja snatches a futhark rune right out of your palm, just to see whether you still care about something so small.",
      "As you feel further from everyone than you'd like to admit, you hear a rustle in the branches above, and a shower of cones tumbles onto your face, scattering their kernels across the ground like a tiny Clan finding its own order."
    ]
  },
  {
    title: "Legend",
    actions: [
      "You leave the hall, but your name stays behind in %skald's song, and Hamingja lingers at the rafters to hear it through.",
      "%skald somewhere tells your story to people who never met you, and Hamingja is already perched there, guarding the memory.",
      "The fire burns low and %anyone still tells your story anyway, and Hamingja settles in among the listeners, lending the telling both the power and the color your saga deserves.",
      "Hamingja repeats a gesture of yours back to no one in particular, perfectly, as if committing it to memory on purpose.",
      "You catch Hamingja replaying a fragment of your legend to %anyone who never met you, scene for scene, told in a language that isn't quite words.",
      "Hamingja mimes out the most dramatic moment of your legend in the middle of flying, wings sweeping wide through the whole performance, just to see if you'll laugh or argue the details.",
      "You feel more like a story than a person, and find a single frayed thread in your palm, pulled from a cloak you wore back when you were no one's legend yet, proof you're still something real."
    ]
  },
  {
    title: "Immortal",
    actions: [
      "Hamingja lands on your shoulder the same way they land on Mark's or Ásrunn's, not as someone they protect, but someone they walk beside.",
      "You outlive the mortals who first told your story, and Hamingja, ageless in their own right, finally has an equal to keep pace with.",
      "Hamingja perches beside you in a silence that feels less like distance and more like old, easy company.",
      "You stand among the handful who've ever reached this far, and Hamingja lands beside you, for the first time, as kin rather than ward.",
      "Hamingja lands on your shoulder, and just for a moment, feels less like a bird and more like everything the Clan became, with you counted among the reasons why.",
      "Hamingja drops a stone from above, exactly like they did when you were still a Squire, and you catch it just as easily as you did back then.",
      "The weight of having outlived everyone you once knew settles over you, and you find a woven cord already tied around your wrist, identical to the ones Mark and Ásrunn wear as well, without you ever noticing when."
    ]
  }
];

export default RANKS;
