// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const FixedNav = header.offsetTop;

  if (window.pageYOffset > FixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const bookContainer = document.querySelector(".book-container");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  let currentPage = 0; // Index halaman saat ini
  const totalPages = 6; // Jumlah total halaman buku (genap lebih baik untuk efek buku)
  const pages = []; // Array untuk menyimpan elemen halaman DOM

  // Data halaman (Anda bisa mengganti ini dengan konten nyata)
  const pageContent = [
    { front: "Cover Depan", back: "Kata Pengantar" },
    { front: "Halaman 1", back: "Halaman 2" },
    { front: "Halaman 3", back: "Halaman 4" },
    { front: "Halaman 5", back: "Halaman 6" },
    { front: "Halaman 7", back: "Halaman 8" },
    { front: "Halaman Terakhir", back: "Cover Belakang" },
  ];

  // Fungsi untuk membuat elemen halaman
  function createPage(index) {
    const pageWrapper = document.createElement("div");
    pageWrapper.classList.add(
      "page",
      "absolute",
      "w-full",
      "h-full",
      "rounded-lg",
      "shadow-xl",
      "transition-transform",
      "duration-800"
    ); // Tailwind classes

    const frontSide = document.createElement("div");
    frontSide.classList.add(
      "page-front",
      "bg-gradient-to-br",
      "from-gray-300",
      "to-gray-500",
      "p-4",
      "text-gray-900",
      "flex-col"
    ); // Tailwind classes
    frontSide.innerHTML = `<span class="text-xl font-semibold mb-2">Halaman ${
      index * 2 + 1
    }</span><p>${pageContent[index].front}</p>`;

    const backSide = document.createElement("div");
    backSide.classList.add(
      "page-back",
      "bg-gradient-to-tl",
      "from-gray-400",
      "to-gray-600",
      "p-4",
      "text-gray-900",
      "flex-col"
    ); // Tailwind classes
    backSide.innerHTML = `<span class="text-xl font-semibold mb-2">Halaman ${
      index * 2 + 2
    }</span><p>${pageContent[index].back}</p>`;

    pageWrapper.appendChild(frontSide);
    pageWrapper.appendChild(backSide);
    bookContainer.appendChild(pageWrapper);
    pages.push(pageWrapper);

    // Atur posisi awal halaman
    pageWrapper.style.zIndex = totalPages - index; // Halaman terakhir di atas
    if (index > 0) {
      pageWrapper.style.transform = "translateX(0)"; // Awalnya halaman tidak terbalik
    }
  }

  // Inisialisasi semua halaman
  for (let i = 0; i < totalPages; i++) {
    createPage(i);
  }

  // Fungsi untuk memperbarui tampilan halaman
  function updateBookDisplay() {
    pages.forEach((page, index) => {
      if (index < currentPage) {
        // Halaman sudah dibalik ke belakang
        page.classList.add("flipped");
        page.style.zIndex = index; // Halaman yang sudah dibalik z-indexnya lebih rendah
      } else {
        // Halaman belum dibalik
        page.classList.remove("flipped");
        page.style.zIndex = totalPages - index; // Halaman yang belum dibalik z-indexnya lebih tinggi
      }
    });

    // Nonaktifkan tombol jika di batas awal/akhir
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages;
  }

  // Event listener untuk tombol 'Berikutnya'
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateBookDisplay();
    }
  });

  // Event listener untuk tombol 'Sebelumnya'
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateBookDisplay();
    }
  });

  // Inisialisasi tampilan buku saat pertama kali dimuat
  updateBookDisplay();
});

// infinite for js start
const container = document.getElementById("cardContainer");
const cardTemplate = document.getElementById("cardTemplate");
const slideAmount = 300;

const cardData = [
  {
    title:
      "Ori&Ada UV⚡Smart Pet Drying Cabinet Box Dehydrator Mesin Pengering Hewan Pet UV Sterilizer Dryer Box Pengering Kucing Anjing",
    image: "./img/clients/id-11134207-7rbk4-mb29bzi7079y64.webp",
    logostar: "star+",
    description: 1839000,
    link: "https://s.shopee.co.id/9ADCTcyVLQ",
  },
  {
    title: "Judul 2",
    image: "https://picsum.photos/600/355",
    description: "Villa mewah di pinggir danau yang menenangkan.",
    link: "/detail/2",
  },
  {
    title: "Judul 3",
    image: "https://picsum.photos/600/360",
    description: "Interior modern dengan sentuhan kayu alami.",
    link: "/detail/3",
  },
  {
    title: "Judul 4",
    image: "https://picsum.photos/600/400",
    description: "Hunian keluarga nyaman di lingkungan hijau.",
    link: "/detail/4",
  },
  {
    title: "Judul 5",
    image: "https://picsum.photos/600/390",
    description: "Arsitektur unik bergaya futuristik dan minimalis.",
    link: "/detail/5",
  },
];

function renderCards() {
  cardData.forEach((data) => {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector(".card-title").textContent = data.title;
    card.querySelector(".card-image").src = data.image;
    card.querySelector(".card-description").textContent = data.description;
    const linkEl = card.querySelector(".card-link");
    linkEl.href = data.link;
    linkEl.textContent = "Selengkapnya →";
    container.appendChild(card);
  });
}

renderCards();

// Tombol Geser
document.getElementById("slideLeft").onclick = () => {
  if (container.scrollLeft <= 0) {
    container.scrollTo({ left: container.scrollWidth, behavior: "auto" });
  } else {
    container.scrollBy({ left: -slideAmount, behavior: "smooth" });
  }
};

document.getElementById("slideRight").onclick = () => {
  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  if (container.scrollLeft >= maxScrollLeft - 10) {
    container.scrollTo({ left: 0, behavior: "auto" });
  } else {
    container.scrollBy({ left: slideAmount, behavior: "smooth" });
  }
};
// infinite for js end

// mengatur tampilan judul dgn beberapa karakter aja start
const fullTitle =
  "MA Komputer All-in-One Terbaru HD Super Tipis Intel Core i3/i5 Untuk Rumah, Belajar, Kantor, dan Hiburan - 19/22/24 Inci Gratis Mouse";
const maxChars = 15;
const truncated =
  fullTitle.length > maxChars
    ? fullTitle.slice(0, maxChars) + "..."
    : fullTitle;
document.getElementById("judul").textContent = truncated;
// mengatur tampilan judul end
