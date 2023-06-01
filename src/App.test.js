import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders CSV Uploader text', () => {
  render(<App />);
  const linkElement = screen.getByText(/CSV Uploader/i);
  expect(linkElement).toBeInTheDocument();
});

test('It should get a error message when click to Load CSV button without submiting a file', async () => {
  render(<App />);
  const button = screen.getByText(/Load CSV/i);
  fireEvent.click(button);
  const resultMessage = await screen.findByText(/Please provide a file/i);
  expect(resultMessage).toBeInTheDocument();
});

test('It should get a error message when loading a not CSV file', async () => {
  render(<App />);

  const input = screen.getByLabelText('CSV File');

  const file = new File(['test'], 'csv-file.pdf', {type: 'text/csv'});

  fireEvent.change(input, { target: { files: [file] } });

  const button = screen.getByText(/Load CSV/i);
  fireEvent.click(button);

  const resultMessage = await screen.findByText(/Please provide only CSV files/i);
  expect(resultMessage).toBeInTheDocument();
});

async function loadCSVFile() {
  render(<App />);

  const input = screen.getByLabelText('CSV File');

  const file = new File(['column1, column2, column3, 1, 2, 3, a, b, c'], 'csv-file.csv', {type: 'text/csv'});

  fireEvent.change(input, { target: { files: [file] } });

  const button = screen.getByText(/Load CSV/i);
  fireEvent.click(button);
}

test('It should successfully render the cards after uploading and submit a file', async () => {
  await loadCSVFile();

  const successMessage = await screen.findByText(/File successfully uploaded!/i);
  expect(successMessage).toBeInTheDocument();
});