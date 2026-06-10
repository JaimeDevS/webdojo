describe('PUT /api/users/:id', () => {

    context('Atualização', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'Spiderman',
            email: 'spider@marvel.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)
            cy.postUser(originalUser).then(response => {
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {

            cy.putUser(userId, updatedUser).then(response => {
                expect(response.status).to.eq(204)
            })

        })

        after(() => {
            cy.getUsers().then(response => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            })
        })
    })

    context('Campos obrigatórios', () => {
        it('O campo name deve ser obrigatório', () => {
            const user = {
                email: 'storm@xmen.com',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"name\" field is required.')
            })
        })

        it('O campo email deve ser obrigatório', () => {
            const user = {
                name: 'Jean Grey',
                password: 'pwd123'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"email\" field is required.')
            })
        })

        it('O campo senha deve ser obrigatório', () => {
            const user = {
                name: 'Charles Xavier',
                email: 'xavier@xmen.com'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)

                expect(response.body.error).to.eq('The \"password\" field is required.')
            })
        })

        it('Não deve passar quando o JSON está mal formatado', () => {
            const user = `{
                name: 'Magneto',
                email: 'erik@xmen.com'
                password: 'pwd123'
            }`

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid JSON format.')
            })
        })
    })

})