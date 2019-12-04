/**
 * Convert dusk selector to CSS selector such that webdriverio can
 * understand it.
 * @param {String} duskSelector 
 * @param {String} htmlTag 
 */
export const byDusk = (duskSelector, htmlTag) => {
    if (typeof htmlTag == 'undefined')
    {
        return `*[dusk=${duskSelector}]`;
    }
    else
    {
        return `${htmlTag}[dusk=${duskSelector}]`;
    }
}