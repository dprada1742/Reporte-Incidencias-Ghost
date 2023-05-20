Feature: Editar Contraseña

    @user1 @web
    Scenario: Editar Contraseña válida
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc1_01"
        And I wait for 1 seconds
        When I fill the old password with "testing100" with step id of "edit_password/sc1_02"
        When I fill the new password with "testing100" with step id of "edit_password/sc1_03"
        When I click on Change Password
        And I wait for 1 seconds
        Then It must says "Password updated" with step id of "edit_password/sc1_04"
    
    @user2 @web
    Scenario: Editar Contraseña muy corta
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc2_01"
        And I wait for 1 seconds
        When I fill the old password with "testing100" with step id of "edit_password/sc2_02"
        When I fill the new password with "t" with step id of "edit_password/sc2_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Password must be at least 10 characters long" with step id of "edit_password/sc2_04"
    
    @user3 @web
    Scenario: Editar Contraseña en blanco
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc3_01"
        And I wait for 1 seconds
        When I fill the old password with "testing100" with step id of "edit_password/sc3_02"
        When I fill the new password with " " with step id of "edit_password/sc3_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, passwords can't be blank" with step id of "edit_password/sc3_04"
    
    @user4 @web
    Scenario: Editar Contraseña insegura
        Given I log into ghost
        And I wait for 3 seconds        
        And I go to owner page with step id of "edit_password/sc4_01"
        And I wait for 1 seconds
        When I fill the old password with "testing100" with step id of "edit_password/sc4_02"
        When I fill the new password with "1234567890" with step id of "edit_password/sc4_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, you cannot use an insecure password" with step id of "edit_password/sc4_04"