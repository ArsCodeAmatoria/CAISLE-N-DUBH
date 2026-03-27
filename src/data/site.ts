import type { SiteData } from "@/lib/types/site";

export const siteData: SiteData = {
  about: {
    title: "CAISLEÁN DUBH",
    subtitle: "A screenplay atlas",
    logline:
      "After arriving at a remote castle and being told they’re already dead, a group of strangers are hunted by perfect versions of themselves—until one woman must choose between being replaced or stepping through a door that leads to nothing at all.",
    pitch:
      "CAISLEÁN DUBH is a psychological horror thriller set in a silent castle where the dead are forced to confront who they truly are. As guests are replaced one by one by more authentic versions of themselves, the story becomes less about survival and more about the terror of self-recognition. At the center is a woman who has spent her life staying small, avoiding conflict, and refusing decisive action. Inside the castle, that strategy becomes fatal. What begins as mystery and dread evolves into a metaphysical trial of identity, ending at a final door that promises a monster and reveals only absence.",
    theme:
      "No one escapes themselves. Identity is not found through comfort or avoidance, but chosen under pressure.",
    toneGenre:
      "Psychological thriller / horror. Slow-burn dread, art-house tension, cinematic stillness, escalating identity horror.",
    storyEngine:
      "Each guest is judged by a double born from their own reflection. The doubles do not behave like monsters. They are calm, certain, and disturbingly more complete than the originals. One by one, the guests are replaced, until the protagonist is forced to confront the final door.",
  },

  acts: [
    {
      id: "act-1",
      slug: "act-i",
      label: "ACT I",
      shortLabel: "Act I",
      anchor: "act-i",
      description:
        "Establish unease, premise, group dynamics, and protagonist weakness.",
    },
    {
      id: "act-2a",
      slug: "act-iia",
      label: "ACT II — PART A",
      shortLabel: "Act II A",
      anchor: "act-iia",
      description:
        "Reveal the pond, the rules, and the impossibility of escape.",
    },
    {
      id: "act-2b",
      slug: "act-iib",
      label: "ACT II — PART B",
      shortLabel: "Act II B",
      anchor: "act-iib",
      description:
        "Doubles integrate, trust collapses, characters fall according to their flaws.",
    },
    {
      id: "act-3",
      slug: "act-iii",
      label: "ACT III",
      shortLabel: "Act III",
      anchor: "act-iii",
      description:
        "The protagonist stops running, reaches the door, and chooses.",
    },
  ],

  beats: [
    {
      id: "opening-image",
      slug: "opening-image",
      saveTheCat: "Opening Image",
      label: "Opening Image",
      anchor: "beat-opening-image",
      order: 1,
    },
    {
      id: "theme-stated",
      slug: "theme-stated",
      saveTheCat: "Theme Stated",
      label: "Theme Stated",
      anchor: "beat-theme-stated",
      order: 2,
    },
    {
      id: "set-up",
      slug: "set-up",
      saveTheCat: "Set-Up",
      label: "Set-Up",
      anchor: "beat-set-up",
      order: 3,
    },
    {
      id: "catalyst",
      slug: "catalyst",
      saveTheCat: "Catalyst",
      label: "Catalyst",
      anchor: "beat-catalyst",
      order: 4,
    },
    {
      id: "debate",
      slug: "debate",
      saveTheCat: "Debate",
      label: "Debate",
      anchor: "beat-debate",
      order: 5,
    },
    {
      id: "break-into-two",
      slug: "break-into-two",
      saveTheCat: "Break into Two",
      label: "Break into Two",
      anchor: "beat-break-into-two",
      order: 6,
    },
    {
      id: "b-story",
      slug: "b-story",
      saveTheCat: "B Story",
      label: "B Story",
      anchor: "beat-b-story",
      order: 7,
    },
    {
      id: "fun-and-games",
      slug: "fun-and-games",
      saveTheCat: "Fun and Games",
      label: "Fun and Games",
      anchor: "beat-fun-and-games",
      order: 8,
    },
    {
      id: "midpoint",
      slug: "midpoint-beat",
      saveTheCat: "Midpoint",
      label: "Midpoint",
      anchor: "beat-midpoint",
      order: 9,
    },
    {
      id: "bad-guys-close-in",
      slug: "bad-guys-close-in",
      saveTheCat: "Bad Guys Close In",
      label: "Bad Guys Close In",
      anchor: "beat-bad-guys-close-in",
      order: 10,
    },
    {
      id: "all-is-lost",
      slug: "all-is-lost",
      saveTheCat: "All Is Lost",
      label: "All Is Lost",
      anchor: "beat-all-is-lost",
      order: 11,
    },
    {
      id: "dark-night",
      slug: "dark-night-of-the-soul",
      saveTheCat: "Dark Night of the Soul",
      label: "Dark Night of the Soul",
      anchor: "beat-dark-night",
      order: 12,
    },
    {
      id: "break-into-three",
      slug: "break-into-three",
      saveTheCat: "Break into Three",
      label: "Break into Three",
      anchor: "beat-break-into-three",
      order: 13,
    },
    {
      id: "finale",
      slug: "finale",
      saveTheCat: "Finale",
      label: "Finale",
      anchor: "beat-finale",
      order: 14,
    },
    {
      id: "final-image",
      slug: "final-image",
      saveTheCat: "Final Image",
      label: "Final Image",
      anchor: "beat-final-image",
      order: 15,
    },
  ],

  sequences: [
    {
      id: "seq-arrival",
      slug: "sequence-arrival",
      label: "Sequence — Arrival / Wrong Calm",
      actId: "act-1",
      beatIds: ["opening-image", "theme-stated", "set-up"],
      anchor: "seq-arrival",
    },
    {
      id: "seq-inversion",
      slug: "sequence-inversion",
      label: "Sequence — The Inversion",
      actId: "act-1",
      beatIds: ["catalyst", "debate", "break-into-two"],
      anchor: "seq-inversion",
    },
    {
      id: "seq-reflection",
      slug: "sequence-reflection-law",
      label: "Sequence — Reflection Law",
      actId: "act-2a",
      beatIds: ["b-story", "fun-and-games"],
      anchor: "seq-reflection",
    },
    {
      id: "seq-fracture",
      slug: "sequence-fracture",
      label: "Sequence — Fracture",
      actId: "act-2b",
      beatIds: ["bad-guys-close-in", "all-is-lost"],
      anchor: "seq-fracture",
    },
    {
      id: "seq-door",
      slug: "sequence-door",
      label: "Sequence — The Door",
      actId: "act-3",
      beatIds: ["dark-night", "break-into-three", "finale", "final-image"],
      anchor: "seq-door",
    },
  ],

  structuralMarkers: [
    {
      id: "m-act1-open",
      kind: "act_open",
      anchor: "act-i",
      title: "ACT I",
      body: "Pages 1–25 · Establish tone, group dynamics, protagonist weakness. Reveal premise, denial, failed rational control.",
      pageLabel: "p. 1–25",
    },
    {
      id: "m-p1-10",
      kind: "accomplishment",
      anchor: "note-p1-10",
      title: "Page turn · establishment",
      body: "Establish tone, group dynamics, protagonist weakness.",
      pageLabel: "p. 1–10",
    },
    {
      id: "m-p10-25",
      kind: "accomplishment",
      anchor: "note-p10-25",
      title: "Page turn · premise pressure",
      body: "Reveal premise, denial, failed rational control.",
      pageLabel: "p. 10–25",
    },
    {
      id: "m-break-25",
      kind: "act_break",
      anchor: "break-act1",
      title: "End of Act I",
      pageLabel: "p. ~25",
    },
    {
      id: "m-act2a-open",
      kind: "act_open",
      anchor: "act-iia",
      title: "ACT II — A",
      body: "Pages 25–50 · Pond, reflection behavior, failed escape, first emergence.",
      pageLabel: "p. 25–50",
    },
    {
      id: "m-p25-50",
      kind: "accomplishment",
      anchor: "note-p25-50",
      title: "Page turn · impossible rules",
      body: "Pond, reflection behavior, failed escape, first emergence.",
      pageLabel: "p. 25–50",
    },
    {
      id: "m-midpoint",
      kind: "midpoint",
      anchor: "midpoint",
      title: "MIDPOINT",
      body:
        "First undeniable replacement. The story shifts from mystery to certainty.",
      pageLabel: "p. 50",
    },
    {
      id: "m-act2b-open",
      kind: "act_open",
      anchor: "act-iib",
      title: "ACT II — B",
      body: "Pages 50–75 · Trust collapse, personalized judgments, ally lost.",
      pageLabel: "p. 50–75",
    },
    {
      id: "m-p50-75",
      kind: "accomplishment",
      anchor: "note-p50-75",
      title: "Page turn · trust collapse",
      body: "Trust collapse, personalized judgments, ally lost.",
      pageLabel: "p. 50–75",
    },
    {
      id: "m-break-75",
      kind: "act_break",
      anchor: "break-act2",
      title: "All Is Lost threshold",
      pageLabel: "p. ~75",
    },
    {
      id: "m-act3-open",
      kind: "act_open",
      anchor: "act-iii",
      title: "ACT III",
      body: "Pages 75–100 · Final pursuit, monster door, empty void, final choice.",
      pageLabel: "p. 75–100",
    },
    {
      id: "m-p75-100",
      kind: "accomplishment",
      anchor: "note-p75-100",
      title: "Page turn · terminal pursuit",
      body: "Final pursuit, monster door, empty void, final choice.",
      pageLabel: "p. 75–100",
    },
  ],

  pageAccomplishments: [
    {
      id: "pa-1",
      anchor: "note-p1-10",
      range: "p. 1–10",
      note: "Establish tone, group dynamics, protagonist weakness.",
    },
    {
      id: "pa-2",
      anchor: "note-p10-25",
      range: "p. 10–25",
      note: "Reveal premise, denial, failed rational control.",
    },
    {
      id: "pa-3",
      anchor: "note-p25-50",
      range: "p. 25–50",
      note: "Pond, reflection behavior, failed escape, first emergence.",
    },
    {
      id: "pa-4",
      anchor: "note-p50",
      range: "p. 50",
      note: "First undeniable replacement.",
    },
    {
      id: "pa-5",
      anchor: "note-p50-75",
      range: "p. 50–75",
      note: "Trust collapse, personalized judgments, ally lost.",
    },
    {
      id: "pa-6",
      anchor: "note-p75-100",
      range: "p. 75–100",
      note: "Final pursuit, monster door, empty void, final choice.",
    },
  ],

  scenes: [
    {
      id: "sc-01",
      slug: "sc-01-coach-interior",
      anchor: "scene-01",
      heading: "INT. COACH — WINTER — DAY",
      sequenceId: "seq-arrival",
      beatId: "opening-image",
      actId: "act-1",
      page: 1,
      structNote:
        "Stillness before the threshold. The protagonist occupies the smallest visual space in the frame.",
      themeNote: "Avoidance reads as politeness until it costs someone else.",
      characterIds: ["protagonist", "denier", "controller"],
      lines: [
        { text: "Five passengers. Frost webs the windows. The engine sound is too steady, too patient.", kind: "action" },
        { text: "NOREEN", kind: "character" },
        { text: "(quietly, to her hands)", kind: "parenthetical" },
        { text: "Almost there.", kind: "dialogue" },
        {
          text: "MILES catches her eye in the reflection—grins like this is a weekend trip.",
          kind: "action",
        },
        { text: "MILES", kind: "character" },
        { text: "You always look like you're apologizing for existing.", kind: "dialogue" },
        { text: "Noreen doesn't answer. That is her first victory and her first wound.", kind: "action" },
      ],
    },
    {
      id: "sc-02",
      slug: "sc-02-causeway",
      anchor: "scene-02",
      heading: "EXT. CAUSEWAY — CONTINUOUS",
      sequenceId: "seq-arrival",
      beatId: "opening-image",
      actId: "act-1",
      page: 2,
      characterIds: ["protagonist", "b-character", "guilty-one"],
      lines: [
        {
          text: "Black water on both sides. The castle appears in stages—first a tooth, then a throat.",
          kind: "action",
        },
        { text: "VIV", kind: "character" },
        { text: "It doesn't look real.", kind: "dialogue" },
        { text: "NOREEN", kind: "character" },
        { text: "It isn't supposed to.", kind: "dialogue" },
        {
          text: "ELIN presses her knuckles against her lips—holding a sentence inside.",
          kind: "action",
        },
      ],
    },
    {
      id: "sc-03",
      slug: "sc-03-great-hall",
      anchor: "scene-03",
      heading: "INT. GREAT HALL — CASTLE — DUSK",
      sequenceId: "seq-arrival",
      beatId: "theme-stated",
      actId: "act-1",
      page: 4,
      characterIds: ["host-woman", "protagonist"],
      lines: [
        {
          text: "Candles without smoke. Stone drinking sound.",
          kind: "action",
        },
        { text: "The HOST WOMAN stands as if she has always been standing.", kind: "action" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "You arrived believing you were alive. That belief is the first thing we remove.", kind: "dialogue" },
        { text: "NOREEN", kind: "character" },
        { text: "Who is 'we'?", kind: "dialogue" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "You.", kind: "dialogue" },
        {
          text: "A beat. Not a punchline—a hinge.",
          kind: "action",
        },
      ],
    },
    {
      id: "sc-04",
      slug: "sc-04-supper",
      anchor: "scene-04",
      heading: "INT. SUPPER ROOM — NIGHT",
      sequenceId: "seq-arrival",
      beatId: "set-up",
      actId: "act-1",
      page: 8,
      characterIds: ["controller", "denier", "guilty-one", "protagonist"],
      lines: [
        {
          text: "Wine that tastes like copper. Silver that doesn't tarnish.",
          kind: "action",
        },
        { text: "RICHARD (CONT'D)", kind: "character" },
        { text: "Rules. There are always rules. Someone built this place like a trap—", kind: "dialogue" },
        { text: "MILES", kind: "character" },
        { text: "Or like a theater. Same thing.", kind: "dialogue" },
        {
          text: "Noreen watches hands: who reaches, who withdraws, who pretends not to be afraid.",
          kind: "action",
        },
      ],
    },
    {
      id: "sc-05",
      slug: "sc-05-pond",
      anchor: "scene-05",
      heading: "INT. GLASS GALLERY — NIGHT",
      sequenceId: "seq-inversion",
      beatId: "catalyst",
      actId: "act-1",
      page: 18,
      characterIds: ["protagonist", "host-woman"],
      lines: [
        {
          text: "A pond beneath the floor—black mirror. Not water. Something thicker.",
          kind: "action",
        },
        { text: "Noreen's reflection blinks a half-second late.", kind: "action" },
        { text: "HOST WOMAN (O.S.)", kind: "character" },
        { text: "Do not mistake latency for error.", kind: "dialogue" },
        { text: "Noreen jerks back—", kind: "action" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "It is rehearsal.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-06",
      slug: "sc-06-debate",
      anchor: "scene-06",
      heading: "INT. NARROW STAIRCASE — NIGHT",
      sequenceId: "seq-inversion",
      beatId: "debate",
      actId: "act-1",
      page: 22,
      characterIds: ["protagonist", "b-character", "controller"],
      lines: [
        { text: "VIV", kind: "character" },
        { text: "We can walk out. Same way we came.", kind: "dialogue" },
        { text: "RICHARD", kind: "character" },
        { text: "Which way was that?", kind: "dialogue" },
        { text: "Silence answers better than the castle.", kind: "action" },
        { text: "NOREEN", kind: "character" },
        { text: "If we split up, we're proving we trust no one.", kind: "dialogue" },
        { text: "RICHARD", kind: "character" },
        { text: "Good. Trust is a liability here.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-07",
      slug: "sc-07-break-two",
      anchor: "scene-07",
      heading: "INT. TAPESTRY ROOM — NIGHT",
      sequenceId: "seq-inversion",
      beatId: "break-into-two",
      actId: "act-2a",
      page: 26,
      characterIds: ["protagonist", "denier", "host-woman"],
      lines: [
        {
          text: "On the wall: hunters stitched in thread—faces blank on purpose.",
          kind: "action",
        },
        { text: "Miles laughs too long at nothing.", kind: "action" },
        { text: "The candles dim as if the room inhales.", kind: "action" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "The castle does not hunt you. It unveils you.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-08",
      slug: "sc-08-b-story",
      anchor: "scene-08",
      heading: "INT. SIDE CHAPEL — NIGHT",
      sequenceId: "seq-reflection",
      beatId: "b-story",
      actId: "act-2a",
      page: 34,
      characterIds: ["protagonist", "b-character"],
      lines: [
        { text: "A small altar. Dust shaped like footprints—yesterday's and tomorrow's.", kind: "action" },
        { text: "VIV", kind: "character" },
        { text: "When I was a kid I thought silence was safe.", kind: "dialogue" },
        { text: "NOREEN", kind: "character" },
        { text: "It is safe. It's just…", kind: "dialogue" },
        { text: "She stops. Almost reveals. Pulls back.", kind: "action" },
        { text: "NOREEN (CONT'D)", kind: "character" },
        { text: "…not honest.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-09",
      slug: "sc-09-fun-games",
      anchor: "scene-09",
      heading: "INT. LONG GALLERY — NIGHT",
      sequenceId: "seq-reflection",
      beatId: "fun-and-games",
      actId: "act-2a",
      page: 42,
      characterIds: ["guilty-one", "controller", "protagonist"],
      lines: [
        {
          text: "Mirrors between mirrors—an aisle of selves.",
          kind: "action",
        },
        { text: "Elin's reflection smiles before Elin does.", kind: "action" },
        { text: "ELIN", kind: "character" },
        { text: "(to her reflection)", kind: "parenthetical" },
        { text: "Stop.", kind: "dialogue" },
        { text: "The reflection mouths a longer sentence—silent.", kind: "action" },
      ],
    },
    {
      id: "sc-10",
      slug: "sc-10-midpoint",
      anchor: "scene-10",
      heading: "INT. POND CHAMBER — NIGHT",
      sequenceId: "seq-reflection",
      beatId: "midpoint",
      actId: "act-2b",
      page: 50,
      characterIds: ["denier", "protagonist", "host-woman"],
      lines: [
        {
          text: "Miles meets his double in plain light. No flourish. No scream. Just completion.",
          kind: "action",
        },
        { text: "The double speaks with Miles' jokes but none of his panic.", kind: "action" },
        { text: "MILES", kind: "character" },
        { text: "This isn't—", kind: "dialogue" },
        { text: "He is already gone. The room refills with the wrong silence.", kind: "action" },
        { text: "Noreen understands: denial is not protection. It is delay.", kind: "action" },
      ],
    },
    {
      id: "sc-11",
      slug: "sc-11-bad-guys",
      anchor: "scene-11",
      heading: "INT. ARMORY — NIGHT",
      sequenceId: "seq-fracture",
      beatId: "bad-guys-close-in",
      actId: "act-2b",
      page: 58,
      characterIds: ["controller", "protagonist"],
      lines: [
        { text: "Richard inventories weapons that are useless here.", kind: "action" },
        { text: "RICHARD", kind: "character" },
        { text: "We decide who leaves. Not them.", kind: "dialogue" },
        { text: "His double enters—calm, certain, unmoved.", kind: "action" },
        { text: "RICHARD (CONT'D)", kind: "character" },
        { text: "I said—", kind: "dialogue" },
        {
          text: "The double doesn't interrupt. He doesn't have to.",
          kind: "action",
        },
      ],
    },
    {
      id: "sc-12",
      slug: "sc-12-all-lost",
      anchor: "scene-12",
      heading: "INT. GLASS GALLERY — LATER",
      sequenceId: "seq-fracture",
      beatId: "all-is-lost",
      actId: "act-2b",
      page: 68,
      characterIds: ["b-character", "protagonist", "host-woman"],
      lines: [
        {
          text: "Viv's double offers a hand—like mercy, like marriage.",
          kind: "action",
        },
        { text: "VIV", kind: "character" },
        { text: "I can't fight what looks like… peace.", kind: "dialogue" },
        { text: "Noreen reaches—", kind: "action" },
        { text: "Too late. Viv steps into alignment. A surrender that looks like healing.", kind: "action" },
        { text: "NOREEN", kind: "character" },
        { text: "(barely audible)", kind: "parenthetical" },
        { text: "Come back.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-13",
      slug: "sc-13-dark-night",
      anchor: "scene-13",
      heading: "INT. COLD CELL — NIGHT",
      sequenceId: "seq-door",
      beatId: "dark-night",
      actId: "act-3",
      page: 76,
      characterIds: ["protagonist"],
      lines: [
        {
          text: "Noreen Alone. The dark has texture—wool, stone, hair.",
          kind: "action",
        },
        { text: "She rehearses apologies to people who are not in the room.", kind: "action" },
        { text: "She stops.", kind: "action" },
        { text: "A decision gathers—not bravery. Refusal of old strategy.", kind: "action" },
      ],
    },
    {
      id: "sc-14",
      slug: "sc-14-break-three",
      anchor: "scene-14",
      heading: "INT. WEST WING CORRIDOR — NIGHT",
      sequenceId: "seq-door",
      beatId: "break-into-three",
      actId: "act-3",
      page: 80,
      characterIds: ["protagonist", "host-woman"],
      lines: [
        { text: "The Host Woman waits like an open door shaped like a person.", kind: "action" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "You may still be replaced. Or you may walk.", kind: "dialogue" },
        { text: "NOREEN", kind: "character" },
        { text: "Walk where?", kind: "dialogue" },
        { text: "HOST WOMAN", kind: "character" },
        { text: "That is what you will choose to mean.", kind: "dialogue" },
      ],
    },
    {
      id: "sc-15",
      slug: "sc-15-finale",
      anchor: "scene-15",
      heading: "INT. FINAL DOOR ANTE ROOM — NIGHT",
      sequenceId: "seq-door",
      beatId: "finale",
      actId: "act-3",
      page: 90,
      characterIds: ["protagonist"],
      lines: [
        {
          text: "A door of black wood. No lock. No handle. It opens if you admit you're already holding it.",
          kind: "action",
        },
        { text: "Noreen's double stands aside—not threatening. Completing.", kind: "action" },
        { text: "NOREEN", kind: "character" },
        { text: "If I go through—", kind: "dialogue" },
        { text: "DOUBLE", kind: "character" },
        { text: "You stop borrowing your life.", kind: "dialogue" },
        { text: "Noreen breathes once—fully—and moves.", kind: "action" },
      ],
    },
    {
      id: "sc-16",
      slug: "sc-16-final-image",
      anchor: "scene-16",
      heading: "INT./EXT. THRESHOLD — CONTINUOUS",
      sequenceId: "seq-door",
      beatId: "final-image",
      actId: "act-3",
      page: 98,
      characterIds: ["protagonist"],
      lines: [
        {
          text: "Beyond: not fire. Not teeth. Not judgment as spectacle.",
          kind: "action",
        },
        {
          text: "An empty that reads as intimate—like the moment after a verdict.",
          kind: "action",
        },
        { text: "Noreen crosses.", kind: "action" },
        { text: "The frame holds on absence—and credits refuse to rescue us.", kind: "action" },
        { text: "CUT TO BLACK.", kind: "transition" },
      ],
    },
  ],

  scriptFlow: [
    { kind: "marker", markerId: "m-act1-open" },
    { kind: "accomplishment", noteId: "pa-1" },
    { kind: "beat", beatId: "opening-image" },
    { kind: "scene", sceneId: "sc-01" },
    { kind: "scene", sceneId: "sc-02" },
    { kind: "accomplishment", noteId: "pa-2" },
    { kind: "beat", beatId: "theme-stated" },
    { kind: "scene", sceneId: "sc-03" },
    { kind: "beat", beatId: "set-up" },
    { kind: "scene", sceneId: "sc-04" },
    { kind: "marker", markerId: "m-break-25" },
    { kind: "beat", beatId: "catalyst" },
    { kind: "scene", sceneId: "sc-05" },
    { kind: "beat", beatId: "debate" },
    { kind: "scene", sceneId: "sc-06" },
    { kind: "beat", beatId: "break-into-two" },
    { kind: "scene", sceneId: "sc-07" },
    { kind: "marker", markerId: "m-act2a-open" },
    { kind: "accomplishment", noteId: "pa-3" },
    { kind: "beat", beatId: "b-story" },
    { kind: "scene", sceneId: "sc-08" },
    { kind: "beat", beatId: "fun-and-games" },
    { kind: "scene", sceneId: "sc-09" },
    { kind: "marker", markerId: "m-p25-50" },
    { kind: "marker", markerId: "m-midpoint" },
    { kind: "accomplishment", noteId: "pa-4" },
    { kind: "beat", beatId: "midpoint" },
    { kind: "scene", sceneId: "sc-10" },
    { kind: "marker", markerId: "m-act2b-open" },
    { kind: "accomplishment", noteId: "pa-5" },
    { kind: "beat", beatId: "bad-guys-close-in" },
    { kind: "scene", sceneId: "sc-11" },
    { kind: "beat", beatId: "all-is-lost" },
    { kind: "scene", sceneId: "sc-12" },
    { kind: "marker", markerId: "m-break-75" },
    { kind: "marker", markerId: "m-act3-open" },
    { kind: "accomplishment", noteId: "pa-6" },
    { kind: "beat", beatId: "dark-night" },
    { kind: "scene", sceneId: "sc-13" },
    { kind: "beat", beatId: "break-into-three" },
    { kind: "scene", sceneId: "sc-14" },
    { kind: "beat", beatId: "finale" },
    { kind: "scene", sceneId: "sc-15" },
    { kind: "beat", beatId: "final-image" },
    { kind: "scene", sceneId: "sc-16" },
  ],

  characters: [
    {
      id: "protagonist",
      slug: "noreen",
      name: "Noreen",
      role: "Protagonist",
      coreFlaw: "Avoidance mistaken for virtue; refusal to choose a self.",
      arcDirection: "From meek withdrawal to irreversible agency.",
      toneDescriptor: "Quiet, watchful, late-speaking.",
      overview:
        "Noreen has organized her life around minimizing friction. She equates peace with silence, and silence with safety—until the castle turns silence into evidence.",
      narrativeFunction:
        "The story’s moral testing ground. Her delay is structural: judgment cannot land until she stops borrowing identities from circumstance.",
      survivalStrategy:
        "Agree first, disappear second. Offer help without commitment. Never be the reason something breaks.",
      arc: "She learns that survival without choice is another form of death. Her final strength is not aggression but a clean, costly decision at the door.",
      judgmentPattern:
        "Her double does not chase. It waits—more patient than fear, more relentless than violence.",
      relationshipToProtagonist: "N/A",
      keyScenes: [
        "Coach interior — avoidance established as pattern, not personality.",
        "Glass gallery — reflection latency reframed as rehearsal.",
        "Side chapel — almost tells the truth; retreats into ‘safe’ language.",
        "Final door — chooses meaning over comfort.",
      ],
      dialogueTone:
        "Understated, often incomplete sentences. Questions used to deflect confrontation. When pressed, she clarifies—too late for others, right on time for herself.",
      visualPresence:
        "Small gestures: hands retreat to sleeves; posture shrinks in groups; in solitude her face becomes dangerously readable.",
    },
    {
      id: "host-woman",
      slug: "host-woman",
      name: "The Host Woman",
      role: "Antagonistic force / Usher",
      coreFlaw: "N/A — she is not failing; she is enforcing.",
      arcDirection: "Static certainty; reveals rather than transforms.",
      toneDescriptor: "Ancient calm; gentle without warmth.",
      overview:
        "She speaks as if she is reading from a law written inside the body. She is never theatrical because she does not need spectacle—truth here is intimate.",
      narrativeFunction:
        "Sets moral physics, withholds explanation as discipline, forces the living habits of the guests to collapse on contact with consequence.",
      survivalStrategy: "Impersonality as mercy.",
      arc: "She does not arc. She deepens—each appearance strips away one more comforting metaphor.",
      judgmentPattern:
        "Precision without cruelty. She never enjoys punishment; she acknowledges cost.",
      relationshipToProtagonist:
        "Mirrors Noreen’s postponement: the Host Woman will not rescue her from decision-making.",
      keyScenes: [
        "Great hall — the reversal: belief in life is the first removal.",
        "Pond chamber — reframes error as rehearsal.",
        "West corridor — offers the final binary without rhetorical padding.",
      ],
      dialogueTone:
        "Short clauses. No persuasion. Answers that sound like doors clicking shut.",
      visualPresence:
        "Stillness reads as weight. She occupies space without claiming it—like furniture that has always belonged.",
    },
    {
      id: "b-character",
      slug: "viv",
      name: "Viv",
      role: "B-character / emotional ally",
      coreFlaw: "Romanticizes relief; confuses surrender with healing.",
      arcDirection: "From fragile hope to aligned replacement.",
      toneDescriptor: "Warm, confessional, hungry for connection.",
      overview:
        "Viv reaches for Noreen because loneliness is a clock—and Viv hears it ticking. Their bond is real, which makes its failure more brutal.",
      narrativeFunction:
        "Embodies the failed path of surrender. She accepts the double as ‘peace,’ proving the castle can win without violence.",
      survivalStrategy: "Attach quickly; translate fear into intimacy; trade agency for belonging.",
      arc: "Her arc completes when ‘peace’ becomes indistinguishable from disappearance.",
      judgmentPattern: "Her double offers coherence without conflict—the cruelest bait.",
      relationshipToProtagonist:
        "The almost-sister: the person Noreen could have become if comfort had been enough.",
      keyScenes: [
        "Causeway — first humane voice in a dehumanizing approach.",
        "Side chapel — trades secrets as currency.",
        "Glass gallery — steps into alignment; Noreen’s reach arrives late.",
      ],
      dialogueTone:
        "Direct emotion, soft humor as shield. Says what Noreen won’t—until she won’t say no.",
      visualPresence:
        "Open posture in groups; touches fabric, hair, shoulders—seeking proof of reality.",
    },
    {
      id: "denier",
      slug: "miles",
      name: "Miles",
      role: "The Denier",
      coreFlaw: "Uses humor and dismissal to void fear.",
      arcDirection: "False comfort collapses into erasure.",
      toneDescriptor: "Fast jokes; performed confidence.",
      overview:
        "Miles narrates the castle into normalcy. He treats dread like a social faux pas—something you can talk over until it apologizes.",
      narrativeFunction:
        "Tests whether denial can outlast evidence. The story answers: it can delay, not defend.",
      survivalStrategy: "Talk constantly; mock what won’t name itself; never sit still long enough to feel.",
      arc: "Escalates jokes as the mirrors sharpen—then ends when the double is simply ‘more Miles.’",
      judgmentPattern:
        "His double inherits the wit without the tremor—completion without mercy.",
      relationshipToProtagonist:
        "An irritant who is also a mirror: Noreen’s silence and Miles’ noise both refuse the same fact.",
      keyScenes: [
        "Coach — establishes dynamic pressure on Noreen’s quiet.",
        "Tapestry room — laughter as brittle insulation.",
        "Midpoint chamber — undeniable replacement; denial ends without spectacle.",
      ],
      dialogueTone:
        "Deflection, interruptions, rhetorical questions. Subtext: if I keep talking, reality can’t sit down.",
      visualPresence:
        "Eyes always moving; smile as a barrier; hands in pockets like he owns the building.",
    },
    {
      id: "controller",
      slug: "richard",
      name: "Richard",
      role: "The Controller",
      coreFlaw: "Believes force and certainty can domesticate dread.",
      arcDirection: "Leadership becomes exposure; control invites a stronger mirror.",
      toneDescriptor: "Command voice; clipped plans; moral accounting.",
      overview:
        "Richard treats fear like a logistics problem. He inventories, delegates, commands—because if someone is responsible, it won’t be chaos.",
      narrativeFunction:
        "Embodies the failed path of domination. His double is not angrier; it is unmoved.",
      survivalStrategy: "Take charge, assign roles, punish hesitation, convert mystery into tasks.",
      arc: "Breaks when confronted by a self who does not need to win—only to remain.",
      judgmentPattern:
        "The double outlasts his performative certainty with quiet completeness.",
      relationshipToProtagonist:
        "Forces Noreen to see that avoidance and control are twins—both refuse interior work.",
      keyScenes: [
        "Supper room — attempts to impose order on the uncanny.",
        "Debate staircase — argues for splitting, planning, surviving by strategy alone.",
        "Armory — confronts a stronger mirror; rhetoric fails first.",
      ],
      dialogueTone:
        "Imperatives, ‘we will’ statements, moral frames used as leverage. Rarely admits doubt aloud.",
      visualPresence:
        "Square shoulders; points when speaking; occupies doorways—until he doesn’t.",
    },
    {
      id: "guilty-one",
      slug: "elin",
      name: "Elin",
      role: "The Guilty One",
      coreFlaw: "Carries a buried truth; shrinks under scrutiny.",
      arcDirection: "Internal collapse accelerated by confrontation.",
      toneDescriptor: "Quiet, defensive, brittle.",
      overview:
        "Elin listens like she is collecting evidence against herself. She has made secrecy into a second skin.",
      narrativeFunction:
        "Demonstrates how guilt becomes a magnet for judgment—often before anyone speaks.",
      survivalStrategy: "Minimize presence; answer narrowly; translate fear into shame.",
      arc: "Her reflection speaks the paragraph she won’t—then she fractures.",
      judgmentPattern:
        "Her double does not accuse. It simply knows—and that knowing is unbearable.",
      relationshipToProtagonist:
        "Warns Noreen indirectly: what you won’t name becomes a room you’re locked inside.",
      keyScenes: [
        "Causeway — knuckles at lips; containment as choreography.",
        "Long gallery — reflection precedes the self; shame externalizes.",
      ],
      dialogueTone:
        "Short answers, swallowed words, apologies disguised as clarification.",
      visualPresence:
        "Looks down-line; folds arms; positions herself near exits she won’t take.",
    },
  ],

  guidancePanels: [
    {
      routeKey: "about",
      intro:
        "Internal principles used to keep the film’s pressure honest—without mistaking theme for explanation.",
      groups: [
        {
          id: "g-ab-1",
          title: "Story pressure",
          items: [
            { text: "External events must force internal decisions." },
            { text: "Escalate pressure; never repeat it." },
            { text: "Each major sequence should remove an option." },
          ],
        },
        {
          id: "g-ab-2",
          title: "Character truth",
          items: [
            { text: "The protagonist must move from avoidance to agency." },
            {
              text: "Supporting characters embody failed paths the protagonist could take.",
            },
            { text: "Conflict should sharpen choice, not decorate scenes." },
          ],
        },
        {
          id: "g-ab-3",
          title: "Surprise",
          items: [
            {
              text: "Surprise should come from the gap between expectation and result.",
            },
            { text: "The final choice must be irreversible." },
          ],
        },
      ],
    },
    {
      routeKey: "script",
      intro:
        "Guidance while reading: scene craft, structure checkpoints, and tension hygiene.",
      groups: [
        {
          id: "g-sc-1",
          title: "Story principles",
          items: [
            { text: "Every scene must turn." },
            {
              text: "Begin a scene in one emotional value and end in another.",
            },
            { text: "Escalate pressure, never repeat it." },
            { text: "External events must force internal decisions." },
          ],
        },
        {
          id: "g-sc-2",
          title: "Scene goals",
          items: [
            { text: "Conflict should sharpen choice." },
            { text: "The protagonist must move from avoidance to agency." },
            { text: "Each major sequence should remove an option." },
          ],
        },
        {
          id: "g-sc-3",
          title: "Structural checkpoints",
          items: [
            {
              text: "The midpoint must redefine the story, not just intensify it.",
            },
            { text: "The ending must resolve the central moral and emotional conflict." },
            { text: "Act breaks should crystallize premise, then cost, then consequence." },
          ],
        },
        {
          id: "g-sc-4",
          title: "Character pressure notes",
          items: [
            { text: "Supporting characters embody failed paths." },
            { text: "Judgment should feel personal, not procedural." },
            { text: "The final choice must be irreversible." },
          ],
        },
        {
          id: "g-sc-5",
          title: "Tension reminders",
          items: [
            { text: "Stillness is a blade—use it sparingly, deliberately." },
            { text: "Dread deepens when the uncanny behaves politely." },
            { text: "Avoid explaining the mechanism; reveal the cost." },
          ],
        },
        {
          id: "g-sc-6",
          title: "Dialogue reminders",
          items: [
            { text: "Dialogue should carry subtext, not explanation." },
            { text: "Characters should rarely say exactly what they mean." },
            {
              text: "Let silence do the moral work when a line would comfort too much.",
            },
          ],
        },
        {
          id: "g-sc-7",
          title: "Page accomplishment notes",
          items: [
            {
              text: "p.1–10: establish tone, group dynamics, protagonist weakness.",
            },
            {
              text: "p.10–25: reveal premise, denial, failed rational control.",
            },
            { text: "p.25–50: pond, reflection behavior, failed escape, first emergence." },
            { text: "p.50: first undeniable replacement." },
            {
              text: "p.50–75: trust collapse, personalized judgments, ally lost.",
            },
            {
              text: "p.75–100: final pursuit, monster door, empty void, final choice.",
            },
          ],
        },
        {
          id: "g-sc-8",
          title: "Three-act spine (notes)",
          items: [
            {
              text: "Act 1: establish unease, premise, group dynamics, and protagonist weakness.",
            },
            {
              text: "Act 2A: reveal the pond, the rules, and the impossibility of escape.",
            },
            {
              text: "Midpoint: first undeniable replacement; story shifts from mystery to certainty.",
            },
            {
              text: "Act 2B: doubles integrate, trust collapses, characters fall according to their flaws.",
            },
            {
              text: "Act 3: the protagonist stops running, reaches the door, and chooses.",
            },
          ],
        },
      ],
    },
    {
      routeKey: "characters",
      intro: "Read supporting roles as moral alternatives—not as decoration.",
      groups: [
        {
          id: "g-ch-1",
          title: "Ensemble discipline",
          items: [
            { text: "Each supporting role pressure-tests a protagonist strategy." },
            { text: "Failed paths should feel tempting, not stupid." },
            { text: "Doubles should be calm, complete, and cruelly plausible." },
          ],
        },
      ],
    },
    {
      routeKey: "character:noreen",
      intro: "Guidance while tracking the protagonist’s interior trial.",
      groups: [
        {
          id: "g-pr-1",
          title: "Interior rules",
          items: [
            { text: "Avoidance must have visible social consequences." },
            { text: "Agency should arrive as choice, not as a fight scene." },
            { text: "Delay judgment until she has truly chosen who she is." },
          ],
        },
      ],
    },
    {
      routeKey: "character:host-woman",
      intro: "Keep the Host Woman procedural without becoming camp.",
      groups: [
        {
          id: "g-hw-1",
          title: "Presence",
          items: [
            { text: "Calm reads as certainty; certainty reads as fate." },
            { text: "Never over-explain the castle’s ‘rules.’" },
            { text: "Let courtesy feel like law." },
          ],
        },
      ],
    },
    {
      routeKey: "character:viv",
      intro: "Surrender must look like relief until it doesn’t.",
      groups: [
        {
          id: "g-viv-1",
          title: "Ally function",
          items: [
            { text: "Offer real warmth so the loss costs." },
            { text: "Make the double’s offer feel emotionally fair." },
          ],
        },
      ],
    },
    {
      routeKey: "character:miles",
      intro: "Humor as denial—not as charm for its own sake.",
      groups: [
        {
          id: "g-mi-1",
          title: "Pressure",
          items: [
            { text: "Escalate jokes as evidence tightens." },
            { text: "The double should inherit the humor without the fear." },
          ],
        },
      ],
    },
    {
      routeKey: "character:richard",
      intro: "Control is a temptation the story must break cleanly.",
      groups: [
        {
          id: "g-ri-1",
          title: "Anti-path",
          items: [
            { text: "Strategy without interior work is another mask." },
            { text: "The double wins by being unmoved, not louder." },
          ],
        },
      ],
    },
    {
      routeKey: "character:elin",
      intro: "Guilt as atmosphere—then as verdict.",
      groups: [
        {
          id: "g-el-1",
          title: "Fracture",
          items: [
            { text: "Let shame precede speech." },
            { text: "The double’s knowing should feel gentle—and fatal." },
          ],
        },
      ],
    },
  ],
};

export function getGuidance(key: string) {
  return siteData.guidancePanels.find((p) => p.routeKey === key);
}
