async function getCurrencies () 
{
    let currentSession = JSON.parse(sessionStorage.getItem("currency"));

    if (currentSession == null || new Date(currentSession.expired).getTime() < new Date().getTime())
    {
        let response = await fetchData("https://api.exchangeratesapi.io/latest/");

        response.expired = new Date(new Date().getTime() + (60000 * 60));
        sessionStorage.setItem("currency", JSON.stringify(response));
        currentSession = JSON.parse(sessionStorage.getItem("currency"));
        console.log("new session created");
    }

    let select = document.getElementById("fromValue");
    let select2 = document.getElementById("toValue");

    Object.keys(currentSession.rates).forEach(function(key) {
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


function buyCurrency () {

    let fromAmount = document.getElementById("fromAmount").value;
let fromValue = document.getElementById("fromValue").value;
let toValue = document.getElementById("toValue").value;

var toAmount = document.getElementById("toAmount");

toAmount.innerHTML = (fromAmount*fromValue) / toValue;

}