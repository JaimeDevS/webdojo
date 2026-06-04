describe('Login', () => {

  function getTodayDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }

  it.only('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    //cy.wait(3000) 

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getTodayDate())
    })

  })

  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})

//SUBFUNÇÕES
//.only
//.skip

//EXECUTAR TODOS OS TESTES
//npx cypress run
//npx cypress run --headed

//MUDAR DE NAVEGADOR
//npx cypress run --browser=chrome