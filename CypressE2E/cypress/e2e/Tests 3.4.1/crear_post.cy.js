import LoginPage from "../pages 3.4.1/LoginPage";
import PostPage from "../pages 3.4.1/PostPage";
import NewPostPage from "../pages 3.4.1/NewPostPage";
import Sidebar from "../pages 3.4.1/Sidebar";
import { faker } from '@faker-js/faker';

let hasScreenshotBeenTaken = false;

describe("Crear Post", () => {
  let weakData = require('../../fixtures/fields_post.json');
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login      
      LoginPage.visit(baseUrl);
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);

      if (!hasScreenshotBeenTaken) {
        cy.screenshot("crear_post_login");
        hasScreenshotBeenTaken = true;
      }

      LoginPage.submit();
    });
  });

  it("Crear un nuevo Post con titulo valido y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(5);
      let postContent = faker.lorem.words(10);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });
  
  it("Crear un nuevo Post con titulo valido y contenido vacio", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let emptyContent = weakData[1]['contenido'];

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(5);
      let postContent = emptyContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo vacio y contenido vacio", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let emptyTittle = weakData[0]['contenido'];
      let emptyContent = weakData[1]['contenido'];

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = emptyTittle;
      let postContent = emptyContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo vacio y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let emptyTittle = weakData[0]['contenido'];
      let emptyContent = weakData[1]['contenido'];

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = emptyTittle;
      let postContent = faker.lorem.words(10);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo un solo caracter y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let oneCharacter = weakData[2]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = oneCharacter;
      let postContent = faker.lorem.words(10);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo valido y contenido de un solo caracter", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let oneCharacter = weakData[2]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(3);
      let postContent =  oneCharacter;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo un solo caracter y contenido un solo caracter", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let oneCharacterTittle = weakData[2]['contenido'];
      let oneCharacterContent = weakData[3]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = oneCharacterTittle;
      let postContent =  oneCharacterContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo de treinta y tres palabras y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(33);
      let postContent =  faker.lorem.words(3);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo valido y contenido de mil caracter", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(3);
      let postContent =  faker.lorem.words(1000);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo contenido de mil caracter y contenido de mil caracter", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(33);
      let postContent =  faker.lorem.words(1000);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo con caracter especial y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let oneCharacterTittle = weakData[4]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = oneCharacterTittle;
      let postContent =  faker.lorem.words(3);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo valido y contenido con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let specialCharactersContent = weakData[5]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(3);
      let postContent =  specialCharactersContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo con caracter especial y contenido con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let specialCharactersTittle = weakData[5]['contenido'];
      let specialCharactersContent = weakData[5]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = specialCharactersTittle;
      let postContent =  specialCharactersContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo con inyección de SQL y contenido valido", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let sqlInjectionTittle = weakData[6]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = sqlInjectionTittle;
      let postContent =  faker.lorem.words(3);
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  it("Crear un nuevo Post con titulo valido y contenido con inyección de SQL", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      let sqlInjectionContent = weakData[6]['contenido'];
      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc1_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      let postName = faker.lorem.words(3);
      let postContent =  sqlInjectionContent;
      NewPostPage.fillTitle(postName);
      NewPostPage.fillContent(postContent);
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });

  afterEach(() => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      Sidebar.signOut(baseUrl);
    })
  })
});