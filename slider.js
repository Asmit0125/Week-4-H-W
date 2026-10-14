/**
 * Responsive looping image slider.
 * Uses a cloned boundary slide so wraparound continues in the requested direction.
 */
class ImageSlider {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector(".slider__track");
    this.originalSlides = Array.from(this.track.children);
    this.count = this.originalSlides.length;
    this.prevButton = root.querySelector(".slider__arrow--prev");
    this.nextButton = root.querySelector(".slider__arrow--next");
    this.dotsContainer = root.querySelector(".slider__dots");
    this.status = root.querySelector(".slider__status");
    this.index = 0;
    this.isAnimating = false;

    if (this.count < 1) throw new Error("ImageSlider needs at least one slide.");

    // Clones create one extra position at either boundary for directional looping.
    this.track.prepend(this.originalSlides[this.count - 1].cloneNode(true));
    this.track.append(this.originalSlides[0].cloneNode(true));
    this.slides = Array.from(this.track.children);
    this.position = 1;
    this.buildDots();
    this.bindEvents();
    this.update(false);
  }

  buildDots() {
    const fragment = document.createDocumentFragment();
    this.originalSlides.forEach((slide, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-current", String(index === this.index));
      dot.addEventListener("click", () => this.goTo(index));
      fragment.append(dot);
    });
    this.dotsContainer.replaceChildren(fragment);
    this.dots = Array.from(this.dotsContainer.children);
  }

  bindEvents() {
    this.nextButton.addEventListener("click", () => this.goNext());
    this.prevButton.addEventListener("click", () => this.goPrevious());
    this.track.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "transform") return;
      if (this.position === 0) {
        this.position = this.count;
        this.update(false);
      } else if (this.position === this.count + 1) {
        this.position = 1;
        this.update(false);
      }
      this.isAnimating = false;
    });
    this.root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") this.goNext();
      if (event.key === "ArrowLeft") this.goPrevious();
    });
  }

  goNext() {
    if (this.isAnimating || this.count < 2) return;
    this.isAnimating = true;
    this.position += 1;
    this.index = (this.index + 1) % this.count;
    this.update(true);
  }

  goPrevious() {
    if (this.isAnimating || this.count < 2) return;
    this.isAnimating = true;
    this.position -= 1;
    this.index = (this.index - 1 + this.count) % this.count;
    this.update(true);
  }

  goTo(targetIndex) {
    if (this.isAnimating || targetIndex === this.index || this.count < 2) return;
    // Dot navigation uses the shortest path while preserving the looping track.
    const forward = (targetIndex - this.index + this.count) % this.count;
    const backward = (this.index - targetIndex + this.count) % this.count;
    if (forward < backward) {
      this.position += forward;
    } else {
      this.position -= backward;
    }
    this.index = targetIndex;
    this.isAnimating = true;
    this.update(true);
  }

  update(animate) {
    this.track.style.transition = animate ? "" : "none";
    this.track.style.transform = `translateX(-${this.position * 100}%)`;
    this.dots.forEach((dot, i) => {
      dot.setAttribute("aria-current", String(i === this.index));
    });
    this.status.textContent = `Slide ${this.index + 1} of ${this.count}`;
    if (!animate) {
      // Force style calculation before restoring CSS transitions for the next interaction.
      this.track.getBoundingClientRect();
      this.track.style.transition = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider").forEach((element) => new ImageSlider(element));
});
