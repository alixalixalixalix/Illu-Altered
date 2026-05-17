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
          if (dataSelect[i].vote1 === false) {
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

    // SELECT TRI
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
      applyGridToCartes();
      triFaction();
    });

    // FILTRE FACTION
    function triFaction() {
      let filtreAction = dataSelect.filter(function (cartes) {
        if (selectFaction.value === "axiom") {
          return cartes.faction.includes("Axiom");
        }
        if (selectFaction.value === "bravos") {
          return cartes.faction.includes("Bravos");
        }
        if (selectFaction.value === "lyra") {
          return cartes.faction.includes("Lyra");
        }
        if (selectFaction.value === "muna") {
          return cartes.faction.includes("Muna");
        }
        if (selectFaction.value === "ordis") {
          return cartes.faction.includes("Ordis");
        }
        if (selectFaction.value === "yzmir") {
          return cartes.faction.includes("Yzmir");
        } else {
          return cartes.faction;
        }
      });
      generatorCartes(filtreAction);
      applyGridToCartes();
    }

    selectFaction.addEventListener("change", (event) => {
      triFaction();
    });

    // GRID
    let currentGridClass = "grid4";
    let allButtonsGrid = document.querySelectorAll("#containerGrid button");
    let gridClasses = ["grid2", "grid3", "grid4", "grid5"];

    selectColonne.addEventListener("change", (event) => {
      currentGridClass = gridClasses[selectColonne.selectedIndex];
      applyGridToCartes();
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

    // FILTRE CHANGEMENT D'EXTENSION
    selectSet.addEventListener("change", (event) => {
      let numSelect2 = document.getElementById("set").options.selectedIndex;
      selectFaction.selectedIndex = 0;
      selectTri.selectedIndex = 0;
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
