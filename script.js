let alignmentChart = null;

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((item) => {
      item.classList.remove("active");
    });

    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    button.classList.add("active");

    const selectedPanel = document.getElementById(selectedTab);

    if (selectedPanel) {
      selectedPanel.classList.add("active");
    }

    if (selectedTab === "alignment-module" && alignmentChart) {
      setTimeout(() => {
        alignmentChart.resize();
      }, 100);
    }
  });
});




const criteria = [
  "impact",
  "equity",
  "feasibility",
  "affordability",
  "financing",
  "scalability",
  "partnership",
  "measurability"
];

function calculateScore() {
  let total = 0;

  criteria.forEach((criterion) => {
    const slider = document.getElementById(criterion);
    const label = document.getElementById(`${criterion}-value`);

    if (slider && label) {
      const value = Number(slider.value);
      total += value;
      label.textContent = value;
    }
  });

  const score = Math.round((total / 80) * 100);

  const scoreElement = document.getElementById("total-score");
  const recommendationElement = document.getElementById(
    "priority-recommendation"
  );
  const explanationElement = document.getElementById(
    "recommendation-explanation"
  );

  if (scoreElement) {
    scoreElement.textContent = score;
  }

  let recommendation = "DEPRIORITISE";
  let explanation =
    "The option currently demonstrates limited strategic value or feasibility.";

  if (score >= 85) {
    recommendation = "SCALE";
    explanation =
      "Strong strategic value, feasibility and financing potential support responsible expansion.";
  } else if (score >= 70) {
    recommendation = "STRENGTHEN";
    explanation =
      "The intervention shows strong value, but institutional strengthening is required before expansion.";
  } else if (score >= 60) {
    recommendation = "INTEGRATE";
    explanation =
      "The intervention may be strongest when integrated into existing PRCS platforms and systems.";
  } else if (score >= 50) {
    recommendation = "PARTNER";
    explanation =
      "The intervention has value but may require government, Movement or external partnerships.";
  } else if (score >= 40) {
    recommendation = "REDESIGN";
    explanation =
      "The intervention remains relevant but its delivery model may require redesign.";
  } else if (score >= 30) {
    recommendation = "PILOT";
    explanation =
      "Additional evidence and controlled testing are recommended before wider implementation.";
  }

  if (recommendationElement) {
    recommendationElement.textContent = recommendation;
  }

  if (explanationElement) {
    explanationElement.textContent = explanation;
  }
}

criteria.forEach((criterion) => {
  const slider = document.getElementById(criterion);

  if (slider) {
    slider.addEventListener("input", calculateScore);
  }
});


const chartCanvas = document.getElementById("alignment-chart");

