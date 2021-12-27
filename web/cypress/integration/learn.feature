Feature: Learn Page
  Background: Go to Learn
    Given I am on the learn page

  Scenario: I can navigate to Home
    When I click on 'Home'
    Then I see 'Learn'
    And I see 'Practice'
    And I see 'Reports'