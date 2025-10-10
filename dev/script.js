let dataSelect;

const fetchData = async () => {
  try {
    const responseFactions = await fetch("data-factions.json");
    const dataFactions = await responseFactions.json();

    const responseCartesSet2 = await fetch("data_set2.json");
    const dataCartesSet2 = await responseCartesSet2.json();

    const responseCartesSet3 = await fetch("data_set3.json");
    const dataCartesSet3 = await responseCartesSet3.json();

    const select = document.getElementById("set");
    let numSelect = document.getElementById("set").options.selectedIndex;
    let tabData = [dataCartesSet2, dataCartesSet3];
    dataSelect = tabData[numSelect];

    function generatorCartes(dataSelect) {
      const containerCartes = document.querySelector("#containerCartes");
      containerCartes.innerHTML = "";

      const buttonUnique = document.getElementById("button-unique");
      const buttonRare = document.getElementById("button-rare");
      const buttonCommune = document.getElementById("button-commune");
      buttonCommune.classList.remove("rareteActive");
      buttonRare.classList.remove("rareteActive");
      buttonUnique.classList.add("rareteActive");

      for (let i = 0; i < dataSelect.length; i++) {
        const div = document.createElement("div");
        div.classList.add("cardCarte");
        div.classList.add("grid3");
        const imgU = document.createElement("img");
        const imgR = document.createElement("img");
        const imgC = document.createElement("img");
        const divInfo = document.createElement("div");
        const nom = document.createElement("p");
        const num = document.createElement("p");
        const divIllustrateur = document.createElement("div");
        const iconIllustrateur = document.createElement("img");
        const nomIllustrateur = document.createElement("p");

        containerCartes.appendChild(div);
        div.appendChild(imgU);
        div.appendChild(imgR);
        div.appendChild(imgC);
        imgU.classList.add("img-carte");
        imgR.classList.add("img-carte");
        imgC.classList.add("img-carte");
        imgU.classList.add("unique");
        imgR.classList.add("rare");
        imgC.classList.add("commune");
        div.appendChild(divInfo);
        divInfo.classList.add("carte-info");

        divInfo.appendChild(nom);
        divInfo.appendChild(num);
        num.classList.add("cardNum");
        div.appendChild(divIllustrateur);
        divIllustrateur.appendChild(iconIllustrateur);
        divIllustrateur.appendChild(nomIllustrateur);
        divIllustrateur.classList.add("divIllustrateur");

        imgU.src = dataSelect[i].imgU;
        imgR.src = dataSelect[i].imgR;
        imgC.src = dataSelect[i].imgC;
        nom.innerText = dataSelect[i].nom;
        num.innerText = dataSelect[i].num;

        iconIllustrateur.src = "icon-illustrateur.svg";
        nomIllustrateur.innerText = dataSelect[i].illustrateurice;
      }
    }

    // Affichage des boutton filtre FACTION
    for (i = 0; i < dataFactions.length; i++) {
      const containerButton = document.querySelector("#containerFaction");
      const boutonFaction = document.createElement("button");
      boutonFaction.classList.add("bouton");
      containerButton.appendChild(boutonFaction);
      boutonFaction.innerText = dataFactions[i].nom;
    }

    // Tri faction fonctionnel
    let allButtonsFilters = document.querySelectorAll(
      "#containerFaction button"
    );
    let buttonAll = document.getElementById("all").innerText;
    for (let i = 0; i < allButtonsFilters.length; i++) {
      allButtonsFilters[i].addEventListener("click", function () {
        allButtonsFilters[0].classList.remove("factionActive");
        allButtonsFilters[1].classList.remove("factionActiveAxiom");
        allButtonsFilters[2].classList.remove("factionActiveBravos");
        allButtonsFilters[3].classList.remove("factionActiveLyra");
        allButtonsFilters[4].classList.remove("factionActiveMuna");
        allButtonsFilters[5].classList.remove("factionActiveOrdis");
        allButtonsFilters[6].classList.remove("factionActiveYzmir");
        if (i === 0) {
          allButtonsFilters[i].classList.add("factionActive");
        }
        if (i === 1) {
          allButtonsFilters[i].classList.add("factionActiveAxiom");
        }
        if (i === 2) {
          allButtonsFilters[i].classList.add("factionActiveBravos");
        }
        if (i === 3) {
          allButtonsFilters[i].classList.add("factionActiveLyra");
        }
        if (i === 4) {
          allButtonsFilters[i].classList.add("factionActiveMuna");
        }
        if (i === 5) {
          allButtonsFilters[i].classList.add("factionActiveOrdis");
        }
        if (i === 6) {
          allButtonsFilters[i].classList.add("factionActiveYzmir");
        }
        let filtreAction = dataSelect.filter(function (cartes) {
          if (allButtonsFilters[i].innerText === buttonAll) {
            return cartes.faction;
          } else {
            return cartes.faction.includes(allButtonsFilters[i].innerText);
          }
        });
        generatorCartes(filtreAction);
        applyGridToCartes();
      });
    }

    let currentGridClass = "grid3";
    let allButtonsGrid = document.querySelectorAll("#containerGrid button");
    let gridClasses = ["grid2", "grid3", "grid4", "grid5"];

    allButtonsGrid.forEach((button, index) => {
      button.addEventListener("click", function () {
        const actifButton = document.querySelector(".gridActif");
        if (actifButton) {
          actifButton.classList.remove("gridActif"); // supprime l'ancien actif
        }
        button.classList.add("gridActif"); // ajoute la classe sur l'élément cliqué

        currentGridClass = gridClasses[index]; // met à jour la grille active
        applyGridToCartes();
      });
    });

    // Fonction pour appliquer la classe de grille actuelle
    function applyGridToCartes() {
      let cardCarte = document.querySelectorAll("#containerCartes > div");
      cardCarte.forEach((div) => {
        // On retire les anciennes classes
        gridClasses.forEach((cls) => div.classList.remove(cls));
        // On ajoute la classe actuelle
        div.classList.add(currentGridClass);
      });
    }

    select.addEventListener("change", (event) => {
      let numSelect2 = document.getElementById("set").options.selectedIndex;
      let tabData2 = [dataCartesSet2, dataCartesSet3];
      dataSelect = tabData2[numSelect2];

      let allButtonsFilters = document.querySelectorAll(
        "#containerFaction button"
      );
      allButtonsFilters[0].classList.add("factionActive");
      allButtonsFilters[1].classList.remove("factionActive");
      allButtonsFilters[2].classList.remove("factionActiveBravos");
      allButtonsFilters[3].classList.remove("factionActiveLyra");
      allButtonsFilters[4].classList.remove("factionActiveMuna");
      allButtonsFilters[5].classList.remove("factionActiveOrdis");
      allButtonsFilters[6].classList.remove("factionActiveYzmir");

      generatorCartes(dataSelect);
      applyGridToCartes();
    });

    const buttonUnique = document.getElementById("button-unique");
    const buttonRare = document.getElementById("button-rare");
    const buttonCommune = document.getElementById("button-commune");
    buttonCommune.addEventListener("click", function () {
      buttonCommune.classList.add("rareteActive");
      buttonRare.classList.remove("rareteActive");
      buttonUnique.classList.remove("rareteActive");
      const cartesUnique = document.querySelectorAll(".unique");
      const cartesRare = document.querySelectorAll(".rare");
      const cartesCommune = document.querySelectorAll(".commune");
      for (let i = 0; i < dataSelect.length; i++) {
        cartesCommune[i].style.display = "flex";
        cartesRare[i].style.display = "none";
        cartesUnique[i].style.display = "none";
      }
    });
    buttonRare.addEventListener("click", function () {
      buttonCommune.classList.remove("rareteActive");
      buttonRare.classList.add("rareteActive");
      buttonUnique.classList.remove("rareteActive");
      const cartesUnique = document.querySelectorAll(".unique");
      const cartesRare = document.querySelectorAll(".rare");
      const cartesCommune = document.querySelectorAll(".commune");
      for (let i = 0; i < dataSelect.length; i++) {
        cartesCommune[i].style.display = "none";
        cartesRare[i].style.display = "flex";
        cartesUnique[i].style.display = "none";
      }
    });
    buttonUnique.addEventListener("click", function () {
      buttonCommune.classList.remove("rareteActive");
      buttonRare.classList.remove("rareteActive");
      buttonUnique.classList.add("rareteActive");
      const cartesUnique = document.querySelectorAll(".unique");
      const cartesRare = document.querySelectorAll(".rare");
      const cartesCommune = document.querySelectorAll(".commune");
      for (let i = 0; i < dataSelect.length; i++) {
        cartesCommune[i].style.display = "none";
        cartesRare[i].style.display = "none";
        cartesUnique[i].style.display = "flex";
      }
    });

    generatorCartes(dataSelect);
    applyGridToCartes();
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

fetchData();