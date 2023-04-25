import React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { render, screen } from '@testing-library/react';

const TestComponent = (): JSX.Element => {
    return (<ProductCardSkeleton/>);
}

describe('<ProductCardSkeleton/>', () => {
    describe('Initialisation', () => {
        test('should render correctly', () => {
            render(<TestComponent/>);
            expect(screen.getByLabelText(/product card loading skeleton/i)).toBeVisible();
        });
    });
});
