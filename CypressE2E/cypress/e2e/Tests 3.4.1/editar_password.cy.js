import LoginPage from "../pages 3.4.1/LoginPage";
import Sidebar from "../pages 3.4.1/Sidebar";
import StaffPage from "../pages 3.4.1/StaffPage";
import { faker } from '@faker-js/faker';

let hasScreenshotBeenTaken = false;

describe("Editar Contraseña", () => {
  let naughtyData = require('../../fixtures/naughty_password.json');
  let weakData = require('../../fixtures/weak_password.json');

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
      let newPassword = faker.internet.password();
      newPassword = "testing100"

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

  it("Editar contraseña antigua y contraseña nueva son iguales", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let newPassword = faker.internet.password();
      newPassword = "testing100"

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

  it("Editar contraseña y la confirmación no coinciden:", () => {
    cy.fixture("loginData").then((data) => {
      const { baseUrl } = data;
      const password = faker.internet.password();
      let newPassword = faker.internet.password();

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
      StaffPage.assertErrorPassword('Your password is incorrect. Your password is incorrect.')
      
    });
  });

  it("Editar contraseñacon longitud minima (10 caracteres)", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let newPassword = faker.internet.password(10);
      newPassword = "testing100"

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

  it("Editar contraseña con longitud muy grande (1000 caracteres)", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let newPassword = faker.internet.password(1000);
      newPassword = "testing100"

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

  it("Editar Contraseña muy corta (1 caracter)", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = faker.internet.password(1);

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

  it("Editar contraseña con campo Old password faltante", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = faker.internet.password();

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc1_02_select_owner")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword("")
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc1_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc1_04_password_edited")
      StaffPage.assertErrorMessage('Your current password is required to set a new one')
      
    });
  });

  it("Cambio de contraseña con nueva contraseña en blanco", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = faker.internet.password();

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc3_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword("")
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc3_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc3_04_error_pass_in_blank")
      StaffPage.assertRetry("Retry")
    });
  });

  it("Cambio de contraseña con contraseña de verificación en blanco", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = faker.internet.password();

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
      StaffPage.fillVerificationPassword("")
      cy.screenshot("sc3_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc3_04_error_pass_in_blank")
      StaffPage.assertRetry("Retry")
    });
  });
  
  it("Cambio de contraseña con todos los campos en blanco", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      const newPassword = "";

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc3_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc3_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword("")
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc3_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc3_04_error_pass_in_blank")
      StaffPage.assertErrorMessage("Sorry, passwords can't be blank")
    });
  });

  it("Cambio de contraseña con caracteres especiales", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let naughtyPassword = naughtyData[Math.floor(Math.random()*naughtyData.length)];
      let newPassword = naughtyPassword['password'];

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc1_02_select_owner")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password+1)
      StaffPage.fillNewPassword(newPassword)
      StaffPage.fillVerificationPassword(newPassword)
      cy.screenshot("sc1_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc1_04_password_edited")
      StaffPage.assertRetry("Retry")
    });
  });
  
  it("Editar Contraseña insegura", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let weakPassword = weakData[1]['password'];

      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc4_01_visit_staff_page")

      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc4_02_visit_staff_page")

      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(weakPassword)
      StaffPage.fillVerificationPassword(weakPassword)
      cy.screenshot("sc4_03_fill_form")
      StaffPage.save()

      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc4_04_error_pass_insecure")
      StaffPage.assertErrorMessage('Sorry, you cannot use an insecure password')
    });
  });

  it("Cambio de contraseñas que cumplan parcialmente los requisitos de complejidad (Solo mayusculas)", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let weakPassword = weakData[1]['password'];
  
      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_staff_page")
  
      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc1_02_select_owner")
  
      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(weakPassword)
      StaffPage.fillVerificationPassword(weakPassword)
      cy.screenshot("sc1_03_fill_form")
      StaffPage.save()
  
      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc1_04_password_edited")
      StaffPage.assertRetry("Retry")
    });
  });

  it("Cambio de contraseñas que cumplan parcialmente los requisitos de complejidad (Solo minusculas)", () => {
    cy.fixture("loginData").then((data) => {
      const { password, baseUrl } = data;
      let weakPassword = weakData[1]['password'];
  
      // When: Voy a la seccion de Staff
      StaffPage.visit(baseUrl);
      cy.wait(1000);
      cy.screenshot("sc1_01_visit_staff_page")
  
      // When: Selecciono al propietario del sitio
      StaffPage.selectOwner();
      cy.screenshot("sc1_02_select_owner")
  
      // When: Lleno todos los campos del formulario de new tag y oprimo el boton save      
      StaffPage.fillOldPassword(password)
      StaffPage.fillNewPassword(weakPassword)
      StaffPage.fillVerificationPassword(weakPassword)
      cy.screenshot("sc1_03_fill_form")
      StaffPage.save()
  
      // Then: Recibo Notificacion de cambio exitoso
      cy.screenshot("sc1_04_password_edited")
      StaffPage.assertRetry("Retry")
    });
  });

});
