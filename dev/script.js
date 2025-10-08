const fetchData = async () => {
  try {
    const responseCartes = await fetch("data_set3.json");
    const dataCartes = await responseCartes.json();

    const responseFactions = await fetch("data-factions.json");
    const dataFactions = await responseFactions.json();

    function generatorCartes(dataCartes) {
      const containerCartes = document.querySelector("#containerCartes");
      containerCartes.innerHTML = "";

      for (let i = 0; i < dataCartes.length; i++) {
        const div = document.createElement("div");
        div.classList.add("cardCarte");
        div.classList.add("grid3");
        const img = document.createElement("img");
        const divInfo = document.createElement("div");
        const nom = document.createElement("p");
        const num = document.createElement("p");
        const divIllustrateur = document.createElement("div");
        const iconIllustrateur = document.createElement("img");
        const nomIllustrateur = document.createElement("p");

        containerCartes.appendChild(div);
        div.appendChild(img);
        img.classList.add("img-carte");
        div.appendChild(divInfo);
        divInfo.classList.add("carte-info");

        divInfo.appendChild(nom);
        divInfo.appendChild(num);
        num.classList.add("cardNum");
        div.appendChild(divIllustrateur);
        divIllustrateur.appendChild(iconIllustrateur);
        divIllustrateur.appendChild(nomIllustrateur);
        divIllustrateur.classList.add("divIllustrateur");

        img.src = dataCartes[i].img;
        nom.innerText = dataCartes[i].nom;
        num.innerText = dataCartes[i].num;

        iconIllustrateur.src = "icon-illustrateur.svg";
        nomIllustrateur.innerText = dataCartes[i].illustrateurice;
      }
    }

    // Affichage des boutton Tags
    for (i = 0; i < dataFactions.length; i++) {
      const containerButton = document.querySelector("#containerFaction");
      const boutonFaction = document.createElement("button");
      boutonFaction.classList.add("bouton");
      //boutonFaction.style.border = "2px solid" + dataFactions[i].couleur;
      //boutonFaction.style.color = dataFactions[i].couleur;
      containerButton.appendChild(boutonFaction);
      boutonFaction.innerText = dataFactions[i].nom;
    }

    // Tri tag fonctionnel
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
        //        allButtonsFilters[i].classList.add("factionActive"); //ajoute la class sur élément cliqué
        //      allButtonsFilters[i].style.backgroundColor = allButtonsFilters[i].couleur
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
        let filtreAction = dataCartes.filter(function (cartes) {
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

    generatorCartes(dataCartes);
    applyGridToCartes();
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

fetchData();
