import express from 'express';

const router = express.Router();

router.get('/historico-cadastro',(req,res)=>{
    res.render('historico_cadastro');
})

export default router