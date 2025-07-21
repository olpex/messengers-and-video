document.addEventListener('DOMContentLoaded', function() {
    // Функціональність перемикача темної теми
    const themeToggle = document.getElementById('theme-toggle');
    
    // Перевіряємо, чи є збережена тема в localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    // Обробник події зміни стану перемикача
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Функціональність вкладок
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Видаляємо активний клас з усіх кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Додаємо активний клас до натиснутої кнопки
            button.classList.add('active');
            
            // Отримуємо ID вкладки, яку потрібно показати
            const tabId = 'tab-' + button.getAttribute('data-tab');
            
            // Ховаємо всі вкладки
            tabContents.forEach(content => content.classList.remove('active'));
            // Показуємо потрібну вкладку
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Плавна прокрутка до розділів при кліку на посилання в навігації
    const navLinks = document.querySelectorAll('nav a, .hero-buttons a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Перевіряємо, чи посилання веде на якір на цій же сторінці
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Плавна прокрутка до розділу
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Віднімаємо висоту хедера
                        behavior: 'smooth'
                    });
                    
                    // Оновлюємо активне посилання в навігації
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Оновлення активного пункту меню при прокрутці
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Отримуємо всі розділи
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Знаходимо відповідне посилання в навігації
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Анімація появи елементів при прокрутці
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.platform-card, .tip-card, .scenario');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Додаємо CSS клас для анімації
    const style = document.createElement('style');
    style.innerHTML = `
        .platform-card, .tip-card, .scenario {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .platform-card.animated, .tip-card.animated, .scenario.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Запускаємо анімацію при завантаженні та при прокрутці
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаємо один раз при завантаженні

    // Мобільне меню
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Створюємо кнопку мобільного меню
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        header.querySelector('.container').appendChild(mobileMenuBtn);
        
        // Додаємо стилі для мобільного меню
        const mobileStyle = document.createElement('style');
        mobileStyle.innerHTML = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    cursor: pointer;
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
                
                nav {
                    display: none;
                    width: 100%;
                    margin-top: 20px;
                }
                
                nav.active {
                    display: block;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: center;
                }
                
                nav ul li {
                    margin: 10px 0;
                }
                
                header .container {
                    position: relative;
                }
            }
            
            @media (min-width: 769px) {
                .mobile-menu-btn {
                    display: none;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        // Додаємо функціональність для кнопки мобільного меню
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Змінюємо іконку
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '✕';
            } else {
                mobileMenuBtn.innerHTML = '☰';
            }
        });
        
        // Закриваємо меню при кліку на пункт меню
        const navItems = nav.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                }
            });
        });
    };
    
    createMobileMenu();
    
    // Функціональність кнопки "вгору"
    const backToTopButton = document.getElementById('back-to-top');
    
    // Показуємо кнопку, коли користувач прокрутив сторінку на 300px
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Прокручуємо сторінку вгору при кліку на кнопку
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Обробка форми зворотного зв'язку
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Отримуємо дані форми
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Перевірка заповнення полів
            if (!name || !email || !message) {
                alert('Будь ласка, заповніть всі обов\'язкові поля');
                return;
            }
            
            // Тут можна додати код для відправки даних на сервер
            // Наприклад, через fetch API
            
            // Показуємо повідомлення про успішну відправку
            alert(`Дякуємо за ваш відгук, ${name}! Ми зв'яжемося з вами найближчим часом.`);
            
            // Очищаємо форму
            feedbackForm.reset();
        });
    }
});