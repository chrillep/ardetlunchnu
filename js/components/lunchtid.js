class LunchTid extends HTMLInputElement {
  constructor () {
    super();
    if (this.urlParam("tid") !== null) {
      this.value = this.urlParam("tid");
    }
    if (this.urlParam("tid") === null) {
      this.value = "12:00";
    }
    const debouncedUserInput = this.debounce(this.userInput);
    this.addEventListener("input", debouncedUserInput, false);
  }

  urlParam (name) {
    const queryString = window.location.search;
    return new URLSearchParams(queryString).get(name);
  }

  userInput () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    params.set("tid", this.value);
    window.location.search = params.toString();
  }

  debounce (func, delay = 2000) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
}

// Define the new element
customElements.define("lunch-tid", LunchTid, { extends: "input" });
