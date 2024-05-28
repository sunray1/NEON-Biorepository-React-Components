import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs-extra');
const path = require('path');

const sourceDir = '/mnt/c/xampp/htdocs/NEON-Biorepository-React-Components/build';
const targetDir = '/mnt/c/xampp/htdocs/NEON-Biorepository/neon-react';
const indexFilePath = '/mnt/c/xampp/htdocs/NEON-Biorepository-React-Components/build/index.html';
const targetHtmlFilePath = '/mnt/c/xampp/htdocs/NEON-Biorepository/includes/head.php';

// Function to copy files and directories excluding index.html
async function copyFiles() {
    try {
        // Ensure target directory exists
        await fs.ensureDir(targetDir);

        // Copy static folder except for index.html
        const files = await fs.readdir(sourceDir);
        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(targetDir, file);
            if (file !== 'index.html') {
                await fs.copy(sourceFile, targetFile);
                console.log(`Copied ${file} to ${targetFile}`);
            }
        }
    } catch (err) {
        console.error('Error copying files:', err);
    }
}

// Function to modify index.html and insert content into another file
async function modifyHtml() {
    try {
        const indexHtml = await fs.readFile(indexFilePath, 'utf8');

        // Extract part of the code (e.g., between <div id="root"> and </div>)
        const regex = /<meta charset="utf-8"\/>([\s\S]*?)<\/head>/;
        const match = indexHtml.match(regex);
        if (match) {
            const extractedContent = match[1];

            // Replace content if needed (example: replace 'old-text' with 'new-text')
            const modifiedContent = extractedContent.replace(/\.\/neon-react\//g, '<?php echo $CLIENT_ROOT; ?>/neon-react/');

            // Insert modified content into the target HTML file
            const targetHtml = await fs.readFile(targetHtmlFilePath, 'utf8');
            const updatedHtml = targetHtml.replace(/<meta name="viewport"[\s\S]*?main.css" rel="stylesheet">/, modifiedContent);
            await fs.writeFile(targetHtmlFilePath, updatedHtml);

            console.log('HTML content modified and inserted successfully.');
        } else {
            console.error('Content to be extracted not found in index.html');
        }
    } catch (err) {
        console.error('Error modifying HTML:', err);
    }
}

// Run the functions
(async () => {
    await copyFiles();
    await modifyHtml();
})();
