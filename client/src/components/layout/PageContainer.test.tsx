import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageContainer, } from './PageContainer';

const TestComponent = () => {
    return (<PageContainer title={'Page title'}><>Children</></PageContainer>);
};

describe('<PageContainer />', () => {
   describe('Initialisation', () => {
       test('should render the page container with the correct structure', () => {
           render(<TestComponent/>);
           expect(screen.getByRole('heading',  { name: /page title/i})).toBeVisible();
           expect(screen.getByText(/children/i)).toBeVisible();
       });
   })
});
