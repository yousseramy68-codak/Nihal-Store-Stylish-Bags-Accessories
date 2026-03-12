// ================================
// TRANSLATIONS
// ================================

const translations = {
    en: {
        products: [
            {
                id: 1,
                name: "Classic Leather Shoulder Bag",
                price: "$89.99",
                image: "assets/bag1.png"
            },
            {
                id: 2,
                name: "Modern Crossbody Bag",
                price: "$79.99",
                image: "assets/bag2.png"
            },
            {
                id: 3,
                name: "Elegant Tote Bag",
                price: "$99.99",
                image: "assets/bag3.png"
            },
            {
                id: 4,
                name: "Premium Accessories Set",
                price: "$59.99",
                image: "assets/accessories.png"
            }
        ],
        addToCart: "Add to Cart",
        addedToCart: "Added to cart!",
        messageSent: "Message sent successfully!"
    },
    ar: {
        products: [
            {
                id: 1,
                name: "حقيبة كتف جلدية كلاسيكية",
                price: "89.99$",
                image: "assets/bag1.png"
            },
            {
                id: 2,
                name: "حقيبة كروس بودي عصرية",
                price: "79.99$",
                image: "assets/bag2.png"
            },
            {
                id: 3,
                name: "حقيبة توت أنيقة",
                price: "99.99$",
                image: "assets/bag3.png"
            },
            {
                id: 4,
                name: "طقم إكسسوارات فاخر",
                price: "59.99$",
                image: "assets/accessories.png"
            }
        ],
        addToCart: "أضف للسلة",
        addedToCart: "تمت الإضافة للسلة!",
        messageSent: "تم إرسال الرسالة بنجاح!"
    }
};

// ================================
// STATE MANAGEMENT
// ================================

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initCart();
    renderProducts();
    initEventListeners();
    initScrollAnimations();
});

// ================================
// THEME MANAGEMENT
// ================================

function initTheme() {
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-toggle .icon');
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// ================================
// LANGUAGE MANAGEMENT
// ================================

function initLanguage() {
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    updateLanguageText();
    updateLanguageToggle();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    updateLanguageText();
    updateLanguageToggle();
    renderProducts(); 
}

function updateLanguageText() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        el.textContent = text;
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-placeholder-en]');
    placeholders.forEach(el => {
        const placeholder = currentLang === 'en' 
            ? el.getAttribute('data-placeholder-en') 
            : el.getAttribute('data-placeholder-ar');
        el.setAttribute('placeholder', placeholder);
    });
}

function updateLanguageToggle() {
    const langText = document.getElementById('lang-text');
    langText.textContent = currentLang === 'en' ? 'AR' : 'EN';
}

// ================================
// CART MANAGEMENT
// ================================

function initCart() {
    updateCartDisplay();
}

function addToCart() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartDisplay();
    showToast(translations[currentLang].addedToCart);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// ================================
// PRODUCT RENDERING
// ================================

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    const products = translations[currentLang].products;
    const buttonText = translations[currentLang].addToCart;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="product-btn" onclick="addToCart()">${buttonText}</button>
            </div>
        </div>
    `).join('');
}

// ================================
// MOBILE MENU
// ================================

function toggleMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const mobileToggle = document.getElementById('mobile-toggle');
    
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// ================================
// TOAST NOTIFICATIONS
// ================================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.category-card, .product-card, .feature-card, .about-mission'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ================================
// EVENT LISTENERS
// ================================

function initEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Language toggle
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
    
    // Mobile menu
    document.getElementById('mobile-toggle').addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('nav-links').classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// CART BUTTON CLICK
// ================================

document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showToast(currentLang === 'en' 
                ? `You have ${cartCount} item(s) in your cart` 
                : `لديك ${cartCount} منتج في السلة`
            );
        });
    }
});