if (chartCanvas && typeof Chart !== "undefined") {
  alignmentChart = new Chart(chartCanvas, {
    type: "radar",

    data: {
      labels: [
        "Strategy",
        "Structure",
        "Systems",
        "Shared Values",
        "Style",
        "Staff",
        "Skills"
      ],

      datasets: [
        {
          label: "Illustrative current position",
          data: [2.8, 2.6, 2.4, 4.0, 3.1, 2.8, 3.0],
          borderColor: "rgba(15, 139, 141, 1)",
          backgroundColor: "rgba(15, 139, 141, 0.18)",
          borderWidth: 2
        },
        {
          label: "Illustrative desired 2030 position",
          data: [4.6, 4.2, 4.5, 4.7, 4.3, 4.2, 4.6],
          borderColor: "rgba(111, 90, 167, 1)",
          backgroundColor: "rgba(111, 90, 167, 0.10)",
          borderWidth: 2
        }
      ]
    },

    options: {
      responsive: true,

      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

calculateScore();

console.log("PRCS Strategy Intelligence Lab loaded successfully");
/* ---------------------------------------------------------
  /* =========================================================
   INTERACTIVE PAKISTAN MAP WITH SWITCHABLE LAYERS
   ========================================================= */

const mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {

  const pakistanMap = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([30.3753, 69.3451], 5);


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap contributors"
    }
  ).addTo(pakistanMap);


  /*
    All values below are illustrative scores from 1 to 5.

    1 = Low
    2 = Moderate
    3 = Elevated
    4 = High
    5 = Very High
  */

  const provinceData = [
    {
      name: "Punjab",
      coordinates: [31.1704, 72.7097],

      scores: {
        combined: 3.8,
        health: 4.0,
        wash: 3.0,
        climate: 4.0,
        displacement: 2.0,
        reach: 4.5
      },

      readiness: "Established",

      description:
        "High population concentration, major health-service platforms and significant flood, heat and urban vulnerability.",

      direction:
        "Strengthen integrated urban and rural health services, heat preparedness and branch-led emergency response."
    },

    {
      name: "Sindh",
      coordinates: [25.8943, 68.5247],

      scores: {
        combined: 4.9,
        health: 5.0,
        wash: 5.0,
        climate: 5.0,
        displacement: 4.0,
        reach: 3.5
      },

      readiness: "Developing",

      description:
        "Severe flood, heat, water-security, nutrition and urban informal-settlement risks require integrated action.",

      direction:
        "Prioritise climate-resilient Health and WASH services, emergency readiness and underserved population coverage."
    },

    {
      name: "Khyber Pakhtunkhwa",
      coordinates: [34.9526, 72.3311],

      scores: {
        combined: 4.3,
        health: 4.0,
        wash: 4.0,
        climate: 4.0,
        displacement: 5.0,
        reach: 4.0
      },

      readiness: "Established",

      description:
        "Mountain, displacement, cross-border, disaster and hard-to-reach service-delivery risks shape strategic needs.",

      direction:
        "Strengthen mobile outreach, epidemic preparedness, branch readiness and services for displaced and remote communities."
    },

    {
      name: "Balochistan",
      coordinates: [28.4907, 65.0958],

      scores: {
        combined: 5.0,
        health: 5.0,
        wash: 5.0,
        climate: 5.0,
        displacement: 4.0,
        reach: 2.0
      },

      readiness: "Foundational",

      description:
        "Large distances, drought, water scarcity, limited service coverage and weak humanitarian access increase vulnerability.",

      direction:
        "Invest in branch capacity, mobile service delivery, water security and strategic partnerships for remote areas."
    },

    {
      name: "Gilgit-Baltistan",
      coordinates: [35.8026, 74.9832],

      scores: {
        combined: 3.7,
        health: 2.5,
        wash: 2.5,
        climate: 5.0,
        displacement: 2.0,
        reach: 2.5
      },

      readiness: "Developing",

      description:
        "Glacial lake outburst floods, landslides, isolation and limited emergency access are major strategic concerns.",

      direction:
        "Strengthen anticipatory action, mountain emergency preparedness and climate-resilient branch systems."
    },

    {
      name: "Azad Jammu and Kashmir",
      coordinates: [33.9259, 73.7810],

      scores: {
        combined: 3.4,
        health: 2.5,
        wash: 2.5,
        climate: 4.0,
        displacement: 2.5,
        reach: 3.0
      },

      readiness: "Developing",

      description:
        "Mountain hazards, access limitations and dispersed communities require strong local preparedness and outreach.",

      direction:
        "Strengthen community preparedness, emergency health response and branch-level logistics."
    },

    {
      name: "Islamabad Capital Territory",
      coordinates: [33.6844, 73.0479],

      scores: {
        combined: 2.2,
        health: 2.0,
        wash: 2.0,
        climate: 2.0,
        displacement: 2.0,
        reach: 5.0
      },

      readiness: "Advanced",

      description:
        "National coordination, governance and institutional systems provide opportunities for leadership and technical support.",

      direction:
        "Position NHQ as the national coordination, standards, learning, financing and technical-assistance hub."
    }
  ];


  const layerNames = {
    combined: "Combined Priority",
    health: "Health Vulnerability",
    wash: "WASH Vulnerability",
    climate: "Climate Exposure",
    displacement: "Displacement Pressure",
    reach: "PRCS Reach"
  };


  let selectedLayer = "combined";
  let selectedProvince = null;

  const provinceMarkers = [];


  function scoreToLabel(score) {
    if (score >= 4.5) {
      return "Very High";
    }

    if (score >= 3.5) {
      return "High";
    }

    if (score >= 2.5) {
      return "Moderate";
    }

    if (score >= 1.5) {
      return "Low";
    }

    return "Very Low";
  }


  /*
    Vulnerability layers:
    High scores appear red.

    PRCS Reach:
    High scores appear green because stronger reach
    represents greater existing operational presence.
  */

  function getLayerColour(score, layer) {

    if (layer === "reach") {
      if (score >= 4.5) {
        return "#16784a";
      }

      if (score >= 3.5) {
        return "#2f9b67";
      }

      if (score >= 2.5) {
        return "#d4a72c";
      }

      if (score >= 1.5) {
        return "#d97706";
      }

      return "#b5202e";
    }


    if (score >= 4.5) {
      return "#b5202e";
    }

    if (score >= 3.5) {
      return "#d95f30";
    }

    if (score >= 2.5) {
      return "#d4a72c";
    }

    if (score >= 1.5) {
      return "#4fa5a7";
    }

    return "#2f855a";
  }


  function getMarkerRadius(score) {
    return 9 + score * 2.3;
  }


  function updateProvincePanel(province) {

    const name =
      document.getElementById("area-name");

    const description =
      document.getElementById("area-description");

    const health =
      document.getElementById("health-score");

    const wash =
      document.getElementById("wash-score");

    const climate =
      document.getElementById("climate-score");

    const readiness =
      document.getElementById("readiness-score");

    const direction =
      document.getElementById("strategic-direction");


    if (name) {
      name.textContent = province.name;
    }

    if (description) {
      description.textContent =
        `${layerNames[selectedLayer]}: ${
          scoreToLabel(
            province.scores[selectedLayer]
          )
        }. ${province.description}`;
    }

    if (health) {
      health.textContent =
        scoreToLabel(province.scores.health);
    }

    if (wash) {
      wash.textContent =
        scoreToLabel(province.scores.wash);
    }

    if (climate) {
      climate.textContent =
        scoreToLabel(province.scores.climate);
    }

    if (readiness) {
      readiness.textContent =
        province.readiness;
    }

    if (direction) {
      direction.textContent =
        province.direction;
    }
  }


  function updateMapLayer(layer) {

    selectedLayer = layer;

    provinceMarkers.forEach((item) => {

      const score =
        item.province.scores[layer];

      item.marker.setStyle({
        radius: getMarkerRadius(score),
        fillColor: getLayerColour(score, layer),
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
      });

      item.marker.unbindTooltip();

      item.marker.bindTooltip(
        `
          <strong>${item.province.name}</strong><br>
          ${layerNames[layer]}:
          ${scoreToLabel(score)}
        `,
        {
          direction: "top",
          sticky: true
        }
      );
    });


    if (selectedProvince) {
      updateProvincePanel(selectedProvince);
    } else {
      updateNationalOverview(layer);
    }
  }


  function updateNationalOverview(layer) {

    const name =
      document.getElementById("area-name");

    const description =
      document.getElementById("area-description");

    const direction =
      document.getElementById("strategic-direction");


    if (name) {
      name.textContent =
        `Pakistan — ${layerNames[layer]}`;
    }


    const overviewDescriptions = {
      combined:
        "Combined priority brings together illustrative health, WASH, climate, displacement and operational-reach considerations.",

      health:
        "This layer illustrates how health burden, service access and population vulnerability could inform geographic targeting.",

      wash:
        "This layer illustrates potential water, sanitation, hygiene and environmental-health vulnerability.",

      climate:
        "This layer illustrates exposure to floods, drought, heatwaves, GLOFs, water scarcity and other climate-related hazards.",

      displacement:
        "This layer illustrates indicative pressure associated with displacement, migration, cross-border movement and mobile populations.",

      reach:
        "This layer illustrates existing PRCS branch presence, volunteer networks and potential operational reach."
    };


    if (description) {
      description.textContent =
        overviewDescriptions[layer];
    }


    if (direction) {
      direction.textContent =
        layer === "reach"
          ? "Use existing PRCS presence to identify where services may be strengthened, extended or supported through partnerships."
          : "Use this evidence layer alongside branch capacity, partner presence and affordability before making investment decisions.";
    }
  }


  provinceData.forEach((province) => {

    const initialScore =
      province.scores.combined;

    const marker = L.circleMarker(
      province.coordinates,
      {
        radius: getMarkerRadius(initialScore),
        fillColor:
          getLayerColour(
            initialScore,
            "combined"
          ),
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
      }
    ).addTo(pakistanMap);


    marker.bindTooltip(
      `
        <strong>${province.name}</strong><br>
        Combined Priority:
        ${scoreToLabel(initialScore)}
      `,
      {
        direction: "top",
        sticky: true
      }
    );


    marker.on("click", () => {

      selectedProvince = province;

      updateProvincePanel(province);

      pakistanMap.flyTo(
        province.coordinates,
        6,
        {
          duration: 0.8
        }
      );
    });


    provinceMarkers.push({
      province: province,
      marker: marker
    });
  });


  const layerButtons =
    document.querySelectorAll(".layer-button");


  layerButtons.forEach((button) => {

    button.addEventListener("click", () => {

      layerButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selected =
        button.dataset.layer;

      updateMapLayer(selected);
    });
  });


  const resetControl =
    L.control({
      position: "topright"
    });


  resetControl.onAdd = function () {

    const button =
      L.DomUtil.create(
        "button",
        "map-reset-button"
      );

    button.type = "button";
    button.innerHTML = "Reset view";

    L.DomEvent.disableClickPropagation(button);


    L.DomEvent.on(
      button,
      "click",
      () => {

        selectedProvince = null;

        pakistanMap.flyTo(
          [30.3753, 69.3451],
          5,
          {
            duration: 0.8
          }
        );

        updateNationalOverview(
          selectedLayer
        );
      }
    );

    return button;
  };


  resetControl.addTo(pakistanMap);


  updateNationalOverview("combined");


  setTimeout(() => {
    pakistanMap.invalidateSize();
  }, 300);
}
/* =========================================================
   FULLY INTERACTIVE 7S ORGANISATIONAL DIAGNOSTIC
   ========================================================= */


/* Information for each organisational element */

const sevenSData = {
  Strategy: {
    type: "Hard S",
    current: 2.8,
    desired: 4.6,

    description:
      "Examines whether PRCS Health and WASH priorities are clearly defined, institutionally owned, realistically costed and aligned with PRCS Strategy 2030.",

    domains: [
      "Strategy and Leadership",
      "Programme and Service Delivery",
      "Financing and Sustainability"
    ],

    questions: [
      "Are Health and WASH priorities clearly defined and institutionally owned?",
      "Does the strategy identify PRCS comparative advantage?",
      "Are priorities linked to measurable outcomes, costs and financing pathways?",
      "Are national and branch-level responsibilities clearly understood?"
    ]
  },

  Structure: {
    type: "Hard S",
    current: 2.6,
    desired: 4.2,

    description:
      "Examines how responsibilities, reporting lines, decision authority and coordination are distributed across NHQ, provincial branches and district branches.",

    domains: [
      "Strategy and Leadership",
      "People, Volunteers and Branches",
      "Operations and Preparedness"
    ],

    questions: [
      "Are NHQ and branch responsibilities clearly defined?",
      "Are reporting and escalation arrangements understood?",
      "Can branches make timely operational decisions?",
      "Does the structure support integrated Health and WASH delivery?"
    ]
  },

  Systems: {
    type: "Hard S",
    current: 2.4,
    desired: 4.5,

    description:
      "Examines the processes that support planning, emergency activation, finance, procurement, logistics, data, reporting, referrals and quality assurance.",

    domains: [
      "Programme and Service Delivery",
      "Operations, Preparedness and Data Systems",
      "Financing and Sustainability"
    ],

    questions: [
      "Are planning and reporting systems integrated across programmes?",
      "Are emergency activation and escalation procedures functional?",
      "Do procurement, logistics and stock systems support timely delivery?",
      "Is institutional evidence routinely used for management decisions?"
    ]
  },

  "Shared Values": {
    type: "Core S",
    current: 4.0,
    desired: 4.7,

    description:
      "Examines whether humanitarian principles, service, trust, volunteerism, accountability, inclusion and community ownership are consistently reflected in institutional behaviour.",

    domains: [
      "Strategy and Leadership",
      "People, Volunteers and Branches",
      "Programme and Service Delivery"
    ],

    questions: [
      "Are humanitarian principles reflected in operational decisions?",
      "Do staff and volunteers share a common understanding of PRCS priorities?",
      "Are accountability, inclusion and community participation embedded in delivery?",
      "Do institutional incentives reinforce the values PRCS promotes?"
    ]
  },

  Style: {
    type: "Soft S",
    current: 3.1,
    desired: 4.3,

    description:
      "Examines leadership behaviour, consultation practices, decision-making, collaboration and the way institutional change is managed.",

    domains: [
      "Strategy and Leadership",
      "People, Volunteers and Branches",
      "Institutional Sustainability"
    ],

    questions: [
      "Is leadership consultative while still enabling timely decisions?",
      "Are branches meaningfully involved in planning and review?",
      "Do managers encourage collaboration across departments?",
      "Are performance problems addressed through learning and accountability?"
    ]
  },

  Staff: {
    type: "Soft S",
    current: 2.8,
    desired: 4.2,

    description:
      "Examines workforce numbers, role clarity, deployment, recruitment, retention, professional development and the contribution of volunteers.",

    domains: [
      "People, Volunteers and Branches",
      "Programme and Service Delivery",
      "Operations and Preparedness"
    ],

    questions: [
      "Does PRCS have sufficient staff and volunteers for its strategic priorities?",
      "Are roles, workloads and deployment arrangements realistic?",
      "Are recruitment and retention systems responsive to technical needs?",
      "Are staff and volunteers supported through structured development pathways?"
    ]
  },

  Skills: {
    type: "Soft S",
    current: 3.0,
    desired: 4.6,

    description:
      "Examines the technical, managerial, emergency-response, financing, partnership, digital-data and MEAL competencies required to deliver the strategy.",

    domains: [
      "Programme and Service Delivery",
      "People, Volunteers and Branches",
      "Operations, Preparedness and Data Systems"
    ],

    questions: [
      "Which technical competencies are currently strongest?",
      "Where are the most important institutional skill gaps?",
      "Can PRCS branches independently plan, deliver and monitor priority services?",
      "Are financing, partnership and evidence-use capabilities sufficiently developed?"
    ]
  }
};


/* Find the 7S cards */

const interactiveSevenSCards =
  document.querySelectorAll(".s-card");


/* Create the changing details panel if it does not already exist */

const alignmentSidePanel =
  document.querySelector(".alignment-side-panel");

let diagnosticDetailCard =
  document.querySelector(".diagnostic-detail-card");

if (!diagnosticDetailCard && alignmentSidePanel) {
  diagnosticDetailCard =
    document.createElement("div");

  diagnosticDetailCard.className =
    "diagnostic-detail-card";

  diagnosticDetailCard.innerHTML = `
    <span
      id="selected-element-type"
      class="selected-element-badge"
    >
      Hard S
    </span>

    <h3 id="selected-element-name">
      Strategy
    </h3>

    <p id="selected-element-description">
      Select one of the seven organisational elements
      to explore its relevance to PRCS.
    </p>

    <div class="alignment-score-grid">

      <div class="alignment-score-card">
        <span>Illustrative current position</span>
        <strong id="selected-current-score">
          2.8 / 5
        </strong>
      </div>

      <div class="alignment-score-card">
        <span>Illustrative desired position</span>
        <strong id="selected-desired-score">
          4.6 / 5
        </strong>
      </div>

    </div>

    <div class="detail-section">
      <h4>Affected PRCS diagnostic domains</h4>

      <div
        id="selected-domain-chips"
        class="domain-chip-container"
      ></div>
    </div>

    <div class="detail-section">
      <h4>Illustrative diagnostic questions</h4>

      <ul
        id="selected-question-list"
        class="diagnostic-question-list"
      ></ul>
    </div>
  `;

  alignmentSidePanel.appendChild(
    diagnosticDetailCard
  );
}


/* Update the visible information */

function updateSevenSDetails(elementName) {
  const information =
    sevenSData[elementName];

  if (!information) {
    return;
  }

  const typeElement =
    document.getElementById(
      "selected-element-type"
    );

  const nameElement =
    document.getElementById(
      "selected-element-name"
    );

  const descriptionElement =
    document.getElementById(
      "selected-element-description"
    );

  const currentScoreElement =
    document.getElementById(
      "selected-current-score"
    );

  const desiredScoreElement =
    document.getElementById(
      "selected-desired-score"
    );

  const domainContainer =
    document.getElementById(
      "selected-domain-chips"
    );

  const questionList =
    document.getElementById(
      "selected-question-list"
    );


  if (typeElement) {
    typeElement.textContent =
      information.type;
  }

  if (nameElement) {
    nameElement.textContent =
      elementName;
  }

  if (descriptionElement) {
    descriptionElement.textContent =
      information.description;
  }

  if (currentScoreElement) {
    currentScoreElement.textContent =
      `${information.current} / 5`;
  }

  if (desiredScoreElement) {
    desiredScoreElement.textContent =
      `${information.desired} / 5`;
  }


  /* Add affected-domain chips */

  if (domainContainer) {
    domainContainer.innerHTML = "";

    information.domains.forEach(
      (domain) => {
        const chip =
          document.createElement("span");

        chip.className = "domain-chip";
        chip.textContent = domain;

        domainContainer.appendChild(chip);
      }
    );
  }


  /* Add diagnostic questions */

  if (questionList) {
    questionList.innerHTML = "";

    information.questions.forEach(
      (question) => {
        const listItem =
          document.createElement("li");

        listItem.textContent = question;

        questionList.appendChild(
          listItem
        );
      }
    );
  }


  /* Highlight the selected point on the radar chart */

  const chartLabels = [
    "Strategy",
    "Structure",
    "Systems",
    "Shared Values",
    "Style",
    "Staff",
    "Skills"
  ];

  const selectedIndex =
    chartLabels.indexOf(elementName);

  if (
    alignmentChart &&
    selectedIndex !== -1
  ) {
    alignmentChart.data.datasets.forEach(
      (dataset, datasetIndex) => {
        dataset.pointRadius =
          chartLabels.map(
            (_, index) =>
              index === selectedIndex ? 8 : 4
          );

        dataset.pointHoverRadius =
          chartLabels.map(
            (_, index) =>
              index === selectedIndex ? 10 : 6
          );

        dataset.pointBorderWidth =
          chartLabels.map(
            (_, index) =>
              index === selectedIndex ? 3 : 1
          );

        dataset.pointBackgroundColor =
          chartLabels.map(
            (_, index) => {
              if (index === selectedIndex) {
                return "#d4a72c";
              }

              return datasetIndex === 0
                ? "#0f8b8d"
                : "#6f5aa7";
            }
          );
      }
    );

    alignmentChart.update();
  }
}


/* Make every card clickable */

interactiveSevenSCards.forEach(
  (card) => {
    card.addEventListener(
      "click",
      () => {
        interactiveSevenSCards.forEach(
          (item) => {
            item.classList.remove(
              "active-s-card"
            );
          }
        );

        card.classList.add(
          "active-s-card"
        );

        const titleElement =
          card.querySelector("strong");

        if (!titleElement) {
          return;
        }

        const selectedElement =
          titleElement.textContent.trim();

        updateSevenSDetails(
          selectedElement
        );
      }
    );
  }
);


/* Load Strategy as the default selection */

if (interactiveSevenSCards.length > 0) {
  const firstCard =
    Array.from(
      interactiveSevenSCards
    ).find((card) => {
      const title =
        card.querySelector("strong");

      return (
        title &&
        title.textContent.trim() ===
          "Strategy"
      );
    });

  if (firstCard) {
    firstCard.classList.add(
      "active-s-card"
    );
  }

  updateSevenSDetails("Strategy");
}
