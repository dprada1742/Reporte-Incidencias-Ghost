class Sidebar {
    signOut(baseUrl) {
        cy.visit(baseUrl + "ghost/#/signout/");
    }
}

export default new Sidebar()