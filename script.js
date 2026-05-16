let dataSelect;

const fetchData = async () => {
  try {
    const responseFactions = await fetch("data-factions.json");
    const dataFactions = await responseFactions.json();

    const responseCartesSet1 = await fetch("data_set1.json");
    const dataCartesSet1 = await responseCartesSet1.json();

    const responseCartesSet2 = await fetch("data_set2.json");
    const dataCartesSet2 = await responseCartesSet2.json();

    const responseCartesSet3 = await fetch("data_set3.json");
    const dataCartesSet3 = await responseCartesSet3.json();

    const responseCartesSet4 = await fetch("data_set4.json");
    const dataCartesSet4 = await responseCartesSet4.json();

    const responseCartesSet5 = await fetch("data_set5.json");
    const dataCartesSet5 = await responseCartesSet5.json();

    const responseCartesSet6 = await fetch("data_set6.json");
    const dataCartesSet6 = await responseCartesSet6.json();

    const responseCartesSet7 = await fetch("data_set7.json");
    const dataCartesSet7 = await responseCartesSet7.json();

    const selectSet = document.getElementById("set");
    const selectFaction = document.getElementById("faction");
    const selectTri = document.getElementById("tri");
    const selectColonne = document.getElementById("nbColonne");
    const filtreVisible = document.querySelector("#filtre-visible");

    let numSelect = document.getElementById("set").options.selectedIndex;
    let tabData = [
      dataCartesSet1,
      dataCartesSet2,
      dataCartesSet3,
      dataCartesSet4,
      dataCartesSet5,
      dataCartesSet6,
      dataCartesSet7,
    ];
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
        div.classList.add("grid4");
        const imgU = document.createElement("img");
        const imgR = document.createElement("img");
        const imgC = document.createElement("img");
        const divInfo = document.createElement("div");
        const divInfoFacNom = document.createElement("div");
        const nom = document.createElement("p");
        const num = document.createElement("p");
        const divVoix = document.createElement("div");
        const nbVoix = document.createElement("p");
        const totalVoix = document.createElement("p");
        const totalVotantSet1 = 271;
        const totalVotantSet2 = 168;
        const totalVotantSet3 = 73;
        const pourcentVoix = document.createElement("p");
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
        divInfo.appendChild(divInfoFacNom);
        divInfoFacNom.appendChild(nom);
        divInfo.appendChild(num);
        num.classList.add("cardNum");
        divVoix.classList.add("carte-vote");
        div.appendChild(divVoix);
        divVoix.appendChild(nbVoix);
        divVoix.appendChild(totalVoix);
        divVoix.appendChild(pourcentVoix);

        // FILTRE VOTE
        const nbVotes = document.querySelector("#nbVotes");
        if (
          selectSet.value === "set1" ||
          selectSet.value === "set2" ||
          selectSet.value === "set3"
        ) {
          divVoix.style.display = "flex";
          filtreVisible.style.display = "flex";
          nbVotes.disabled = false;
          if ((dataSelect[i].vote1 === false)) {
            totalVoix.innerText = "Non concerné par le vote";
            nbVoix.style.display = "none";
            pourcentVoix.style.display = "none";
          } else {
            const calculNbVoix =
              dataSelect[i].vote1 + dataSelect[i].vote2 + dataSelect[i].vote3;
            nbVoix.innerText = calculNbVoix + " voix";
            totalVoix.innerText = "/ " + totalVotantSet3;
            pourcentVoix.innerText =
              "· " + Math.round((calculNbVoix / totalVotantSet3) * 100) + "%";
          }
        } else {
          divVoix.style.display = "none";
          filtreVisible.style.display = "none";
          nbVotes.disabled = true;
        }

        // BTN FILTRE SWITCH
        const imgFiltreVisible = document.querySelector("#filtre-visible img");
        const pFiltreVisible = document.querySelector("#filtre-visible p");
        filtreVisible.addEventListener("click", function () {
          if (divVoix.style.display === "none") {
            divVoix.style.display = "flex";
            imgFiltreVisible.src = "icon-invisible.svg";
            pFiltreVisible.innerText = "Masquer votes";
          } else {
            divVoix.style.display = "none";
            imgFiltreVisible.src = "icon-visible.svg";
            pFiltreVisible.innerText = "Afficher votes";
          }
        });

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

    ///////
    /////
    ////
    //
    ///
    //
    selectFaction.addEventListener("change", (event) => {
      const factionSelectionnee = selectFaction.value;
      const cartesFiltrees = factionSelectionnee
        ? dataSelect.filter((carte) => carte.faction === factionSelectionnee)
        : dataSelect;
      generatorCartes(cartesFiltrees);
      applyGridToCartes();
    });

    selectTri.addEventListener("change", (event) => {
      if (selectTri.value === "num") {
        dataSelect.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      if (selectTri.value === "alpha") {
        dataSelect.sort(function (a, b) {
          return a.nom.localeCompare(b.nom);
        });
      }
      if (selectTri.value === "nbVotes") {
        dataSelect.sort(function (a, b) {
          return b.vote1 + b.vote2 + b.vote3 - (a.vote1 + a.vote2 + a.vote3);
        });
      }
      generatorCartes(dataSelect);
    });

    // Tri faction fonctionnel
    let allButtonsFilters = document.querySelectorAll(
      "#containerFaction button",
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

    let currentGridClass = "grid4";
    let allButtonsGrid = document.querySelectorAll("#containerGrid button");
    let gridClasses = ["grid2", "grid3", "grid4", "grid5"];

    // GRID
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

    const cardCarte = document.querySelectorAll("#containerCartes > div");
    console.log(cardCarte);
    selectColonne.addEventListener("change", (event) => {
      cardCarte.forEach((card) => {
        card.classList.remove("grid2", "grid3", "grid4", "grid5");
        if (selectColonne.value === "2") {
          card.classList.add("grid2");
        }
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

    // SET
    selectSet.addEventListener("change", (event) => {
      let numSelect2 = document.getElementById("set").options.selectedIndex;
      selectFaction.selected = "Toutes"
      let tabData2 = [
        dataCartesSet1,
        dataCartesSet2,
        dataCartesSet3,
        dataCartesSet4,
        dataCartesSet5,
        dataCartesSet6,
        dataCartesSet7,
      ];
      dataSelect = tabData2[numSelect2];

      let allButtonsFilters = document.querySelectorAll(
        "#containerFaction button",
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
