class QuerySelector {
    static getElement(selector, parent = document) {
        return parent.querySelector(selector);
    }

    static getAllElements(selector, parent = document) {
        return parent.querySelectorAll(selector);
    }
}

export { QuerySelector };