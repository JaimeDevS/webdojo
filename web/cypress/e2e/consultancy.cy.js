//import consultancyData from '../fixtures/consultancy.json'
import { personal, company } from '../fixtures/consultancy.json'

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

        cy.get('#name').type(personal.name)
        cy.get('#email').type(personal.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(personal.phone)
        //.should('have.value', '(11) 99999-1000')

        // //label[text()="Tipo de Consultoria"]/../select    
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)

        // //span[text()="Pessoa Física"]/..//input
        if (personal.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (personal.personType === 'cnpj') {
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
            .type(personal.document)
        //.should('have.value', '547.283.930-03')


        personal.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input[type=checkbox]')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)

        const techs = [
            'Cypress', 'Selenium', 'WebDriverIO', 'Playwright', 'Robot Framework'
        ]

        personal.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (personal.terms === true) {
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

    it('Deve solicitar consultoria In Company', () => {

        cy.get('#name').type(company.name)
        cy.get('#email').type(company.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(company.phone)
        //.should('have.value', '(11) 99999-1000')

        // //label[text()="Tipo de Consultoria"]/../select    
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancyType)

        // //span[text()="Pessoa Física"]/..//input
        if (company.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input[type=radio]')
                .check()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (company.personType === 'cnpj') {
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
            .type(company.document)
        //.should('have.value', '547.283.930-03')


        company.discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input[type=checkbox]')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)

        const techs = [
            'Cypress', 'Selenium', 'WebDriverIO', 'Playwright', 'Robot Framework'
        ]

        company.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (company.terms === true) {
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

