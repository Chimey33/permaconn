import React from 'react';

/**
 * Interface defining the props available for the {@link AsyncFallback} component
 */
export interface AsyncFallbackProps {
    /**
     * The status of the request
     */
    status: 'loading' | 'error' | 'success' | 'idle';
    /**
     * The children to display when a request is successfully completed
     */
    children: React.ReactNode;
    /**
     * The (Optional) fallback component to display when the status is loading
     */
    loadingComponent?: React.ReactNode;
}

/**
 *  Displays children or fallbacks based on the status of a request
 */
export const AsyncFallback = ({
    status,
    children,
    loadingComponent = <>Loading...</>
}: AsyncFallbackProps): JSX.Element => {
    return (
        <>
            {status === 'loading' && loadingComponent}
            {status === 'success' && children}
            {status === 'error' && <>An error occurred...</>}
        </>
    );
};
