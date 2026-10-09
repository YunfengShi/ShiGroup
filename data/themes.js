// Research themes, shown on the home page and the Research page.
// img: figure path; caption: shown under it on the Research page. img: replace with a real figure (e.g. assets/img/glass-figure.png). Wide images (16:10) work best.
// refs: phrases that match paper titles in publications.js; matching papers are listed under the theme.
window.THEMES = [
  {
    id: "glass",
    title: "Toughness and failure of glasses",
    short: "Why are some glasses brittle and others ductile? We trace fracture, shear banding and crack growth back to atomic structure.",
    img: "assets/img/fig/theme-glass.jpg",
    caption: "Shear band running faster than the shear wave, with a Mach cone. Luo et al., <i>Acta Materialia</i> 2023.",
    body: [
      "Amorphous solids have no long-range order, so their elastic, plastic and fracture behavior is far less understood than that of crystals. We study metallic glasses, silica and oxide glasses, polymer glasses, amorphous silicon and Li–Si alloys to find what they share.",
      "Across all of these systems, more covalent bonding lowers Poisson's ratio and makes the glass more brittle, while a more disordered local structure, such as one produced by faster cooling, raises Poisson's ratio and makes it more ductile. We developed a method for computing fracture energy directly in molecular dynamics that reproduces the experimental trend.",
      "We also showed that glasses consolidated from glassy nanoparticles can be both ductile and work-hardenable. Our \"simulated casting\" technique showed that shear banding in metallic-glass nanopillars does not depend on size, and that the homogeneous flow seen in experiments likely comes from ion-beam damage rather than size effects. Current work focuses on subcritical crack growth in oxide glasses."
    ],
    refs: ["Silica Glass Toughened", "Design Ductile and Work-Hardenable", "On Measuring the Fracture Energy", "Size-dependent mechanical responses", "subcritical crack growth", "dynamics of shear band propagation"]
  },
  {
    id: "interfaces",
    title: "2D materials, epitaxy and interfaces",
    short: "Simulations that explain wetting transparency, remote epitaxy and membrane lift-off, done with experimental partners at RPI and MIT.",
    img: "assets/img/fig/theme-interfaces.jpg",
    caption: "Molecular dynamics of a perovskite thin film grown by van der Waals epitaxy, with dislocations highlighted. Shi group simulation.",
    body: [
      "With the Koratkar group we explained the \"wetting transparency\" of graphene: a single sheet barely changes how water wets the substrate beneath it. The effect comes from long-range van der Waals forces and graphene's sub-nanometer thickness, and it later helped inspire remote epitaxy for thin-film growth.",
      "We developed a two-body reactive potential with a perovskite ground state, which enabled the first molecular dynamics simulations of remote epitaxy. With Jian Shi's group at RPI and Jeehwan Kim's group at MIT, this modeling has supported work on long-distance remote epitaxy, graphene-nanopattern epitaxy, high-throughput layer transfer, atomic lift-off of membranes and giant pyroelectricity in nanomembranes."
    ],
    refs: ["Long-distance remote epitaxy", "Atomic lift-off", "Giant pyroelectricity", "Graphene nanopattern", "High-throughput manufacturing", "Wetting Transparency", "Carrier lifetime enhancement"]
  },
  {
    id: "forcefields",
    title: "Minimalist reactive force fields",
    short: "Fast two-body \"reactive Lennard-Jones\" potentials that still capture rich chemistry in polymers, silk, perovskites and molten salts.",
    img: "assets/img/fig/theme-forcefields.jpg",
    caption: "Reactive coarse-grained model of silk-mimetic polymers: assembly and tensile deformation. Kim et al., <i>Biomacromolecules</i> 2025.",
    body: [
      "Reactive potentials are among the hardest parts of molecular simulation to build. Our minimalist reactive potentials use only two-body interactions, so they are quick to develop and cheap to run. Even so, they capture changes in hybridization, radical reactions and catalytic effects.",
      "We have used this approach to model step-growth and chain-growth polymerization along with elastic, plastic and crazing deformation; surface-grafted versus solution polymerization (with the Palermo group); beta-sheet assembly and mechanics of silk-mimetic polymers (with the Zha group); perovskite epitaxy; and molten salts for first-principles free-energy calculations."
    ],
    refs: ["Spidroin-Mimetic Fibers", "Silk-Mimetic", "reactive coarse-grained model", "minimalist's reactive potential", "chain-growth polymerization", "molten salt phase diagrams"]
  },
  {
    id: "energy",
    title: "Batteries and energy materials",
    short: "How lithium and potassium dendrites heal themselves, and why silicon anodes become brittle during cycling.",
    img: "assets/img/theme-energy.svg",
    body: [
      "Our simulations showed that surface diffusion at high current densities, driven by self-heating, can smooth out and heal lithium and potassium metal dendrites. This work was done with the Koratkar and Narayanan groups and published in Science and PNAS.",
      "For silicon anodes, we followed how repeated lithiation and delithiation changes the structure and makes the material brittle, and how a graphene drape or slippery van der Waals interface lowers interfacial stress. We have also modeled how fluid flowing over graphene drags adsorbed ions and generates electricity."
    ],
    refs: ["Self-heating–induced healing", "In situ healing of dendrites", "embrittlement during lithiation", "van der Waals Slippery Interfaces", "Harvesting Energy from Water Flow"]
  },
  {
    id: "tribology",
    title: "Atomic wear and tribology",
    short: "A wear law for single asperities, including when Archard's law breaks down and how adhesion changes the wear mechanism.",
    img: "assets/img/fig/theme-tribology.jpg",
    caption: "Atomic wear of a glassy tip under a sliding slider. Yang et al., <i>Tribology International</i> 2022.",
    body: [
      "For single-asperity contacts, we found that wear is negligible below a threshold stress and then grows linearly with stress, so Archard's multi-asperity law does not apply to tip wear. Adhesion suppresses atomic-scale wear and promotes plastic wear.",
      "With Johnson Samuel's group we extended this work to tribochemistry, modeling how 2D-material coatings reduce iron-catalyzed wear when diamond tools cut steel."
    ],
    refs: ["Nature of Atomic Wear", "Single Asperity Friction", "Adhesion Suppresses Atomic Wear", "Tip Wear", "Mitigation of Chemical Wear"]
  },
  {
    id: "design",
    title: "Quantum and data-driven design",
    short: "Quantum optimization and AI for materials design, from composites (with IBM) to rare-earth-free magnets (DOE Genesis).",
    img: "assets/img/fig/theme-design.jpg",
    caption: "Machine-learned Young's modulus of oxide glasses projected onto the top two features. Shih et al., <i>J. Non-Cryst. Solids</i> 2022.",
    body: [
      "Many design problems, such as where to place each phase in a composite, are combinatorial and too large to search exhaustively. In an IBM-funded project with Jian Shi and Liping Huang, we are developing quantum optimization algorithms for combinatorial design of composite materials. A new DOE Genesis project with Jie Lian and Liping Huang, together with Ames Laboratory and GE Vernova, applies AI to guide the manufacturing of high-performance magnets free of heavy rare earths.",
      "We also build physics- and chemistry-informed machine-learning models, for example to predict glass properties and microstructure evolution during laser sintering. During the COVID-19 pandemic, we contributed a collision-based transmission model to the CDC COVID-19 Forecast Hub."
    ],
    refs: ["Generative Adversarial Network-Based", "physics- and chemistry-informed machine learning", "Machine learning-based microstructure", "Capping Mobility", "probabilistic forecasts of COVID-19"]
  }
];
