import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

// Obter o diretório atual (utilizando o caminho do arquivo atual)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rota para fornecer os dados do arquivo data.json
router.get('/', (req, res) => {
    // console.log(req);
    // Construir o caminho absoluto para data.json
    const filePath = path.join(__dirname, '../../dataCand.json');
    try {
        // Ler o conteúdo do arquivo data.json de forma síncrona
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);
        res.json(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo data.json', err);
        res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
});

export default router;
