Feature: Editar Contraseña
    @user1 @web
    Scenario: Crear y editar el nombre de un post
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "$name_1"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "$$name_1"
        And I wait for 1 seconds
        And I fill the post title with "$name_2"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        Then the post list must contain the "$$name_2"
        And the post list must not contain the "$$name_1"

    @user2 @web
    Scenario: Crear dos posts con nombre diferente y editarlos para que queden con el mismo nombre
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "$name_3"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "$name_4"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "$$name_3"
        And I wait for 1 seconds
        And I fill the post title with "$$name_4"
        And I wait for 1 seconds
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        Then the post list must contain the "$$name_4" at least twice

    @user3 @web
    Scenario: Crear y editar el tag de un post
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "$name_5"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "$$name_5"
        And I wait for 1 seconds
        And I add a new tag "$name_6" to the post
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "$$name_5"
        Then the tag "$$name_6" I created must be saved

    @user4 @web
    Scenario: Crear y editar la URL de un post
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "$name_7"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "$$name_7"
        And I wait for 1 seconds
        And I modify the URL of the post to "$name_8"
        And I publish the post
        And I wait for 1 seconds
        Then the new URL "$$name_8" must be accesible
        And I wait for 1 seconds
        And contains the post "$$name_7"