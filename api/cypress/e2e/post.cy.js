describe('POST /api/users/register', () => {
  it('deve cadastrar um novo usuário', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: {
        name: 'Fernando Papito',
        email: 'papito@gmail.com',
        password: 'pwd123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
    })

  })
})