Feature: Crear Tag

    @user1 @web
    Scenario: Crea dos tag con el mismo nombre
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$name_1"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$$name_1"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        Then I should have two tags with the same name "$$name_1"

    @user2 @web
    Scenario: Crear un tag con slug vacio
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields but the slug is empty "$name_2" 
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        Then I should have a tags with the name "$$name_2"
    
    @user3 @web
    Scenario: Crear un tag y valido
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$name_3"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        Then I should have a tags with the name "$$name_3"

    @user4 @web
    Scenario: Crear un tag descripcion invalida
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields but an invalid description "$name_4"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I wait for 2 seconds
        And I press the button Leave
        Then No tag should be created "$$name_4"

  