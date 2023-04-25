import React from 'react';
import { render, screen } from '@testing-library/react';
import { AsyncFallback } from './AsyncFallback';

interface TestComponentProps {
    status?: 'loading' | 'error' | 'success' | 'idle';
    loadingComponent?: JSX.Element;
}

const TestComponent = ({ status = 'success', loadingComponent }: TestComponentProps): React.ReactElement => {
    return (<AsyncFallback status={status} loadingComponent={loadingComponent}>This is a child</AsyncFallback>);
};

describe('<AsyncFallback />', () => {
    describe('Initialisation', () => {
        test('should render child component when status === success', () => {
            render(<TestComponent/>);
            expect(screen.getByText(/this is a child/i)).toBeVisible();
        });

        test('should render default loading component when status ===  loading', () => {
            render(<TestComponent status={'loading'}/>);
            expect(screen.getByText(/Loading/i)).toBeVisible();
        });

        test('should render the loading component provided when status ===  loading', () => {
            render(<TestComponent status={'loading'} loadingComponent={<>Custom component</>}/>);
            expect(screen.getByText(/custom component/i)).toBeVisible();
        });

        test('should render default error component when status ===  error', () => {
            render(<TestComponent status={'error'}/>);
            expect(screen.getByText(/an error occurred/i)).toBeVisible();
        });
    });
});
