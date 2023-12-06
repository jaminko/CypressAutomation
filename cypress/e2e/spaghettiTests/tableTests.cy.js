/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Handle table elements', () => {

    beforeEach('Navigate to the testing page', () => {
        cy.visit("https://the-internet.herokuapp.com/tables");
    })


    it('Check table rows & columns', () => {
        let tableRows = cy.get("#table1 tbody tr");
        tableRows.each(($row, index, $rows) => {
            cy.wrap($row).within(() => {
                cy.get("td").each(($col, index, $cols) => {
                    cy.log($col.text())
                })
            })
        })

        let tableColumns = cy.get("#table1 thead tr th");
        tableColumns.should('have.length', 6);
        let expectedSignatures = ["Last Name", "First Name", "Email", "Due", "Web Site", "Action"];
        let actualSignature = [];

        for (let i = 1; i <= 6; i++) {
            let targetColumn = cy.xpath("//table[@id='table1']/thead/tr/th [" + [i] + "]");
            targetColumn.then((e) => {
                let signature = e.text();
                actualSignature.push(signature);

                expect(expectedSignatures).to.include.members(actualSignature)
            })
        }
    })
});