const readFileAsync = require('./readFileAsync');
const writeFileAsync = require('./writeFileAsync');

async function processFiles(filePaths) {
    try {
        for (const filePath of filePaths) {
            const data = await readFileAsync(filePath);
            // Manipulez le contenu du fichier ici selon les spécifications
            const modifiedData = data.toUpperCase(); // Par exemple, convertir en majuscules
            const newFilePath = `${filePath}-modified.txt`; // Chemin pour le nouveau fichier
            await writeFileAsync(newFilePath, modifiedData); // Écriture du fichier modifié
            console.log(`File processed and saved at ${newFilePath}`);
        }
        return 'All files processed successfully.';
    } catch (error) {
        throw new Error(`Error processing files: ${error.message}`);
    }
}

module.exports = processFiles;
