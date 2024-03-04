const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contacts = [];

function addContact() {
  rl.question('Entrez le nom du contact: ', (name) => {
    rl.question('Entrez le numéro de téléphone: ', (phoneNumber) => {
      contacts.push({ name, phoneNumber });
      console.log('Le contact a été ajouté avec succès !');
      showMenu();
    });
  });
}

function viewAllContacts() {
  if (contacts.length === 0) {
    console.log('Aucun contact trouvé.');
  } else {
    console.log('Liste des contacts:');
    contacts.forEach(contact => {
      console.log(`Nom: ${contact.name}, Téléphone: ${contact.phoneNumber}`);
    });
  }
  showMenu();
}

// Fonction pour rechercher un contact
function searchContact() {
  rl.question('Entrez le nom du contact à rechercher: ', (searchName) => {
    const foundContact = contacts.find(contact => contact.name === searchName);
    if (foundContact) {
      console.log(`Nom: ${foundContact.name}, Téléphone: ${foundContact.phoneNumber}`);
    } else {
      console.log('Contact non trouvé.');
    }
    showMenu();
  });
}

function showMenu() {
  console.log('\nMenu:');
  console.log('1. Ajouter un contact');
  console.log('2. Voir tous les contacts');
  console.log('3. Rechercher un contact');
  console.log('4. Quitter');

  rl.question('Choisissez une option: ', (option) => {
    switch (option) {
      case '1':
        addContact();
        break;
      case '2':
        viewAllContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Option invalide. Veuillez choisir une option valide.');
        showMenu();
    }
  });
}


console.log('Bienvenue dans le gestionnaire de contacts !\n');
showMenu();
