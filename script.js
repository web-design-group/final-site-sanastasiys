document.addEventListener('DOMContentLoaded', function() {
    // 1. НАЙТИ ВСЕ КНОПКИ
    // Кнопки "Связаться" (в шапке и CTA)
    const contactButtons = document.querySelectorAll('.btn-green:not(.modal-submit-btn), .btn-outline');
    // Кнопки "Создать план отдыха" (в подвале)
    const planButtons = document.querySelectorAll('.btn-blue');
    
    // Модальные окна
    const contactModal = document.getElementById('contact-modal');
    const planModal = document.getElementById('plan-modal');
    const successModal = document.getElementById('success-modal');
    
    // Кнопки закрытия
    const closeButtons = document.querySelectorAll('.close-btn');

    // Формы
    const contactForm = document.getElementById('contact-form');
    const planForm = document.getElementById('plan-form');

    // 2. ФУНКЦИИ ОТКРЫТИЯ/ЗАКРЫТИЯ
    function openModal(modal) {
        modal.style.display = 'flex';
        // Дополнительно: блокировка прокрутки фона
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        // Восстановление прокрутки
        document.body.style.overflow = '';
        
        // Сброс полей формы при закрытии
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }

    // 3. ОБРАБОТЧИКИ ОТКРЫТИЯ
    // Открытие попапа "Связаться"
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal(contactModal);
        });
    });

    // Открытие попапа "Создать план отдыха"
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal(planModal);
        });
    });

    // 4. ОБРАБОТЧИКИ ЗАКРЫТИЯ
    // Закрытие по нажатию на крестик
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const modalId = event.target.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Закрытие по нажатию Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal(contactModal);
            closeModal(planModal);
            closeModal(successModal);
        }
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            closeModal(contactModal);
        } else if (event.target === planModal) {
            closeModal(planModal);
        } else if (event.target === successModal) {
            closeModal(successModal);
        }
    });
    
    // 5. ОБРАБОТЧИКИ ОТПРАВКИ ФОРМЫ
    function handleFormSubmission(event) {
        event.preventDefault(); // Остановить стандартную отправку формы
        
        // Определяем, какую форму закрыть
        const currentModal = event.target.closest('.modal');
        
        // Имитация задержки отправки (можно убрать)
        setTimeout(() => {
            closeModal(currentModal); // Закрываем текущую форму
            openModal(successModal);  // Открываем окно "Спасибо"
        }, 300); 
    }

    contactForm.addEventListener('submit', handleFormSubmission);
    planForm.addEventListener('submit', handleFormSubmission);
});