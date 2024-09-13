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
    const isAuthorized = authorizedUsers.some(user => {
      const userNumberCleaned = user.numberCell.replace(/\D/g, '');
      const result = userNumberCleaned === telephone;
      // console.log(result, telephone, 'utils.mjs.isAuthorizedUser');
      return result;
    });

    return isAuthorized; // Retornar se o usuário é autorizado ou não
  } catch (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
    return false;
  }
}
