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

  // Todos los campos estan debajo de las fronteras
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

  // 4 escenarios:
  // Nombre vacio 
  // Nombre con 192 caracteres o mas (frontera +1 o mas)
  // Slug con 192 carateres o mas (frontera +1 o mas)
  // Descripcion con 501 carateres o mas (frontera +1 o mas)
  let dynamicData = require('../../fixtures/Tag Tamaños Invalidos');
  dynamicData.forEach((tag) => {
    it("Crea un nuevo con tamaños de campos inválidos", () => {
      cy.fixture("loginData").then((data) => {
        const { baseUrl } = data;

        // When: Voy a la seccion de tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        // When: Oprimo el boton New Tag
        TagsPage.createNewTag();
        cy.wait(1000);

        // When: Lleno todos los campos del formulario de new tag en donde el nombre, slug o Descripcion tienen un tamaño invalido  y oprimo el boton save
        const tagName = tag.tagName;
        const tagSlug = tag.tagSlug;
        const tagDescription = tag.tagDescription;

        if (tagName != "") {
          NewTagPage.fillTagName(tagName);
        }
        NewTagPage.fillTagSlug(tagSlug);
        NewTagPage.fillTagDescription(tagDescription);
        NewTagPage.save();

        cy.wait(1000);

        // When: Me regreso a la seccion de Tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        if (tagName != "") {
          // When: Oprimo el boton leave
          NewTagPage.leave();
          cy.wait(2000);

          // Then: No encuentro el tag invalido creado
          TagsPage.getTagList().contains(tagName).should("not.exist");
          cy.wait(2000);
        } else {
          const found = NewTagPage.leave();
          cy.wait(2000);
          expect(found).to.equal(true);
          cy.wait(2000);
        }
      });
    });
  });

  // 3 escenarios:
  // Nombre con 191 caracteres o mas (frontera)
  // Slug con 191 carateres o mas (frontera)
  // Descripcion con 500 carateres o mas (frontera)
  let dynamicDataFrontera = require('../../fixtures/Tag Tamaños Frontera');
  dynamicDataFrontera.forEach((tag) => {
    it("Crea un nuevo con tamaños de campos frontera", () => {
      cy.fixture("loginData").then((data) => {
        const { baseUrl } = data;

        // When: Voy a la seccion de tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        // When: Oprimo el boton New Tag
        TagsPage.createNewTag();
        cy.wait(1000);

        // When: Lleno todos los campos del formulario de new tag en donde el nombre, slug o Descripcion tienen un tamaño invalido  y oprimo el boton save
        const tagName = tag.tagName;
        const tagSlug = tag.tagSlug;
        const tagDescription = tag.tagDescription;

        NewTagPage.fillTagName(tagName);
        NewTagPage.fillTagSlug(tagSlug);
        NewTagPage.fillTagDescription(tagDescription);
        NewTagPage.save();

        cy.wait(1000);

        // When: Me regreso a la seccion de Tags
        TagsPage.visit(baseUrl);
        cy.wait(2000);

        // Then: Encuentro el tag que cree
        TagsPage.getTagList().contains(tagName).should("exist");
        cy.wait(2000);
      });
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
