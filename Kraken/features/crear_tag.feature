Feature: Crear Tag

    @user1 @web
    Scenario: Crea dos tag con el mismo nombre
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc1_01"
        And I press the button New Tag with step id of "crear_tag/sc1_02"
        And I fill the new tag fields "$name_1" with step id of "crear_tag/sc1_03"
        And I save the tag with step id of "crear_tag/sc1_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc1_05"
        And I press the button New Tag with step id of "crear_tag/sc1_06"
        And I fill the new tag fields "$$name_1" with step id of "crear_tag/sc1_07"
        And I save the tag with step id of "crear_tag/sc1_08"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc1_09"
        Then I should have two tags with the same name "$$name_1"

    @user2 @web
    Scenario: Crear un tag con slug vacio
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc2_01"
        And I press the button New Tag with step id of "crear_tag/sc2_02"
        And I fill the new tag fields but the slug is empty "$name_2" with step id of "crear_tag/sc2_03"
        And I save the tag with step id of "crear_tag/sc2_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc2_05"
        Then I should have a tags with the name "$$name_2"

    @user3 @web
    Scenario: Crear un tag y valido
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc3_01"
        And I press the button New Tag with step id of "crear_tag/sc3_02"
        And I fill the new tag fields "$name_3" with step id of "crear_tag/sc3_03"
        And I save the tag with step id of "crear_tag/sc3_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc3_05"
        Then I should have a tags with the name "$$name_3"

    @user4 @web
    Scenario: Crear un tag descripcion invalida
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc4_01"
        And I press the button New Tag with step id of "crear_tag/sc4_02"
        And I fill the new tag fields but an invalid description "$name_4" with step id of "crear_tag/sc4_03"
        And I save the tag with step id of "crear_tag/sc4_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc4_04"
        And I wait for 2 seconds
        And I press the button Leave with step id of "crear_tag/sc4_05"
        Then No tag should be created "$$name_4"
