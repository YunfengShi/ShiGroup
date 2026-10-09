// Group members. To add someone, copy a block and edit it.
// photo: path to a square headshot in assets/people/ (leave "" to show initials).
window.PEOPLE = {
  pi: {
    name: "Yunfeng Shi",
    role: "Professor & Graduate Program Director, Materials Science and Engineering",
    photo: "assets/people/yunfeng-shi.jpg",
    email: "shiy2@rpi.edu",
    office: "MRC 114",
    scholar: "https://scholar.google.com/citations?user=J6P8ihQAAAAJ&hl=en",
    cv: "",               // optional: e.g. "assets/Shi-CV-public.pdf" (a public version, not the full RPI CV)
    bio: [
      "Yunfeng Shi is a Professor of Materials Science and Engineering at Rensselaer Polytechnic Institute, where he has been on the faculty since 2008. His group uses molecular simulation to understand materials behavior at the atomic level, then turns that understanding into new synthesis routes, microstructures and devices.",
      "He received his B.E. from Tsinghua University (2000), M.S. from the University of Illinois at Urbana-Champaign (2002) and Ph.D. from the University of Michigan (2006), all in Materials Science and Engineering, followed by postdoctoral research at North Carolina State University (2006–2008).",
      "Honors include the inaugural Gordon S. Fulcher Distinguished Scholar at Corning Inc. (2015), the Tang Ao-Qing Visiting Professorship at Jilin University (2016) and the Albert Yee Award for Excellence in Graduate Student Research at Michigan (2005)."
    ],
    education: [
      ["Ph.D., Materials Science & Engineering", "University of Michigan, 2006"],
      ["M.S., Materials Science & Engineering", "University of Illinois Urbana-Champaign, 2002"],
      ["B.E., Materials Science & Engineering", "Tsinghua University, 2000"]
    ]
  },

  current: [
    { name: "Yeshdi Autul", role: "Ph.D. student, MSE", since: "2023", topic: "", photo: "" },
    { name: "Xudong Li", role: "Ph.D. student, MSE", since: "2023", topic: "", photo: "" },
    { name: "Anyou Zhu", role: "Ph.D. student, MSE", since: "2023", topic: "", note: "Co-advised with Prof. Liping Huang", photo: "" },
    { name: "Lam Tran", role: "Ph.D. student, MSE", since: "2026", topic: "", note: "Co-advised with Prof. Liping Huang", photo: "" }
  ],

  // Ph.D. / M.S. / postdoc alumni, newest first. `now` = current position if known.
  alumni: [
    { name: "Mark Potter", degree: "Ph.D., MSE", year: "2026", thesis: "Model-Guided Exploration of Rare Mechanical Behavior in Molecular Dynamics Systems", note: "Co-advised with Jian Shi", now: "" },
    { name: "Connor James Foreman", degree: "M.S., MSE", year: "2025", thesis: "Oxidation Behavior of High Entropy Alloy Approximates Fabricated via Common Welding Material", now: "Newport News Shipbuilding" },
    { name: "Jeongae Kim", degree: "Ph.D., Chemical & Biological Engineering", year: "2025", thesis: "Molecular Modeling of Self-assembly and Mechanical Deformation of Spider Silk Protein", note: "Co-advised with Helen Zha", now: "Postdoc, KIST (South Korea)" },
    { name: "Pritom Bose", degree: "Ph.D., Mechanical Engineering", year: "2024", thesis: "Reactive Coarse-Grain Simulation for Advanced Materials Systems", note: "Co-advised with Nikhil Koratkar", now: "Postdoctoral Scholar, University of Nevada, Reno" },
    { name: "Marx Akl", degree: "Ph.D., Physics", year: "2023", thesis: "Mechanical Responses of Materials at the Nanoscale via Simulations", now: "Copeland" },
    { name: "Yueh-Ting Shih", degree: "Postdoctoral researcher", year: "2019–2022", thesis: "", note: "Co-advised with Liping Huang", now: "Professor, National Cheng Kung University" },
    { name: "Daniel Hons", degree: "Ph.D., Mechanical Engineering", year: "2021", thesis: "Mitigating Iron-induced Catalytic Wear in Diamond Tools Using Two-Dimensional Materials", note: "Co-advised with Johnson Samuel", now: "Apple" },
    { name: "Yanming Zhang", degree: "Ph.D., MSE", year: "2020", thesis: "Investigation on Deformation Behavior of Non-crystalline Materials via Molecular Dynamics Simulations", note: "Co-advised with Liping Huang", now: "Postdoc, UIUC" },
    { name: "Swastik Basu", degree: "Ph.D., Mechanical Engineering", year: "2019", thesis: "Molecular Modeling of Batteries", note: "Co-advised with Nikhil Koratkar", now: "Postdoc, University of Texas" },
    { name: "Binghui Deng", degree: "Ph.D., MSE", year: "2017", thesis: "Molecular Dynamics Simulation on Polymeric Materials", now: "Corning → Tesla → Professor, Huazhong University of Science and Technology" },
    { name: "Yongjian Yang", degree: "Ph.D., MSE", year: "2017", thesis: "Quantitative Understanding of Single-Asperity Contact via Molecular Dynamics", now: "Research Professor, Penn State → Amazon" },
    { name: "Jian Luo", degree: "Ph.D., MSE", year: "2014", thesis: "Failure Mechanisms of Metallic Glasses via Atomic Scale Simulations", now: "Corning → Meta" },
    { name: "Yanping Chen", degree: "Ph.D., MSE", year: "2013", thesis: "Modeling Active NanoSystems by Reactive Molecular Dynamics", now: "MicroStrategy" },
    { name: "Xi Mi", degree: "Ph.D., Physics", year: "2012", thesis: "Molecular Simulation of Nano-Structured Carbon", now: "Google" },
    { name: "Metin Vargonen", degree: "M.S., MSE", year: "2012", thesis: "Mechanical Wear Behavior of a Model Metallic Glass Asperity via Molecular Dynamics", note: "Co-advised with Liping Huang", now: "GE Vernova" }
  ]
};
