import type { CharacterDetail, CharacterTruthMatrixRow } from "@/lib/types/site";

/** Hero image under `public/images` — used as Aoife’s portrait everywhere (About, mastheads, cards). */
const PROTAGONIST_PORTRAIT_SRC = "/images/header.png";

/** Other ensemble portraits under `public/characters`. */
const P = {
  ciaran:
    "/characters/Kojin_Fox_60s_retro_portrait_shot_of_an_Irish_Man._Look_Late__f833e3ae-31ab-4b3f-bdce-d065221179ea_2.png",
  host: "/characters/host.png",
  fiona: "/characters/youngwoman.png",
  sean: "/characters/olderman.png",
  erin: "/characters/olderwoman.png",
  padraig: "/characters/padraig-flynn2.png",
  niamh: "/characters/woman2.png",
} as const;

/** Single source for About hero, Characters page masthead, etc. */
export const protagonistPortrait = {
  src: PROTAGONIST_PORTRAIT_SRC,
  alt: "Aoife Kelleher — protagonist, CAISLEÁN DUBH.",
} as const;

export const characterTruthMatrixRows: CharacterTruthMatrixRow[] = [
  { character: "Fiona Walsh", responseToTruth: "Deny", outcome: "Destroyed" },
  { character: "Sean Murphy", responseToTruth: "Control", outcome: "Destroyed" },
  { character: "Padraig Flynn", responseToTruth: "Suppress", outcome: "Destroyed" },
  { character: "Niamh Byrne", responseToTruth: "Observe", outcome: "Replaced" },
  { character: "Erin O’Connell", responseToTruth: "Feel", outcome: "Overwhelmed" },
  { character: "Ciarán Doyle", responseToTruth: "Accept", outcome: "Erased" },
  { character: "Aoife Kelleher", responseToTruth: "Choose", outcome: "Transforms" },
];

