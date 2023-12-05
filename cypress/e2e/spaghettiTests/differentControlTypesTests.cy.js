/// <reference types="cypress" />

describe('Tests for different control types', () => {

    it('Drop-down with select tag test', () => {
        cy.visit("http://www.automationpractice.pl/index.php?id_category=3&controller=category");

        cy.get("#selectProductSort").select('In stock');
        cy.xpath("//div[@id='uniform-selectProductSort']/span").should('have.text', 'In stock')

    });

    it('Autosuggest field test', () => {
        cy.visit("https://www.google.com/");

        cy.xpath("//textarea[@name='q']").type('Cypress automation');
        cy.get(".lnnVSe").should('have.length.greaterThan', 0);
        cy.get(".lnnVSe").each(($el, index, $list) => {
            if ($el.text() == 'cypress automation framework structureХіп-хоп гурт') {
                cy.wrap($el).click();
            }
        })
    });

    it('Radio button and checkbox test', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        cy.get("input[name='radioButton']").each(($el) => {
            cy.wrap($el).click().should('be.checked');
        })

        cy.get("label input[type='checkbox']").each(($el) => {
            cy.wrap($el).click().should('be.checked');
        });
    });

    it('Simple alert - automatically closed by Cypress ', () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
        cy.xpath("//button[@onclick='jsAlert()']").click();

        cy.on('window:alert', (t) => {
            expect(t).to.contains('I am a JS Alert');
        })
        cy.get("#result").should('have.text', 'You successfully clicked an alert');
    });

    it('Confirmation alert - click Cancel button scenario', () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts");
        cy.xpath("//button[@onclick='jsConfirm()']").click();

        cy.on('window:confirm', (t) => {
            expect(t).to.contains('I am a JS Confirm');
        })
        cy.on('window:confirm', () => false);
        cy.get("#result").should('have.text', 'You clicked: Cancel');
    });

    it('Prompt alert - click OK button scenario', () => {
        cy.visit("https://the-internet.herokuapp.com/javascript_alerts");

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Hello Cypress =)');
        })

        cy.xpath("//button[@onclick='jsPrompt()']").click();
        cy.on('window:prompt', (t) => {
            expect(t).to.contains('I am a JS prompt');
        })
        cy.get("#result").should('have.text', 'You entered: Hello Cypress =)');
    });

    it('Authenticated  alert APPROACH 1 (using JSON)', () => {
        cy.visit("https://the-internet.herokuapp.com/basic_auth", {
            auth:
            {
                username: "admin",
                password: "admin"
            }
        });
        cy.get("#content p").should('have.contain', "Congratulations!");
    })

    it('Authenticated  alert APPROACH 2 (using URL)', () => {
        cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");

        cy.get("#content p").should('have.contain', "Congratulations!");
    })

    it('Handle tab - APPROACH 1', () => {
        cy.visit("https://the-internet.herokuapp.com/windows");
        cy.get(".example a").invoke('removeAttr', 'target').click();

        cy.url().should('include', "https://the-internet.herokuapp.com/windows/new");
        cy.get(".example h3").should('have.text', "New Window");

        cy.go('back');
        cy.get(".example h3").should('have.text', "Opening a new window");
    })

    it('Handle tab - APPROACH 2', () => {
        cy.visit("https://the-internet.herokuapp.com/windows");
        cy.get(".example a").then((e) => {
            let elementHrefAttribute = e.prop("href");
            cy.visit(elementHrefAttribute)
        });

        cy.url().should('include', "https://the-internet.herokuapp.com/windows/new");
        cy.get(".example h3").should('have.text', "New Window");
    })

    it.only('Handling Iframes', () => {
        cy.visit("https://the-internet.herokuapp.com/iframe");
        cy.get("#mce_0_ifr").should('exist');

        cy.getIframe("#mce_0_ifr")
            .clear()
            .type('Hello word!!! {ctrl+a}');

        cy.get("button[aria-label='Italic']").click();
        cy.get("button[aria-label='Bold']").click();
    })
});