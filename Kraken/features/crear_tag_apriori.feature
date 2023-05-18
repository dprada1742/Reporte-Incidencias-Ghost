Feature: Crear Tag Apriori

    @user4 @web
    Scenario: Crear un tag con caracteres especiales
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc4_01"
        And I press the button New Tag with step id of "crear_tag/sc4_02"
        And I fill the new tag fields "<tagName>" "<tagSlug>" "<tagDescription>"
        And I save the tag with step id of "crear_tag/sc4_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc4_05"
        Then I should have a tags with the name "<tagName>"
    
    Examples: 
        | tagName | tagSlug | tagDescription |
        | ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ  | conguesd | conguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesd |
      #  | turpisssss | 00Ɩ$- | turpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssss|
      #  | potentilpotentilpotentil | potentil | ⁰⁴⁵ |


    @user5 @web
    Scenario: Crear un tag con tamaños de campos inválidos
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "crear_tag/sc6_01"
        And I press the button New Tag with step id of "crear_tag/sc6_02"
        And I fill the new tag fields "<tagNameInvalid>" "<tagSlugInvalid>" "<tagDescriptionInvalid>"
        And I save the tag with step id of "crear_tag/sc6_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "crear_tag/sc4_04"
        And I wait for 2 seconds
        And I press the button Leave with step id of "crear_tag/sc4_05"
        Then No tag should be created "<tagNameInvalid>"

    Examples: 
        |tagNameInvalid|tagSlugInvalid|tagDescriptionInvalid|
        | conguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongueconguecongue | congue | conguecongue |
        #| etiam | etiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiametiam | etiametiam|
        #| potentipotenti | potenti | potentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotenti |                                                                                                                                                                         | potenti                                                                                                                                                                                             | potentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotentipotenti |