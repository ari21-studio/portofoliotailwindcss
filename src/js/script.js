// Navbar Fixed
window.onscroll = function(){
    const header = document.querySelector('header');
    const FixedNav = header.offsetTop;

    if(window.pageYOffset > FixedNav){
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
}


// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function()
{
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.querySelector('.book-container');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

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
        const pageWrapper = document.createElement('div');
        pageWrapper.classList.add('page', 'absolute', 'w-full', 'h-full', 'rounded-lg', 'shadow-xl', 'transition-transform', 'duration-800'); // Tailwind classes

        const frontSide = document.createElement('div');
        frontSide.classList.add('page-front', 'bg-gradient-to-br', 'from-gray-300', 'to-gray-500', 'p-4', 'text-gray-900', 'flex-col'); // Tailwind classes
        frontSide.innerHTML = `<span class="text-xl font-semibold mb-2">Halaman ${index * 2 + 1}</span><p>${pageContent[index].front}</p>`;

        const backSide = document.createElement('div');
        backSide.classList.add('page-back', 'bg-gradient-to-tl', 'from-gray-400', 'to-gray-600', 'p-4', 'text-gray-900', 'flex-col'); // Tailwind classes
        backSide.innerHTML = `<span class="text-xl font-semibold mb-2">Halaman ${index * 2 + 2}</span><p>${pageContent[index].back}</p>`;

        pageWrapper.appendChild(frontSide);
        pageWrapper.appendChild(backSide);
        bookContainer.appendChild(pageWrapper);
        pages.push(pageWrapper);

        // Atur posisi awal halaman
        pageWrapper.style.zIndex = totalPages - index; // Halaman terakhir di atas
        if (index > 0) {
            pageWrapper.style.transform = 'translateX(0)'; // Awalnya halaman tidak terbalik
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
                page.classList.add('flipped');
                page.style.zIndex = index; // Halaman yang sudah dibalik z-indexnya lebih rendah
            } else {
                // Halaman belum dibalik
                page.classList.remove('flipped');
                page.style.zIndex = totalPages - index; // Halaman yang belum dibalik z-indexnya lebih tinggi
            }
        });

        // Nonaktifkan tombol jika di batas awal/akhir
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages;
    }

    // Event listener untuk tombol 'Berikutnya'
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateBookDisplay();
        }
    });

    // Event listener untuk tombol 'Sebelumnya'
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateBookDisplay();
        }
    });

    // Inisialisasi tampilan buku saat pertama kali dimuat
    updateBookDisplay();
});