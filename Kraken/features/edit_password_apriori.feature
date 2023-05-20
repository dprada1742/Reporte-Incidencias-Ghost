Feature: Editar Contraseña

    @user1 @web
    Scenario: Editar Contraseña válida
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc1_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc1_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc1_03"
        When I click on Change Password
        And I wait for 1 seconds
        Then It must says "Password updated" with step id of "edit_password/sc1_04"

        Examples: 
            | oldPassword | newPassword |
            | testing100| testing100 |
    
    @user2 @web
    Scenario: Editar Contraseña con password de diferentes longitudes
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc2_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc2_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc2_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Password must be at least 10 characters long" with step id of "edit_password/sc2_04"

        Examples: 
            | oldPassword | newPassword |
            | testing100 | nueveletr |
       #    | testing100 | t |
       #    | testing100 | ttt |
       #    | testing100 | tttttttt |
       #    | testing100 | Password_Muy_largo_conguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesd |
            
    
    @user3 @web
    Scenario: Editar Contraseña en blanco
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc3_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc3_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc3_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, passwords can't be blank" with step id of "edit_password/sc3_04"

        Examples: 
            | oldPassword | newPassword |
            | testing100 ||
    
    @user4 @web
    Scenario: Editar Contraseña insegura
        Given I log into ghost
        And I wait for 3 seconds        
        And I go to owner page with step id of "edit_password/sc4_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc4_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc4_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, you cannot use an insecure password" with step id of "edit_password/sc4_04"

        Examples: 
            | oldPassword | newPassword |
            | testing100 |  PASSWORDMUYSEGURO |
        #   | testing100 |  passwordmuyseguro |
        #   | testing100 |  1234567890 |
        #   | testing100 |  qwertyuiop |
        #   | testing100 |  asdfghjkl |
        #   | testing100 |  abcdefghij |
	
	@user5 @web
    Scenario: Editar Contraseña que es el mismo email del usuario
        Given I log into ghost
        And I wait for 3 seconds        
        And I go to owner page with step id of "edit_password/sc4_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc4_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc4_03"
        When I click on Change Password
        And I wait for 2 seconds
        Then Error must says "Sorry, you cannot use an insecure password" with step id of "edit_password/sc4_04"

        Examples: 
            | oldPassword | newPassword |
            | testing100 |  testemail@email.com |
			
	 @user6 @web
    Scenario: Contraseña antigua no válida
        Given I log into ghost
        And I wait for 1 seconds        
        And I go to owner page with step id of "edit_password/sc6_01"
        And I wait for 1 seconds
        When I fill the old password with "<oldPassword>" with step id of "edit_password/sc6_02"
        When I fill the new password with "<newPassword>" with step id of "edit_password/sc6_03"
        When I click on Change Password
        And I wait for 1 seconds
        Then Error element must says "Your password is incorrect. Your password is incorrect." with step id of "edit_password/sc6_04"

        Examples: 
            | oldPassword | newPassword |
            | testing1001| testing100 |