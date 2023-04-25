import userEvent from "@testing-library/user-event";
import {fireEvent, screen} from '@testing-library/react'

/**
 * Performs assertion to ensure button is available, then clicks it...
 * @param buttonText the text of the button to click
 */
export const clickButton = async (buttonText: string | RegExp) => {
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeVisible();

    await userEvent.click(button);
};

/**
 * Hovers over the provided element and check for the existence of a tooltip
 * @param elementToHover the html element to hover over
 * @param tooltipText the text we expect to be shown as part of the tooltip
 */
export const hoverAndAssertTooltip = async (elementToHover: HTMLElement, tooltipText: RegExp | string) => {
    await userEvent.hover(elementToHover);
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveTextContent(tooltipText);
}

/**
 * Performs assertion to ensure texbox is available, then checks its display value...
 * @param textFieldName the name of the textbox
 * @param displayValue the value we expect to be displayed
 */
export const assertTextBoxDisplayValue = (textFieldName: string | RegExp, displayValue: string | RegExp) => {
    const textfield = screen.getByRole('textbox', { name: textFieldName });
    expect(textfield).toBeVisible();
    expect(textfield).toHaveDisplayValue(displayValue);
};

/**
 * Performs assertion to ensure number texbox is available, then checks its display value...
 * @param textFieldName the name of the textbox
 * @param displayValue the value we expect to be displayed
 */
export const assertNumberTextBoxDisplayValue = (textFieldName: string | RegExp, displayValue: string | RegExp) => {
    const textfield = screen.getByRole('spinbutton', { name: textFieldName });
    expect(textfield).toBeVisible();
    expect(textfield).toHaveDisplayValue(displayValue);
};

/**
 * Finds the text box and pastes text into a text box
 * replicate each keystroke.
 * @param labelText the label of the text box
 * @param inputText The text to type into the text box
 */
export const pasteInTextbox = async (labelText: string | RegExp, inputText: string) => {
    const textBoxInput = screen.getByRole('textbox', { name: labelText });
    fireEvent.change(textBoxInput, { target: { value: inputText }})
};