document.addEventListener('DOMContentLoaded', function() {
    // Функція для перевірки, чи елемент видимий у вікні перегляду
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Функція для додавання класу анімації до елементів, які стають видимими
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(function(element) {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }

    // Додаємо класи для анімації до елементів
    function setupAnimations() {
        // Додаємо клас для анімації до карток платформ
        const platformCards = document.querySelectorAll('.platform-card');
        platformCards.forEach(function(card, index) {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = (index * 0.1) + 's';
        });

        // Додаємо клас для анімації до карток порад
        const tipCards = document.querySelectorAll('.tip-card');
        tipCards.forEach(function(card, index) {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = (index * 0.1) + 's';
        });

        // Додаємо клас для анімації до сценаріїв використання
        const scenarios = document.querySelectorAll('.scenario');
        scenarios.forEach(function(scenario, index) {
            scenario.classList.add('animate-on-scroll');
            scenario.style.transitionDelay = (index * 0.1) + 's';
        });

        // Додаємо клас для анімації до форми зворотного зв'язку
        const feedbackForm = document.querySelector('.feedback-form-container');
        if (feedbackForm) {
            feedbackForm.classList.add('animate-on-scroll');
        }
    }

    // Ініціалізуємо анімації
    setupAnimations();

    // Запускаємо перевірку при завантаженні сторінки
    handleScrollAnimation();

    // Запускаємо перевірку при прокрутці сторінки
    window.addEventListener('scroll', handleScrollAnimation);
});