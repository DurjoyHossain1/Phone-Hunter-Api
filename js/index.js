const cardContainer = document.getElementById('card-container');

const loadPhone = async (serchInput=12,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serchInput}`);
    const json = await res.json();
    const data = json.data;

    const errorMassage = document.getElementById('error-massage')
      if (data.length === 0) {
        errorMassage.innerText = "Something is wrong can't find any item ";
        errorMassage.classList.remove('hidden')
      }else{
        errorMassage.classList.add('hidden');
      }
    
   loadPhoneData(data,isShowAll)
}


const loadPhoneData = (data,isShowAll) => {
    
  // if deta.length gatter then 12 then Show The Show All button
  const showAll = document.getElementById('showAll-Container');

  if (data.length > 12 && !isShowAll) {
    showAll.classList.remove('hidden')
  }else{
    showAll.classList.add('hidden')
  }

  // Only 12 Values Allow
  if (!isShowAll) {
    data = data.slice(0,12)
  }

    //cardContainer.innerText = ''
    //cardContainer.innerHTML = ''
    cardContainer.textContent = ''


    data.forEach((phone) => {
        const cardPhone = document.createElement('div');
        cardPhone.className = 'card md:w-96 bg-base-100 shadow-xl p-8 border border-[#CFCFCF]';
        cardPhone.innerHTML = `  
        <figure>
         <img src="${phone.image}" alt="Mobile" />
        </figure>
        <div class="card-body">
          <h2 class="text-center font-bold text-2xl">${phone.phone_name}</h2>
          <p class="text-center mt-4">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions mx-auto">
            <button  onclick="loadDetails('${phone.slug}')" class="btn btn-primary mt-4 text-xl font-semibold">Show Details</button>
          </div>
        </div>`
        cardContainer.appendChild(cardPhone)
    });
    loadSpiner(false)
} 

  const handelSerch = (isShowAll) => {
    loadSpiner(true)
    const serchInput = document.getElementById('serch-input').value;
    loadPhone(serchInput,isShowAll);

   
  }

const loadSpiner = (isLoding) => {
  const loadSpinerConainer = document.getElementById('loding-spiner');
  if (isLoding) {
    loadSpinerConainer.classList.remove('hidden');
  }else{
    loadSpinerConainer.classList.add('hidden');
  }
}

const loadDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const json = await res.json()
  const data = json.data;
  console.log(data);

  const showDetailsContainer = document.getElementById('show-details-container')
  showDetailsContainer.innerHTML = `
    <div class=" w-full text-center mb-8">
      <img class="text-center mx-auto" src="${data?.image}" alt="" />
    </div>
    <h2 class="text-2xl font-bold mb-3">${data?.name}</h2>
    <p class="mb-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h2 class="mb-3"><span class="font-bold ">Display Size :</span> ${data?.mainFeatures?.displaySize}</h2>
    <h2 class="mb-3"><span class="font-bold ">Chipset :</span> ${data?.mainFeatures?.chipSet}</h2>
    <h2 class="mb-3"><span class="font-bold ">Memory :</span> ${data?.mainFeatures?.memory}</h2>
    <h2 class="mb-3"><span class="font-bold ">Slug :</span> ${data?.slug}</h2>
    <h2 class="mb-3"><span class="font-bold ">Release data : </span> ${data?.releaseDate}</h2>
    <h2 class="mb-3"><span class="font-bold ">Brand :</span> ${data?.brand}</h2>
    <h2 class="mb-3"><span class="font-bold ">GPS : </span> ${data?.others?.GPS}</h2>
  
  `

  my_details_modal.showModal()
}

const handelShowAll = () => {
  handelSerch(true);
}

loadPhone()