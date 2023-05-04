import LoginPage from '../pages/LoginPage'

describe('Crear tag', () => {

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      const { email, password } = data;
      
      // Given: ingreso a la pagina y hago login
      LoginPage.visit()
      LoginPage.fillEmail(email)
      LoginPage.fillPassword(password)
      LoginPage.submit()
    });
  });

  it('Crea un nuevo tag correcto y lo valida', () => {
   
    // When: Voy a la seccion de tags
    cy.contains('Tags').click()

    // When: Oprimo el boton New Tag
    cy.contains('New tag').click()

    // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
    const newTagPage = new NewTagPage()
    newTagPage.fillName('Nuevo tag')
    newTagPage.fillSlug('nuevo-tag')
    newTagPage.save()

    // When: Me regreso a la seccion de Tags
    cy.contains('Tags').click()

    // Then: Encuentro el tag que cree
    cy.contains('Nuevo tag')
  })
})