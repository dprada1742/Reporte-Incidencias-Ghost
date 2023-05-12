Feature: Create New Post

    @user1 @web
    Scenario: Crear un nuevo Post y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc1_01"
        And I wait for 1 seconds
        And I fill the post title with "Colombia" with step id of "create_post/sc1_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc1_03"
        Then the post list must contain the "Colombia"

    @user2 @web
    Scenario: Crear Nuevo Post con Wild card y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc2_01"
        And I wait for 1 seconds
        And I fill the post title with "%" with step id of "create_post/sc2_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc2_03"
        Then the post list must contain the "%"

    @user3 @web
    Scenario: Crear Nuevo Post con Contenido tag y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc3_01"
        And I wait for 1 seconds
        And I fill the post title with "Bogota" with step id of "create_post/sc3_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc3_03"
        And I wait for 1 seconds
        And I edit the post with name "Bogota" with step id of "create_post/sc3_04"
        And I wait for 1 seconds
        And I add a new tag "ciudad" to the post with step id of "create_post/sc3_05"
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc3_06"
        And I wait for 1 seconds
        And I edit the post with name "Bogota" with step id of "create_post/sc3_07"
        Then the tag "ciudad" I created must be saved
    
    @user4 @web
    Scenario: Crear Nuevo Post y agendarlo para su publicación
       Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc4_01"
        And I wait for 1 seconds
        And I fill the post title with "Monserrate" with step id of "create_post/sc4_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc4_03"
        Then the post list must contain the "Monserrate"