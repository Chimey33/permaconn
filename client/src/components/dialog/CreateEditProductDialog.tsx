import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {Categories, Product, ProductValidationSchema} from '../../types/Product';
import './CreateEditProductDialog.css';

/**
 * Interface defining the props available for the {@link CreateEditProductDialog} component
 */
export interface CreateEditProductDialogProps {
    /**
     * The title displayed at the top of the dialog
     */
    dialogTitle: string;
    /**
     * The (Optional) product to edit the details of
     */
    product?: Product;
    /**
     * Boolean denoting the opn/closed state of the dialog
     */
    open: boolean;
    /**
     * Callback invoked when the dialog cancel button is clicked
     */
    onCancel: () => void;
    /**
     * Callback invoked when the dialog submit button is clicked
     */
    onSubmit: (values: Partial<Product>) => void;
}

/**
 * Displays a dialog used for creating or editing a product
 */
export const CreateEditProductDialog = ({
                                            dialogTitle,
                                            product,
                                            open,
                                            onCancel,
                                            onSubmit
                                        }: CreateEditProductDialogProps) => {
    const formik = useFormik<Partial<Product>>({
        initialValues: {...product},
        validationSchema: ProductValidationSchema,
        isInitialValid: !!product,
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        },
    });

    /**
     * Cancels the submission and resets the form
     */
    const onCancelSubmission = () => {
        onCancel();
        formik.resetForm();
    }

    /**
     * Updates the number inputs to be correctly formatted
     * @param event the event to collect the values from
     */
    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const {target: {name, value}} = event;
        formik.setFieldValue(name, !!value ? Number(value).toFixed(2) : undefined);
        formik.handleBlur(event)
    }

    return (
        <Dialog open={open} onClose={onCancel} fullWidth maxWidth={'xl'} aria-label={`${dialogTitle} dialog`}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'form'}>
                        <TextField
                            fullWidth
                            id={'title'}
                            name={'title'}
                            label={'Title'}
                            value={formik.values.title || ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!formik.touched.title && Boolean(formik.errors.title)}
                            helperText={!!formik.touched.title && formik.errors.title as string}
                            classes={{root: 'input'}}
                        />
                        <TextField
                            fullWidth
                            id={'description'}
                            name={'description'}
                            label={'Description'}
                            value={formik.values.description || ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!formik.touched.description && Boolean(formik.errors.description)}
                            helperText={!!formik.touched.description && formik.errors.description as string}
                            classes={{root: 'input'}}
                            multiline
                            minRows={5}
                        />
                        <div className={'pricing'}>
                            <TextField
                                fullWidth
                                id={'brand'}
                                name={'brand'}
                                label={'Brand'}
                                value={formik.values.brand || ''}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={!!formik.touched.brand && Boolean(formik.errors.brand)}
                                helperText={!!formik.touched.brand && formik.errors.brand as string}
                                classes={{root: 'input'}}
                            />
                            <FormControl classes={{root: 'input'}} fullWidth>
                                <InputLabel id={'category'}>Category</InputLabel>
                                <Select
                                    id={'category'}
                                    name={'category'}
                                    value={formik.values.category || ''}
                                    label={'Category'}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    classes={{select: 'input'}}
                                    error={!!formik.touched.category && Boolean(formik.errors.category)}
                                >
                                    {Categories.map(category => {
                                        return (
                                            <MenuItem value={category} key={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                {!!formik.touched.category && <FormHelperText
                                    classes={{root: 'error-helper'}}>{formik.errors.category as string}</FormHelperText>}
                            </FormControl>
                            <TextField
                                fullWidth
                                id={'rating'}
                                name={'rating'}
                                label={'Rating'}
                                type={'number'}
                                value={formik.values.rating || ''}
                                onChange={formik.handleChange}
                                error={!!formik.touched.rating && Boolean(formik.errors.rating)}
                                helperText={!!formik.touched.rating && formik.errors.rating as string}
                                classes={{root: 'input'}}
                                onBlur={onBlur}
                            />
                        </div>
                        <div className={'pricing'}>
                            <TextField
                                fullWidth
                                id={'price'}
                                name={'price'}
                                label={'Price'}
                                value={formik.values.price || ''}
                                onChange={formik.handleChange}
                                error={!!formik.touched.price && Boolean(formik.errors.price)}
                                helperText={!!formik.touched.price && formik.errors.price as string}
                                classes={{root: 'input'}}
                                onBlur={onBlur}
                                type={'number'}
                                InputProps={{
                                    startAdornment: <InputAdornment position={'start'}>$</InputAdornment>,
                                }}
                            />
                            <TextField
                                fullWidth
                                id={'discountPercentage'}
                                name={'discountPercentage'}
                                label={'Discount percentage'}
                                value={formik.values.discountPercentage || ''}
                                onChange={formik.handleChange}
                                error={!!formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                                helperText={!!formik.touched.discountPercentage && formik.errors.discountPercentage as string}
                                type={'number'}
                                classes={{root: 'input'}}
                                onBlur={onBlur} InputProps={{
                                endAdornment: <InputAdornment position={'start'}>%</InputAdornment>,
                            }}
                            />
                            <TextField
                                fullWidth
                                id={'stock'}
                                name={'stock'}
                                label={'Stock'}
                                value={formik.values.stock || ''}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type={'number'}
                                error={!!formik.touched.stock && Boolean(formik.errors.stock)}
                                helperText={!!formik.touched.stock && formik.errors.stock as string}
                                classes={{root: 'input'}}
                            />
                        </div>
                    </div>
                </form>
                <DialogActions>
                    <Button
                        onClick={onCancelSubmission}
                        classes={{root: 'form-button'}}
                        variant={'contained'}
                        size={'large'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={formik.submitForm}
                        classes={{root: 'form-button'}}
                        variant={'contained'}
                        size={'large'}
                        disabled={!formik.isValid}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}