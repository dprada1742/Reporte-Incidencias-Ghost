import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import NewPostPage from "../pages/NewPostPage";
import Sidebar from "../pages/Sidebar";

let hasScreenshotBeenTaken = false;

describe("Crear Post", () => {
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

  it("Crea un nuevo post", () => {
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
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. " + 
                              "Mauris at dui eget ante volutpat elementum at sit amet nunc. "+
                              "Praesent bibendum bibendum diam, consectetur tincidunt metus condimentum eu.");
      
      cy.screenshot("sc1_03_fill_post");

      NewPostPage.publish();
      NewPostPage.comfirmPublish();

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc1_04_post_created")
      NewPostPage.assertMessage('Published');
    });
  });  

  it("Crear Nuevo Post con Título vacío", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc2_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle(" ");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. " + 
                              "Mauris at dui eget ante volutpat elementum at sit amet nunc. "+
                              "Praesent bibendum bibendum diam, consectetur tincidunt metus condimentum eu.");

      cy.screenshot("sc2_03_fill_post");

      NewPostPage.publish()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc2_04_post_created")
      NewPostPage.assertMessage('Published')
    });
  });

  it("Crear Nuevo Post con Contenido vacío", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc3_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent(" ");

      cy.screenshot("sc3_03_fill_post");

      NewPostPage.publish()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc3_04_post_created")
      NewPostPage.assertMessage('Published')
    });
  });

  it("Crear Nuevo Post y agendarlo para su publicación", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_01_visit_post_page")

      // When: Oprimo el boton New Post
      PostPage.createNewPost();
      cy.screenshot("sc4_02_new_post")

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. ")
      
      cy.screenshot("sc4_03_fill_post");

      NewPostPage.publish()
      NewPostPage.schedule()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      cy.screenshot("sc4_04_post_scheduled")
      NewPostPage.assertMessage('Scheduled')
      
    });
  });  

  afterEach(() => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      Sidebar.signOut(baseUrl);
    })
  })
});
