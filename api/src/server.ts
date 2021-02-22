import express, { response } from 'express'

const app = express();

app.get("/", (req,res)=>
{
    return res.json(
        {
            message:"Teste de los crias"
        })
});

app.post("/",(req,res)=>
{
    return res.json(
        {
            message:"Post del macho"
        })
})

app.listen(9999, ()=> console.log("Rodando na porta "));