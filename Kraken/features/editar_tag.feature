    Feature: Editar Tag

    @user1 @web
    Scenario: Editar tag datos validos
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$name_1"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I select the tag that was created "$$name_1"
        And I edit the tag name with "$name_2"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I wait for 2 seconds
        And I select the tag that was edited "$$name_2"
        Then I should validate the description "$$name_1"
	
	@user2 @web
    Scenario: Editar tag nombre repetido
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I fill the new tag fields "$name_2"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I select the tag that was created "$$name_2"
        And I edit the tag name with "$$name_2"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I wait for 2 seconds
        And I select the tag that was edited "$$name_2"
        Then I should validate the Tag name "$$name_2"

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
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I wait for 2 seconds
        And I press the button Leave
        And I wait for 1 seconds
        And I select the tag that was created "$$name_3"
        Then I should validate the description "$$name_3"

    @user4 @web
    Scenario: Editar un tag sin slug
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section
        And I press the button New Tag
        And I wait for 1 seconds
        And I fill the new tag fields "$name_4"
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I select the tag that was created "$$name_4"
        And I clear the slug
        And I save the tag
        And I wait for 1 seconds
        And I go to the the Tag section
        And I select the tag that was created "$$name_4"
        Then I should validate the slug is not empty
  