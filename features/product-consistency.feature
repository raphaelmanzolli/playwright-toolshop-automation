@integration @regression
Feature: Keep product data consistent between the API and frontend
  As a store customer
  I want the website to display the same data provided by the API
  So that I can trust the product catalog

  Scenario: Display an API product on the frontend
    Given the API returns an in-stock product
    When I search for that product in the catalog
    Then the displayed name and price should match the API data
