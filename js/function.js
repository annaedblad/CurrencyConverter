async function getCurrencies() {
    let currentSession = JSON.parse(sessionStorage.getItem("currency"));

    if (currentSession == null || new Date(currentSession.expired).getTime() < new Date().getTime()) {
        let response = await fetchData("https://api.exchangeratesapi.io/latest/");

        response.expired = new Date(new Date().getTime() + (60000 * 60));
        sessionStorage.setItem("currency", JSON.stringify(response));
        currentSession = JSON.parse(sessionStorage.getItem("currency"));
        console.log("new session created");
    }

    let select = document.getElementById("fromValue");
    let select2 = document.getElementById("toValue");

    Object.keys(currentSession.rates).forEach(function (key) {
        let el = document.createElement("option");
        el.textContent = key;

        el.value = currentSession.rates[key];
        select.appendChild(el);

        let el2 = document.createElement("option");
        el2.textContent = key;
        el2.value = currentSession.rates[key];

        select2.appendChild(el2);
    });
}

let tradeCurrencies = (function () {
    let fromAmount;
    let fromValue;
    let toValue;
    let toAmount;
    let currencyName;

    function buyCurrency() {
        setValues();
        toAmount.innerHTML = "Köpet ger " + ((toValue / fromValue) * fromAmount).toFixed(2) + " " + currencyName;
    }

    function sellCurrency() {
        setValues();
        toAmount.innerHTML = "Försäljningen ger " + ((toValue / fromValue) * fromAmount).toFixed(2) + " " + currencyName;
    }
    function setValues() {
        fromAmount = document.getElementById("fromAmount").value;
        fromValue = document.getElementById("fromValue").value;
        toValue = document.getElementById("toValue").value;
        toAmount = document.getElementById("toAmount");
        currencyName = $('#toValue :selected').text();

    }

    return {
        buy: buyCurrency,
        sell: sellCurrency
    }

})();