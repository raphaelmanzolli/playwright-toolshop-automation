@front
Feature: Browse the tool catalog
  As a store customer
  I want to search and sort products
  So that I can easily find the right tool

  Background:
    Given I am on the product catalog

  @smoke
  Scenario: Search for a product by name
    When I search for the product "Combination Pliers"
    Then I should see only the product "Combination Pliers"

  @regression
  Scenario: Sort products from lowest to highest price
    When I sort the products by lowest price
    Then the prices should be displayed in ascending order

  @smoke
  Scenario: View product details
    When I search for the product "Combination Pliers"
    And I open the product "Combination Pliers"
    Then I should see the product "Combination Pliers" priced at 14.15
