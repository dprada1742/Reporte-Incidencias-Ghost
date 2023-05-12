import LoginPage from "../pages 3.4.1/LoginPage";
import NewTagPage from "../pages 3.4.1/NewTagPage";
import TagsPage from "../pages 3.4.1/TagsPage";
import Sidebar from "../pages 3.4.1/Sidebar";

import { faker } from "@faker-js/faker";

let hasScreenshotBeenTaken = false;
describe("Editar tag", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit(baseUrl);
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);

      if (!hasScreenshotBeenTaken) {
        cy.screenshot("editar_tag_login");
        hasScreenshotBeenTaken = true;
      }

      LoginPage.submit();
    });
  });

  afterEach(() => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      Sidebar.signOut(baseUrl);
    });
  });

  it("Editar tag datos validos", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();

      // When: Lleno todos los campos del formulario de new tag oprimo el boton save
      const tagName = faker.lorem.word();
      const descripcion = faker.lorem.sentence(10);
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(descripcion);
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);

      //When edito el nombre del tag con valor valido y guardo
      const newTagName = faker.lorem.word();
      NewTagPage.fillTagName(newTagName);
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);

      // When: Selecciono el tag que acabo de editar
      TagsPage.editTagByName(newTagName);

      // Then: La descripcion no debio cambiar
      NewTagPage.GetTagDescription().invoke("val").should("eq", descripcion);
    });
  });

  it("Editar tag nombre repetido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();

      // When: Lleno todos los campos del formulario de new tag oprimo el boton save
      const tagName = faker.lorem.word();
      const descripcion = faker.lorem.sentence(10);
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(descripcion);
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);

      //When edito el nombre del tag con valor valido y guardo
      NewTagPage.fillTagName(tagName);
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);

      // When: Selecciono el tag que acabo de editar
      TagsPage.editTagByName(tagName);

      // Then: La descripcion no debio cambiar
      NewTagPage.GetTagDescription().invoke("val").should("eq", descripcion);
    });
  });



  it("Editar un nuevo tag con una descripcion con tamaño mayor a 500", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_editar_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc3_02_editar_tag")

      // When: Lleno todos los campos del formulario de new tag oprimo el boton save
      const tagName = faker.lorem.word();
      const descripcion = faker.lorem.sentence(10);
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(descripcion);
      NewTagPage.save();
      cy.screenshot("sc3_03_editar_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_04_editar_tag")

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc3_05_editar_tag")

      //When edito la descripcion con valor invalido (mas de 500 caracteres) y guardo
      NewTagPage.fillTagDescription(faker.lorem.sentence(100));
      NewTagPage.save();
      cy.screenshot("sc3_06_editar_tag")

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_07_editar_tag")

      // When: Oprimo el boton leave
    
      NewTagPage.leave();
      cy.wait(1000);
      cy.screenshot("sc3_08_editar_tag")

      // When: Selecciono el tag que acabo de editar
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc3_09_editar_tag")

      // Then: La descripcion no debio cambiar al valor invalido
      NewTagPage.GetTagDescription().invoke("val").should("eq", descripcion);
    });
  });

  it("Crea un nuevo tag y lo edita con slug vacio", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.screenshot("sc4_01_visit_tags")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc4_02_create_new_tag")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
      const tagName = faker.lorem.word();
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(10));
      
      cy.screenshot("sc4_03_fill_tag_data")
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags y selecciono el tag creado
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_04_list_tags")
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc4_05_edit_created_tag")

      // When: Limpio el valor de slug y oprimo el boton save
      NewTagPage.clearSlug();
      
      cy.screenshot("sc4_06_delete_tag")
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags y edito el tag nuevamente
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_07_list_tags_after_update")
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc4_08_edit_tag_after_update")

      // Then: Encuentro el tag que cree
      NewTagPage.getSlugField().should(($input) => {
        expect($input.val()).not.to.be.empty;
      });
    });
  });
});
