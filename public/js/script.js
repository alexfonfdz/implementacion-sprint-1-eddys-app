document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadBtn').addEventListener('click', function() {
        // Generar toast de empezando descarga que dure 4 segundos
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.textContent = 'Descarga iniciada...';
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 4000);

        // Empezar a descargar el archivo de la carpeta downloads
        const link = document.createElement('a');
        link.href = 'download/eddys-app.apk';
        link.download = 'eddys-app.apk';
        link.click();

        // Generar toast de descarga completada que dure 4 segundos
        const toast2 = document.createElement('div');
        toast2.id = 'toast';
        toast2.textContent = 'Descarga completada';
        document.body.appendChild(toast2);
        setTimeout(() => {
            toast2.classList.add('show');
        }, 10);
        setTimeout(() => {
            toast2.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast2);
            }, 500);
        }, 4000);
    });

    // Carrusel de imágenes
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const visibleItems = 3;
    const track = document.querySelector('.carousel-track');
    const itemsArray = Array.from(items);

    function showItem() {
        const offset = -currentIndex * (110 / visibleItems);
        track.style.transform = `translateX(${offset}%)`;
    }

    function updateControls() {
        if (totalItems <= visibleItems) {
            document.getElementById('prev').style.display = 'none';
            document.getElementById('next').style.display = 'none';
        } else {
            document.getElementById('prev').style.display = 'block';
            document.getElementById('next').style.display = 'block';
        }
    }

    document.getElementById('next').addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > totalItems - visibleItems) {
            const firstItem = itemsArray.shift();
            track.appendChild(firstItem);
            itemsArray.push(firstItem);
            track.style.transition = 'none';
            track.style.transform = `translateX(0%)`;
            currentIndex = totalItems - visibleItems;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                showItem();
            }, 10);
        } else {
            showItem();
        }
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showItem();
        }
    });

    // Auto-play carousel
    if (totalItems > visibleItems) {
        setInterval(() => {
            document.getElementById('next').click();
        }, 3000);
    }

    showItem();
    updateControls();

    // Modal de imagen
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.innerHTML = `
        <span id="closeModal">&times;</span>
        <img id="modalImage" src="" alt="Imagen Ampliada">
    `;
    document.body.appendChild(modal);

    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    modal.style.display = 'none';

    items.forEach(item => {
        item.querySelector('img').addEventListener('click', (e) => {
            modal.style.display = 'block';
            modalImage.src = e.target.src;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});