import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import React from 'react';

/**
 * Create a test query client that:
 * - does not log api errors to the error console
 * - does not retry queries that fail
 */
export const buildNewQueryClient = (): QueryClient => {
    // This is going to change in react-query v4. see https://tkdodo.eu/blog/testing-react-query
    setLogger({
        log: console.log,
        warn: console.warn,
        error: () => {
            //noop
        },
    });
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
};

export interface QueryClientTestWrapperProps {
    children: JSX.Element;
}
/**
 * Component used to return children for testing wrapped with the appropriate QueryClientProvider
 * @param children the children to be wrapped
 */
export const QueryClientTestWrapper = ({ children }: QueryClientTestWrapperProps): JSX.Element => {
    return <QueryClientProvider client={buildNewQueryClient()}>{children}</QueryClientProvider>;
};
