Feature: Home Page
  Background: Go to the App
    Given I am on the home page

  Scenario: I can see the site options
    Then I see 'Learn'
    And I see 'Practice'
    And I see 'Reports'

  Scenario: I can navigate to learn
    When I click on 'Learn'
    Then I see 'Learn about Hamming codes'