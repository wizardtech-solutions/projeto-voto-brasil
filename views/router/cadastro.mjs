import express from "express";

const router = express.Router()

router.get('/cadastro-titulo',(req,res)=>{
    res.render('tela_cadastro');
});

router.post('/cadastro_titulo',(req,res)=>{

    res.render('tela_confirm_cadastro');
})

export default router;