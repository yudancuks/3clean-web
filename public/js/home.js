document.addEventListener("DOMContentLoaded", function () {
    const services = [
      { title: "House Cleaning", image: "https://via.placeholder.com/350" },
      { title: "Office Cleaning", image: "https://via.placeholder.com/350" },
      { title: "Window Cleaning", image: "https://via.placeholder.com/350" },
      { title: "Carpet Cleaning", image: "https://via.placeholder.com/350" },
    ];
  
    const container = document.getElementById("service-container");
  
    services.forEach((service) => {
      // Create card
      const card = document.createElement("div");
      card.className = "card bg-base-100 rounded-xl text-left px-4";
  
      // Create figure (image container)
      const figure = document.createElement("figure");
      figure.className = "w-full h-[350px]";
  
      // Create image element
      const img = document.createElement("img");
      img.src = service.image;
      img.alt = service.title;
      img.className = "rounded-xl w-full h-full object-cover";
  
      // Append image to figure
      figure.appendChild(img);
  
      // Create card body
      const cardBody = document.createElement("div");
      cardBody.className = "card-body items-center text-center";
  
      // Create paragraph (title)
      const title = document.createElement("p");
      title.className = "text-lg";
      title.textContent = service.title;
  
      // Append title to card body
      cardBody.appendChild(title);
  
      // Append everything to card
      card.appendChild(figure);
      card.appendChild(cardBody);
  
      // Append card to container
      container.appendChild(card);
    });
  });
  