import practicePage from '../pages/womenPage';
import testData from '../../../fixtures/testData.json'

const PAGE_URL = testData.womenPageUrl;
const DROP_DOWN_OPTIONS = ['In stock', 'Price: Highest first', 'Reference: Lowest first', 'Price: Lowest first', 'Reference: Lowest first'];

describe('Test for different control types', () => {

    it('Can drop-down be selected test', () => {
        cy.visit(PAGE_URL);

        DROP_DOWN_OPTIONS.forEach(option =>
            practicePage.selectDropDown(option)
        );
    });
});