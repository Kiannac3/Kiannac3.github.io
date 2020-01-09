/* *************************************
*  Acme Site JavaScript Functions
************************************* */
buildNav();
function buildNav(){
    let URL= "../js/acme.json";
    fetch (URL)
    .then(response => response.json())
    .then(function (data) {
    console.log('Json object from getCode function from buildNav:');
    console.log(data);
    const acmeNav ={}; //Create and empty object

    let x;
    let keys = Object.keys(data);
    console.log(keys);

    for (x in keys){

        const nav = document.getElementById(x);
        nav.innerHTML= keys[x];
     }

    
    })
    .catch(error => console.log('There was a getCode error: ', error))
} 
