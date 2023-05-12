import LoginPage from "../pages 3.4.1/LoginPage";
import PostEditPage from "../pages/PostEditPage";
import PostsPage from "../pages/PostsPage";
import Sidebar from "../pages/Sidebar";

import { CompanyModule, faker } from '@faker-js/faker';

let hasScreenshotBeenTaken = false;

describe("Editar Post", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit(baseUrl);
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);
      
      if (!hasScreenshotBeenTaken) {
        cy.screenshot("editar_post_login");
        hasScreenshotBeenTaken = true;
      }

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
      cy.screenshot("sc1_01_create_new_post")
      
      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)
      
      PostEditPage.getPostContent().click()
      cy.screenshot("sc1_02_add_data_post")
      
      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      cy.screenshot("sc1_03_list_posts")
      PostsPage.editPostByName(postName)
      cy.screenshot("sc1_04_edit_created_post")
      
      let newPostName = faker.lorem.words(3);
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(newPostName)
      
      PostEditPage.getPostContent().click()
      cy.screenshot("sc1_05_update_post_data")
      
      // Then: Encuentro el tag que cree
      PostsPage.visit(baseUrl)
      cy.screenshot("sc1_06_list_posts_updated")
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
      cy.screenshot("sc2_01_create_new_post_1")

      let postName1 = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName1)

      PostEditPage.getPostContent().click()
      cy.screenshot("sc2_02_add_data_post_1")

      // And: creo otro post
      PostsPage.visit(baseUrl);
      cy.wait(1000)

      PostsPage.visitNewPost(baseUrl);
      cy.screenshot("sc2_03_create_new_post_2")

      let postName2 = faker.lorem.words(3);
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName2)

      PostEditPage.getPostContent().click()
      cy.screenshot("sc2_04_add_data_post_2")

      // And: edito el primer post, colocandole el nombre del segundo
      PostsPage.visit(baseUrl)
      cy.screenshot("sc2_05_list_posts")
      PostsPage.editPostByName(postName1)
      cy.screenshot("sc2_06_edit_created_post_1")

      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName2)

      PostEditPage.getPostContent().click()
      cy.screenshot("sc2_07_update_post_1_data")

      // Then: Encuentro dos posts con el mismo nombre
      PostsPage.visit(baseUrl)
      cy.screenshot("sc2_08_list_posts_updated")
      let postsList = PostsPage.getPostsList()
      postsList.filter(`:contains(${postName2})`).should("have.length", 2)
    });
  });

  it("Crear y editar el tag de un post", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);
      cy.screenshot("sc3_01_create_new_post")

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()
      cy.screenshot("sc3_02_add_data_post")

      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      cy.screenshot("sc3_03_list_posts")
      PostsPage.editPostByName(postName)
      cy.screenshot("sc3_04_edit_created_post")
      
      PostEditPage.clickPostSettings()
      cy.screenshot("sc3_05_edit_settings_post")
      let tagInput = PostEditPage.getTagInput()
      tagInput.click()
      let tagName = faker.lorem.sentence(1);
      tagInput.type(`${tagName}{enter}`)
      cy.screenshot("sc3_06_add_tag_value")

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      PostEditPage.clickBackToPosts()
      cy.screenshot("sc3_07_save_post_changes")

      // And: vuelvo a la lista de posts
      PostsPage.visit(baseUrl);
      cy.screenshot("sc3_08_list_posts_after_edit")
      cy.wait(1000)

      // And: verifico que el tag este guardado
      PostsPage.editPostByName(postName)
      cy.screenshot("sc3_09_edit_settings_post_after_edit")
      PostEditPage.clickPostSettings()
      cy.screenshot("sc3_10_view_tag")
      
      // Then: Encuentro el tag que cree
      PostEditPage.getTagValue().should('contain', tagName)
    });
  });

  it("Crear y editar la URL de un post", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);
      cy.screenshot("sc4_01_create_new_post")

      let postName = faker.lorem.words(1);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()
      cy.screenshot("sc4_02_add_data_post")

      // And: edito el post que cree
      PostsPage.visit(baseUrl)
      cy.screenshot("sc4_03_list_posts")
      PostsPage.editPostByName(postName)
      cy.screenshot("sc4_04_edit_created_post")

      // And: edito la url del post
      PostEditPage.clickPostSettings()
      cy.screenshot("sc4_05_edit_settings_post")

      let newUrl = faker.lorem.words(1);
      let postUrl = PostEditPage.getPostUrl()

      postUrl.click()
      postUrl.clear()
      postUrl.type(newUrl)
      cy.screenshot("sc4_06_add_url_value")

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)
      PostEditPage.clickPublishOptions()
      PostEditPage.clickPublishButton()
      cy.screenshot("sc4_07_save_post_changes")

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
      cy.screenshot("sc4_08_visit_new_url")

      cy.contains(postName).should('exist')
    });
  });
});
