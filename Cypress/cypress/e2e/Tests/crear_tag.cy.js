import LoginPage from "../pages/LoginPage";
import NewTagPage from "../pages/NewTagPage";
import TagsPage from "../pages/TagsPage";

describe("Crear tag", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit();
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);
      LoginPage.submit();
    });
  });

  it("Crea un nuevo tag correcto y lo valida", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
      cy.url().should("eq", baseUrl + NewTagPage.url);

      NewTagPage.fillTagName("Nuevo tag");
      NewTagPage.fillTagSlug("nuevo-tag");
      NewTagPage.save();

      // When: Me regreso a la seccion de Tags

      // Then: Encuentro el tag que cree
    });
  });
});
