class NewTagsPage {
    url = "ghost/#/tags/new";
    visit(baseUrl) {
      this.driver.visit(baseUrl + this.url);
    }
  
    save() {
      const buttonSave = this.driver.$("button");
      buttonSave.getText().then((text) => {
        if (text.includes("Save")) {
          buttonSave.click();
        }
      });
    }
  
    leave() {
      const buttonLeave = this.driver.$("button");
      buttonLeave.getText().then((text) => {
        if (text.includes("Leave")) {
          buttonLeave.click();
        }
      });
    }
  
    getSlugField(){
      return this.driver.$("#tag-slug");
    }
  
    fillTagName(value) {
      const field = this.driver.$("#tag-name");
      field.clearValue();
      field.setValue(value);
      return this;
    }
  
    fillTagSlug(value) {
      const field = this.driver.$("#tag-slug");
      field.clearValue();
      field.setValue(value);
      return this;
    }
  
    clearSlug() {
      const field = this.driver.$("#tag-slug");
      field.clearValue();
      return this;
    }
  
    fillTagDescription(value) {
      const field = this.driver.$("#tag-description");
      field.clearValue();
      field.setValue(value);
      return this;
    }
  
    GetTagDescription() {
      return this.driver.$("#tag-description");
    }
  
  }
  
  module.exports = NewTagsPage;