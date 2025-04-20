import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import cors from 'cors'

/*
Database
caiosqueiroz
i2NqJ8fFpGs02QBS
*/

// node --watch server.js -- PARA RODAR O SERVIDOR
// npx prisma studio -- PARA RODAR O PRISMA STUDIO E VISUALIZAR OS DADOS DO BANCO

const app = express();
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get("/profissionais", async (req, res) => {
    let profissionais = [];
    if(req.query){
        profissionais = await prisma.profissionais.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                role: req.query.role,
                age: (req.query.age)? parseInt(req.query.age): undefined,
                photo: req.query.photo
            }
        })
    }else{
        let profissionais = await prisma.profissionais.findMany()
    }
    res.status(200).json(profissionais)
})

app.post("/profissionais", async (req, res) => {
    await prisma.profissionais.create({
        data : {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            role: req.body.role,
            photo: req.body.photo

        }
    })
    
    res.status(201).json(req.body);
})

app.put("/profissionais/:id", async (req, res) =>{
    // console.log(req.params.id)
    await prisma.profissionais.update({
        where:{
            id : req.params.id
        },
        data : {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            role: req.body.role,
            photo: req.body.photo

        }
    })

    res.status(201).json(req.body);    
})

app.delete("/profissionais/:id", async (req, res) => {
    await prisma.profissionais.delete({
        where: {
          id: req.params.id
        }
      })

    res.status(200).json({message : 'Usuário excluído com sucesso'})
})


app.listen(3000)