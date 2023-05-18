import LoginPage from "../pages 3.4.1/LoginPage";
import PostEditPage from "../pages 3.4.1/PostEditPage";
import PostsPage from "../pages 3.4.1/PostsPage";
import Sidebar from "../pages 3.4.1/Sidebar";

import { faker } from '@faker-js/faker';

let hasScreenshotBeenTaken = false;
describe("Editar Post", () => {
  let aprioriData = require('../../fixtures/Post Length.json');

  beforeEach(() => {
    cy.viewport(1600, 900);
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

  aprioriData.forEach((post) => {
    it("Crear y editar el post superando longitudes máximas", () => {
      cy.fixture("loginData").then((data) => {
        const { baseUrl } = data;

        // When: creo un nuevo post
        PostsPage.visitNewPost(baseUrl);

        let postName = faker.lorem.words(3);
        let titleField = PostEditPage.getPostTitle()
        titleField.clear()
        titleField.type(postName)

        PostEditPage.getPostContent().click()
        PostEditPage.saveChanges()
        cy.wait(1000)

        // And: edito el post que cree
        PostsPage.visit(baseUrl)

        PostsPage.editPostByName(postName)

        let newPostName = post.post_title;
        titleField = PostEditPage.getPostTitle()
        titleField.clear()
        titleField.type(newPostName)

        PostEditPage.clickPostSettings()
        // And: edito la meta data del post que cree
        PostEditPage.clickMetaButton()
        PostEditPage.fillMetaTitle(post.post_meta_title)
        PostEditPage.fillMetaDescription(post.post_meta_description)
        PostEditPage.clickBackSettings()

        // And: edito la twitter data del post que cree
        PostEditPage.clickTwitterButton()
        PostEditPage.fillTwitterTitle(post.post_twitter_title)
        PostEditPage.clickBackSettings()

        PostEditPage.clickClosePostSettings()
        PostEditPage.saveChanges()
        cy.wait(1000)

        // Then: Genera error
        PostEditPage.getErrorBanner().should('exist')
      });
    });
  });

  let naughtyPostValue;
  (async function () {
    try {
      const response = await fetch('https://my.api.mockaroo.com/post_special_characters.json?key=8daae1b0');
      naughtyPostValue = await response.json();
      naughtyPostValue.post_title = naughtyPostValue.post_title.replaceAll("{", "").replaceAll("}", "")
    } catch (error) {
      throw error
    }
  })().catch(e => { console.error(e) })

  it("Crear y editar un post con un nombre con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()
      PostEditPage.saveChanges()
      cy.wait(1000)

      // And: edito el post que cree
      PostsPage.visit(baseUrl)

      PostsPage.editPostByName(postName)

      let newPostName = naughtyPostValue.post_title;
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(newPostName)

      // And: edito el tag 
      PostEditPage.clickPostSettings()
      let tagInput = PostEditPage.getTagInput()
      tagInput.click()
      tagInput.type(`${naughtyPostValue.post_tag}{enter}`)

      // And: edito el excerpt 
      let excerptInput = PostEditPage.getExcerptInput()
      excerptInput.click()
      excerptInput.type(naughtyPostValue.post_excerpt)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)
      PostsPage.visit(baseUrl)

      let postsList = PostsPage.getPostsList()
      postsList.should('contain', naughtyPostValue.post_title)
    })
  });

  let naughtyTagValue;
  (async function () {
    try {
      const response = await fetch('https://my.api.mockaroo.com/post_tag_special_characters.json?key=8daae1b0');
      naughtyTagValue = await response.json();
      naughtyTagValue.post_tag = naughtyTagValue.post_tag.replaceAll("{", "").replaceAll("}", "")
    } catch (error) {
      throw error
    }
  })().catch(e => { console.error(e) })

  it("Crear y editar un post con un nombre con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()
      PostEditPage.saveChanges()
      cy.wait(1000)

      // And: edito el post que cree
      PostsPage.visit(baseUrl)

      PostsPage.editPostByName(postName)

      let newPostName = naughtyTagValue.post_title;
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(newPostName)

      // And: edito el tag 
      PostEditPage.clickPostSettings()
      let tagInput = PostEditPage.getTagInput()
      tagInput.click()
      tagInput.type(`${naughtyTagValue.post_tag}{enter}`)

      // And: edito el excerpt 
      let excerptInput = PostEditPage.getExcerptInput()
      excerptInput.click()
      excerptInput.type(naughtyTagValue.post_excerpt)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)

      // And: edito el post que cree
      PostsPage.visit(baseUrl)

      PostsPage.editPostByName(naughtyTagValue.post_title)

      // Then: Validar tag and excerpt

      PostEditPage.clickPostSettings()
      PostEditPage.getTagInput().should('contain', naughtyTagValue.post_tag);
    })
  });

  let naughtyExceptValue;
  (async function () {
    try {
      const response = await fetch('https://my.api.mockaroo.com/post_excerpt_special_characters.json?key=8daae1b0');
      naughtyExceptValue = await response.json();
      naughtyExceptValue.post_excerpt = naughtyPostValue.post_excerpt.replaceAll("{", "").replaceAll("}", "")
    } catch (error) {
      throw error
    }
  })().catch(e => { console.error(e) })

  it("Crear y editar un post con un nombre con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      // When: creo un nuevo post
      PostsPage.visitNewPost(baseUrl);

      let postName = faker.lorem.words(3);
      let titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(postName)

      PostEditPage.getPostContent().click()
      PostEditPage.saveChanges()
      cy.wait(1000)

      // And: edito el post que cree
      PostsPage.visit(baseUrl)

      PostsPage.editPostByName(postName)

      let newPostName = naughtyExceptValue.post_title;
      titleField = PostEditPage.getPostTitle()
      titleField.clear()
      titleField.type(newPostName)

      // And: edito el tag 
      PostEditPage.clickPostSettings()
      let tagInput = PostEditPage.getTagInput()
      tagInput.click()
      tagInput.type(`${naughtyExceptValue.post_tag}{enter}`)

      // And: edito el excerpt 
      let excerptInput = PostEditPage.getExcerptInput()
      excerptInput.click()
      excerptInput.type(naughtyExceptValue.post_excerpt)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)

      // And: edito el post que cree
      PostsPage.visit(baseUrl)

      PostsPage.editPostByName(naughtyExceptValue.post_title)

      // Then: Validar tag and excerpt

      PostEditPage.clickPostSettings()
      PostEditPage.getExcerptInput().invoke('val')
        .then((value) => {
          cy.log(value)
          expect(value).to.equal(naughtyExceptValue.post_excerpt);
        });
    })
  });

  it("Crear y editar la URL de un post con una URL de 185 caracteres", () => {
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

      let newUrl = faker.lorem.words(150).replaceAll(" ", "-").slice(0, 185);
      let postUrl = PostEditPage.getPostUrl()

      postUrl.click()
      postUrl.clear()
      postUrl.type(newUrl)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)

      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)
      PostEditPage.clickPostSettings()

      PostEditPage.getPostUrl().invoke('val')
        .then((value) => {
          if (newUrl.endsWith("-")) {
            newUrl = newUrl.slice(0, -1);
          }
          expect(value).to.equal(newUrl);
        });
    });
  });

  it("Crear y editar la URL de un post con una URL de 186 caracteres", () => {
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

      let newUrl = faker.lorem.words(150).replaceAll(" ", "-").slice(0, 186);
      let postUrl = PostEditPage.getPostUrl()

      postUrl.click()
      postUrl.clear()
      postUrl.type(newUrl)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)

      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)
      PostEditPage.clickPostSettings()

      PostEditPage.getPostUrl().invoke('val')
        .then((value) => {
          newUrl = newUrl.slice(0, 185)
          if (newUrl.endsWith("-")) {
            newUrl = newUrl.slice(0, -1);
          }

          expect(value).to.equal(newUrl);
        });
    });
  });

  it("Editar autor inexistente", () => {
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

      // And: edito autores del post
      let autor = faker.name.fullName()
      PostEditPage.clickPostSettings()
      let autorInput = PostEditPage.getAutorInput()
      autorInput.click()
      autorInput.type(autor)

      PostEditPage.clickClosePostSettings()
      PostEditPage.saveChanges()
      cy.wait(1000)

      PostsPage.visit(baseUrl)
      PostsPage.editPostByName(postName)
      PostEditPage.clickPostSettings()

      PostEditPage.getAutorInput().find('li')
        .each(($li) => {
          const text = $li.text();
          expect(text).to.not.include(autor);
        });
    });
  });
});
