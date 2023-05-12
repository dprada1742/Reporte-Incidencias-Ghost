import LoginPage from "../pages 3.4.1/LoginPage";
import Sidebar from "../pages 3.4.1/Sidebar";
import StaffPage from "../pages 3.4.1/StaffPage";

describe("Editar Contraseña", () => {
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

  it("Editar contraseña valida", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "testing100"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      StaffPage.assertMessage('Password updated')
    });
  });

  it("Editar Contraseña muy corta", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "Contra"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      StaffPage.assertErrorMessage('Password must be at least 10 characters long')
    });
  });

  it("Editar Contraseña en blanco", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = " "

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      StaffPage.assertErrorMessage("Sorry, passwords can't be blank")
    });
  });

  it("Editar Contraseña insegura", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "1234567890"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      StaffPage.assertErrorMessage('Sorry, you cannot use an insecure password')
    });
  });

  afterEach(() => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      Sidebar.signOut(baseUrl);
    })
  })
});
