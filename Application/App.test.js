import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {
  const rendered = TestRenderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('renders correctly', () => {
  const rendered = TestRenderer.create(<App />).toJSON();
  expect(rendered).toMatchSnapshot();
});
