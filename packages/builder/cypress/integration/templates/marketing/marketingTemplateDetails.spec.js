import filterTests from "../../../support/filterTests"

filterTests(["all"], () => {
  context("Verify Marketing Template Details", () => {

    before(() => {
      cy.login()

      // Template navigation
      cy.request(`${Cypress.config().baseUrl}/api/applications?status=all`)
      .its("body")
      .then(val => {
        if (val.length > 0) {
          cy.get(".spectrum-Button").contains("Templates").click({force: true})
        }
      })

      // Filter Marketing Templates
      cy.get(".template-category-filters").within(() => {
        cy.get('[data-cy="Marketing"]').click()
      })
    })

  it("should verify the details option for Marketing templates", () => {
    cy.get(".template-grid").find(".template-card").its('length')
    .then(len => {
        // Verify template name is within details link
      for (let i = 0; i < len; i++) {
        cy.get(".template-card").eq(i).within(() => {
          const templateName = cy.get(".template-thumbnail-text")
          templateName.invoke('text')
          .then(templateNameText => {
            const templateNameParsed = templateNameText.toLowerCase().replace(/\s+/g, '-')
            
            if (templateNameText == "Lead Generation Form") {
                // Multi-step lead form
                // Template name includes 'multi-step-lead-form'
                cy.get('a')
                .should('have.attr', 'href').and('contain', 'multi-step-lead-form')
            }
            else {
                cy.get('a').should('have.attr', 'href').and('contain', templateNameParsed)
            }
          })
          // Verify correct status from Details link - 200
          cy.get('a')
          .then(link => {
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
          })
        })
      }
    })
  })
})
})
