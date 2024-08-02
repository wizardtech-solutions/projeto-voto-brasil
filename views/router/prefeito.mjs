import express from "express";

const router = express.Router();

router.get('/prefeito',(req,res)=>{
    res.render('tela_prefeito');

});

export default router;