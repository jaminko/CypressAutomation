import womenPage from '../pages/womenPage';
import testData from '../../../fixtures/testData.json'

const WOMEN_PAGE_URL = testData.womenPageUrl;
const DROP_DOWN_OPTIONS = ['In stock', 'Price: Highest first', 'Reference: Lowest first', 'Price: Lowest first', 'Reference: Lowest first'];

describe('Test for different control types', () => {

    it('Can drop-down be selected test', () => {
        cy.visit(WOMEN_PAGE_URL);

        DROP_DOWN_OPTIONS.forEach(option =>
            womenPage.selectDropDown(option)
        );
    });
});