const cardContainer = document.getElementById('card-container');

const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const json = await res.json();
   const data = json.data;

   loadPhoneData(data)
}


const loadPhoneData = (data) => {
    console.log(data);

    data.forEach((phone) => {
        console.log(phone);
        const cardPhone = document.createElement('div');
        cardPhone.className = 'card w-96 bg-base-100 shadow-xl p-8 border border-[#CFCFCF]';
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
    })
} 

loadPhone()