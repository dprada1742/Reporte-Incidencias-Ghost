Feature: Crear Tag

    @user1 @web
    Scenario: Crea dos tag con el mismo nombre
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields
        And I save the tag
        And I wait 1 second
        And I go to the tag section
        And I press the button New Tag
        And Fill the fields but the name is the same as the previous tag
        And I save the tag
        And I wait 1 second
        And  I go to the tag section
        Then I should have two tags with the same name
        And I log out

    @user2 @web
    Scenario: Crea un nuevo tag con slug vacio
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        When I go to the the Tag section
        And I press the button New Tag
        And Fill the new tag fields but I leave the Slug field empty
        And I save the tag
        And I wait 1 second
        And I go to the tag section
        Then The new tag should be present
        And I log out

    @user3 @web
    Scenario: Crea un nuevo tag con una descripcion con tamaño mayor a 500
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        When I go to the the Tag section
        And I press the button New Tag
        And Fill the new tag fields but the description has over 500 characters
        And I save the tag
        And I wait 1 second
        And I go to the tag section
        And I press the button Leave
        Then The new tag should not be present
        And I log out

    @user4 @web
    Scenario: Crea un nuevo tag correcto y lo valida
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields
        And I save the tag
        And I wait 1 second
        And I go to the tag section
        Then I the new tag should be present
        And I log out