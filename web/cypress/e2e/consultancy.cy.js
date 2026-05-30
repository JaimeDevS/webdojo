describe('Formulário de Consultoria', () => {

    // before(() => {
    //     cy.log('Isso acontece antes de todos os testes uma única vez.')
    // })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    // afterEach(() => {
    //     cy.log('Isso acontece depois de cada teste')
    // })

    // after(() => {
    //     cy.log('Isso acontece depois de todos os testes uma única vez.')
    // })

    it('Deve solicitar consultoria individual', () => {

        const consultancyForm = {
            name: 'Fernando Papito',
            email: 'papito@teste.com.br',
            phone: '11 99999-9999',
            consultancyType: 'Individual',
            personType: 'cpf',
            document: '54728393003',
            discoveryChannels: [
                'Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo'
            ],
            file: './cypress/fixtures/document.pdf',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            techs: [
                'Cypress', 'Selenium', 'WebDriverIO', 'Playwright', 'Robot Framework'
            ],
            terms: true,
        }

        cy.get('#name').type(consultancyForm.name)
        cy.get('#email').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.phone)
        //.should('have.value', '(11) 99999-1000')

        // //label[text()="Tipo de Consultoria"]/../select    
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)

        // //span[text()="Pessoa Física"]/..//input
        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should('have.value', '547.283.930-03')


        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input[type=checkbox]')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        const techs = [
            'Cypress', 'Selenium', 'WebDriverIO', 'Playwright', 'Robot Framework'
        ]

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it.only('Deve solicitar consultoria In Company', () => {

        const consultancyForm = {
            name: 'Fernando Papito',
            email: 'papito@teste.com.br',
            phone: '11 99999-9999',
            consultancyType: 'In Company',
            personType: 'cnpj',
            document: '52138313000104',
            discoveryChannels: [
                'LinkedIn',
            ],
            file: './cypress/fixtures/document.pdf',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            techs: [
                'Cypress', 
            ],
            terms: true,
        }

        cy.get('#name').type(consultancyForm.name)
        cy.get('#email').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(consultancyForm.phone)
        //.should('have.value', '(11) 99999-1000')

        // //label[text()="Tipo de Consultoria"]/../select    
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)

        // //span[text()="Pessoa Física"]/..//input
        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(consultancyForm.document)
        //.should('have.value', '547.283.930-03')


        consultancyForm.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input[type=checkbox]')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(consultancyForm.description)

        const techs = [
            'Cypress', 'Selenium', 'WebDriverIO', 'Playwright', 'Robot Framework'
        ]

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 7000 })
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.contains('button', 'Enviar formulário')
            .click()

        //label[text()="Nome Completo *"]/..//p    
        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('have.text', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('have.text', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    })
})

