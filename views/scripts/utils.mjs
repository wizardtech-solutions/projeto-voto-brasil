import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual (utilizando o caminho do arquivo atual)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function isAuthorizedUser(nome, telephone) {
  // Construir o caminho absoluto para telephoneAuth.json
  const filePath = path.join(__dirname, '../../telephoneAuth.json');

  try {
    // Ler o conteúdo do arquivo telephoneAuth.json de forma síncrona
    const jsonData = readFileSync(filePath, 'utf8');
    const authorizedUsers = JSON.parse(jsonData);


    // Verificar se o nome e o número correspondem a um usuário autorizado
    return authorizedUsers.some(user =>
      user.numberCell == telephone
    );
  } catch (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
    return false;
  }
}
