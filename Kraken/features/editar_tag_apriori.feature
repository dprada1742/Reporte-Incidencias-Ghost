    Feature: Editar Tag


    @user5 @web
    Scenario: Editar tag caracteres especiales
        Given I log into ghost
        And I wait for 1 seconds
        When I go to the the Tag section with step id of "editar_tag/sc5_01"
        And I press the button New Tag with step id of "editar_tag/sc5_02"
        And I fill the new tag fields "$name_1" with step id of "editar_tag/sc5_03"
        And I save the tag with step id of "editar_tag/sc5_04"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc5_05"
        And I select the tag that was created "$$name_1" with step id of "editar_tag/sc5_06"
        And I fill the new tag fields "<tagName>" "<tagSlug>" "<tagDescription>"
        And I save the tag with step id of "editar_tag/sc5_07"
        And I wait for 1 seconds
        And I go to the the Tag section with step id of "editar_tag/sc5_08"
        And I wait for 2 seconds
        
        Then I should have a tags with the name "<tagName>"

        Examples: 
            | tagName | tagSlug | tagDescription |
            | 00Ɩ$- | conguesd | conguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesdconguesd |
        #   | turpisssss | 00Ɩ$- | turpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssssturpisssss|
        #   | potentilpotentilpotentil | potentil | ⁰⁴⁵ |

  

   