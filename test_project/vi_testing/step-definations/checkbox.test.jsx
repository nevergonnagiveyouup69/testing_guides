import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber"
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest';
import App from "../../src/App.jsx";

const feature = await loadFeature('vi_testing/features/2_check_box.feature')

describeFeature(feature, ({ BeforeAllScenarios, AfterAllScenarios, BeforeEachScenario, AfterEachScenario, Scenario }) => {
  BeforeAllScenarios(() => {})
  AfterAllScenarios(() => {})
  BeforeEachScenario(() => {})
  AfterEachScenario(() => {})

  Scenario(`checkbox if checkbox renders and button is clickable`, ({ Given, Then }) => {

      Given(`John sees the checkbox is loaded`, () => { 
        render(<App />);
        const textElement = screen.getByText(/save to test HMR/i);
        expect(textElement).toBeInTheDocument();

        // Select the button for use in the Then step
        const button = screen.getByRole('button');   
        expect(button).toBeInTheDocument();
      })

      Then(`John check the checkbox`,async () => { 
        render(<App />);
        const textElement = screen.getByText(/save to test HMR/i);
        expect(textElement).toBeInTheDocument();

        // Select the button for use in the Then step
        const button = screen.getByRole('button');  
        button.click();  // Simulate a click event

        // Use waitFor to wait for the DOM update
        await waitFor(() => {
          expect(button.textContent).toBe('count is 1');  // Expect the updated value
        });
      })
  })

})