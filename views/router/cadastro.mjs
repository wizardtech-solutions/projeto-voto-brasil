import express from 'express';
import QRCode from 'qrcode';
import pool from '../db/db.mjs';
import dotenv from 'dotenv'
import { isAuthorizedUser } from '../scripts/utils.mjs'

dotenv.config();

const router = express.Router();

router.get('/cadastro-titulo', (req, res) => {
  const municipio = process.env.MUNICIPIO
  return res.render('tela_cadastro', { municipio });
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
  const municipio = process.env.MUNICIPIO;
  const authForNumber = process.env.AUTH_FOR_NUMBER;
  try {
    // Extraia os valores do corpo da requisição
    const { nome, number_telefone, cep, cidade } = req.body;
    // Remova caracteres especiais do número de telefone
    const cleanedTelefone = number_telefone.replace(/\D/g, ''); // Remove todos os caracteres que não sejam números
    const isAuth = await isAuthorizedUser(nome, cleanedTelefone);

    console.log(isAuth, authForNumber,'numberUserClear eros')
    if (!isAuth && authForNumber=='true') {
        console.log('O número de telefone não está na base:', cleanedTelefone);
        return res.render("tela_error", {errorText: 'Usuário não autorizado, contate o suporte.'});
    }   

    // Verifique se o telefone já está cadastrado
    const SQLCheck = `SELECT * FROM tb_cad_title WHERE number_telefone = ?`;
    pool.query(SQLCheck, [cleanedTelefone], (err, results) => {
      if (err) {
        console.error('Erro ao verificar o telefone no banco de dados:', err);
        return res.render("tela_error", { errorText: 'Erro ao verificar o telefone no banco de dados.' });
      }
      // NÃO APAGAR SERVER PARA EVITAR USAR O MESMO NUMERO DE TELEFONE 
      // if (results.length > 0) {
      //   console.log('O número de telefone já está cadastrado:', cleanedTelefone);
      //   return res.render("tela_error", {errorText: 'O número de telefone já está cadastrado.'});
      // }

      // Se o telefone não estiver cadastrado, prossiga com a inserção
      const SQLInsert = `
        INSERT INTO tb_cad_title (
          nome,
          number_telefone,
          cep,
          cidade
        ) VALUES (?, ?, ?, ?)`;

      const values = [nome, cleanedTelefone, cep, municipio];

      pool.query(SQLInsert, values, async (err, result) => {
        if (err) {
          console.log(err);
          return res.render("tela_error", { errorText: 'Erro ao inserir dados no banco de dados.' });
        }

        try {
          const idInsert = String(result.insertId);
          const urlRedirect = `${url}${idInsert}`;
          const qrCodeSrc = await QRCode.toDataURL(urlRedirect);

          // Redireciona com query parameters
          res.redirect(`/cadastro/confirm-cadastro?qrCodeSrc=${encodeURIComponent(qrCodeSrc)}&urlRedirect=${encodeURIComponent(urlRedirect)}&idInsert=${encodeURIComponent(idInsert)}`);
        } catch (err) {
          console.error(err);
          return res.render("tela_error", { errorText: 'Erro ao gerar o QR code!' });
        }
      });
    });

  } catch (err) {
    console.error(err);
    return res.render("tela_error", { errorText: 'Erro ao processar a requisição' });
  }
});




export default router;
