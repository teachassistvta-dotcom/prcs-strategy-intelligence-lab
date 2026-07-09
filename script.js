/* =========================================================
   PRCS STRATEGY INTELLIGENCE LAB
   INTERACTIVE FUNCTIONS
   ========================================================= */


/* ---------------------------------------------------------
   1. MAIN TAB NAVIGATION
   --------------------------------------------------------- */

const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    // Remove active state from every tab button
    tabButtons.forEach((item) => {
      item.classList.remove("active");
    });

    // Hide every tab panel
    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    // Activate the selected button and panel
    button.classList.add("active");

    const selectedPanel = document.getElementById(selectedTab);

    if (selectedPanel) {
      selectedPanel.classList.add("active");
    }

    // Resize the radar chart when its tab becomes visible
    if (
      selectedTab === "alignment-module" &&
      alignmentChart
    ) {
      setTimeout(() => {
        alignmentChart.resize();
      }, 100);
    }
  });
});


/* ---------------------------------------------------------
   2. GEOGRAPHIC LAYER BUTTONS
   --------------------------------------------------------- */

const layerButtons = document.querySelectorAll(".layer-button");

layerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    layerButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });
});


/* ---------------------------------------------------------
   3. STRATEGIC PRIORITY SIMULATOR
   --------------------------------------------------------- */

const simulatorCriteria = [
  "impact",
  "equity",
  "feasibility",
  "affordability",
  "financing",
  "scalability",
  "partnership",
  "measurability"
];

const totalScoreElement =
  document.getElementById("total-score");

const recommendationElement =
  document.getElementById(
    "priority-recommendation"
  );

const explanationElement =
  document.getElementById(
    "recommendation-explanation"
  );

const interventionSelect =
  document.getElementById("intervention");


/* Recommendation descriptions */

const recommendationDescriptions = {
  SCALE:
    "Strong strategic value, institutional feasibility and financing potential support responsible expansion.",

  STRENGTHEN:
    "The intervention shows strong value, but targeted institutional strengthening is required before further expansion.",

  INTEGRATE:
    "The intervention is most effective when embedded within existing PRCS platforms, systems and branch delivery mechanisms.",

  PARTNER:
    "The intervention has strategic value, but delivery may be strongest through government, Movement or external partnerships.",

  REDESIGN:
    "The intervention remains relevant, but its current delivery model may require redesign to improve feasibility, affordability or results.",

  PILOT:
    "The intervention shows potential, but additional evidence and controlled testing are recommended before wider implementation.",

  DEPRIORITISE:
    "The intervention currently demonstrates limited strategic value or feasibility compared with competing institutional priorities."
};


/* Calculate the score */

function calculatePriorityScore() {
  let total = 0;

  simulatorCriteria.forEach((criterion) => {
    const slider =
      document.getElementById(criterion);

    const valueLabel =
      document.getElementById(
        `${criterion}-value`
      );

    if (!slider || !valueLabel) {
      return;
    }

    const value = Number(slider.value);

    total += value;

    valueLabel.textContent = value;
  });

  /*
    There are 8 criteria.
    Each has a maximum value of 10.
    Maximum raw score = 80.

    We convert the result into a score out of 100.
  */

  const score = Math.round((total / 80) * 100);

  totalScoreElement.textContent = score;

  updateRecommendation(score);
}


/* Select a recommendation */

function updateRecommendation(score) {
  let recommendation = "";

  if (score >= 85) {
    recommendation = "SCALE";
  } else if (score >= 70) {
    recommendation = "STRENGTHEN";
  } else if (score >= 60) {
    recommendation = "INTEGRATE";
  } else if (score >= 50) {
    recommendation = "PARTNER";
  } else if (score >= 40) {
    recommendation = "REDESIGN";
  } else if (score >= 30) {
    recommendation = "PILOT";
  } else {
    recommendation = "DEPRIORITISE";
  }

  recommendationElement.textContent =
    recommendation;

  explanationElement.textContent =
    recommendationDescriptions[
      recommendation
    ];

  updateRecommendationStyle(recommendation);
}


/* Change the recommendation colour */

function updateRecommendationStyle(
  recommendation
) {
  const recommendationColours = {
    SCALE: "#2f855a",
    STRENGTHEN: "#d4a72c",
    INTEGRATE: "#0f8b8d",
    PARTNER: "#6f5aa7",
    REDESIGN: "#d97706",
    PILOT: "#4a6fa5",
    DEPRIORITISE: "#b5202e"
  };

  recommendationElement.style.background =
    recommendationColours[
      recommendation
    ];

  recommendationElement.style.color =
    "#ffffff";
}


/* Listen for slider movement */

simulatorCriteria.forEach((criterion) => {
  const slider =
    document.getElementById(criterion);

  if (slider) {
    slider.addEventListener(
      "input",
      calculatePriorityScore
    );
  }
});


/* ---------------------------------------------------------
   4. PRESET VALUES FOR EACH INTERVENTION
   --------------------------------------------------------- */

