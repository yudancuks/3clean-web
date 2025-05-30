// Di luar DOMContentLoaded
//const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://3cleaningsydney.com/api';

function updateOrderStatus(orderId) {
  Swal.fire({
    title: 'Update Order Status',
    input: 'select',
    inputOptions: {
      pending: 'Pending',
      'on-progress': 'On Progress',
      succeed: 'Succeed'
    },
    inputPlaceholder: 'Select a status',
    showCancelButton: true,
    confirmButtonText: 'Update',
    showLoaderOnConfirm: true,
    preConfirm: async (status) => {
      try {
        const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        });

        if (!response.ok) {
          const errorData = await response.json();
          return Swal.showValidationMessage(`Error: ${errorData.message || JSON.stringify(errorData)}`);
        }

        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Status updated',
        text: `Order #${orderId} status updated`
      });
    }
  });
}

// Ini hanya untuk debug, bisa tetap di dalam
document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded!');
});
