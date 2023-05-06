Feature: Editar Contraseña

    @user1 @web
    Scenario: Crear y editar el nombre de un post
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 second
        When I go to new post page
        And I wait for 1 second
        And I fill the post title with "$name_1"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        And I wait for 1 second
        And I edit the post with name "$name_1"
        And I wait for 1 second
        And I modify the post title with "$name_2"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        Then the post list must contain the "$$name_2"
        And the post list must not contain the "$$name_1"

    @user2 @web
    Scenario: Crear dos posts con nombre diferente y editarlos para que queden con el mismo nombre
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 second
        When I go to new post page
        And I wait for 1 second
        And I fill the post title with "$name_1"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        And I wait for 1 second
        And I go to new post page
        And I wait for 1 second
        And I fill the post title with "$name_2"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        And I edit the post with name "$$name_1" I created
        And I modify the post title with "$name_1"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        Then the post list must contain two items with the second post's title value

    @user3 @web
    Scenario: Crear y editar el tag de un post
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 second
        When I go to new post page
        And I wait for 1 second
        And I fill the post title with "$name_1"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        And I wait for 1 second
        And I edit the post with name "$name_1"
        And I wait for 1 second
        And I add a new tag to the post
        And I save the post
        And I wait for 1 second
        And I navigate to the posts page
        And I wait for 1 second
        And I edit the post with name "$name_1"
        Then the tag value I created must be saved

    @user4 @web
    Scenario: Crear y editar la URL de un post
        Given I navigate to page "http://localhost:2368/ghost/"
        And I log in
        And I wait for 1 second
        When I go to new post page
        And I wait for 1 second
        And I fill the post title with "$name_1"
        And I click in the post content
        And I wait for 1 second
        And I navigate to the posts page
        And I wait for 1 second
        And I edit the post with name "$name_1"
        And I wait for 1 second
        And I modify the URL of the post
        And I save the post
        And I wait for 1 second
        Then the new URL must be accesible