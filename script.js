/* =========================================================
   PRCS STRATEGY INTELLIGENCE LAB
   COMPLETE INTERACTIVE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  let alignmentChart = null;


  /* =========================================================
     1. MAIN TAB NAVIGATION
     ========================================================= */

  const tabButtons =
    document.querySelectorAll(".tab-button");

  const tabPanels =
    document.querySelectorAll(".tab-panel");


  tabButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedTab =
        button.dataset.tab;


      tabButtons.forEach((item) => {

        item.classList.remove("active");

      });


      tabPanels.forEach((panel) => {

        panel.classList.remove("active");

      });


      button.classList.add("active");


      const selectedPanel =
        document.getElementById(selectedTab);


      if (selectedPanel) {

        selectedPanel.classList.add("active");

      }


      if (
        selectedTab === "alignment-module" &&
        alignmentChart
      ) {

        setTimeout(() => {

          alignmentChart.resize();

        }, 100);

      }


      if (
        selectedTab === "map-module" &&
        window.prcsPakistanMap
      ) {

        setTimeout(() => {

          window.prcsPakistanMap.invalidateSize();

        }, 100);

      }

    });

  });


  /* =========================================================
     2. STRATEGIC PRIORITY SIMULATOR
     ========================================================= */

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


  const recommendationColours = {

    SCALE: "#2f855a",

    STRENGTHEN: "#d4a72c",

    INTEGRATE: "#0f8b8d",

    PARTNER: "#6f5aa7",

    REDESIGN: "#d97706",

    PILOT: "#4a6fa5",

    DEPRIORITISE: "#b5202e"

  };


  const totalScoreElement =
    document.getElementById(
      "total-score"
    );


  const recommendationElement =
    document.getElementById(
      "priority-recommendation"
    );


  const explanationElement =
    document.getElementById(
      "recommendation-explanation"
    );


  const interventionSelect =
    document.getElementById(
      "intervention"
    );


  function updateRecommendation(score) {

    let recommendation =
      "DEPRIORITISE";


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

    }


    if (recommendationElement) {

      recommendationElement.textContent =
        recommendation;


      recommendationElement.style.background =
        recommendationColours[
          recommendation
        ];


      recommendationElement.style.color =
        "#ffffff";

    }


    if (explanationElement) {

      explanationElement.textContent =
        recommendationDescriptions[
          recommendation
        ];

    }

  }


  function calculatePriorityScore() {

    let total = 0;


    criteria.forEach((criterion) => {

      const slider =
        document.getElementById(
          criterion
        );


      const valueLabel =
        document.getElementById(
          `${criterion}-value`
        );


      if (!slider) {

        return;

      }


      const value =
        Number(slider.value);


      total += value;


      if (valueLabel) {

        valueLabel.textContent =
          value;

      }

    });


    const score =
      Math.round(
        (total / 80) * 100
      );


    if (totalScoreElement) {

      totalScoreElement.textContent =
        score;

    }


    updateRecommendation(score);

  }


  function loadInterventionProfile() {

    if (!interventionSelect) {

      return;

    }


    const selectedIntervention =
      interventionSelect.value;


    const profile =
      interventionProfiles[
        selectedIntervention
      ];


    if (!profile) {

      return;

    }


    criteria.forEach((criterion) => {

      const slider =
        document.getElementById(
          criterion
        );


      if (slider) {

        slider.value =
          profile[criterion];

      }

    });


    calculatePriorityScore();

  }


  criteria.forEach((criterion) => {

    const slider =
      document.getElementById(
        criterion
      );


    if (slider) {

      slider.addEventListener(
        "input",
        calculatePriorityScore
      );

    }

  });


  if (interventionSelect) {

    interventionSelect.addEventListener(
      "change",
      loadInterventionProfile
    );

  }


  calculatePriorityScore();


  /* =========================================================
     3. MCKINSEY 7S RADAR CHART
     ========================================================= */

  const chartCanvas =
    document.getElementById(
      "alignment-chart"
    );


  if (
    chartCanvas &&
    typeof Chart !== "undefined"
  ) {

    alignmentChart =
      new Chart(
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
                  "#0f8b8d",


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
                  "#6f5aa7",


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

                  label(context) {

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

                  color:
                    "#0b1f33",


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


  /* =========================================================
     4. INTERACTIVE 7S DIAGNOSTIC
     ========================================================= */

  const sevenSData = {

    Strategy: {

      type:
        "Hard S",


      current:
        2.8,


      desired:
        4.6,


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

      type:
        "Hard S",


      current:
        2.6,


      desired:
        4.2,


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

      type:
        "Hard S",


      current:
        2.4,


      desired:
        4.5,


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

      type:
        "Core S",


      current:
        4.0,


      desired:
        4.7,


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

      type:
        "Soft S",


      current:
        3.1,


      desired:
        4.3,


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

      type:
        "Soft S",


      current:
        2.8,


      desired:
        4.2,


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

      type:
        "Soft S",


      current:
        3.0,


      desired:
        4.6,


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


  const sevenSCards =
    document.querySelectorAll(
      ".s-card"
    );


  function updateSevenSDetails(
    elementName
  ) {

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
        information.current +
        " / 5";

    }


    if (desiredScoreElement) {

      desiredScoreElement.textContent =
        information.desired +
        " / 5";

    }


    if (domainContainer) {

      domainContainer.innerHTML =
        "";


      information.domains.forEach(
        (domain) => {

          const chip =
            document.createElement(
              "span"
            );


          chip.className =
            "domain-chip";


          chip.textContent =
            domain;


          domainContainer.appendChild(
            chip
          );

        }
      );

    }


    if (questionList) {

      questionList.innerHTML =
        "";


      information.questions.forEach(
        (question) => {

          const item =
            document.createElement(
              "li"
            );


          item.textContent =
            question;


          questionList.appendChild(
            item
          );

        }
      );

    }


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
      chartLabels.indexOf(
        elementName
      );


    if (
      alignmentChart &&
      selectedIndex !== -1
    ) {

      alignmentChart
        .data
        .datasets
        .forEach(
          (
            dataset,
            datasetIndex
          ) => {

            dataset.pointRadius =
              chartLabels.map(
                (_, index) =>
                  index ===
                  selectedIndex
                    ? 8
                    : 4
              );


            dataset.pointHoverRadius =
              chartLabels.map(
                (_, index) =>
                  index ===
                  selectedIndex
                    ? 10
                    : 6
              );


            dataset.pointBorderWidth =
              chartLabels.map(
                (_, index) =>
                  index ===
                  selectedIndex
                    ? 3
                    : 1
              );


            dataset.pointBackgroundColor =
              chartLabels.map(
                (_, index) => {

                  if (
                    index ===
                    selectedIndex
                  ) {

                    return "#d4a72c";

                  }


                  return (
                    datasetIndex === 0
                      ? "#0f8b8d"
                      : "#6f5aa7"
                  );

                }
              );

          }
        );


      alignmentChart.update();

    }

  }


  sevenSCards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        () => {

          sevenSCards.forEach(
            (item) => {

              item.classList.remove(
                "active-s-card"
              );

            }
          );


          card.classList.add(
            "active-s-card"
          );


          const title =
            card.querySelector(
              "strong"
            );


          if (title) {

            updateSevenSDetails(
              title.textContent.trim()
            );

          }

        }
      );

    }
  );


  const strategyCard =
    Array.from(
      sevenSCards
    ).find(
      (card) => {

        const title =
          card.querySelector(
            "strong"
          );


        return (
          title &&
          title.textContent.trim() ===
            "Strategy"
        );

      }
    );


  if (strategyCard) {

    strategyCard.classList.add(
      "active-s-card"
    );

  }


  updateSevenSDetails(
    "Strategy"
  );


  /* =========================================================
     5. INTERACTIVE PAKISTAN MAP
     ========================================================= */

  const mapElement =
    document.getElementById(
      "map"
    );


  if (
    mapElement &&
    typeof L !== "undefined"
  ) {

    const pakistanMap =
      L.map(
        "map",
        {

          zoomControl: true,

          scrollWheelZoom: true

        }
      ).setView(
        [
          30.3753,
          69.3451
        ],
        5
      );


    window.prcsPakistanMap =
      pakistanMap;


    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {

        maxZoom: 18,


        attribution:
          "&copy; OpenStreetMap contributors"

      }
    ).addTo(
      pakistanMap
    );


    const provinceData = [

      {

        name:
          "Punjab",


        coordinates: [
          31.1704,
          72.7097
        ],


        scores: {

          combined:
            3.8,

          health:
            4.0,

          wash:
            3.0,

          climate:
            4.0,

          displacement:
            2.0,

          reach:
            4.5

        },


        readiness:
          "Established",


        description:
          "High population concentration, major health-service platforms and significant flood, heat and urban vulnerability.",


        direction:
          "Strengthen integrated urban and rural health services, heat preparedness and branch-led emergency response."

      },


      {

        name:
          "Sindh",


        coordinates: [
          25.8943,
          68.5247
        ],


        scores: {

          combined:
            4.9,

          health:
            5.0,

          wash:
            5.0,

          climate:
            5.0,

          displacement:
            4.0,

          reach:
            3.5

        },


        readiness:
          "Developing",


        description:
          "Severe flood, heat, water-security, nutrition and urban informal-settlement risks require integrated action.",


        direction:
          "Prioritise climate-resilient Health and WASH services, emergency readiness and underserved population coverage."

      },


      {

        name:
          "Khyber Pakhtunkhwa",


        coordinates: [
          34.9526,
          72.3311
        ],


        scores: {

          combined:
            4.3,

          health:
            4.0,

          wash:
            4.0,

          climate:
            4.0,

          displacement:
            5.0,

          reach:
            4.0

        },


        readiness:
          "Established",


        description:
          "Mountain, displacement, cross-border, disaster and hard-to-reach service-delivery risks shape strategic needs.",


        direction:
          "Strengthen mobile outreach, epidemic preparedness, branch readiness and services for displaced and remote communities."

      },


      {

        name:
          "Balochistan",


        coordinates: [
          28.4907,
          65.0958
        ],


        scores: {

          combined:
            5.0,

          health:
            5.0,

          wash:
            5.0,

          climate:
            5.0,

          displacement:
            4.0,

          reach:
            2.0

        },


        readiness:
          "Foundational",


        description:
          "Large distances, drought, water scarcity, limited service coverage and weak humanitarian access increase vulnerability.",


        direction:
          "Invest in branch capacity, mobile service delivery, water security and strategic partnerships for remote areas."

      },


      {

        name:
          "Gilgit-Baltistan",


        coordinates: [
          35.8026,
          74.9832
        ],


        scores: {

          combined:
            3.7,

          health:
            2.5,

          wash:
            2.5,

          climate:
            5.0,

          displacement:
            2.0,

          reach:
            2.5

        },


        readiness:
          "Developing",


        description:
          "Glacial lake outburst floods, landslides, isolation and limited emergency access are major strategic concerns.",


        direction:
          "Strengthen anticipatory action, mountain emergency preparedness and climate-resilient branch systems."

      },


      {

        name:
          "Azad Jammu and Kashmir",


        coordinates: [
          33.9259,
          73.7810
        ],


        scores: {

          combined:
            3.4,

          health:
            2.5,

          wash:
            2.5,

          climate:
            4.0,

          displacement:
            2.5,

          reach:
            3.0

        },


        readiness:
          "Developing",


        description:
          "Mountain hazards, access limitations and dispersed communities require strong local preparedness and outreach.",


        direction:
          "Strengthen community preparedness, emergency health response and branch-level logistics."

      },


      {

        name:
          "Islamabad Capital Territory",


        coordinates: [
          33.6844,
          73.0479
        ],


        scores: {

          combined:
            2.2,

          health:
            2.0,

          wash:
            2.0,

          climate:
            2.0,

          displacement:
            2.0,

          reach:
            5.0

        },


        readiness:
          "Advanced",


        description:
          "National coordination, governance and institutional systems provide opportunities for leadership and technical support.",


        direction:
          "Position NHQ as the national coordination, standards, learning, financing and technical-assistance hub."

      }

    ];


    const layerNames = {

      combined:
        "Combined Priority",


      health:
        "Health Vulnerability",


      wash:
        "WASH Vulnerability",


      climate:
        "Climate Exposure",


      displacement:
        "Displacement Pressure",


      reach:
        "PRCS Reach"

    };


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


    let selectedLayer =
      "combined";


    let selectedProvince =
      null;


    const provinceMarkers =
      [];


    function scoreToLabel(
      score
    ) {

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


    function getLayerColour(
      score,
      layer
    ) {

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


    function getMarkerRadius(
      score
    ) {

      return (
        9 +
        score * 2.3
      );

    }


    function updateNationalOverview(
      layer
    ) {

      const name =
        document.getElementById(
          "area-name"
        );


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

        name.textContent =
          "Pakistan — " +
          layerNames[layer];

      }


      if (description) {

        description.textContent =
          overviewDescriptions[layer];

      }


      if (health) {

        health.textContent =
          "High";

      }


      if (wash) {

        wash.textContent =
          "High";

      }


      if (climate) {

        climate.textContent =
          "Very High";

      }


      if (readiness) {

        readiness.textContent =
          "Mixed";

      }


      if (direction) {

        direction.textContent =
          layer === "reach"

            ? "Use existing PRCS presence to identify where services may be strengthened, extended or supported through partnerships."

            : "Use this evidence layer alongside branch capacity, partner presence and affordability before making investment decisions.";

      }

    }


    function updateProvincePanel(
      province
    ) {

      const name =
        document.getElementById(
          "area-name"
        );


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

        name.textContent =
          province.name;

      }


      if (description) {

        description.textContent =
          layerNames[selectedLayer] +
          ": " +
          scoreToLabel(
            province.scores[
              selectedLayer
            ]
          ) +
          ". " +
          province.description;

      }


      if (health) {

        health.textContent =
          scoreToLabel(
            province.scores.health
          );

      }


      if (wash) {

        wash.textContent =
          scoreToLabel(
            province.scores.wash
          );

      }


      if (climate) {

        climate.textContent =
          scoreToLabel(
            province.scores.climate
          );

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


    function updateMapLayer(
      layer
    ) {

      selectedLayer =
        layer;


      provinceMarkers.forEach(
        (item) => {

          const score =
            item.province.scores[
              layer
            ];


          item.marker.setRadius(
            getMarkerRadius(score)
          );


          item.marker.setStyle(
            {

              fillColor:
                getLayerColour(
                  score,
                  layer
                ),


              color:
                "#ffffff",


              weight:
                3,


              opacity:
                1,


              fillOpacity:
                0.9

            }
          );


          item.marker.unbindTooltip();


          item.marker.bindTooltip(
            `
              <strong>
                ${item.province.name}
              </strong>
              <br>
              ${layerNames[layer]}:
              ${scoreToLabel(score)}
            `,
            {

              direction:
                "top",


              sticky:
                true

            }
          );

        }
      );


      if (selectedProvince) {

        updateProvincePanel(
          selectedProvince
        );

      } else {

        updateNationalOverview(
          layer
        );

      }

    }


    provinceData.forEach(
      (province) => {

        const initialScore =
          province.scores.combined;


        const marker =
          L.circleMarker(
            province.coordinates,
            {

              radius:
                getMarkerRadius(
                  initialScore
                ),


              fillColor:
                getLayerColour(
                  initialScore,
                  "combined"
                ),


              color:
                "#ffffff",


              weight:
                3,


              opacity:
                1,


              fillOpacity:
                0.9

            }
          ).addTo(
            pakistanMap
          );


        marker.bindTooltip(
          `
            <strong>
              ${province.name}
            </strong>
            <br>
            Combined Priority:
            ${scoreToLabel(initialScore)}
          `,
          {

            direction:
              "top",


            sticky:
              true

          }
        );


        marker.bindPopup(
          `
            <div class="map-popup">

              <strong>
                ${province.name}
              </strong>

              <p>
                ${province.direction}
              </p>

            </div>
          `
        );


        marker.on(
          "click",
          () => {

            selectedProvince =
              province;


            updateProvincePanel(
              province
            );


            pakistanMap.flyTo(
              province.coordinates,
              6,
              {

                duration:
                  0.8

              }
            );

          }
        );


        provinceMarkers.push(
          {

            province:
              province,


            marker:
              marker

          }
        );

      }
    );


    const layerButtons =
      document.querySelectorAll(
        ".layer-button"
      );


    layerButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            layerButtons.forEach(
              (item) => {

                item.classList.remove(
                  "active"
                );

              }
            );


            button.classList.add(
              "active"
            );


            const selected =
              button.dataset.layer ||
              "combined";


            updateMapLayer(
              selected
            );

          }
        );

      }
    );


    const resetControl =
      L.control(
        {

          position:
            "topright"

        }
      );


    resetControl.onAdd =
      function () {

        const button =
          L.DomUtil.create(
            "button",
            "map-reset-button"
          );


        button.type =
          "button";


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

            selectedProvince =
              null;


            pakistanMap.flyTo(
              [
                30.3753,
                69.3451
              ],
              5,
              {

                duration:
                  0.8

              }
            );


            updateNationalOverview(
              selectedLayer
            );

          }
        );


        return button;

      };


    resetControl.addTo(
      pakistanMap
    );


    updateNationalOverview(
      "combined"
    );


    setTimeout(
      () => {

        pakistanMap.invalidateSize();

      },
      300
    );

  }


  console.log(
    "PRCS Strategy Intelligence Lab loaded successfully"
  );

});
