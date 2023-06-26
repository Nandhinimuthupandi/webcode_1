const div1 = document.createElement("div");
div1.classList.add("container");
document.body.append(div1);

const searchFilter = document.createElement("div");
searchFilter.setAttribute("id", "Search_Brewery_Container")
searchFilter.classList.add("p-3", "bg-secondary");
div1.append(searchFilter);

const divCard = document.createElement("div");
divCard.setAttribute("id", "B_Container")
divCard.classList.add("d-flex", "justify-content-center", "align-items-center", "flex-row", "flex-wrap", "bg-info-subtle");
div1.append(divCard);

const filter = document.createElement("input");
filter.setAttribute("type", "text");
filter.setAttribute("placeholder", "Search by StateName : Eg: Texas...");
filter.classList.add("w-50");
searchFilter.append(filter);

let allDetails = [];
let breweriesDisplay = async () => {
    try {
        let URL = "https://api.openbrewerydb.org/v1/breweries";
        let response = await fetch(URL);
        let data = await response.json();
        allDetails = [...data];
        display_breweries(allDetails);
        console.log(allDetails)
    } catch (error) {
        console.log("error")
    }

}

breweriesDisplay();


const display_breweries = (breweries) => {

    let info = "";

    breweries.map((element) => {
        info += `
        <div class="shadow border border-info border-1 bg-secondary-subtle rounded p-3 m-2" style="width: 20rem;height: 20rem">
        <div>
      <label for="" style="font-weight: bold;color: darkolivegreen;">Brewery Name: </label>
      <label for="">${element.name}</label>
    </div>
    <div>
      <label for="" style="font-weight: bold;color: darkolivegreen;">Brewery Type: </label>
      <label for="">${element.brewery_type}</label>
    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Brewery Address: </label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">Street: </span>${element.street}</label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">Address_1: </span>${element.address_2}</label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">Address_2: </span>${element.address_3}</label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">City: </span>${element.city}</label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">State: </span>${element.state}</label>
        <label for=""><span style="font-weight: bold;color:#961f12b8;">Country: </span>${element.country} 
        <span style="font-weight: bold;color:#961f12b8;">Pin-Code</span>: ${element.postal_code}</label>

    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Website URL: </label>
        <label for="">${element.website_url}</label>
    </div>
    <div>
        <label for="" style="font-weight: bold;color: darkolivegreen;">Phone: </label>
        <label for="">${element.phone}</label>
    </div>
     </div> `

    })

    document.getElementById("B_Container").innerHTML = info;
}


let search_text_filter = document.getElementById("Search_Brewery_Container");
search_text_filter.addEventListener('keyup', (event) => {
    let value = event.target.value;
    console.log(value)
    let search_array = [];
    if (value.length === 0) {
        display_breweries(allDetails);
        return;
    }
    else if (value.length > 0) {
        for (i = 0; i < allDetails.length; i++) {
            if (allDetails[i].state.toLowerCase().startsWith(value.toLowerCase())) {
                search_array.push(allDetails[i]);
            }
        }
    }

    display_breweries(search_array);
})