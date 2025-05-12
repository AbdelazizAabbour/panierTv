   const tvs = [
    {
        nom:"SAMSUNG QLED QE25649841AA",
        prix:1799,
        taille:65,
        img:"pic/tv1.jpg"
        
    },
    {
        nom:"TCL QLED 54687BOM",
        prix:6100,
        taille:42,
        img:"pic/tv2.jpg"

    },
    {
        nom:"SONY QLED A75339OA",
        prix:3500,
        taille:75,
        img:"pic/tv3.jpg"

    },
    {
        nom:"LG QLED 99986202PLSM",
        prix:15000,
        taille:120,
        img:"pic/tv4.jpg"

    }
];

const selectTV = document.getElementById("select");
const quantityInput = document.getElementById("number");
const tbody = document.getElementById("panierBody");
const totalHT = document.getElementById("totalHT");
const totalTTC = document.getElementById("totalTTC");
let panier = [];

function remplirTVs() {
  tvs.forEach(tv => {
    const option = document.createElement("option");
    option.value = tv.nom;
    option.textContent = tv.nom;
    selectTV.appendChild(option);
  });
}

function ajouterAuPanier() {
  const selectedTVName = selectTV.value;
  const quantity = quantityInput.value;

  if (!selectedTVName || !quantity || quantity <= 0) {
    alert("Veuillez sélectionner une TV et une quantité valide.");
    return;
  }

  const tv = tvs.find(t => t.nom === selectedTVName);
  const existingItem = panier.find(item => item.reference === tv.nom);

  if (existingItem) {
    existingItem.quantite += quantity;
  } else {
    panier.push({
      reference: tv.nom,
      quantite: quantity,
      image: tv.img,
      prix: tv.prix
    });
  }

  afficherPanier();
}

function afficherPanier() {
  tbody.innerHTML = "";
  let total = 0;

  panier.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.reference}</td>
      <td>${item.quantite}</td>
      <td><img src="${item.image}" width="50"></td>
      <td><button onclick="supprimerDuPanier('${item.reference}')">Supprimer</button></td>
    `;
    tbody.appendChild(row);

    total += item.prix * item.quantite;
  });

  totalHT.textContent = `${total} DHs`;
  const ttc = (total * 1.20).toFixed(2); 
  totalTTC.textContent = `${ttc} DHs`;
}

function supprimerDuPanier(reference) {
  panier = panier.filter(item => item.reference !== reference);
  afficherPanier();
}


window.onload = remplirTVs;
