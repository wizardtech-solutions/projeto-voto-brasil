import express from 'express';

const router = express.Router();

router.get('/inicio-votacao',(req,res)=>{
    res.render('tela_inicio_voto');
})

export default router