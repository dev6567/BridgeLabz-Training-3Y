// Q5: Image Gallery with Modal Preview
// The 6 images are generated SVG pictures, so the page works offline.
// To use real photos, replace thumbSrc/fullSrc with your own image URLs.

const pictures = [
  { label: "Mountain", from: "#4facfe", to: "#00f2fe" },
  { label: "Sunset", from: "#fa709a", to: "#fee140" },
  { label: "Forest", from: "#43e97b", to: "#38f9d7" },
  { label: "Ocean", from: "#2193b0", to: "#6dd5ed" },
  { label: "Desert", from: "#f7971e", to: "#ffd200" },
  { label: "Night", from: "#232526", to: "#414345" },
];

// Creates a gradient picture as a data URI of the requested size
function makePicture(label, from, to, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" font-size="${width / 8}" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">${label}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalImage = document.getElementById("modal-image");
const closeButton = document.getElementById("modal-close");

// Build the grid: small image in src, big version stored in data-full
pictures.forEach((picture) => {
  const image = document.createElement("img");
  image.src = makePicture(picture.label, picture.from, picture.to, 300, 200);
  image.dataset.full = makePicture(picture.label, picture.from, picture.to, 900, 600);
  image.alt = picture.label;
  gallery.appendChild(image);
});

function openModal(fullSrc, altText) {
  modalImage.src = fullSrc;
  modalImage.alt = altText;
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

// One listener on the grid (event delegation) opens the clicked image
gallery.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    openModal(event.target.dataset.full, event.target.alt);
  }
});

// Clicking the dark background (outside the modal box) closes the modal
modal.addEventListener("click", closeModal);

// Clicks inside the modal box must NOT reach the overlay, so stop them from bubbling
modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});

closeButton.addEventListener("click", closeModal);   // runs before stopPropagation takes effect on the parent

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
