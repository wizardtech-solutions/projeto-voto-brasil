import express from 'express';

const router = express.Router();

router.get('/inicio-votacao/:id?', (req, res) => {
    const idInsert = req.params.id || ''; // Se não houver id, usa uma string vazia
    const isValidId = idInsert.length === 5 && !isNaN(idInsert); // Verifica se o ID tem 5 dígitos e é um número

    // Se o ID for válido, cria o array de dígitos
    const digitsArray = isValidId ? idInsert.split('') : [];

    // console.log(digitsArray, 'array codigo input');

    // Renderiza a página com base na validade do ID
    try {
        
        
        res.render('tela_inicio_voto', { idInsert: isValidId ? idInsert : null, digitsArray });
        

    } catch (error) {
        console.log(error)
    }
});












export default router;
