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

      // When: Oprimo el boton New Post
      PostPage.createNewPost();

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. " + 
                              "Mauris at dui eget ante volutpat elementum at sit amet nunc. "+
                              "Praesent bibendum bibendum diam, consectetur tincidunt metus condimentum eu.");

      NewPostPage.publish()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      NewPostPage.assertMessage('Published')
    });
  });  

  it("Crear Nuevo Post con Título vacío", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);

      // When: Oprimo el boton New Post
      PostPage.createNewPost();

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle(" ");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. " + 
                              "Mauris at dui eget ante volutpat elementum at sit amet nunc. "+
                              "Praesent bibendum bibendum diam, consectetur tincidunt metus condimentum eu.");

      NewPostPage.publish()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      NewPostPage.assertMessage('Published')
    });
  });

  it("Crear Nuevo Post con Contenido vacío", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);

      // When: Oprimo el boton New Post
      PostPage.createNewPost();

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent(" ");

      NewPostPage.publish()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
      NewPostPage.assertMessage('Published')
    });
  });

  it("Crear Nuevo Post y agendarlo para su publicación", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;

      // Given: Voy a la seccion de Post
      PostPage.visit(baseUrl);

      // When: Oprimo el boton New Post
      PostPage.createNewPost();

      // When: Lleno todos los campos del formulario de new post y oprimo el boton publish
      NewPostPage.fillTitle("La Mejores ciudades para visitar en Colombia");
      NewPostPage.fillContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + 
                              "Etiam vel eros congue, porta lectus non, lobortis tellus. ")

      NewPostPage.publish()
      NewPostPage.schedule()
      NewPostPage.comfirmPublish()

      // Then: Recibo Notificacion que el post fue publicado
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
