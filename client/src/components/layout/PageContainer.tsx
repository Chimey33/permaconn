import React from 'react';
import Typography from '@mui/material/Typography';
import './PageContainer.css';

/**
 *  Interface defining the available props for the {@link PageContainer} component
 */
export interface PageContainerProps {
    /**
     *  The page title
     */
    title: string;
    /**
     * The children to be displayed
     */
    children: React.ReactNode;
}

/**
 * Container component that wraps the main content of the page
 */
export const PageContainer = ({ title, children,}: PageContainerProps): JSX.Element => {
    return (
        <div className={'container'}>
            <Typography variant={'h2'} className={'heading'}>{title}</Typography>
            <>{children}</>
        </div>
    );
};
