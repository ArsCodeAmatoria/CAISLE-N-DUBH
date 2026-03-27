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
    role: "Protagonist",
    bibleTagline: "The Avoider",
    portraitSrc: PROTAGONIST_PORTRAIT_SRC,
    portraitAlt: "Aoife Kelleher — protagonist (hero still).",
    coreFlaw: "Avoidance of responsibility and self-definition.",
    arcDirection: "Meek → aware → decisive.",
    toneDescriptor:
      "Late twenties. Quiet, observant, and emotionally restrained. Aoife softens herself—deferring, accommodating, avoiding friction. She listens more than she speaks, often apologizing without realizing it. Subtle bodily tension, as if bracing for something just beneath awareness. Perceptive, but selectively blind, especially about her own actions.",
    overview:
      "Aoife moves through the world by minimizing herself, keeping the peace, and refusing to name what she has done or who she is.",
    narrativeFunction:
      "She is the only character capable of transformation—the story turns on whether she will choose instead of disappear.",
    survivalStrategy: "Stay agreeable, stay quiet, don’t choose.",
    arc: "Meek → aware → decisive.",
    judgmentPattern: "Delayed—her double does not emerge.",
    relationshipToProtagonist: "N/A",
    finalResolution:
      "Chooses to step through the door (car door), accepting what she did.",
    keyScenes: [
      "Country road / car — avoidance before the crash seed.",
      "Entry hall — theme lands; Mrs. Keane’s gaze.",
      "Corridor / final door — terror, void, choice.",
      "Crash site — car door; calm, aware exit.",
    ],
    dialogueTone:
      "Understated, often incomplete; questions to deflect; when pressed, clarity arrives late for others, on time for her.",
    visualPresence:
      "Hands retreat; posture shrinks in groups; in solitude her face becomes readable.",
    systemTruth: { responseToTruth: "Choose", outcome: "Transforms" },
  },
  {
    id: "mrs-keane",
    slug: "mrs-keane",
    name: "Mrs. Keane",
    role: "The Host",
    bibleTagline: "The Guide",
    portraitSrc: P.host,
    portraitAlt: "Portrait treatment for Mrs. Keane.",
    coreFlaw: "Not applicable in a moral sense—she enforces rather than evades.",
    arcDirection: "None. She is fixed.",
    toneDescriptor:
      "Sixties and older. Still, composed, quietly authoritative. Calm precision—never raised voice, never emotional display. Does not comfort, threaten, or explain beyond necessity. Her stillness is unsettling, as if she exists outside time—less a person than a presence always already there.",
    overview:
      "Mrs. Keane holds the frame for judgment. She is the system made legible in a body.",
    narrativeFunction: "Embodiment of the system; facilitator of judgment.",
    survivalStrategy: "Impersonality as law.",
    arc: "She does not arc.",
    judgmentPattern:
      "She does not judge in a theatrical sense—she allows judgment to occur.",
    relationshipToProtagonist:
      "She will not rescue Aoife from decision-making; she holds the frame steady until Aoife acts.",
    coreBibleFunction: "Facilitator of judgment.",
    behaviorRules: ["Never lies.", "Never explains fully.", "Never intervenes."],
    keyScenes: [
      "Entry hall — theme without comfort.",
      "Pond — “Look.”",
      "Threshold spaces — frame held until Aoife acts.",
    ],
    dialogueTone: "Short clauses; no persuasion; courtesy that reads as statute.",
    visualPresence: "Stillness as weight; present without claiming space.",
  },
  {
    id: "ciaran",
    slug: "ciaran-doyle",
    name: "Ciarán Doyle",
    role: "The Acceptor",
    bibleTagline: "The B-Character",
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
      "Represents the temptation to disappear instead of choose.",
    keyScenes: [
      "Dining room — names Aoife out of invisibility.",
      "Fields escape — distance that never increases; morning return.",
      "Room — “I’m tired”; steps into erasure.",
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
    role: "The Denier",
    bibleTagline: "The Deflector",
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
      "Noise against Aoife’s silence; both refuse the same fact by opposite means.",
    keyScenes: [
      "Dining room — jokes as shield after the verdict.",
      "Pond — reflection leads; she isn’t smiling.",
      "Hallway — embrace that won’t let go.",
    ],
    dialogueTone: "Wit, interruption, rhetorical deflection.",
    visualPresence: "Smile as armor; restless eyes; hands that fill the frame.",
    systemTruth: { responseToTruth: "Deny", outcome: "Destroyed" },
  },
  {
    id: "sean",
    slug: "sean-murphy",
    name: "Sean Murphy",
    role: "The Controller",
    bibleTagline: "The Leader",
    portraitSrc: P.sean,
    portraitAlt: "Portrait treatment for Sean Murphy.",
    coreFlaw: "Belief that control equals safety.",
    arcDirection: "Authority → frustration → helplessness.",
    toneDescriptor:
      "Forties. Assertive, structured, commanding. Quickly takes charge—organizing plans, imposing logic. Believes decisiveness and authority can solve anything; confidence steadies others until nothing responds to control.",
    overview:
      "Sean offers order in chaos until the castle refuses his frame.",
    narrativeFunction: "Represents the illusion of control.",
    survivalStrategy: "Lead, organize, command.",
    arc: "Authority → frustration → helplessness.",
    judgmentPattern:
      "His double does not argue—it simply overpowers him.",
    relationshipToProtagonist:
      "Shows Aoife that avoidance and control are twins—both avoid interior work.",
    keyScenes: [
      "Dining room — takes names; command as comfort.",
      "Castle gates — locked; rationality strains.",
      "Ensemble — control tested as rules harden.",
    ],
    dialogueTone: "Imperatives, plans, moral leverage; rare admission of doubt.",
    visualPresence: "Square stance; points; occupies space until he cannot.",
    systemTruth: { responseToTruth: "Control", outcome: "Destroyed" },
  },
  {
    id: "padraig",
    slug: "padraig-flynn",
    name: "Padraig Flynn",
    role: "The Guilty One",
    bibleTagline: "The Suppressor",
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
    keyScenes: ["Pond — first replacement; guilt forced into speech.", "Dining room — the wrong face at the table."],
    dialogueTone: "Short, defensive, swallowed sentences.",
    visualPresence: "Braced shoulders; eyes down-line; hover near exits.",
    systemTruth: { responseToTruth: "Suppress", outcome: "Destroyed" },
  },
  {
    id: "niamh",
    slug: "niamh-byrne",
    name: "Niamh Byrne",
    role: "The Observer",
    bibleTagline: "The Quiet Witness",
    portraitSrc: P.niamh,
    portraitAlt: "Portrait treatment for Niamh Byrne.",
    coreFlaw: "Observation without intervention.",
    arcDirection: "Insight → fear → paralysis.",
    toneDescriptor:
      "Early thirties. Intelligent, reserved, perceptive. Does not dominate conversation but notices everything—patterns, omissions, the wrong kind of quiet.",
    overview:
      "Niamh is first to suspect something deeper is happening; her insight rarely becomes action.",
    narrativeFunction: "Represents knowing without choosing.",
    survivalStrategy: "Understand instead of act.",
    arc: "Insight → fear → paralysis.",
    judgmentPattern:
      "Her double replaces her quietly—no struggle, no resistance.",
    relationshipToProtagonist:
      "Warns Aoife what it costs to see clearly and still defer.",
    keyScenes: ["Ensemble scenes — the gaze that tracks Aoife.", "Reflection beats — Niamh as witness."],
    dialogueTone: "Sparse; when she speaks, it lands.",
    visualPresence: "Still face; eyes that inventory; keeps margin of the group.",
    systemTruth: { responseToTruth: "Observe", outcome: "Replaced" },
  },
  {
    id: "erin",
    slug: "erin-oconnell",
    name: "Erin O’Connell",
    role: "The Mirror",
    bibleTagline: "The Emotional Reflector",
    portraitSrc: P.erin,
    portraitAlt: "Portrait treatment for Erin O’Connell.",
    coreFlaw: "Emotion without control.",
    arcDirection: "Sensitivity → overwhelm → collapse.",
    toneDescriptor:
      "Late twenties. Sensitive, reactive, emotionally transparent. Feels everything intensely—fear, confusion, empathy. Mirrors the group’s tone and amplifies tension instead of steadying it. Wants connection without grounding.",
    overview:
      "Erin cannot metabolize feeling at volume; the room moves through her.",
    narrativeFunction: "Represents uncontrolled emotional response.",
    survivalStrategy: "Attach, react, feel everything.",
    arc: "Sensitivity → overwhelm → collapse.",
    judgmentPattern:
      "Her double overwhelms her completely—emotion turned inward.",
    relationshipToProtagonist:
      "Shows Aoife how flooding feeling without choice is another way to disappear.",
    keyScenes: ["Ensemble panic — Erin tracks and amplifies the room’s temperature.", "Judgment — feeling floods inward until there is no distance left."],
    dialogueTone: "Urgent, porous, empathetic; sentences spill before they finish.",
    visualPresence: "Tears quick; open face; mirrors whoever speaks—cannot steady the group, only feel it.",
    systemTruth: { responseToTruth: "Feel", outcome: "Overwhelmed" },
  },
  {
    id: "aoife-double",
    slug: "aoife-kelleher-double",
    name: "Aoife Kelleher (Double)",
    role: "The Decider",
    bibleTagline: "Inevitable self",
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
    keyScenes: ["Hallway reflection — “You already chose.”", "Void door — parallel to the car-door match cut."],
    dialogueTone: "Minimal; each word final.",
    visualPresence: "Same face, different gravity—no performance of fear.",
  },
];
