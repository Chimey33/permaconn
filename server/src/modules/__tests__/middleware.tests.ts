import { NextFunction, Request, Response } from "express";
import {handleInputErrors} from "../middleware";




const mockStatus = jest.fn();
const mockJson = jest.fn();
const mockedNextFunction: NextFunction = jest.fn();

const req = { body: 'some request'} as Request;
const res = {status: mockStatus, json: mockJson} as Response;


describe("middleware",  () => {
    describe("handleInputErrors", () => {
        test("should delegate to next function when validator returns no errors", async () => {
            // jest.mock('express-validator', () => {
            //     return {
            //         ...jest.requireActual('express-validator'),
            //         validationResult: jest.fn(() => {
            //             return {
            //                 isEmpty: jest.fn().mockReturnValue(true),
            //                 array: jest.fn(() => [{ errors: ['some string']}])
            //             }
            //         })
            //     }
            // });
           // mockValidator(true, [])
            await handleInputErrors(req, res, mockedNextFunction);

            expect(mockedNextFunction).toHaveBeenCalled();
        });

        test("should return 400 and error messages when validation fails", async () => {
            // jest.mock('express-validator', () => {
            //     return {
            //         ...jest.requireActual('express-validator'),
            //         validationResult: jest.fn(() => {
            //             return {
            //                 isEmpty: jest.fn().mockReturnValue(false),
            //                 array: jest.fn(() => [{ errors: ['some string']}])
            //             }
            //         })
            //     }
            // });
            const errors = ['An error occurred']
            //mockValidator(false, ['An error occurred'])
            await handleInputErrors(req, res, mockedNextFunction);

            await expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith(errors);
        });
    });
})
