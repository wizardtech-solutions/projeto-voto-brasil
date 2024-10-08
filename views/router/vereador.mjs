import express from "express";
import pool from "../db/db.mjs";
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();

router.get('/tela_fim', (req, res) => {
    return res.render('tela_finalizar');
});
router.post('/vereador', async (req, res) => {
    const municipio = process.env.MUNICIPIO;
    const id = req.body.id;

    try {
        const SQLSelect = 'SELECT * FROM tb_cad_title WHERE id = ?';
        
        await pool.query(SQLSelect, [id], (err, result) => {
            if (err) {
                console.error('Erro ao executar a consulta:', err);
                return res.render("tela_error", { errorText: 'Erro ao executar a consulta.' });
            }

            if (result.length === 0) {  // Verifica se o resultado está vazio
                console.log('Nenhum resultado encontrado para o ID:', id);
                return res.render("tela_error", { errorText: 'Cadrastro inválido' });
            }

            return res.render('tela_vereador', { codeVoto: id, municipio });
        });

    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return res.render("tela_error", { errorText: 'Erro ao processar a requisição.' });
    }
});

router.post('/prefeito', async (req, res) => {
    const municipio = process.env.MUNICIPIO
    
    const { codeVoto, votoVereador } = req.body
    return res.render('tela_prefeito', { codeVoto, votoVereador, municipio })
});

router.post('/finalizar', async (req, res) => {
    const municipio = process.env.MUNICIPIO;
    const { codeVoto, votoVereador, votoPrefeito } = req.body;

    try {
        // Fazendo o SELECT na tabela tb_voto onde code == idInsert
        const query = 'SELECT voto_vereador, voto_prefeito FROM tb_voto WHERE code = ?';
        pool.query(query, [codeVoto], (err, results) => {
            if (err) {
                console.error('Erro ao realizar o SELECT na tabela tb_voto:', err);
                return res.render("tela_error");
                return res.status(500).send('Erro ao realizar a operação.');
            }
            
            if (results.length > 0) {
                const { voto_vereador, voto_prefeito } = results[0];
                
                if (voto_vereador || voto_prefeito) {
                    console.log('Voto já registrado:', { voto_vereador, voto_prefeito });
                    return res.render("tela_error", {errorText: 'Voto já registrado'});
                }
            } else {

                // Fazendo o INSERT na tabela tb_voto
                const insertQuery = `
                      INSERT INTO tb_voto (code, voto_vereador, voto_prefeito,cidade)
                      VALUES (?, ?, ?, ?)
                    `;
                const insertValues = [codeVoto, votoVereador, votoPrefeito,municipio];

                pool.query(insertQuery, insertValues, (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir os dados na tabela tb_voto:', err);
                        return res.render("tela_error");
                    }

                    console.log('Dados inseridos com sucesso na tabela tb_voto:', codeVoto);
                });
                console.log('Nenhum registro encontrado com o code fornecido.');
            }

            // Renderiza a tela_finalizar após o processamento
            return res.redirect('/votacao/tela_fim');
        });
    } catch (err) {
        console.error('Erro no processamento:', err);
        return res.render("tela_error", {errorText: 'Voto já registrado'});
               
        return res.status(500).send('Erro ao processar a requisição');
    }
});
export default router;