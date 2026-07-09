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
