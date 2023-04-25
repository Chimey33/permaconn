import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState, EmptyStateVariant } from './EmptyState';
import Button from "@mui/material/Button";

interface TestProps {
    showEmptyState?: boolean;
    variant?: EmptyStateVariant;
    icon?: React.ReactNode;
    primaryAction?: React.ReactNode;
}

const TestComponent = ({
    showEmptyState = true,
    variant = 'no-data',
    icon,
    primaryAction
}: TestProps): React.ReactElement => {
    return (
        <EmptyState
            title={'Test empty state'}
            showEmptyState={showEmptyState}
            variant={variant}
            icon={icon}
            primaryAction={primaryAction}
        >
            test children
        </EmptyState>
    );
};

describe('<EmptyState>', () => {
    describe('Initialisation', () => {
        test('should render the EmptyState component correctly when actions and icon provided', () => {
            render(<TestComponent primaryAction={<Button>primary</Button>} icon={<>icon</>}/>);

            // Title is displayed
            expect(screen.getByText(/test empty state/i)).toBeVisible();

            // Children are displayed
            expect(screen.getByText(/test children/i)).toBeVisible();

            // Icon is displayed
            expect(screen.getByText(/icon/i)).toBeVisible();

            // Primary action is displayed
            expect(screen.getByRole('button', {name: /primary/i})).toBeVisible();
        });

        test('should render the EmptyState component correctly when NO actions or icon provided', () => {
            render(<TestComponent/>);
            // Title is displayed
            expect(screen.getByText(/test empty state/i)).toBeVisible();

            // Children are displayed
            expect(screen.getByText(/test children/i)).toBeVisible();

            // Icon is NOT displayed
            expect(screen.queryByText(/icon/i)).not.toBeInTheDocument();

            // Primary action is NOT displayed
            expect(screen.queryByRole('button', {name: /primary/i})).not.toBeInTheDocument();
        });

        test('should NOT render the EmptyState when showEmptyState = false', () => {
            render(<TestComponent showEmptyState={false}/>);
            // Title is NOT displayed
            expect(screen.queryByText(/test empty state/i)).not.toBeInTheDocument();
            expect(screen.queryByLabelText(/empty state/i)).not.toBeInTheDocument();
        });
    });
});
