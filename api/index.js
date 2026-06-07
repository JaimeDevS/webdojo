const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333
const prisma = require('./prismaClient')

// Habilita cors paa todas as origens
app.use(cors())
app.use(express.json())

// Middleware para pegar erros de requisições e exibir no bash
app.use((err, req, res, next) => {
    //console.log(err)
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON format.' })
    }
    next()
})

app.get('/', (req, res) => {
    res.json({ message: "API do curso Ninja do Cypress" })
})

app.post('/api/users/register', async (req, res) => {

    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({
            error: 'The "name" field is required.'
        })
    }

    if (!email) {
        return res.status(400).json({
            error: 'The "email" field is required.'
        })
    }

    if (!password) {
        return res.status(400).json({
            error: 'The "password" field is required.'
        })
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
            message: 'User registered successfully.',
            user
        })

    } catch (error) {

        // Prisma unique constraint violation
        if (error.code === 'P2002') {
            return res.status(409).json({
                error: 'A user with this email address already exists.'
            })
        }

        console.error(error)

        return res.status(500).json({
            error: 'An unexpected internal server error occurred.'
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// HOT RELOAD - "dev": "nodemon index.js",
// npm install nodemon -D
// npm install cors
//----------------------//
// PARA WINDOWS
// wsl --install
// wsl --list --online
// wsl --install ubuntu
// wsl -d Ubuntu
//----------------------//
// docker compose up
// npm install cypress@14.3.1 -D
// https://fakerjs.dev/
// npm install @faker-js/faker --save-dev
// npm i cypress-plugin-api -D
// https://www.npmjs.com/package/cypress-plugin-api
// npm i pg-promise -D