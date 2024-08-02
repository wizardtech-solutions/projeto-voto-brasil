import express from "express";

const router = express.Router();

router.get('/vereador',(req,res)=>{
    res.render('tela_vereador');

})

export default router;