const interventionProfiles = {
  "Community Health": {
    impact: 9,
    equity: 9,
    feasibility: 8,
    affordability: 7,
    financing: 8,
    scalability: 9,
    partnership: 8,
    measurability: 8
  },

  "Emergency WASH": {
    impact: 9,
    equity: 9,
    feasibility: 7,
    affordability: 6,
    financing: 8,
    scalability: 8,
    partnership: 9,
    measurability: 8
  },

  Nutrition: {
    impact: 9,
    equity: 9,
    feasibility: 7,
    affordability: 7,
    financing: 8,
    scalability: 8,
    partnership: 9,
    measurability: 8
  },

  "First Aid": {
    impact: 8,
    equity: 8,
    feasibility: 9,
    affordability: 8,
    financing: 7,
    scalability: 9,
    partnership: 8,
    measurability: 8
  },

  "Ambulance Services": {
    impact: 8,
    equity: 7,
    feasibility: 6,
    affordability: 4,
    financing: 6,
    scalability: 5,
    partnership: 7,
    measurability: 8
  },

  "Blood Services": {
    impact: 9,
    equity: 8,
    feasibility: 6,
    affordability: 5,
    financing: 6,
    scalability: 6,
    partnership: 8,
    measurability: 9
  },

  MHPSS: {
    impact: 8,
    equity: 8,
    feasibility: 6,
    affordability: 7,
    financing: 7,
    scalability: 7,
    partnership: 8,
    measurability: 6
  },

  "Epidemic Preparedness": {
    impact: 10,
    equity: 8,
    feasibility: 7,
    affordability: 6,
    financing: 9,
    scalability: 8,
    partnership: 9,
    measurability: 8
  },

  "Cash for Health": {
    impact: 8,
    equity: 9,
    feasibility: 6,
    affordability: 6,
    financing: 8,
    scalability: 7,
    partnership: 9,
    measurability: 8
  }
};


/* Apply selected intervention values */

function loadInterventionProfile() {
  const selectedIntervention =
    interventionSelect.value;

  const profile =
    interventionProfiles[
      selectedIntervention
    ];

  if (!profile) {
    return;
  }

  simulatorCriteria.forEach(
    (criterion) => {
      const slider =
        document.getElementById(
          criterion
        );

      if (slider) {
        slider.value =
          profile[criterion];
      }
    }
  );

  calculatePriorityScore();
}


if (interventionSelect) {
  interventionSelect.addEventListener(
    "change",
    loadInterventionProfile
  );
}


/* ---------------------------------------------------------
   5. MCKINSEY 7S RADAR CHART
   --------------------------------------------------------- */

const chartCanvas =
  document.getElementById(
    "alignment-chart"
  );

let alignmentChart = null;

if (chartCanvas) {
  alignmentChart = new Chart(
    chartCanvas,
    {
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
            label:
              "Illustrative current position",

            data: [
              2.8,
              2.6,
              2.4,
              4.0,
              3.1,
              2.8,
              3.0
            ],

            borderWidth: 2,

            borderColor:
              "rgba(15, 139, 141, 1)",

            backgroundColor:
              "rgba(15, 139, 141, 0.18)",

            pointBackgroundColor:
              "rgba(15, 139, 141, 1)",

            pointBorderColor:
              "#ffffff",

            pointRadius: 4,

            pointHoverRadius: 6
          },

          {
            label:
              "Illustrative desired 2030 position",

            data: [
              4.6,
              4.2,
              4.5,
              4.7,
              4.3,
              4.2,
              4.6
            ],

            borderWidth: 2,

            borderColor:
              "rgba(111, 90, 167, 1)",

            backgroundColor:
              "rgba(111, 90, 167, 0.10)",

            pointBackgroundColor:
              "rgba(111, 90, 167, 1)",

            pointBorderColor:
              "#ffffff",

            pointRadius: 4,

            pointHoverRadius: 6
          }
        ]
      },

      options: {
        responsive: true,

        maintainAspectRatio: true,

        animation: {
          duration: 900,
          easing: "easeOutQuart"
        },

        plugins: {
          legend: {
            position: "bottom",

            labels: {
              usePointStyle: true,
              padding: 18,
              font: {
                size: 11
              }
            }
          },

          tooltip: {
            callbacks: {
              label: function (
                context
              ) {
                return (
                  context.dataset.label +
                  ": " +
                  context.raw +
                  " / 5"
                );
              }
            }
          }
        },

        scales: {
          r: {
            min: 0,
            max: 5,

            beginAtZero: true,

            ticks: {
              stepSize: 1,
              display: false
            },

            grid: {
              color:
                "rgba(11, 31, 51, 0.10)"
            },

            angleLines: {
              color:
                "rgba(11, 31, 51, 0.10)"
            },

            pointLabels: {
              color: "#0b1f33",

              font: {
                size: 11,
                weight: "600"
              }
            }
          }
        }
      }
    }
  );
}


/* ---------------------------------------------------------
   6. INTERACTIVE 7S CARDS
   --------------------------------------------------------- */

const sevenSCards =
  document.querySelectorAll(".s-card");

sevenSCards.forEach((card) => {
  card.addEventListener(
    "click",
    () => {
      sevenSCards.forEach(
        (item) => {
          item.style.outline = "none";
        }
      );

      card.style.outline =
        "3px solid rgba(15, 139, 141, 0.30)";

      card.style.outlineOffset =
        "3px";
    }
  );
});


/* ---------------------------------------------------------
   7. INITIAL PAGE SETUP
   --------------------------------------------------------- */

calculatePriorityScore();
