Feature: Practice Page
  Scenario: Go to Practice
    Given I am on the 'practice' page

  Scenario: I can navigate to Home
    When I click on 'Home'
    Then I see 'Learn'
    And I see 'Practice'
    And I see 'Reports'