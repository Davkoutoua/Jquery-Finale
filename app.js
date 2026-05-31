$(document).ready(function () {
    const storageKey = 'etudiants';
    let etudiants = JSON.parse(localStorage.getItem(storageKey)) || [];

    function afficherEtudiants() {
        $('#liste-etudiants').empty();
        etudiants.forEach((etudiant, index) => {
            const dateAjout = new Date(etudiant.date).toLocaleDateString();
            const li = $('<li></li>')
                .text(`${etudiant.nom} - Note: ${etudiant.note} - Ajouté le: ${dateAjout}`)
                .css('background-color', getColor(etudiant.note))
                .attr('data-index', index);
            const btnSupprimer = $('<button>X</button>').on('click', function () {
                supprimerEtudiant(index);
            });
            const btnModifier = $('<button>Modifier</button>').on('click', function () {
                modifierEtudiant(index);
            });
            li.append(btnSupprimer).append(btnModifier);
            $('#liste-etudiants').append(li);
        });
    }

    function getColor(note) {
        if (note < 10) return 'red';
        if (note < 15) return 'orange';
        return 'green';
    }

    function validerFormulaire(nom, note) {
        if (!nom || !note || note < 0 || note > 20) {
            $('#erreur').text('Veuillez entrer un nom valide et une note entre 0 et 20.').show();
            return false;
        }
        $('#erreur').hide();
        return true;
    }

    function ajouterEtudiant() {
        const nom = $('#nom').val();
        const note = parseInt($('#note').val());
        if (validerFormulaire(nom, note)) {
            const etudiant = { nom, note, date: new Date() };
            etudiants.push(etudiant);
            localStorage.setItem(storageKey, JSON.stringify(etudiants));
            afficherEtudiants();
            $('#nom').val('');
            $('#note').val('');
        }
    }

    function supprimerEtudiant(index) {
        etudiants.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(etudiants));
        afficherEtudiants();
    }

    function modifierEtudiant(index) {
        const nouveauNom = prompt("Nouveau nom:", etudiants[index].nom);
        const nouvelleNote = parseInt(prompt("Nouvelle note:", etudiants[index].note));
        if (validerFormulaire(nouveauNom, nouvelleNote)) {
            etudiants[index] = { nom: nouveauNom, note: nouvelleNote, date: new Date() };
            localStorage.setItem(storageKey, JSON.stringify(etudiants));
            afficherEtudiants();
        }
    }

    $('#btn-ajouter').on('click', ajouterEtudiant);
    $('#btn-effacer').on('click', function () {
        if (confirm("Êtes-vous sûr de vouloir tout effacer ?")) {
            etudiants = [];
            localStorage.removeItem(storageKey);
            afficherEtudiants();
        }
    });

    afficherEtudiants(); // Afficher les étudiants au chargement
});
