@api
Feature: Retrieve products through the API
  As a Toolshop API consumer
  I want to retrieve the available products
  So that I can use reliable catalog data

  @smoke
  Scenario: List products successfully
    When I request the first page of products
    Then the API should respond with status 200
    And it should return a product list with a valid contract

  @regression
  Scenario: Retrieve a product by ID
    Given a product returned by the API exists
    When I request that product by its ID
    Then the API should respond with status 200
    And the details should match the requested product

  @negative
  Scenario: Retrieve a product that does not exist
    When I request a product with a nonexistent ID
    Then the API should respond with status 404
