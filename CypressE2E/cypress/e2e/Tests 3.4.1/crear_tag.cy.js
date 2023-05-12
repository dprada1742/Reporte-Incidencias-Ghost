import LoginPage from "../pages 3.4.1/LoginPage";
import NewTagPage from "../pages 3.4.1/NewTagPage";
import TagsPage from "../pages 3.4.1/TagsPage";
import Sidebar from "../pages 3.4.1/Sidebar";

import { faker } from "@faker-js/faker";

let hasScreenshotBeenTaken = false;

describe("Crear tag", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit(baseUrl);
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);

      if (!hasScreenshotBeenTaken) {
        cy.screenshot("crear_tag_login");
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

  it("Crea dos tag con el mismo nombre", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_crear_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc1_02_crear_tag")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
      const tagName = faker.lorem.word();
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(10));
      NewTagPage.save();
      cy.screenshot("sc1_03_crear_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_04_crear_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc1_05_crear_tag")

      // When: Lleno todos los campos del formulario de new tag con nombre repetido y oprimo el boton save
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(10));
      NewTagPage.save();
      cy.screenshot("sc1_06_crear_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_07_crear_tag")

      // Then: Deberian tener dos tags con el mismo nombre
      TagsPage.getTagNameList()
        .filter(`:contains(${tagName})`)
        .should("have.length", 2);
    });
  });

  it("Crea un nuevo tag con una descripcion con tamaño mayor a 500", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_01_crear_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc2_02_crear_tag")

      // When: Lleno todos los campos del formulario de new tag con una descipcion invalida (mas 500 caracteres) y oprimo el boton save
      const tagName = faker.lorem.word();
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(100));
      NewTagPage.save();
      cy.screenshot("sc2_03_crear_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_04_crear_tag")

      // When: Oprimo el boton leave
      NewTagPage.leave();
      cy.wait(1000);
      cy.screenshot("sc2_05_crear_tag")

      // Then: No encuentro el tag invalido creado
      TagsPage.getTagList().contains(tagName).should("not.exist");
    });
  });


  it("Crea un nuevo tag correcto y lo valida", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_crear_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc3_02_crear_tag")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
      const tagName = faker.lorem.word();
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(faker.lorem.sentence(10));
      NewTagPage.save();
      cy.screenshot("sc3_03_crear_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_04_crear_tag")

      // Then: Encuentro el tag que cree
      TagsPage.getTagList().contains(tagName).should("exist");
    });
  });

  it("Crea un nuevo tag con slug vacio", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_01_crear_tag")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc4_02_crear_tag")

      // When: Lleno todos los campos del formulario de new tag dejo vacio el slug y oprimo el boton save
      const tagName = faker.lorem.word();
      NewTagPage.fillTagName(tagName);
      NewTagPage.clearSlug();
      NewTagPage.fillTagDescription(faker.lorem.sentence(10));
      NewTagPage.save();
      cy.screenshot("sc4_03_crear_tag")

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_04_crear_tag")

      // Then: Encuentro el tag que cree
      TagsPage.getTagList().contains(tagName).should("exist");
    });
  });

});
