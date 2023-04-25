import React, {useState} from 'react';
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

/**
 * Interface defining the props available for the {@link ProductImageStepper}
 */
export interface ProductImageStepperProps {
    /**
     * List of urls used to retrieve the image to display
     */
    images: string[];
    /**
     * The title of the product
     */
    title: string;
}

/**
 * Displays and steps through images associated with a product
 */
export const ProductImageStepper = ({title, images}: ProductImageStepperProps): JSX.Element => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = images.length;

    /**
     * Steps to the next image in the sequence, or loops back to start of image sequence
     */
    const handleNext = () => {
        setActiveStep((prev) => {
            const lastStep = prev === maxSteps - 1;
            return lastStep ? 0 : prev + 1;
        });
    };

    /**
     * Steps to the previous image in the sequence, or loop back to end of image sequence
     */
    const handleBack = () => {
        setActiveStep((prev) => {
            const firstStep = prev === 0;
            return firstStep ? maxSteps - 1 : prev - 1;
        });
    };

    return (
        <Box>
            <Box sx={{height: 260}}>
                <img
                    height={250}
                    width={'100%'}
                    src={images[activeStep]}
                    alt={`${title} image ${activeStep}`}
                    aria-label={`${title} image ${activeStep}`}
                />
            </Box>
            <MobileStepper
                steps={maxSteps}
                position={'static'}
                activeStep={activeStep}
                nextButton={
                    <Button
                        size={'small'}
                        aria-label={`${title} next image'`}
                        onClick={handleNext}
                    >
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button
                        size={'small'}
                        onClick={handleBack}
                        aria-label={`${title} previous image`}
                    >
                        <KeyboardArrowLeft/>
                    </Button>
                }
            />
        </Box>
    );
}
