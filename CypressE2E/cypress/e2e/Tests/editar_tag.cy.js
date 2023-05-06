import LoginPage from "../pages/LoginPage";
import NewTagPage from "../pages/NewTagPage";
import TagsPage from "../pages/TagsPage";
import Sidebar from "../pages/Sidebar";

import { faker } from "@faker-js/faker";

describe("Editar tag", () => {
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
    
    afterEach(() => {
        cy.fixture("loginData").then((data) => {
            const { baseUrl } = data;
            Sidebar.signOut(baseUrl);
        });
    });

    it("Crea un nuevo tag y lo edita con slug vacio", () => {
        cy.fixture("loginData").then((data) => {
            const { baseUrl } = data;

            // When: Voy a la seccion de tags
            TagsPage.visit(baseUrl);

            // When: Oprimo el boton New Tag
            TagsPage.createNewTag();

            // When: Lleno todos los campos del formulario de new tag y oprimo el boton save
            const tagName = faker.lorem.word();
            NewTagPage.fillTagName(tagName);
            NewTagPage.fillTagSlug(faker.lorem.slug());
            NewTagPage.fillTagDescription(faker.lorem.sentence(10));
            NewTagPage.save();

            cy.wait(1000);

            // When: Me regreso a la seccion de Tags y selecciono el tag creado
            TagsPage.visit(baseUrl);
            TagsPage.editTagByName(tagName)

            // When: Limpio el valor de slug y oprimo el boton save
            NewTagPage.clearSlug();
            NewTagPage.save();

            cy.wait(1000);

            // When: Me regreso a la seccion de Tags y edito el tag nuevamente
            TagsPage.visit(baseUrl);
            TagsPage.editTagByName(tagName)

            // Then: Encuentro el tag que cree
            NewTagPage.getSlugField()
                .should(($input) => {
                    expect($input.val()).not.to.be.empty
                })
        });
    });
});