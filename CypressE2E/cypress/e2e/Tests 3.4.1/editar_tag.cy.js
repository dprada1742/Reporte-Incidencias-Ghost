import LoginPage from "../pages 3.4.1/LoginPage";
import NewTagPage from "../pages 3.4.1/NewTagPage";
import TagsPage from "../pages 3.4.1/TagsPage";
import Sidebar from "../pages 3.4.1/Sidebar";

import { faker } from "@faker-js/faker";

let hasScreenshotBeenTaken = false;
describe("Editar tag", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
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

  let naughtValuesName;
  (async function () {
    try {
      const response = await fetch('https://my.api.mockaroo.com/tag_name_chars.json?key=b779c690');
      naughtValuesName = await response.json();
      naughtValuesName.tagName = naughtValuesName.tagName.replace("{", "").replace("}", "")
    } catch (error) {
      throw error
    }
  })().catch(e => { console.error(e) })

  it("Editar tag nombre caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);

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
      cy.wait(1000);

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);

      const tagNameNew = naughtValuesName.tagName;;
      NewTagPage.fillTagName(tagNameNew);
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);

      // Then: Encuentro el tag que cree
      TagsPage.getTagList().contains(tagNameNew).should("exist");
    });
  });

  let naughtValuesDescription;
  (async function () {
    try {
      const response = await fetch('https://my.api.mockaroo.com/tag_description_tags.json?key=b779c690');
      naughtValuesDescription = await response.json();
      naughtValuesDescription.tagDescription = naughtValuesDescription.tagDescription.replace("{", "").replace("}", "")
    } catch (error) {
      throw error
    }
  })().catch(e => { console.error(e) })

  it("Editar tag con descripción de caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);

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
      cy.wait(1000);

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);

      const tagDescriptionNew = naughtValuesDescription.tagDescription;;
      NewTagPage.fillTagDescription(tagDescriptionNew);
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);

       // When: Selecciono el tag que acabo de editar
       TagsPage.editTagByName(tagName);

       // Then: La descripcion no debio cambiar al valor invalido
       NewTagPage.GetTagDescription().invoke("val").should("eq", tagDescriptionNew);
    });
  });

  // 4 escenarios:
  // Editar nombre vacio
  // Editar nombre con 192 caracteres o mas (frontera +1 o mas)
  // Editar Slug con 192 carateres o mas (frontera +1 o mas)
  // Editar Descripcion con 501 carateres o mas (frontera +1 o mas)
  let dynamicData = require('../../fixtures/Tag Tamaños Invalidos');
  dynamicData.forEach((tag) => {
    it("Editar un nuevo tag con tamaños de campos inválidos", () => {
      cy.fixture("loginData").then((data) => {
        const { baseUrl } = data;

        // When: Voy a la seccion de tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        // When: Oprimo el boton New Tag
        TagsPage.createNewTag();

        // When: Lleno todos los campos del formulario de new tag oprimo el boton save
        const tagName = faker.lorem.word();
        const descripcion = faker.lorem.sentence(10);
        const slug = faker.lorem.slug();
        NewTagPage.fillTagName(tagName);
        NewTagPage.fillTagSlug(slug);
        NewTagPage.fillTagDescription(descripcion);
        NewTagPage.save();

        cy.wait(1000);

        // When: Me regreso a la seccion de Tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        // When: Selecciono el tag que acabo de crear
        TagsPage.editTagByName(tagName);
        cy.wait(1000);

        //When lleno campos invalidos
        const tagNameInvalid = tag.tagName;
        const tagSlugInvalid = tag.tagSlug;
        const tagDescriptionInvalid = tag.tagDescription;

        const tagSize = tag.tagName_size;
        const tagSlugSize = tag.tagSlug_size;
        const tagDescriptionSize = tag.tagDescription_size;

        if (tagSize > 191) {
          NewTagPage.fillTagName(tagNameInvalid);
        }

        if (tagSize == 0) {
          NewTagPage.fillTagName(" ");
        }

        if (tagSlugSize > 191) {
          NewTagPage.fillTagSlug(tagSlugInvalid);
        }

        if (tagDescriptionSize > 500) {
          NewTagPage.fillTagDescription(tagDescriptionInvalid);
        }

        NewTagPage.save();

        // When: Me regreso a la seccion de Tags
        TagsPage.visit(baseUrl);
        cy.wait(1000);

        // When: Oprimo el boton leave

        NewTagPage.leave();
        cy.wait(1000);

        // When: Selecciono el tag que acabo de editar
        TagsPage.editTagByName(tagName);

        // Then: La descripcion no debio cambiar al valor invalido
        NewTagPage.GetTagDescription().invoke("val").should("eq", descripcion);
        NewTagPage.GetTagName().invoke("val").should("eq", tagName);
        NewTagPage.GetTagSlug().invoke("val").should("eq", slug);
      });
    });
  });

  it("Editar tag datos validos", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_tags_page")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc1_02_create_new_tag")

      // When: Lleno todos los campos del formulario de new tag oprimo el boton save
      const tagName = faker.lorem.word();
      const descripcion = faker.lorem.sentence(10);
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(descripcion);
      cy.screenshot("sc1_03_fill_tag_data")
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_04_list_tags")

      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc1_05_select_created_tag")

      //When edito el nombre del tag con valor valido y guardo
      const newTagName = faker.lorem.word();
      NewTagPage.fillTagName(newTagName);
      cy.screenshot("sc1_06_edit_created_tag")
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_07_list_tags_after_update")

      // When: Selecciono el tag que acabo de editar
      TagsPage.editTagByName(newTagName);
      cy.screenshot("sc1_08_edit_tag_after_update")

      // Then: La descripcion no debio cambiar
      NewTagPage.GetTagDescription().invoke("val").should("eq", descripcion);
    });
  });

  it("Editar tag nombre repetido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: Voy a la seccion de tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_01_visit_tags_page")

      // When: Oprimo el boton New Tag
      TagsPage.createNewTag();
      cy.screenshot("sc2_02_create_new_tag")

      // When: Lleno todos los campos del formulario de new tag oprimo el boton save
      const tagName = faker.lorem.word();
      const descripcion = faker.lorem.sentence(10);
      NewTagPage.fillTagName(tagName);
      NewTagPage.fillTagSlug(faker.lorem.slug());
      NewTagPage.fillTagDescription(descripcion);
      cy.screenshot("sc2_03_fill_tag_data")
      NewTagPage.save();

      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_04_list_tags")


      // When: Selecciono el tag que acabo de crear
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc2_05_select_created_tag")

      //When edito el nombre del tag con valor valido y guardo
      NewTagPage.fillTagName(tagName);
      cy.screenshot("sc2_06_edit_created_tag")
      NewTagPage.save();
      cy.wait(1000);

      // When: Me regreso a la seccion de Tags
      TagsPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_07_list_tags_after_update")

      // When: Selecciono el tag que acabo de editar
      TagsPage.editTagByName(tagName);
      cy.screenshot("sc2_08_edit_tag_after_update")

      // Then: La descripcion no debio cambiar
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
