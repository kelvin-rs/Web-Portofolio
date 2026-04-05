document.addEventListener("DOMContentLoaded", function () {
        // Carousel navigation
        const track = document.querySelector(".carousel-track");
        const slides = Array.from(document.querySelectorAll(".carousel-slide"));
        const nextBtn = document.querySelector(".carousel-button.next");
        const prevBtn = document.querySelector(".carousel-button.prev");
        const dots = Array.from(document.querySelectorAll(".carousel-dot"));

        let currentSlide = 0;
        const slideCount = slides.length;

        // Set up the carousel
        function setSlidePosition() {
          const width = track.clientWidth;
          slides.forEach((slide, index) => {
            slide.style.left = `${width * index}px`;
          });
        }

        // Move to specific slide
        function goToSlide(index) {
          track.style.transform = `translateX(-${slides[index].style.left})`;
          currentSlide = index;
          updateDots();
        }

        // Update navigation dots
        function updateDots() {
          dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
          });
        }

        // Next slide
        function nextSlide() {
          currentSlide = (currentSlide + 1) % slideCount;
          goToSlide(currentSlide);
        }

        // Previous slide
        function prevSlide() {
          currentSlide = (currentSlide - 1 + slideCount) % slideCount;
          goToSlide(currentSlide);
        }

        // Event listeners
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);

        dots.forEach((dot) => {
          dot.addEventListener("click", function () {
            goToSlide(parseInt(this.dataset.slide));
          });
        });

        // Image sliders within cards
        document.querySelectorAll(".card-image-slider").forEach((slider) => {
          const images = slider.querySelectorAll(".card-images img");
          const dots = slider.querySelectorAll(".image-dots .dot");

          if (images.length <= 1) {
            slider.querySelector(".image-dots").style.display = "none";
            return;
          }

          let currentImage = 0;

          function showImage(index) {
            images.forEach((img, i) => {
              img.style.display = i === index ? "block" : "none";
            });

            dots.forEach((dot, i) => {
              dot.classList.toggle("active", i === index);
            });

            currentImage = index;
          }

          dots.forEach((dot) => {
            dot.addEventListener("click", function () {
              showImage(parseInt(this.dataset.index));
            });
          });

          if (images.length > 1) {
            setInterval(() => {
              showImage((currentImage + 1) % images.length);
            }, 5000);
          }
        });

        setSlidePosition();
        window.addEventListener("resize", setSlidePosition);
      });