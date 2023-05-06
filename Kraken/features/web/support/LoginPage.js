class LoginPage {
    constructor(driver) {
      this.driver = driver;
    }
  
    async visit(baseUrl) {
      await this.driver.url(`${baseUrl}ghost/#/signin`);
    }
  
    async fillEmail(value) {
      const emailField = await this.driver.$('#ember8');
      await emailField.setValue(value);
    }
  
    async fillPassword(value) {
      const passwordField = await this.driver.$('#ember10');
      await passwordField.setValue(value);
    }
  
    async submit() {
      const submitButton = await this.driver.$('#ember12');
      return await submitButton.click();
    }
  }
  
  module.exports = LoginPage;