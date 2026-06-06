import { faker } from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('deve cadastrar um novo usuário', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'pwd123'
    }

    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })

  })
})