document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded!');
  //const API_URL = 'http://localhost:3000/api';
  const API_URL = 'https://3cleaningsydney.com/api';
  let totalPrice = 0;
  let gstPrice = 0;


  const serviceSelect = document.getElementById('serviceId');

if (serviceSelect) {
  serviceSelect.addEventListener('change', async (event) => {
    const selectedName = event.target.value;

    try {
      const response = await fetch(`${API_URL}/packages/detail/all?packageName=${encodeURIComponent(selectedName)}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      console.log('Fetched Data:', data);
      updateSelectOptions(data); // This should be your own function
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
}

  function updateSelectOptions(data) {
    const selectElement = document.getElementById('pkgname'); // Ganti dengan ID select yang sesuai

    // Kosongkan opsi sebelumnya
    selectElement.innerHTML = '';
    
    // Tambahkan opsi baru dari data yang diterima
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item._id;
        option.textContent = item.name;
        selectElement.appendChild(option);
    });
    }
    const packageElement = document.getElementById("pkgname");
    
    packageElement.addEventListener("change", async function (event) {
        const selectedValue = event.target.value;
        try {
            const response = await fetch(`${API_URL}/packages/detail/${selectedValue}`);
            const data = await response.json();
            document.getElementById("packagenametext").innerHTML = data.name;
            document.getElementById("totalpricetext").innerHTML = data.totalPrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
            totalPrice = data.totalPrice;
            document.getElementById("grandtotalpricetext").innerHTML = totalPrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
            gstPrice = Number(((10/100)*totalPrice)+totalPrice);
            document.getElementById("totalgstprice").innerHTML = gstPrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

let selectedServices = [];

function updateSelectedServicesFromSelect(selectElement) {
    selectedServices = []; // Reset on each change

    const selectedOptions = Array.from(selectElement.selectedOptions);

    selectedOptions.forEach(option => {
        const service = {
            name: option.value,
            price: parseInt(option.getAttribute('data-price'), 10)
        };
        selectedServices.push(service);
    });

    console.log('Selected services:', selectedServices);
}


    document.getElementById("submitForm").addEventListener("click", async function() {
        const formCustomer = document.getElementById('form-customer');
        const formService = document.getElementById('form-service');
        const formAddon = document.getElementById('form-addon');


        const customerForm = new FormData(formCustomer);
        const serviceForm = new FormData(formService);

        // Prepare data customer to send to the API
        const customerData = {
            firstname: customerForm.get('firstname'),
            lastname: customerForm.get('lastname'),
            email: customerForm.get('email'), 
            phone: customerForm.get('phone'),   
            address: customerForm.get('address'),
        };

        // Prepare service customer to send to the API
        const serviceData = {
            name: document.getElementById("serviceId").value,
            homesize: document.getElementById("homesize").value,
            detailPackage: {
                description: document.getElementById("pkgname").value
            },
        };

        

        const orderData = {
            scheduleDate : customerForm.get('scheduleddate'), 
            scheduleTime : customerForm.get('scheduledtime'), 
            orderDetails : {
                customer : customerData,
                package: serviceData,
                addOns : selectedServices
            }
        }
        console.log(orderData);

        const method = 'POST'; 
        const url = `${API_URL}/orders`;
        
        try {

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving data:', errorData);
                alert(`Failed to save data: ${errorData.message}`);
                return;
            }

            alert('Data Saved Successfully!');

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the vsight. Please try again.');
        }

    
    });

    window.updateSelectedServices = updateSelectedServices;
});
