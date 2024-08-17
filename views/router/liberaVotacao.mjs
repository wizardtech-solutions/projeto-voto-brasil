import express from "express";

const router = express.Router();

router.get('/votacao',(req,res)=>{

    res.render('tela_libera_votacao');

});

export default router
