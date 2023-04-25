import React, { HTMLAttributes } from 'react';
import './EmptyState.css';
import Typography from "@mui/material/Typography";

/**
 * Type representing the available variants for the {@link EmptyState} component
 * 'no-data' - variant used when no data is returned from a search
 * 'filtered' - variant used when user filtering causes no results to be returned
 */
export type EmptyStateVariant = 'no-data' | 'filtered';

/**
 * Interface defining the props available for the {@link EmptyState} component
 */
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The (Optional) icon to display
     */
    icon?: React.ReactNode;
    /**
     * A concise explanation of the empty state
     */
    title: string;
    /**
     * The variant of the empty state
     */
    variant: EmptyStateVariant;
    /**
     * An extended explanation detailing the reason for the empty state
     */
    children: React.ReactNode;
    /**
     * Condition that determines when the empty state should be displayed
     * Defaults to false
     */
    showEmptyState: boolean;
    /**
     * The (Optional) primary action that can used to resolve issues described by the children
     */
    primaryAction?: React.ReactNode;
}


/**
 * Component used to display empty states
 */
export const EmptyState = ({
    showEmptyState = false,
    icon,
    title,
    variant,
    children,
    primaryAction,
    ...rest
}: EmptyStateProps): JSX.Element => {
    return (
        <>
            {showEmptyState && (
                <div className={'empty-state__container'} {...rest}>
                    {icon && <div className={'empty-state__icon'}>{icon}</div>}
                    <Typography
                        aria-label={'empty state'}
                        className={'empty-state__title'}
                        variant={variant === 'filtered' ? 'body1' : 'h2'}
                    >
                        {title}
                    </Typography>
                    {children}
                    {primaryAction && <div className={`empty-state__${variant}-primary-button`}>{primaryAction}</div>}
                </div>
            )}
        </>
    );
};
