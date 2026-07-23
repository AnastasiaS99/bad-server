import sanitizeHtml from 'sanitize-html';

export const sanitize = (value: string): string =>
    sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
    })