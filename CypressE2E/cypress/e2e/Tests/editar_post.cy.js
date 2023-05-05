import LoginPage from "../pages/LoginPage";
import PostEditPage from "../pages/PostEditPage";
import PostsPage from "../pages/PostsPage";
import Sidebar from "../pages/Sidebar";

import { CompanyModule, faker } from '@faker-js/faker';

describe("Editar Post", () => {
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
    })
  })

  it("Crear y editar el nombre de un post", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()

      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)

      let newPostName = faker.lorem.words(3);
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(newPostName)

      PostEditPage.getPostContent().click()

      // Then: Encuentro el tag que cree
      PostsPage.visit(baseUrl)
      let postsList = PostsPage.getPostsList()
      postsList.should('contain', newPostName)
      postsList.should('not.contain', postName)
    });
  });

  it("Crear dos posts con nombre diferente y editarlos para que queden con el mismo nombre", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName1 = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName1)

      PostEditPage.getPostContent().click()

      // And: creo otro post
      PostsPage.visit(baseUrl);
      cy.wait(1000)

      PostsPage.visitNewPost(baseUrl);

      let postName2 = faker.lorem.words(3);
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName2)

      PostEditPage.getPostContent().click()

      // And: edito el primer post, colocandole el nombre del segundo
      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName1)

      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName2)

      PostEditPage.getPostContent().click()

      // Then: Encuentro dos posts con el mismo nombre
      PostsPage.visit(baseUrl)
      let postsList = PostsPage.getPostsList()
      postsList.filter(`:contains(${postName2})`).should("have.length", 2)
    });
  });

  it("Crear y editar el tag de un post", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()

      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)

      PostEditPage.clickPostSettings()
      let tagInput = PostEditPage.getTagInput()
      tagInput.click()
      let tagName = faker.lorem.sentence(1);
      tagInput.type(`${tagName}{enter}`)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      PostEditPage.clickBackToPosts()

      // And: vuelvo a la lista de posts
      PostsPage.visit(baseUrl);
      cy.wait(1000)

      // And: verifico que el tag este guardado
      PostsPage.editPostByName(postName)
      PostEditPage.clickPostSettings()

      // Then: Encuentro el tag que cree
      PostEditPage.getTagValue().should('contain', tagName)
    });
  });

  it("Crear y editar la URL de un post", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(1);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()

      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)

      // And: edito la url del post
      PostEditPage.clickPostSettings()

      let newUrl = faker.lorem.words(1);
      let postUrl = PostEditPage.getPostUrl()

      postUrl.click()
      postUrl.clear()
      postUrl.type(newUrl)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      PostEditPage.clickPublishOptions()
      PostEditPage.clickPublishButton()
      PostEditPage.clickConfirmPublishButton()

      cy.wait(1000)
      Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('$ is not defined')) {
          // returning false here prevents Cypress from failing the test
          return false
        }
        // on any other error, Cypress will fail the test
      })

      // Then: Intento ingresar a la pagina con la nueva URL
      cy.visit(baseUrl + newUrl + "/")
      cy.contains(postName).should('exist')
    });
  });
});
