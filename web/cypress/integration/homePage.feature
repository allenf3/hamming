Feature: Home Page
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the site options
    Then I see 'Learn'
    And I see 'Practice'
    And I see 'Reports'