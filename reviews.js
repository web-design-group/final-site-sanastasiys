document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slider-track');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  if (!track || cards.length === 0 || !prevBtn || !nextBtn) {
    console.error("Не найдены элементы слайдера: track, cards, или кнопки. Проверьте HTML.");
    return; 
  }

  let currentIndex = 0;
  let cardsPerView = 3;
  const totalCards = cards.length;
  
  // Определяем количество карточек в зависимости от ширины экрана
  function updateCardsPerView() {
    const width = window.innerWidth;
    // Логика адаптации: 1/2/3 карточки
    if (width <= 768) {
      cardsPerView = 1;
    } else if (width <= 991) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    
    // Корректируем индекс при изменении размера
    const maxIndex = totalCards - cardsPerView;
    if (currentIndex > maxIndex) {
      currentIndex = Math.max(0, maxIndex);
    }
    updateSlider();
  }
  
  // Обновляем позицию слайдера
  function updateSlider() {
    const gap = 30;
    
    // cardWidth берется из offsetWidth (должен быть положительным числом)
    const cardWidth = cards[0].offsetWidth; 
    
    // Рассчитываем смещение: (ширина карточки + отступ) * текущий индекс
    const offset = currentIndex * (cardWidth + gap);
    
    // ИСПРАВЛЕНИЕ А: Используются обратные кавычки  
    track.style.transform = `translateX(-${offset}px)`;
    
    // Обновляем состояние кнопок
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - cardsPerView;

    // Если карточек меньше, чем видимых, кнопки не нужны
    if (totalCards <= cardsPerView) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    }
  }
  
  // Обработчики событий (без изменений)
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < totalCards - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  });
  
  // Обработка изменения размера окна
  window.addEventListener('resize', updateCardsPerView);
  
  // Инициализация
  updateCardsPerView();
});