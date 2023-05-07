Feature: Create New Post

    @user1 @web
    Scenario: Crear un nuevo Post y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "Colombia"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        Then the post list must contain the "Colombia"

    @user2 @web
    Scenario: Crear Nuevo Post con Wild card y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "%"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        Then the post list must contain the "%"

    @user3 @web
    Scenario: Crear Nuevo Post con Contenido tag y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "Bogota"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "Bogota"
        And I wait for 1 seconds
        And I add a new tag "ciudad" to the post
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page
        And I wait for 1 seconds
        And I edit the post with name "Bogota"
        Then the tag "ciudad" I created must be saved
    
    @user4 @web
    Scenario: Crear Nuevo Post y agendarlo para su publicación
       Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page
        And I wait for 1 seconds
        And I fill the post title with "Monserrate"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page
        Then the post list must contain the "Monserrate"