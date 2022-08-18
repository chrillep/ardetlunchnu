// Create a class for the element
class LunchTid extends HTMLInputElement {
    constructor() {
        // Always call super first in constructor
        super();
        const urlParam = name => {
            const queryString = window.location.search;
            return new URLSearchParams(queryString).get(name);
        };
        if (urlParam('tid') !== null) {
            this.value = urlParam('tid');
        }
        if (urlParam('tid') === null) {
            this.value = '12:00'
        }
        this.addEventListener("input", () => {
                setTimeout(() => {
                    const queryString = window.location.search;
                    let params = new URLSearchParams(queryString);
                    params.set('tid', this.value);
                    window.location.search = params.toString();
                }, 2000);
            }, false
        );
    }
}

// Define the new element
customElements.define('lunch-tid', LunchTid, {extends: 'input'});

