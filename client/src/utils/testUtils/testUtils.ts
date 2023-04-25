/**
 * Function that forces a promise into LOADING state causing it to 'hang'
 * @param mockApiFn the mock api to call
 * @return function that can be used to resolve the promise we caused to hang
 */
export const hangPromise = <T> (mockApiFn: jest.Mock): ((_: Promise<{data: T}>) => void) => {
    let resolvePromise = (_: Promise<{data: T}>): void => {
        return;
    }

    const promise = new Promise((resolve): void => {
        resolvePromise = resolve;
    });

    mockApiFn.mockImplementationOnce(() => promise);

    return resolvePromise;
}