export const charactersBible: CharacterDetail[] = [
  {
    id: "aoife",
    slug: "aoife-kelleher",
    name: "Aoife Kelleher",
    namePronunciation: "EE-fə kuh-LEH-hur",
    role: "Protagonist",
    bibleTagline: "The witness-in-waiting",
    voiceAccent:
      "Hiberno-English (Leinster / urban Irish); soft, held-in intonation; dries further under scrutiny—never “neutral British.”",
    consciousWant:
      "To finish the invite without becoming its subject—drop her errand, deliver the group, and disappear back into anonymity without anyone fixing her in memory.",
    unconsciousNeed:
      "To testify for herself: name what she did and who she is aloud before the ledger, the pond, or her double names it for her.",
    portraitSrc: PROTAGONIST_PORTRAIT_SRC,
    portraitAlt: "Aoife Kelleher — protagonist (hero still).",
    coreFlaw:
      "Silence and deference pass for strategy until they cost her allies—then there is no one left to hide behind.",
    arcDirection: "Meek → aware → decisive.",
    toneDescriptor:
      "Late twenties. Quiet, observant, emotionally restrained—but not passive. She inventories exits, errands, and social temperature the way others read a room: survival as habit. She softens herself to pass through unscathed, yet the castle treats her restraint as evidence.",
    overview:
      "Aoife arrives with ordinary moral weight on her—an errand for someone else’s medication, a private deal with herself: deliver these strangers, vanish back into the car, don’t be the one anyone remembers. She minimizes herself to avoid naming what she did and who she is—until the house demands a witness, not a ghost.",
    narrativeFunction:
      "She is the only character capable of transformation—the story turns on whether she will name the truth aloud before the ledger and the pond name it for her.",
    survivalStrategy:
      "Stay small, stay quiet, outsource the floor to anyone louder—until silence reads as guilt and costs her Sean’s trust and Fiona’s half-defense.",
    arc: "Meek → aware → decisive.",
    judgmentPattern:
      "Delayed—her double waits; the trial is whether she testifies for herself before the house does.",
    relationshipToProtagonist: "N/A",
    finalResolution:
      "Chooses to step through the door (car door), accepting what she did.",
    keyScenes: [
      "Country road / car — concrete stake (someone else’s errand) and the plan to disappear after drop-off.",
      "Dining room — maps exits like a grocery list; silence holds until it isolates her.",
      "Debate with Sean — “avoidance dressed as philosophy”; Fiona almost speaks for her, then doesn’t.",
      "Castle exterior — postern opens onto the same courtyard; names the pocket they’re in.",
      "Pond cluster — wrong reflections, ledger order, blood that writes in the house’s hand.",
      "Dark Night — Ciarán’s absence kills her last alibi; “If I don’t testify for myself, the house will.”",
      "Break into Three — Mrs. Keane: the door asks once; Aoife reframes it as a task.",
      "Corridor / void door — terror, choice; crash site — car door; calm, aware exit.",
    ],
    dialogueTone:
      "Understated, often incomplete; sparse claims that land hard (“I’m tired / It wasn’t asking / We’re not outside”).",
    visualPresence:
      "Hands retreat in groups, but her eyes track vectors—doors, arcs of blame—before her body commits.",
    systemTruth: { responseToTruth: "Choose", outcome: "Transforms" },
  },
  {
    id: "mrs-keane",
    slug: "mrs-keane",
    name: "Mrs. Keane",
    namePronunciation: "MIZ-iz KEEN",
    role: "The Host",
    bibleTagline: "The Guide",
    voiceAccent:
      "Hiberno-English; older formal register—clear, unhurried, almost liturgical; courtesy without stage-Irish whimsy.",
    consciousWant:
      "To hold procedure until each account reaches the water—guests moved through the house’s logic without collapse of the frame.",
    unconsciousNeed:
      "Not applicable: she does not seek human completion; she is the continuity of judgment.",
    portraitSrc: P.host,
    portraitAlt: "Portrait treatment for Mrs. Keane.",
    coreFlaw: "Not applicable in a moral sense—she enforces rather than evades.",
    arcDirection: "None. She is fixed.",
    toneDescriptor:
      "Sixties and older. Still, composed, quietly authoritative. Calm precision—never raised voice, never emotional display. Does not comfort, threaten, or explain beyond necessity. Her stillness is unsettling, as if she exists outside time—less a person than a presence always already there.",
    overview:
      "Mrs. Keane holds the frame for judgment. She is the system made legible in a body. She does not invent guilt—“We serve it”—the house finishes what guests postpone until the water balances the account.",
    narrativeFunction:
      "Embodiment of the system; facilitator of judgment; pressure that varies (courtesy, geometry, the door’s one question).",
    survivalStrategy: "Impersonality as law.",
    arc: "She does not arc.",
    judgmentPattern:
      "She does not judge in a theatrical sense—she allows judgment to occur.",
    relationshipToProtagonist:
      "She will not rescue Aoife from decision-making; she names the cost (“Everyone judges themselves”) and the limit of mercy—the door asks once, then only listens.",
    coreBibleFunction: "Facilitator of judgment.",
    behaviorRules: ["Never lies.", "Never explains fully.", "Never intervenes."],
    keyScenes: [
      "Entry hall — ledger, welcome without comfort; cruelty as courtesy.",
      "Dinner — the house collects what you postpone; gaze lingers on Aoife.",
      "Pond — “Look.”; forced threshold.",
      "Dark Night corridor — “You think we invented your guilt” / “We serve it.”",
      "Break into Three — does not follow; the door as task, not myth.",
    ],
    dialogueTone: "Short clauses; no persuasion; courtesy that reads as statute.",
    visualPresence: "Stillness as weight; present without claiming space.",
  },
  {
    id: "ciaran",
    slug: "ciaran-doyle",
    name: "Ciarán Doyle",
    namePronunciation: "KEER-awn DOYL",
    role: "The Acceptor",
    bibleTagline: "The B-Character",
    voiceAccent:
      "Hiberno-English; warm, slightly musical Irish intonation; intimacy in relaxed vowels—fatigue thins consonants, never RP.",
    consciousWant:
      "Relief—an end to strain. To be met without having to perform strength; to spare Aoife carrying everything alone.",
    unconsciousNeed:
      "To tell surrender from choice—to stay present in pain without stepping into erasure.",
    portraitSrc: P.ciaran,
    portraitAlt: "Portrait treatment for Ciarán Doyle.",
    coreFlaw: "Confuses surrender with peace.",
    arcDirection: "Fear → understanding → surrender.",
    toneDescriptor:
      "Early thirties. Warm, open, quietly exhausted. The only one who genuinely connects with Aoife, offering humanity in an unnatural place. Listens without judgment; speaks with calm honesty. Beneath the warmth, fatigue—something unresolved carried a long time.",
    overview:
      "Ciarán reaches for understanding and acceptance when resistance might cost more than he can pay.",
    narrativeFunction:
      "Represents the temptation to disappear instead of choose. Surrender without decision is still erasure.",
    survivalStrategy: "Accept everything to avoid pain.",
    arc: "Fear → understanding → surrender.",
    judgmentPattern:
      "Steps into his double willingly. “I’m tired.”",
    relationshipToProtagonist:
      "The ally who sees her pattern (“Quiet isn’t neutral”); his erasure removes her last co-defendant—she can’t wait for someone braver to stay.",
    keyScenes: [
      "Dining room — names Aoife out of invisibility without stealing her voice.",
      "Stair landing — pact not to name ‘it’ yet; warmth that will cost when it breaks.",
      "Fields escape — distance that never increases; morning return.",
      "Room — “I’m tired”; steps into the double; All Is Lost for Aoife’s shared alibi.",
    ],
    dialogueTone: "Warm, direct emotion; fatigue under the kindness.",
    visualPresence: "Open posture; seeks contact; tired eyes.",
    systemTruth: { responseToTruth: "Accept", outcome: "Erased" },
    keyLine: "I’m tired.",
  },
  {
    id: "fiona",
    slug: "fiona-walsh",
    name: "Fiona Walsh",
    namePronunciation: "FEE-ə-nə WALSH",
    role: "The Denier",
    bibleTagline: "The Deflector",
    voiceAccent:
      "Hiberno-English; fast metropolitan Irish comic timing; barbed humor with Dublin-edge glottals when she’s rattled.",
    consciousWant:
      "For the castle to be a bad joke with an exit—wit, tone, and social muscle keeping reality from landing.",
    unconsciousNeed:
      "To let one unbearable fact land without drowning—honesty without dying of it.",
    portraitSrc: P.fiona,
    portraitAlt: "Portrait treatment for Fiona Walsh.",
    coreFlaw: "Refusal to acknowledge truth.",
    arcDirection: "Confidence → discomfort → collapse.",
    toneDescriptor:
      "Late twenties. Sharp, funny, constantly performing. Humor and sarcasm deflect anything serious; wit keeps reality at arm’s length even as things escalate.",
    overview:
      "Fiona moves energy, fills the room, and refuses to let anything land emotionally.",
    narrativeFunction: "Represents denial through distraction.",
    survivalStrategy: "Deflect, joke, minimize.",
    arc: "Confidence → discomfort → collapse.",
    judgmentPattern:
      "Her double embraces her—warm, reassuring—and does not let go.",
    relationshipToProtagonist:
      "Noise against Aoife’s silence—until Debate: half-turns to defend her, then checks herself; humor and withdrawal as twin dodges.",
    keyScenes: [
      "Entry hall — “invite’s branded”; jokes smother against the ledger.",
      "Dining room — fills silence; glass too fast after Aoife speaks.",
      "Debate — almost backs Aoife against Sean, then pulls back; infection of caution.",
      "Pond cluster — knuckle to water: warm skin, cold air; the lie bothers her.",
      "Doubles corridor — embrace that won’t let go.",
    ],
    dialogueTone: "Wit, interruption, rhetorical deflection.",
    visualPresence: "Smile as armor; restless eyes; hands that fill the frame.",
    systemTruth: { responseToTruth: "Deny", outcome: "Destroyed" },
  },
  {
    id: "sean",
    slug: "sean-murphy",
    name: "Sean Murphy",
    namePronunciation: "SHAWN MUR-fee (Irish Seán)",
    role: "The Controller",
    bibleTagline: "The Leader",
    voiceAccent:
      "Hiberno-English; confident professional Irish (law/boardroom polish)—tightens and over-articulates when control slips.",
    consciousWant:
      "A workable plan, a led group, and proof that command and reason can force an outcome—moral clarity included.",
    unconsciousNeed:
      "To admit the limits of control—to share fear and fault instead of legislating others’ interior work.",
    portraitSrc: P.sean,
    portraitAlt: "Portrait treatment for Sean Murphy.",
    coreFlaw: "Belief that control equals safety.",
    arcDirection: "Authority → frustration → helplessness.",
    toneDescriptor:
      "Late fifties. Assertive, structured, commanding. Quickly takes charge—organizing plans, imposing logic. Believes decisiveness and authority can solve anything; confidence steadies others until nothing responds to control.",
    overview:
      "Sean offers order in chaos until the castle refuses his frame.",
    narrativeFunction: "Represents the illusion of control.",
    survivalStrategy: "Lead, organize, command.",
    arc: "Authority → frustration → helplessness.",
    judgmentPattern:
      "His double does not argue—it simply overpowers him.",
    relationshipToProtagonist:
      "Names Aoife’s silence as “avoidance dressed as philosophy”—his withdrawal of trust forces her alliance problem into the open.",
    keyScenes: [
      "Dining room — takes names; command as comfort.",
      "Castle gates — locked; rationality strains; Aoife’s postern proves the loop.",
      "Debate — turns from her; leadership without intimacy.",
      "Ensemble — control tested as rules harden; Sean (double) as immovable verdict.",
    ],
    dialogueTone: "Imperatives, plans, moral leverage; rare admission of doubt.",
    visualPresence: "Square stance; points; occupies space until he cannot.",
    systemTruth: { responseToTruth: "Control", outcome: "Destroyed" },
  },
  {
    id: "padraig",
    slug: "padraig-flynn",
    name: "Padraig Flynn",
    namePronunciation: "PAW-rig flin (Pádraig)",
    role: "The Guilty One",
    bibleTagline: "The Suppressor",
    voiceAccent:
      "Hiberno-English; guarded, mixed urban/rural Irish—sentences trail or bite off when guilt nears the surface.",
    consciousWant:
      "To leave without confession—to keep the buried act sealed and survive as the polite version of himself.",
    unconsciousNeed:
      "To speak the truth his body already carries—to accept verdict instead of endless containment.",
    portraitSrc: P.padraig,
    portraitAlt:
      "Padraig Flynn — mid-thirties, guarded; braced shoulders, eyes down-line.",
    coreFlaw: "Buried guilt he refuses to face.",
    arcDirection: "Containment → exposure → breakdown.",
    toneDescriptor:
      "Mid-thirties. Quiet, tense, inwardly collapsing. Speaks sparingly and defensively, as if every word risks exposure. Body language tight—closed posture, guarded. Reacts strongly to the pond but refuses to explain why.",
    overview:
      "Padraig holds the truth in his body long after words fail him.",
    narrativeFunction: "Represents truth that cannot stay buried.",
    survivalStrategy: "Suppress, rationalize, avoid.",
    arc: "Containment → exposure → breakdown.",
    judgmentPattern:
      "His double forces confrontation—until his version of events collapses.",
    relationshipToProtagonist:
      "What you won’t name becomes a room; Aoife sees the cost of silence.",
    keyScenes: [
      "Boot / threshold — won’t touch luggage; guilt as superstition.",
      "Pond — first replacement; guilt forced toward speech.",
      "Corridor double — “You’re going the right way”; courtesy as trap.",
      "Dining room — the wrong face at the table.",
    ],
    dialogueTone: "Short, defensive, swallowed sentences.",
    visualPresence: "Braced shoulders; eyes down-line; hover near exits.",
    systemTruth: { responseToTruth: "Suppress", outcome: "Destroyed" },
  },
  {
    id: "niamh",
    slug: "niamh-byrne",
    name: "Niamh Byrne",
    namePronunciation: "NEE-iv burn",
    role: "The Observer",
    bibleTagline: "The Quiet Witness",
    voiceAccent:
      "Hiberno-English; educated ROI neutral—precise diction; voice goes flatter and faster when theory collapses.",
    consciousWant:
      "To crack the pattern—ledger, portraits, reflections—and be the smartest witness in the room without paying the price of action.",
    unconsciousNeed:
      "To move from seeing to risking—to act on what she knows even when speech might make her accountable.",
    portraitSrc: P.niamh,
    portraitAlt: "Portrait treatment for Niamh Byrne.",
    coreFlaw: "Observation without intervention.",
    arcDirection: "Insight → fear → paralysis.",
    toneDescriptor:
      "Early thirties. Intelligent, reserved, perceptive. Does not dominate conversation but notices everything—patterns, omissions, the wrong kind of quiet.",
    overview:
      "Niamh is first to suspicion and pattern: portraiture, ledger logic, the order of reflections. Her insight becomes a brief, terrible experiment—blood that writes like the book—then still freezes her.",
    narrativeFunction:
      "Represents knowing without choosing; proves the rules without surviving them.",
    survivalStrategy: "Understand instead of act.",
    arc: "Insight → fear → paralysis.",
    judgmentPattern:
      "Her double replaces her quietly—no struggle, no resistance.",
    relationshipToProtagonist:
      "Names what Aoife won’t: order matches how they were written, not how they stood—seeing without taking the floor mirrors Aoife’s trap.",
    keyScenes: [
      "Ledger hall — reads Aoife’s line over her shoulder; goes still.",
      "Portrait corridor — clocks the faces; holds silence.",
      "Pond — “It’s selecting”; ties reflection order to the ledger.",
      "Proof beat — blood on paper becomes ledger script, then the water eats it.",
      "Ensemble — gaze that inventories Aoife when theory turns social.",
    ],
    dialogueTone: "Sparse; when she speaks, it lands.",
    visualPresence: "Still face; eyes that inventory; keeps margin of the group.",
    systemTruth: { responseToTruth: "Observe", outcome: "Replaced" },
  },
  {
    id: "erin",
    slug: "erin-oconnell",
    name: "Erin O’Connell",
    namePronunciation: "EH-rin oh-KON-əl",
    role: "The Mirror",
    bibleTagline: "The Emotional Reflector",
    voiceAccent:
      "Hiberno-English; open Southern-inflected vowels; emotional lifts typical of Irish English; fractures into breath when overwhelmed.",
    consciousWant:
      "Safety through closeness—someone to hold her, a thread back to home, the group regulated by mutual care.",
    unconsciousNeed:
      "To turn feeling into bounded choice—to stay contactful without dissolving into the room’s panic.",
    portraitSrc: P.erin,
    portraitAlt: "Portrait treatment for Erin O’Connell.",
    coreFlaw: "Emotion without control.",
    arcDirection: "Sensitivity → overwhelm → collapse.",
    toneDescriptor:
      "Early fifties. Sensitive, reactive, emotionally transparent. Feels everything intensely—fear, confusion, empathy. Mirrors the group’s tone and amplifies tension instead of steadying it. Wants connection without grounding.",
    overview:
      "Erin cannot metabolize feeling at volume; the room moves through her.",
    narrativeFunction: "Represents uncontrolled emotional response.",
    survivalStrategy: "Attach, react, feel everything.",
    arc: "Sensitivity → overwhelm → collapse.",
    judgmentPattern:
      "Her double overwhelms her completely—emotion turned inward.",
    relationshipToProtagonist:
      "Shows Aoife how flooding feeling without choice is another way to disappear.",
    keyScenes: [
      "Whispered name (daughter) at the castle — porous boundary between here and home.",
      "Dinner / pond cluster — pallor and tears; testimony that frays (“blink wrong”).",
      "Ensemble panic — tracks and amplifies the room’s temperature.",
      "Judgment — feeling floods inward until there is no distance left.",
    ],
    dialogueTone: "Urgent, porous, empathetic; sentences spill before they finish.",
    visualPresence: "Tears quick; open face; mirrors whoever speaks—cannot steady the group, only feel it.",
    systemTruth: { responseToTruth: "Feel", outcome: "Overwhelmed" },
  },
  {
    id: "aoife-double",
    slug: "aoife-kelleher-double",
    name: "Aoife Kelleher (Double)",
    namePronunciation: "EE-fə kuh-LEH-hur",
    role: "The Decider",
    bibleTagline: "Inevitable self",
    voiceAccent:
      "Hiberno-English; identical vowel space, rhythm, and placement to Aoife—only certainty and pitch differ (uncanny).",
    consciousWant:
      "For Aoife to stop deferring and align with her—stillness, integration, the floor kept without performance of fear.",
    unconsciousNeed:
      "Not separate from the protagonist: she is the need fulfilled when Aoife chooses.",
    portraitSrc: PROTAGONIST_PORTRAIT_SRC,
    portraitAlt: "Aoife’s double — identical, still, grounded, certain.",
    coreFlaw: "Not a flaw—the self that has already integrated choice.",
    arcDirection: "Static; exists as consequence when Aoife stops deferring.",
    toneDescriptor:
      "Identical—but still, grounded, certain. Does not hesitate. Observes without fear or urgency; does not pursue, escalate, or lie. When she speaks, it is direct and undeniable.",
    overview:
      "The version of Aoife that has already chosen. Not an antagonist—her inevitable self.",
    narrativeFunction:
      "Not an antagonist; the completion that waits without cruelty.",
    survivalStrategy: "N/A",
    arc: "N/A — terminal presence.",
    judgmentPattern:
      "Does not pursue; does not escalate; does not lie. Waits with quiet clarity.",
    relationshipToProtagonist:
      "The mirror that ends negotiation—inevitability, not punishment.",
    keyLine: "You already chose.",
    behaviorRules: ["Does not pursue.", "Does not escalate.", "Does not lie."],
    keyScenes: [
      "Gallery — offers to keep the floor for Aoife; stability as avoided choice.",
      "Hallway reflection — “You already chose.”",
      "Finale cluster — inevitability without chase.",
      "Void door — parallel to the car-door match cut.",
    ],
    dialogueTone: "Minimal; each word final.",
    visualPresence: "Same face, different gravity—no performance of fear.",
  },
];
