Feature: Reports Page
  Scenario: Go to Reports
    Given I am on the 'reports' page

  Scenario: I can navigate to home
    When I click on 'Home'
    Then I see 'Learn'
    And I see 'Practice'
    And I see 'Reports'