async function fetchData (url) {
    let getData = await fetch(url);
    let returnData = await getData.json();
    return returnData;
}