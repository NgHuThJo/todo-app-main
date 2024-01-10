class Template {
    static createTemplate(template) {
        const clone = template.content.cloneNode(true);

        return clone.firstElementChild;
    }
}

export { Template };