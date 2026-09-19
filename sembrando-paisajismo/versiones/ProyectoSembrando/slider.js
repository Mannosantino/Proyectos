document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todos los sliders en la página
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const slides = slider.children.length;
        let currentSlide = 0;
        
        // Obtener los botones del contenedor padre
        const container = slider.closest('.slider-container');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        // Función para ir al siguiente slide
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides;
            updateSlider();
        };
        
        // Función para ir al slide anterior
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides) % slides;
            updateSlider();
        };
        
        // Función para actualizar la posición del slider
        const updateSlider = () => {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        };
        
        // Agregar event listeners a los botones
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        };
    });
}); 