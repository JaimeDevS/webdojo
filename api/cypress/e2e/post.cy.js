import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('deve cadastrar um novo usuário', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      //cy.log(JSON.stringify(response.body))
      expect(response.body.message).to.eq('User registered successfully.')
      //expect(response.body.user.id.toString()).to.match(/^\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })

  })
})