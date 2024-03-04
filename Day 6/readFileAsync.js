const fs = require('fs');

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

module.exports = readFileAsync;
