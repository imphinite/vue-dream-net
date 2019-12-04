import { byDusk } from '../helper';

describe('feature test helpers', () => {
    /**
     * Test dusk helper
     */
    it('should convert dusk selector to css selector', () => {
        // No Html tag specified
        let expectedResult = '*[dusk=main-button]';
        let duskSelector = 'main-button';
        expect(byDusk(duskSelector)).toBe(expectedResult);
        // With Html tag specified
        let expectedResultWithHtmlTag = 'div[dusk=main-button]';
        let htmlTag = 'div';
        expect(byDusk(duskSelector, htmlTag)).toBe(expectedResultWithHtmlTag);
    });
});