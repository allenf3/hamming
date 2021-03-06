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

  Scenario: I can navigate to practice
    When I click on 'Practice'
    Then I see 'Practice working with Hamming codes'

  Scenario: I can navigate to reports
    When I click on 'Reports'
    Then I see 'View Reports'