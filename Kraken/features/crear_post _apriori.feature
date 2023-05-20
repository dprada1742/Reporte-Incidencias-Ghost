Feature: Create New Post

    @user1 @web
    Scenario: Crear un nuevo Post con titulo valido y contenido valido
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc1_01"
        And I wait for 1 seconds
        And I fill the post title with "<title>" with step id of "create_post/sc1_02"
        And I click in the post content
        And I fill the post content with "<content>"
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc1_03"
        Then the post list must contain the "<title>"
    
    Examples:
        | title | content |
        | La mejor ciudad de Colombia | Cartagena es una ciudad portuaria en la costa caribeña de Colombia.|
    #   | Titulo muyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy exxxxxxxxxxxxxxteeeeeeeeeeennnnnnnnnnnsssssssssssssssssooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo | Cartagena es una ciudad portuaria en la costa caribeña de Colombia. |
    #   | # | Cartagena es una ciudad portuaria en la costa caribeña de Colombia. |
    #   | La mejor ciudad de Colombia | |
    #   |  | Cartagena es una ciudad portuaria en la costa caribeña de Colombia. |
    #   | La mejor ciudad de Colombia | C |

    @user2 @web
    Scenario: Crear Nuevo Post con Contenido tag y Publicarlo
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc2_01"
        And I wait for 1 seconds
        And I fill the post title with "<title>" with step id of "create_post/sc2_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc2_03"
        And I wait for 1 seconds
        And I edit the post with name "<title>" with step id of "create_post/sc2_04"
        And I wait for 1 seconds
        And I add a new tag "<tag>" to the post with step id of "create_post/sc2_05"
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc2_06"
        And I wait for 1 seconds
        And I edit the post with name "<title>" with step id of "create_post/sc2_07"
        Then the tag "<tag>" I created must be saved

    Examples:
        | title | content | tag |
        | % | )(/&%$#") | Ciudad |
    #   | La mejor ciudad de Colombia | Cartagena es una ciudad portuaria en la costa caribeña de Colombia.| alfanum3rico12345 |
    #   | La mejor ciudad de Colombia | Cartagena es una ciudad portuaria en la costa caribeña de Colombia.| Ciudad |
    #   | % | )(/&%$#") | 12 |

    @user3 @web
    Scenario: Crear un nuevo Post con titulo, contenido verificando inyección sql en los campos. 
        Given I log into ghost
        And I wait for 1 seconds
        When I go to new post page with step id of "create_post/sc3_01"
        And I wait for 1 seconds
        And I fill the post title with "<title>" with step id of "create_post/sc3_02"
        And I click in the post content
        And I fill the post content with "<content>"
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc3_03"
        Then the post list must contain the "<title>"
    
    Examples:
        | title | content |
        | select * from user.user | Cartagena es una ciudad portuaria en la costa caribeña de Colombia. |
    #   | La mejor ciudad de Colombia | select * from user.user |
    #   | select * from user.user | |
    #   | select * from user.user | Cartagena es una ciudad portuaria en la costa caribeña de Colombia. |

    @user4 @web
    Scenario: Crear un nuevo Post con titulo valido y contenido con caracteres de lenguaje extranjo
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "create_post/sc4_01"
        And I wait for 1 seconds
        And I fill the post title with "<title>" with step id of "create_post/sc4_02"
        And I click in the post content
        And I fill the post content with "<content>"
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "create_post/sc4_03"
        Then the post list must contain the "<title>"
    
    Examples:
        | title | content |
        | Colombia | 會科學院語學研  |