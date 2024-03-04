const fs = require('fs-extra');

async function writeFileAsync(filePath, content) {
    try {
        await fs.writeFile(filePath, content);
        return 'File successfully written.';
    } catch (error) {
        throw new Error(`Error writing file: ${error.message}`);
    }
}

module.exports = writeFileAsync;
