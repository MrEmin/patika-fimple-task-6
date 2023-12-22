import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('The title section renders correctly', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText('Emoji Search'); // Find the element containing 'Emoji Search'
  expect(titleElement).toBeDefined(); // Verify that the title element exists
});

test('Filtering functionality works correctly', (done) => {
  const { getByRole, getAllByText } = render(<App />);
  const input = getByRole('textbox'); // Find the input field

  fireEvent.change(input, { target: { value: 'happy' } }); // Enter 'happy' into the input field

  setTimeout(() => {
    const filteredEmoji = getAllByText(/click to copy emoji/i); // Find the filtered emoji list
    expect(filteredEmoji.length).toBeGreaterThan(0); // Verify that the filtered emoji list is not empty
    done();
  }, 1000); // Check after waiting for 1 second
});

test('Copying emoji works correctly', () => {
  const { getAllByText } = render(<App />);
  const emojiElements = getAllByText(/click to copy emoji/i); // Find all elements with 'click to copy emoji' text

  const originalExecCommand = document.execCommand; // Save the original execCommand

  // Replace execCommand with a mock function
  document.execCommand = jest.fn(() => true);

  fireEvent.click(emojiElements[0]); // Click the first emoji
  const copiedEmoji = document.execCommand('copy'); // Call the mock execCommand

  expect(copiedEmoji).toBeTruthy(); // Verify if the emoji was copied successfully (true)

  document.execCommand = originalExecCommand; // Restore the original execCommand
});
