//import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {

  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201)
      //cy.log(JSON.stringify(response.body))
      expect(response.body.message).to.eq('User registered successfully.')
      //expect(response.body.user.id.toString()).to.match(/^\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })

  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'Ciclops',
      email: 'scott@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)
    
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('A user with this email address already exists.')
    })

  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'storm@xmen.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"name\" field is required.')
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Grey',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"email\" field is required.')
    })
  })

  it('O campo senha deve ser obrigatório', () => {
    const user = {
      name: 'Charles Xavier',
      email: 'xavier@xmen.com'
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  })

})

Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body: user,
    headers: {
      'Content-type': 'application/json'
    },
    failOnStatusCode: false
  })
})