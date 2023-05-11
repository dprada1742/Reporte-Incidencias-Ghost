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
        When I go to the the Tag section with step id of "editar_tag/sc3_01"
        And I press the button New Tag with step id of "editar_tag/sc3_02"
        And I fill the new tag fields "$name_3" with step id of "editar_tag/sc3_03"
        And I save the tag with step id of "editar_tag/sc3_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc3_05"
        And I select the tag that was created "$$name_3" with step id of "editar_tag/sc3_06"
        And I edit the description with step id of "editar_tag/sc3_07"
        And I save the tag with step id of "editar_tag/sc3_08"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc3_09"
        And I wait for 2 seconds
        And I press the button Leave with step id of "editar_tag/sc3_10"
        And I wait for 1 seconds
        And I select the tag that was created "$$name_3" with step id of "editar_tag/sc3_11"
        Then I should validate the description "$$name_3"

    @user4 @web
    Scenario: Editar un tag sin slug
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "editar_tag/sc4_01"
        And I press the button New Tag with step id of "editar_tag/sc4_02"
        And I wait for 1 seconds
        And I fill the new tag fields "$name_4" with step id of "editar_tag/sc4_03"
        And I save the tag with step id of "editar_tag/sc4_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc4_05"
        And I select the tag that was created "$$name_4" with step id of "editar_tag/sc4_06"
        And I clear the slug with step id of "editar_tag/sc4_07"
        And I save the tag with step id of "editar_tag/sc4_08"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc4_09"
        And I select the tag that was created "$$name_4" with step id of "editar_tag/sc4_10"
        Then I should validate the slug is not empty

  