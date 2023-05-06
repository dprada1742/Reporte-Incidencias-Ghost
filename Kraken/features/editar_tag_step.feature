    Feature: Editar Tag

    @user3 @web
    Scenario: Editar un tag con descripcion invalida
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$name_3"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I select the tag that was created "$$name_3"
        And I edit the description
        Then I should have a tags with the name "$$name_3"

  