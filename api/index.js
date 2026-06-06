const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333
const prisma = require('./prismaClient')

// Habilita cors paa todas as origens
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "API do curso Ninja do Cypress"})
})

app.post('/api/users/register', async (req, res) => {

    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name is required!' })
    }

    if (!email) {
        return res.status(400).json({ error: 'Email is required!' })
    }

    if (!password) {
        return res.status(400).json({ error: 'Password is required!' })
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            user
        })

    } catch (error) {

        // erro comum: email duplicado
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email já cadastrado!' })
        }

        console.error(error)
        return res.status(500).json({ error: 'Erro interno!' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//HOT RELOAD - "dev": "nodemon index.js",
//npm install nodemon -D
//npm install cors
//----------------------//
//PARA WINDOWS
//wsl --install
//wsl --list --online
//wsl --install ubuntu
//wsl -d Ubuntu
//----------------------//
// docker compose up
//npm install cypress@14.3.1 -D