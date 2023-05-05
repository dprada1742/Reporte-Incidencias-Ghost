import LoginPage from "../pages/LoginPage";
import NewTagPage from "../pages/NewTagPage";
import TagsPage from "../pages/TagsPage";

import faker from 'faker';

describe("Crear tag", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit(baseUrl);
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
 
      NewTagPage.fillTagName(faker.lorem.word());
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(5));
      NewTagPage.save();

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);

      // Then: Encuentro el tag que cree

      TagsPage.getTagList().contains(tagName).should('exist');
    });
  });
});
