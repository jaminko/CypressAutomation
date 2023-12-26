import "cypress-file-upload";

describe("BASIC TEST SUITE - its my introduction to cypress", () => {
  const PAGE_URL = "http://www.automationpractice.pl";

  it("Perform a search with valid search query - V1", () => {
    cy.visit(PAGE_URL);
    cy.title().should("eq", "My Shop");

    cy.get(".search_query", { setTimeout: 5000 }).type("dress").type("{enter}");
    cy.get(".page-heading").should("be.visible");
    cy.get(".lighter").contains("dress");

    cy.title().should("eq", "Search - My Shop");
  });

  it("Perform a search with valid search query - V2", () => {
    cy.visit(PAGE_URL);
    cy.title().should("eq", "My Shop");

    cy.xpath("//input[@id='search_query_top']").type("dress");
    cy.xpath("//input[@id='search_query_top']").type("{enter}");

    cy.xpath("//ul[@class='product_list grid row']/li").should(
      "have.length",
      7
    );
  });

  it("Mouse actions - hovering", () => {
    cy.visit("https://demo.opencart.com/");
    cy.xpath("//a[contains(text(),'Mac (1)')]").should("not.be.visible");

    cy.xpath("//body/main[1]/div[1]/nav[1]/div[2]/ul[1]/li[1]/a[1]")
      .trigger("mouseover")
      .click();
    cy.xpath("//a[contains(text(),'Mac (1)')]").should("be.visible");
  });

  it("Mouse actions - right click", () => {
    cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html");

    //Approach 1
    cy.xpath("//span[@class='context-menu-one btn btn-neutral']").trigger(
      "contextmenu"
    );
    cy.get(".context-menu-icon-copy").should("be.visible");
    cy.get(".context-menu-icon-copy").click();
    cy.get(".context-menu-icon-copy").should("not.be.visible");

    //Approach 2
    cy.xpath("//span[@class='context-menu-one btn btn-neutral']").rightclick();
    cy.get(".context-menu-icon-copy").should("be.visible");
  });

  it("Mouse actions - double click", () => {
    cy.visit("https://demo.opencart.com/index.php?route=account/login");

    cy.get("#input-email").type("wellcome").dblclick();
    cy.get("#input-email").should("have.value", "wellcome");

    cy.get("#input-email").type("{enter}");
    cy.get("#input-email").should("have.value", "");
  });

  it("Mouse actions - page scrolling", () => {
    cy.visit("https://www.countries-ofthe-world.com/flags-of-the-world.html");

    // Scrolling to Ukraine flag
    cy.xpath("//img[@alt='Flag of Ukraine']").scrollIntoView({
      duration: 2000,
    });
    cy.xpath("//img[@alt='Flag of Ukraine']").should("be.visible");

    // Scrolling to Mexico flag
    cy.xpath("//img[@alt='Flag of Mexico']").scrollIntoView({ duration: 2000 });
    cy.xpath("//img[@alt='Flag of Mexico']").should("be.visible");
  });

  it("File upload", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#file-upload").attachFile("fileToUpload1.txt");
    cy.get("#file-submit").click();

    cy.get(".example").should("contain", "File Uploaded!");
  });

  it("File upload with file renaming", () => {
    cy.visit("https://the-internet.herokuapp.com/upload");

    cy.get("#file-upload").attachFile({
      filePath: "fileToUpload1.txt",
      fileName: "newName.txt",
    });
    cy.get("#file-submit").click();

    cy.get("#uploaded-files").should("contain", "newName.txt");
  });

  it("Multiple file upload", () => {
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");

    cy.get("#filesToUpload").attachFile([
      "fileToUpload1.txt",
      "fileToUpload2.txt",
    ]);

    cy.get("#fileList")
      .should("contain", "fileToUpload1.txt")
      .should("contain", "fileToUpload2.txt");
  });

  // For some reason this test doesn't work on my end
  /*     it.only('File upload for shadow DOM', () => {
            cy.visit("https://web.dev/articles/shadowdom-v1");
            cy.get(".demoarea").scrollIntoView({ duration: 2000 });
    
            cy.xpath('//body/section[1]/section[1]/main[1]/devsite-content[1]/article[1]/div[2]/figure[1]/iframe[1]')
                .then(cy.wrap)
                .shadow("//button[text()='Tab 3']", { includeShadowDom: true }).should('be.visible');
        }); */

  it("Click on the link using custom command", () => {
    cy.visit(
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account"
    );
    cy.clickLink("Women");
    cy.isPageTitleCorrect("Women - My Shop");
    cy.isPageUrlIncludeTargetPath("id_category=3&controller=category");
    cy.get(".breadcrumb").should("contain", "Women");
  });

  it("Test with overwritting existing command", () => {
    cy.visit(
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account"
    );
    cy.clickLink("Women");
    cy.isPageTitleCorrect("Women - My Shop");
    cy.isPageUrlIncludeTargetPath("id_category=3&controller=category");
    cy.get(".breadcrumb").should("contain", "Women");
  });

  it("Navigation feature test", () => {
    // Home page
    cy.visit(
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account"
    );
    cy.isPageTitleCorrect("Login - My Shop");
    // After clicking navigate to the 'Women' page
    cy.get("a[title='Women']").click();
    cy.isElementHasCorrectSignature(
      cy.get("h2[class= 'title_block']"),
      "Women"
    );
    // Go back to the Home page
    cy.go("back");
    cy.isPageTitleCorrect("Login - My Shop");
    // Forward to the 'Women' page
    cy.go("forward");
    cy.isPageTitleCorrect("Women - My Shop");
    // Go back using index
    cy.go(-1);
    cy.isPageTitleCorrect("Login - My Shop");
    // Forward using index
    cy.go(1);
    cy.isPageTitleCorrect("Women - My Shop");
    // Page reload
    cy.reload();
  });

  it("Screenshot feature test", () => {
    // Capture page and element screenshots manualy
    cy.visit(
      "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account"
    );
    // cy.screenshot("homepage");
    // cy.get("a[title='Women']").screenshot("block_top_menu_Women_item");

    // Capture screenshots and video automatically on failure (only when running from the command prompt)
    // cy.isPageTitleCorrect('Women - My Shop');
  });
});
