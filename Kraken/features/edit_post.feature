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

    @user5 @web
    Scenario: Crear y editar el post superando longitudes máximas
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "edit_post/sc5_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_1" with step id of "edit_post/sc5_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc5_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_1" with step id of "edit_post/sc5_04"
        And I wait for 1 seconds
        And I fill the post title with "<post>" with step id of "edit_post/sc5_05"
        And I click in the post content
        And I wait for 1 seconds
        And I add a new meta title "<meta_title>" to the post
        And I add a new meta description "<meta_desc>" to the post
        And I add a new twitter title "<twitter_title>" to the post
        And I save the post
        Then an error gets generated

    Examples:
        | post | meta_title | meta_desc | twitter_title |
        | integerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerintegerinte | integerintegerintegerintegerintegerinteger | integerintegerintegerintegerintegerinteger | integerintegerintegerintegerintegerinteger |
        #| donecdonecdonecdonecdonecdonecdonecdonecdonec | donecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecd | donecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonec | donecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonecdonec |
        #| congueconguecongueconguecongu | congueconguecongueconguecongu | congueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueconguecongueconguecongucongueco | congueconguecongueconguecongu |
        #| consequatconsequatconsequatconsequat | consequatconsequatconsequatconsequatconsequatconsequat | consequatconsequatconsequatconsequatconsequatconsequatconsequat | consequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatconsequatcons |

    @user6 @web
    Scenario: Crear y editar un post con un nombre con caracteres especiales
        Given I log into ghost
        And I wait for 2 seconds
        When I go to new post page with step id of "edit_post/sc6_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_1" with step id of "edit_post/sc6_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc6_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_1" with step id of "edit_post/sc6_04"
        And I wait for 1 seconds
        And I fill the post with "<post_title>" "<post_tag>" "<post_excerpt>"
        And I save the post
        Then the data is saved properly

    Examples:
        | post_title | post_tag | post_excerpt |
        | na bibendum imperdi | na bibendum imperdi | 會科學院語學研 |
        #| ؟ الستار وتنصيب كان. أهّل ايطاليا، بريطانيا-فرنسا قد أخذ. سليمان، إتفاقية بين ما, يذكر الحدود أي بعد, معاملة بولندا، الإطلاق عل إ | erat ante nulla justo aliquam qui | imperdiet nullam orci |
        #| nunc rhoncus dui vel sem sed sagittis nam | (╯°□°）╯︵ ┻━┻) | luctus nec |

    @user7 @web
    Scenario: Crear y editar la URL de un post con una URL caracteres de tamaño frontera
        Given I log into ghost
        And I wait for 3 seconds
        When I go to new post page with step id of "edit_post/sc7_01"
        And I wait for 1 seconds
        And I fill the post title with "$name_7" with step id of "edit_post/sc7_02"
        And I click in the post content
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc7_03"
        And I wait for 1 seconds
        And I edit the post with name "$$name_7" with step id of "edit_post/sc7_04"
        And I wait for 1 seconds
        And I modify the URL of the post to "$name_8" with length "<length>"
        And I save the post
        And I wait for 1 seconds
        And I navigate to the posts page with step id of "edit_post/sc7_05"
        And I wait for 1 seconds
        And I edit the post with name "$$name_7" with step id of "edit_post/sc7_06"
        Then the URL must match "$$name_8" with length "185"
    Examples:
        | length |
        | 186 |
        #| 185 |