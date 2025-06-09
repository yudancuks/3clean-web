document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded!');
  //const API_URL = 'http://localhost:3000/api';
  const API_URL = 'https://3cleaningsydney.com/api';
  let basePrice = 0;
  let totalPrice = 0;
  let gstPrice = 0;
  let selectedServices = [];

  const radios = document.querySelectorAll('input[name="serviceCleaning"]');
  console.log('Radio buttons found:', radios.length);

  if (radios.length === 0) {
    console.warn('Radio buttons not found! Make sure they are present in HTML.');
  }

  radios.forEach(radio => {
    radio.addEventListener('change', async (event) => {
      document.getElementById("servicenametext").innerHTML = event.target.value;

      try {
        const response = await fetch(`${API_URL}/packages/detail/all?packageName=${event.target.value}`);
        const data = await response.json();
        console.log('Fetched Data:', data);
        updateSelectOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  });

  function updateSelectOptions(data) {
    const selectElement = document.getElementById('pkgname');
    selectElement.innerHTML = '';

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

      basePrice = data.totalPrice;
      totalPrice = basePrice;

      updatePriceUI();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  const homeElement = document.getElementById("homesize");

  homeElement.addEventListener("change", function (event) {
    document.getElementById("homesizetext").innerHTML = event.target.value;
  });

  function updateSelectedServices(checkbox) {
    const service = {
      name: checkbox.value,
      price: parseInt(checkbox.getAttribute('data-price'), 10)
    };

    if (checkbox.checked) {
      selectedServices.push(service);
    } else {
      selectedServices = selectedServices.filter(item => item.name !== service.name);
    }

    updateAddOnsUI();
  }

  function updateAddOnsUI() {
    const countAddOnsText = document.getElementById("countaddonstext");
    const addOnContainer = document.getElementById("addonContainer");

    countAddOnsText.textContent = selectedServices.length;
    addOnContainer.innerHTML = "";

    let addonPrice = 0;

    selectedServices.forEach(service => {
      const serviceElement = document.createElement("div");
      serviceElement.classList.add("flex", "justify-between");

      serviceElement.innerHTML = `
        <span class="font-semibold">${service.name}</span>
        <span>${service.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })}</span>
      `;

      addOnContainer.appendChild(serviceElement);
      addonPrice += service.price;
    });

    totalPrice = basePrice + addonPrice;
    updatePriceUI();
  }

  function updatePriceUI() {
    document.getElementById("totalpricetext").innerHTML = basePrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
    document.getElementById("grandtotalpricetext").innerHTML = totalPrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });

    gstPrice = Number((10 / 100) * totalPrice + totalPrice);
    document.getElementById("totalgstprice").innerHTML = gstPrice.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
  }

  document.getElementById("submitForm").addEventListener("click", async function () {
    const formCustomer = document.getElementById('form-customer');
    const formService = document.getElementById('form-service');

    const customerForm = new FormData(formCustomer);
    const serviceForm = new FormData(formService);

    const customerData = {
      firstname: customerForm.get('firstname'),
      lastname: customerForm.get('lastname'),
      email: customerForm.get('email'),
      phone: customerForm.get('phone'),
      address: customerForm.get('address'),
    };

    const serviceData = {
      name: serviceForm.get('serviceCleaning'),
      homesize: document.getElementById("homesize").value,
      detailPackage: {
        description: document.getElementById("pkgname").value
      },
    };

    const orderData = {
      scheduleDate: customerForm.get('scheduleddate'),
      scheduleTime: customerForm.get('scheduledtime'),
      orderDetails: {
        customer: customerData,
        package: serviceData,
        addOns: selectedServices
      }
    };

    console.log(orderData);

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
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
      alert('An error occurred while saving the data. Please try again.');
    }
  });

  // Allow global access to this function from HTML (checkbox onchange)
  window.updateSelectedServices = updateSelectedServices;
});
