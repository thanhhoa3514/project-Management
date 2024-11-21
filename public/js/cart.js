const socialIcons = document.querySelectorAll(".social-icon");
if (socialIcons.length > 0) {
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      this.style.transform = "scale(1.2)";
    });

    icon.addEventListener("mouseleave", () => {
      this.style.transform = "scale(1)";
    });
  });
}

const header = document.querySelector(".header");

// Scroll header effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Dropdown hover effect for desktop
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("mouseenter", function () {
    this.classList.add("show");
    this.querySelector(".dropdown-menu").classList.add("show");
  });

  dropdown.addEventListener("mouseleave", function () {
    this.classList.remove("show");
    this.querySelector(".dropdown-menu").classList.remove("show");
  });
});

// Alert system functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize alerts that are present on page load
  initializeAlerts();

  // Function to initialize all alerts
  function initializeAlerts() {
    const alerts = document.querySelectorAll("[show-alert]");
    alerts.forEach(setupAlert);
  }

  // Setup individual alert
  function setupAlert(alert) {
    const time = parseInt(alert.dataset.time) || 5000;

    // Set up auto-dismiss timer
    if (time > 0) {
      setTimeout(() => {
        dismissAlert(alert);
      }, time);
    }

    // Add click handler for close button
    const closeBtn = alert.querySelector("[close-alert]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        dismissAlert(alert);
      });
    }

    // Add initial animation class
    requestAnimationFrame(() => {
      alert.classList.add("alert-show");
    });
  }

  // Function to dismiss alert with animation
  function dismissAlert(alert) {
    if (!alert) return;

    // Add dismissing class for animation
    alert.classList.add("alert-dismissing");

    // Remove alert after animation
    alert.addEventListener(
      "animationend",
      () => {
        alert.remove();
      },
      { once: true }
    );
  }

  // Function to create new alert programmatically
  window.createAlert = function (type, message, time = 5000) {
    const alertsContainer = document.querySelector(".alerts-container");
    if (!alertsContainer) return;

    const ALERT_TYPES = {
      success: { className: "alert-success", icon: "check-circle" },
      info: { className: "alert-info", icon: "info-circle" },
      warning: { className: "alert-warning", icon: "exclamation-triangle" },
      danger: { className: "alert-danger", icon: "exclamation-circle" },
    };

    const alertType = ALERT_TYPES[type] || ALERT_TYPES.info;

    const alertElement = document.createElement("div");
    alertElement.className = "message";
    alertElement.innerHTML = `
        <div class="alert ${alertType.className}" 
             show-alert 
             data-time="${time}"
             role="alert">
          <i class="fas fa-${alertType.icon} me-2"></i>
          <span class="alert-message">${message}</span>
          <button type="button" 
                  class="close-btn" 
                  close-alert 
                  aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;

    alertsContainer.appendChild(alertElement);
    setupAlert(alertElement.firstElementChild);
  };
});


// Update the amount of products
// console.log("ok");
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
// console.log(inputsQuantity);
if(inputsQuantity.length > 0) {
  inputsQuantity.forEach(input=>{
    input.addEventListener("change", (e)=>{
      const productId=input.getAttribute("product-id");
      const quantity=e.target.value;
      // console.log(quantity);
      // console.log(productId);

      // Redirect to new page
      window.location.href=`/cart/update/${productId}/${quantity}`;
      
    })
  })
}