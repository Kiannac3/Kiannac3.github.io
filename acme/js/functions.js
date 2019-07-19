/* *************************************
*  Acme Site JavaScript Functions
************************************* */
buildNav();
function buildNav(){
    let URL= "../acme/js/acme.json";
    fetch (URL)
    .then(response => response.json())
    .then(function (data) {
    console.log('Json object from getCode function from buildNav:');
    console.log(data);
    const page-Nav ={}; //Create and empty object

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

//Event Listeners to Switch page content
 document.getElementById("home").addEventListener("click", buildHome);

 document.getElementById("anvils").addEventListener("click", function(){ let keyWord="Anvils"; importFile(keyWord); console.log(keyWord) });

 document.getElementById("explosives").addEventListener("click", function(){ let keyWord="Explosives"; importFile(keyWord); console.log(keyWord) });

 document.getElementById("decoys").addEventListener("click", function(){ let keyWord="Decoys"; importFile(keyWord); console.log(keyWord) });

 document.getElementById("traps").addEventListener("click", function(){ let keyWord="Traps"; importFile(keyWord); console.log(keyWord) });

//Import Json File Function
function importFile(keyWord){
    let URL= "../acme/js/acme.json";
    fetch (URL)
    .then(response => response.json())
    .then(function (data) {
    console.log('Json object from getCode function:');
    console.log(data);
    const acmeInfo ={}; //Create and empty object
    
    let x;
    for (x in data){
        acmeInfo[x+"Name"]= data[x].name;
        acmeInfo[x+"Path"]= data[x].path;
        acmeInfo[x+"Description"]= data[x].description;
        acmeInfo[x+"Manufacturer"]= data[x].manufacturer;
        acmeInfo[x+"Price"]= data[x].price;
        acmeInfo[x+"Reviews"]=data[x].reviews;
    }

    buildContent(acmeInfo, keyWord);
    console.log(acmeInfo);

    })
    .catch(error => console.log('There was a getCode error: ', error))
} 

// Funtion to build the Homepage
function buildHome(){
    const title = document.getElementById("title");
    title.innerHTML= "Home | ACME";

    const homePage =document.getElementById("homePage");
    homePage.setAttribute("class", "unhide");

    const productContent =document.getElementById("productContent");
    productContent.setAttribute("class", "hide");    
}

// Funtion to build the content Page
function buildContent(acmeInfo, key){
    key = key;

    const homePage =document.getElementById("homePage");
    homePage.setAttribute("class", "hide");

    const productContent =document.getElementById("productContent");
    productContent.setAttribute("class", "unhide");

    const title = document.getElementById("title");
    title.innerHTML= acmeInfo[key +"Name"] +" | ACME";

    const ProductName = document.getElementById("ProductName");
    ProductName.innerHTML= acmeInfo[key +"Name"];

    const productPhoto = document.getElementById("productPhoto");
    productPhoto.innerHTML= "<img src=" + acmeInfo[key +"Path"] + " alt='" + acmeInfo[key +"Name"] +"'>";

    const productDescription = document.getElementById("productDescription");
    productDescription.innerHTML= acmeInfo[ key + "Description"]; 

    const productManufacturer = document.getElementById("productManufacturer");
    productManufacturer.innerHTML= acmeInfo[ key +"Manufacturer"];

    const productReviews = document.getElementById("productReviews");
    productReviews.innerHTML= acmeInfo[ key +"Reviews"] + " / 5 Stars" ;

    const productPrice = document.getElementById("productPrice");
    productPrice.innerHTML= "Price: $"+ acmeInfo[ key + "Price"];
}

