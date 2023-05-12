import LoginPage from "../pages/LoginPage";
import Sidebar from "../pages/Sidebar";
import StaffPage from "../pages/StaffPage";

let hasScreenshotBeenTaken = false;

describe("Editar Contraseña", () => {
  beforeEach(() => {
    cy.fixture("loginData").then((data) => {
      const { email, password, baseUrl } = data;
      // Given: ingreso a la pagina y hago login
      LoginPage.visit(baseUrl);
      LoginPage.fillEmail(email);
      LoginPage.fillPassword(password);

      if (!hasScreenshotBeenTaken) {
        cy.screenshot("editar_password_login");
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

  it("Editar contraseña valida", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "testing100"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc1_02_select_owner")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc1_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc1_04_password_edited")
      StaffPage.assertMessage('Password updated')
      
    });
  });

  it("Editar Contraseña muy corta", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "Contra"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc2_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc2_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc2_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc2_04_error_pass_too_short")
      StaffPage.assertErrorMessage('Password must be at least 10 characters long')
    });
  });

  it("Editar Contraseña en blanco", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = " "

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc3_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc3_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc3_04_error_pass_in_blank")
      StaffPage.assertErrorMessage("Sorry, passwords can't be blank")
    });
  });

  it("Editar Contraseña insegura", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "1234567890"

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc4_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc4_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc4_04_error_pass_insecure")
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
