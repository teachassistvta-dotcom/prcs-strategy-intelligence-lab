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


const layerButtons = document.querySelectorAll(".layer-button");

layerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    layerButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
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
   8. INTERACTIVE PAKISTAN MAP
   --------------------------------------------------------- */

const mapElement = document.getElementById("map");

if (
  mapElement &&
  typeof L !== "undefined"
) {
  const pakistanMap = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([30.3753, 69.3451], 5);

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(pakistanMap);


  /* Illustrative provincial data */

  const provinceData = [
    {
      name: "Punjab",
      coordinates: [31.1704, 72.7097],
      health: "High",
      wash: "Moderate",
      climate: "High",
      readiness: "Established",
      description:
        "High population concentration, major health-service platforms and significant flood, heat and urban vulnerability.",
      direction:
        "Strengthen integrated urban and rural health services, heat preparedness and branch-led emergency response."
    },

    {
      name: "Sindh",
      coordinates: [25.8943, 68.5247],
      health: "Very High",
      wash: "Very High",
      climate: "Very High",
      readiness: "Developing",
      description:
        "Severe flood, heat, water-security, nutrition and urban-informal-settlement risks require integrated action.",
      direction:
        "Prioritise climate-resilient Health and WASH services, emergency readiness and underserved population coverage."
    },

    {
      name: "Khyber Pakhtunkhwa",
      coordinates: [34.9526, 72.3311],
      health: "High",
      wash: "High",
      climate: "High",
      readiness: "Established",
      description:
        "Mountain, displacement, cross-border, disaster and hard-to-reach service-delivery risks shape strategic needs.",
      direction:
        "Strengthen mobile outreach, epidemic preparedness, branch readiness and services for displaced and remote communities."
    },

    {
      name: "Balochistan",
      coordinates: [28.4907, 65.0958],
      health: "Very High",
      wash: "Very High",
      climate: "Very High",
      readiness: "Foundational",
      description:
        "Large distances, drought, water scarcity, limited service coverage and weak humanitarian access increase vulnerability.",
      direction:
        "Invest in branch capacity, mobile service delivery, water security and strategic partnerships for remote areas."
    },

    {
      name: "Gilgit-Baltistan",
      coordinates: [35.8026, 74.9832],
      health: "Moderate",
      wash: "Moderate",
      climate: "Very High",
      readiness: "Developing",
      description:
        "Glacial lake outburst floods, landslides, isolation and limited emergency access are major strategic concerns.",
      direction:
        "Strengthen anticipatory action, mountain emergency preparedness and climate-resilient branch systems."
    },

    {
      name: "Azad Jammu and Kashmir",
      coordinates: [33.9259, 73.7810],
      health: "Moderate",
      wash: "Moderate",
      climate: "High",
      readiness: "Developing",
      description:
        "Mountain hazards, access limitations and dispersed communities require strong local preparedness and outreach.",
      direction:
        "Strengthen community preparedness, emergency health response and branch-level logistics."
    },

    {
      name: "Islamabad Capital Territory",
      coordinates: [33.6844, 73.0479],
      health: "Moderate",
      wash: "Moderate",
      climate: "Moderate",
      readiness: "Advanced",
      description:
        "National coordination, governance and institutional systems provide opportunities for leadership and technical support.",
      direction:
        "Position NHQ as the national coordination, standards, learning, financing and technical-assistance hub."
    }
  ];


  /* Colours based on vulnerability */

  function getMarkerColour(level) {
    if (level === "Very High") {
      return "#b5202e";
    }

    if (level === "High") {
      return "#d97706";
    }

    if (level === "Moderate") {
      return "#d4a72c";
    }

    return "#0f8b8d";
  }


  /* Update the side panel */

  function updateProvincePanel(province) {
    const name =
      document.getElementById("area-name");

    const description =
      document.getElementById(
        "area-description"
      );

    const health =
      document.getElementById(
        "health-score"
      );

    const wash =
      document.getElementById(
        "wash-score"
      );

    const climate =
      document.getElementById(
        "climate-score"
      );

    const readiness =
      document.getElementById(
        "readiness-score"
      );

    const direction =
      document.getElementById(
        "strategic-direction"
      );

    if (name) {
      name.textContent = province.name;
    }

    if (description) {
      description.textContent =
        province.description;
    }

    if (health) {
      health.textContent =
        province.health;
    }

    if (wash) {
      wash.textContent =
        province.wash;
    }

    if (climate) {
      climate.textContent =
        province.climate;
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


  /* Add clickable province circles */

  provinceData.forEach((province) => {
    const marker = L.circleMarker(
      province.coordinates,
      {
        radius: 14,
        fillColor:
          getMarkerColour(
            province.climate
          ),
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.88
      }
    ).addTo(pakistanMap);

    marker.bindTooltip(
      province.name,
      {
        permanent: false,
        direction: "top"
      }
    );

    marker.bindPopup(
      `
        <div class="map-popup">
          <strong>${province.name}</strong>
          <p>${province.direction}</p>
        </div>
      `
    );

    marker.on("click", () => {
      updateProvincePanel(province);

      pakistanMap.flyTo(
        province.coordinates,
        6,
        {
          duration: 0.8
        }
      );
    });
  });


  /* Reset button */

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
    button.innerHTML =
      "Reset view";

    button.title =
      "Return to Pakistan overview";

    L.DomEvent.disableClickPropagation(
      button
    );

    L.DomEvent.on(
      button,
      "click",
      () => {
        pakistanMap.flyTo(
          [30.3753, 69.3451],
          5,
          {
            duration: 0.8
          }
        );
      }
    );

    return button;
  };

  resetControl.addTo(pakistanMap);


  /* Ensure map renders correctly */

  setTimeout(() => {
    pakistanMap.invalidateSize();
  }, 300);
}
