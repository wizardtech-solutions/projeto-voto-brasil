import express from 'express'
import exphbs from "express-handlebars";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import cadastroRouter from './views/router/cadastro.mjs';
import vereadorRouter from './views/router/vereador.mjs'
import inicioVotacaoRouter from './views/router/incioVoto.mjs'
import dataJson from './views/router/dataJson.mjs'
import historicoRouter from './views/router/historicoCadastro.mjs'
import votacaoLiberadaRouter from './views/router/liberaVotacao.mjs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Configurando o mecanismo de visualização do Handlebars
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
// Configurando o middleware para análise do corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurando o diretório raiz para arquivos estáticos
app.use(express.static(path.join(__dirname, 'views/public')));
app.use(express.static(path.join(__dirname, 'views/public/img')));
// app.use(express.static(path.join(__dirname, 'views/public/img/imgCand')));
app.use(express.static(path.join(__dirname, 'views/public/audio')));

// Roteamento para as rotas de atendimento
app.use('/cadastro',cadastroRouter);
app.use('/votacao',vereadorRouter);
// app.use('/votacao',prefeitoRouter);
app.use('/votacao',inicioVotacaoRouter);
app.use('/data',dataJson);
app.use('/cadastro',historicoRouter);
app.use('/libera',votacaoLiberadaRouter);

app.get('/',(req,res)=>{
    
    res.render('tela_inicial');
    
})

function serveJavaScriptFile(req, res, filePath) {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, filePath));
}

app.get('/meuScript.mjs', (req, res) => {
    serveJavaScriptFile(req, res, 'meuScript.mjs');
});
// app.get('/utils.mjs', (req, res) => {
//     serveJavaScriptFile(req, res, 'utils.mjs');
// });

app.get('/votacao.mjs', (req, res) => {
    serveJavaScriptFile(req, res, 'votacao.mjs');
});
app.get('/votacaoPrefeito.mjs', (req, res) => {
    serveJavaScriptFile(req, res, 'votacaoPrefeito.mjs');
});

app.get('/validateForm.mjs', (req, res) => {
    serveJavaScriptFile(req, res, 'validateForm.mjs');
});

app.get('/telaInicioVoto.mjs', (req, res) => {
    serveJavaScriptFile(req, res, 'telaInicioVoto.mjs');
});

app.listen(4000,()=>{
    console.log('servidor rodando');
})

