
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(slide => slide.style.display = "none");

  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides[slideIndex].style.display = "block";
}

function moveSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

let slideIndex = 0;
let autoSlide; // Define it globally so it can be cleared

document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);

  // Start autoplay
  autoSlide = setInterval(() => {
    moveSlide(1);
  }, 5000);

  // Pause/resume on hover
  const carouselContainer = document.querySelector(".carousel-container");

  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      moveSlide(1);
    }, 5000);
  });

  // Scroll-triggered animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".slide").forEach(slide => {
    observer.observe(slide);
  });
});

function copyNumber() {
    const phone = document.getElementById("phone-number").innerText;
    const copyBtn = document.querySelector(".btn");

    // Add shake class to trigger animation
    copyBtn.classList.add("shake");

    // Copy to clipboard
    navigator.clipboard.writeText(phone).then(() => {
      // Change button text after shake animation has ended
      setTimeout(() => {
        copyBtn.innerText = "Copied!";  // Change text after the shake
      }, 500);  // Wait for animation (0.5s) before changing text
      
      // Reset button text after a short delay (1500ms)
      setTimeout(() => {
        copyBtn.innerText = "Copy Number";  // Reset text
      }, 2000);  // 2 seconds after the text is changed to "Copied!"
    }).catch(err => {
      console.error("Failed to copy!", err);
    });

    // Remove the shake animation after it's done (0.5s)
    setTimeout(() => {
      copyBtn.classList.remove("shake");
    }, 500);  // Match the shake animation duration
  }