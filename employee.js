// =============================
// CONNEXION SUPABASE
// =============================

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
); 

//le boutton du tableau des reclamation en attente

let vueActuelle = "En attente";
function afficherRestantes() {

    vueActuelle = "En attente";

    afficherReclamations();
}

//le boutton du tableau des reclamation finis

function afficherFinies() {

    vueActuelle = "Fini";

    afficherReclamations();
}

const department = localStorage.getItem("department");

console.log("Département connecté :", department);

// Fonction appelee lorsqu'on change l'etat du switch
async function changeStatus(element, id){

    let nouveauStatut;

    if(element.checked){
        nouveauStatut = "Fini";
    }else{
        nouveauStatut = "En attente";
    }

    console.log("ID :", id);
    console.log("Nouveau statut :", nouveauStatut);

    const { data, error } = await supabaseClient
        .from("reclamation")
        .update({
            statut: nouveauStatut
        })
        .eq("id", id)
        .select();

    console.log("DATA UPDATE :", data);
    console.log("ERROR UPDATE :", error);
    await afficherReclamations();  
}

// =============================
// AFFICHER LES RECLAMATIONS
// =============================

// Fonction asynchrone car elle communique avec Supabase
async function afficherReclamations() {

    // Demande à Supabase de récupérer toutes les lignes
    // de la table "reclamation"
    
        const { data, error } = await supabaseClient

        // Choisit la table reclamation
        .from("reclamation")

        // Sélectionne toutes les colonnes (*)
        .select("*")

        .eq("statut", vueActuelle);

        /*.eq("service", department); //.eq() signifie "equal" (égal à).

        console.log("Département :", department);*/

        console.log("DATA :", data); //Affiche dans la console ce que Supabase a renvoyé.
        console.log("ERROR :", error); //Affiche une éventuelle erreur.
        

    // Vérifie si une erreur est survenue
    if (error) {

        // Affiche l'erreur dans la console
        console.error(error);

        // Arrête la fonction
        return;
    }

    let reclamationsFiltrees = [];

    if (department === "Housekeeping") {
        reclamationsFiltrees = data.filter(
            reclamation => reclamation.service === "Housekeeping"
        );
    }
    else if (department === "Reception") {
        reclamationsFiltrees = data.filter(
            reclamation => reclamation.service !== "Housekeeping"
        );
    }
    else {
        reclamationsFiltrees = data;
    }


    // Récupère le tbody du tableau HTML
    let tableBody = document.getElementById("tableBody");

    // Vide le tableau avant d'ajouter les données
    // Cela évite d'afficher plusieurs fois les mêmes lignes
    tableBody.innerHTML = "";

    // Parcourt chaque réclamation récupérée depuis Supabase
    reclamationsFiltrees.forEach(reclamation => {

        // Ajoute une nouvelle ligne dans le tableau
        tableBody.innerHTML += `

            <tr>

                <!-- Affiche le numéro de chambre -->
                <td>${reclamation.chambre}</td>

                <!-- Affiche le nom du client -->
                <td>${reclamation.nomClient}</td>

                <!-- Affiche le service concerné -->
                <td>${reclamation.service}</td>

                <td>${reclamation.type}</td>

                <!-- Affiche la description du problème -->
                <td>${reclamation.description}</td>

                <!-- Affiche le statut sous forme de boutton glissan-->
                <td>
            
                    <label class="switch">

                        <input
                            type="checkbox"
                            ${reclamation.statut === "Fini" ? "checked" : ""}
                            onchange="changeStatus(this, ${reclamation.id})"
                        >

                        <span class="slider"></span>

                        </label>

</td>

            </tr>

        `;
    });
}

async function afficherGraphique() {

    const date24h = new Date();
    date24h.setHours(date24h.getHours() - 24);

    const { data, error } = await supabaseClient
        .from("reclamation")
        .select("*")
        .gte("created_at", date24h.toISOString());

    if (error) {
        console.error(error);
        return;
    }

    let compteurChambres = {};

    data.forEach(reclamation => {

        const chambre = reclamation.chambre;

        if (!compteurChambres[chambre]) {
            compteurChambres[chambre] = 0;
        }

        compteurChambres[chambre]++;
    });

    let labels = [];
    let valeurs = [];

    for (let chambre in compteurChambres) {

        if (compteurChambres[chambre] > 3) {

            labels.push(chambre);
            valeurs.push(compteurChambres[chambre]);
        }
    }

    const ctx = document
        .getElementById("chartReclamations")
        .getContext("2d");

    new Chart(ctx, {
    type: "bar",

    data: {
        labels: labels,
        datasets: [{
            label: "Nombre de réclamations",
            data: valeurs,
            backgroundColor: "#e73636" // couleur des barreS
        }]
    },

    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
}

async function afficherNombreAttente() {

    const { data, error } = await supabaseClient
        .from("reclamation")
        .select("id")
        .eq("statut", "En attente");

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("nbAttente").textContent =
        "Réclamations en attente : " + data.length;
}
// =============================
// CHARGEMENT DU TABLEAU
// =============================

// Affiche les réclamations dès l'ouverture de la page
afficherReclamations();
afficherGraphique();
afficherNombreAttente();

// Rafraîchit la page automatiquement après 5 secondes (5000 ms)
setTimeout(function() {
    location.reload();
}, 5000);
