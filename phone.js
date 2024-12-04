const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    console.log('phones')
    // phone contsiner
    const phoneContainer = document.getElementById('phone-container');
    // Clear Phone Container before adding new cards
    phoneContainer.textContent = '';

    // Display show all button if there are more then 10 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    console.log("Is Show All ", isShowAll)
    // Display only first 10 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }

    // loop phones
    phones.forEach(phone => {
        // console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        // add  classes
        phoneCard.classList = `card p-4 bg-gray-200 shadow-xl`
        // set inner html
        phoneCard.innerHTML = `
                    <figure class="px-10 pt-10">
                    <img src="${phone.image}" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                    <h2 class="text-black card-title">${phone.phone_name
            }</h2>
                    <p class="text-gray-600">If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                    <p class="font-bold text-black  w-full">$999</p>
                    <button onclick="handleShowDetails('${phone.slug}'); my_modal_5.showModal() " class="btn btn-primary w-full">Show Details</button>
                    </div>
                    </div>
        `
        // append it
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading dots
    toggleLoadingDots(false);
}

// for Show details
const handleShowDetails = async (id) => {
    console.log("Slow all button clicked", id);
    // load Single Phone Data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data= await res.json();
    const phone= data.data;
    showPhoneDetails(phone)
}

// show phone details
const showPhoneDetails=(phone)=>{
    console.log(phone);
    // show the modal
    show-details-modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingDots(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// Another handle search button
// const handleSearch2=()=>{
//     const searchField= document.getElementById('search-field2');
//     const searchText= searchField.value;
//     loadPhone(searchText);
// }

// toggle loading Dots
const toggleLoadingDots = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots');
    if (isLoading) {
        loadingDots.classList.remove('hidden')
    }
    else {
        loadingDots.classList.add('hidden')

    }
}

// handle Shoow All
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()