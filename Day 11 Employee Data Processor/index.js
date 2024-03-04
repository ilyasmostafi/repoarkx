const fs = require('fs');
const xlsx = require('xlsx');

// Fonction pour lire un fichier Excel de manière asynchrone
function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Fonction pour écrire dans un fichier Excel de manière asynchrone
function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Fonction pour traiter les données utilisateur
async function processUserData(inputFilePath, outputFilePath) {
    try {
        // Lire le fichier Excel
        const workbook = xlsx.readFile(inputFilePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Traitement des données utilisateur
        const processedData = data.map(user => {
            // Ajouter un traitement personnalisé ici selon vos besoins
            // Par exemple, vous pouvez filtrer certaines données, effectuer des calculs, etc.
            return user;
        });

        // Convertir les données traitées en feuille Excel
        const newWorksheet = xlsx.utils.json_to_sheet(processedData);

        // Créer un nouveau classeur Excel et y ajouter la nouvelle feuille de calcul
        const newWorkbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Processed Data');

        // Écrire le nouveau classeur Excel dans un fichier
        const excelBuffer = xlsx.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });
        await writeFileAsync(outputFilePath, excelBuffer);

        console.log('Les données utilisateur ont été traitées et enregistrées dans un nouveau fichier Excel avec succès !');
    } catch (error) {
        console.error('Une erreur est survenue lors du traitement des données utilisateur :', error);
    }
}

// Appel de la fonction pour traiter les données utilisateur
const inputFilePath = 'employee_data_.xlsx'; // Chemin vers le fichier Excel d'entrée
const outputFilePath = 'output.xlsx'; // Chemin vers le fichier Excel de sortie
processUserData(inputFilePath, outputFilePath);
