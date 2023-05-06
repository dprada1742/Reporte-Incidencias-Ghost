Feature: Editar Contraseña

    @user1 @web
    Scenario: Editar Contraseña válida
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 seconds        
        And I go to owner page
        And I wait for 1 seconds
        When I fill the old password with "testing100"
        When I fill the new password with "testing100"
        When I click on Change Password
        And I wait for 1 seconds
        Then It must says "Password updated"
    
    @user2 @web
    Scenario: Editar Contraseña muy corta
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 seconds        
        And I go to owner page
        And I wait for 1 seconds
        When I fill the old password with "testing100"
        When I fill the new password with "t"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Password must be at least 10 characters long"   
    
    @user3 @web
    Scenario: Editar Contraseña en blanco
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 seconds        
        And I go to owner page
        And I wait for 1 seconds
        When I fill the old password with "testing100"
        When I fill the new password with " "
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, passwords can't be blank"
    
    @user4 @web
    Scenario: Editar Contraseña insegura
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 3 seconds        
        And I go to owner page
        And I wait for 1 seconds
        When I fill the old password with "testing100"
        When I fill the new password with "1234567890"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, you cannot use an insecure password"