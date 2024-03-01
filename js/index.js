const cardContainer = document.getElementById('card-container');

const loadPhone = async (serchInput=12,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serchInput}`);
    const json = await res.json();
   const data = json.data;

   loadPhoneData(data,isShowAll)
}


const loadPhoneData = (data,isShowAll) => {
    //console.log(data.length);

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
            <button class="btn btn-primary mt-4 text-xl font-semibold">Show Details</button>
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

const handelShowAll = () => {
  //const showAllContainer = document.getElementById('showAll-Container');
  handelSerch(true);
}

//loadPhone()