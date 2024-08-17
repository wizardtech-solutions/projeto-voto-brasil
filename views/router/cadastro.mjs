import express from 'express';
import QRCode from 'qrcode';
import dotenv from 'dotenv'
import pool from '../db/db.mjs';
dotenv.config();

const router = express.Router();

router.get('/cadastro-titulo', (req, res) => {
  res.render('tela_cadastro');
});

router.get('/confirm-cadastro', (req, res) => {
  const { qrCodeSrc, urlRedirect, idInsert } = req.query;
  if (!qrCodeSrc || !urlRedirect || !idInsert) {
    return res.render("tela_error");
    return res.status(400).send('Parâmetros ausentes na URL');
  }

  res.render('tela_confirm_cadastro', { qrCodeSrc, urlRedirect, idInsert });
});

router.post('/cadastro_titulo', async (req, res) => {
  const url = process.env.URL_REDIRECT;

  try {
    const { nome, number_telefone, cep, cidade } = req.body;

    const SQLInsert = `
      INSERT INTO tb_cad_title (
        nome,
        number_telefone,
        cep,
        cidade
      ) VALUES (?, ?, ?, ?)`;

    const values = [nome, number_telefone, cep, cidade];

    pool.query(SQLInsert, values, async (err, result) => {
      if (err) {
        console.log(err);
        return res.render("tela_error", {errorText: 'Erro ao inserir dados no banco de dados.'});
        return res.status(500).send({ message: 'Erro ao inserir dados no banco de dados.' });
      }

      try {
        const idInsert = String(result.insertId);
        const urlRedirect = `${url}${idInsert}`;
        const qrCodeSrc = await QRCode.toDataURL(urlRedirect);

        // Redireciona com query parameters
        res.redirect(`/cadastro/confirm-cadastro?qrCodeSrc=${encodeURIComponent(qrCodeSrc)}&urlRedirect=${encodeURIComponent(urlRedirect)}&idInsert=${encodeURIComponent(idInsert)}`);
      } catch (err) {
        console.error(err);
        return res.render("tela_error", {errorText:'Erro ao gerar o QR code!'});
       
        res.status(500).send('Erro ao gerar o QR code');
      }
    });

  } catch (err) {
    console.error(err);
    return res.render("tela_error", {errorText: 'Erro ao processar a requisição'});

    res.status(500).send('Erro ao processar a requisição');
  }
});




export default router;
