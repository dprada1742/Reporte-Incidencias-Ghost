Feature: Editar Post
    @user1 @web
    Scenario: Crear y editar el nombre de un post
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "edit_post/sc1_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_1" with step id of "edit_post/sc1_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc1_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_1" with step id of "edit_post/sc1_04"
        And I wait for 1 seconds
        And I fill the post title with "$name_2" with step id of "edit_post/sc1_05"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc1_06"
        Then the post list must contain the "$$name_2"
        And the post list must not contain the "$$name_1"

    @user2 @web
    Scenario: Crear dos posts con nombre diferente y editarlos para que queden con el mismo nombre
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "edit_post/sc2_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_3" with step id of "edit_post/sc2_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc2_03"
        And I wait for 1 seconds
        And I go to new post page with step id of "edit_post/sc2_04"
        And I wait for 1 seconds
        And I fill the post title with "$name_4" with step id of "edit_post/sc2_05"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc2_06"
        And I wait for 1 seconds
        And I edit the post with name "$$name_3" with step id of "edit_post/sc2_07"
        And I wait for 1 seconds
        And I fill the post title with "$$name_4" with step id of "edit_post/sc2_08"
        And I wait for 1 seconds
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc2_09"
        Then the post list must contain the "$$name_4" at least twice

    @user3 @web
    Scenario: Crear y editar el tag de un post
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "edit_post/sc3_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_5" with step id of "edit_post/sc3_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc3_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_5" with step id of "edit_post/sc3_04"
        And I wait for 1 seconds
        And I add a new tag "$name_6" to the post with step id of "edit_post/sc3_05"
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc3_06"
        And I wait for 1 seconds
        And I edit the post with name "$$name_5" with step id of "edit_post/sc3_07"
        Then the tag "$$name_6" I created must be saved

    @user4 @web
    Scenario: Crear y editar la URL de un post
        Given I log into ghost
        And I wait for 3 seconds
        When I go to new post page with step id of "edit_post/sc4_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_7" with step id of "edit_post/sc4_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc4_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_7" with step id of "edit_post/sc4_04"
        And I wait for 1 seconds
        And I modify the URL of the post to "$name_8" with step id of "edit_post/sc4_05"
        And I publish the post with step id of "edit_post/sc4_06"
        And I wait for 1 seconds
        Then the new URL "$$name_8" must be accesible
        And I wait for 1 seconds
        And contains the post "$$name_7"