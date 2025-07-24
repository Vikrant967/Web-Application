// Main JavaScript functionality for EduTech website

// Course data
const courses = [
    {
        id: 1,
        title: "Complete Full Stack Web Development",
        instructor: "John Smith",
        category: "web",
        level: "intermediate",
        duration: "12 weeks",
        students: 2847,
        rating: 4.9,
        price: 299,
        originalPrice: 399,
        image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Master modern web development with React, Node.js, and MongoDB",
        lessons: 45,
        certificate: true
    },
    {
        id: 2,
        title: "Data Science & Machine Learning",
        instructor: "Sarah Wilson",
        category: "data",
        level: "advanced",
        duration: "16 weeks",
        students: 1923,
        rating: 4.8,
        price: 399,
        originalPrice: 499,
        image: "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Learn Python, pandas, scikit-learn, and build ML models",
        lessons: 60,
        certificate: true
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        instructor: "Mike Johnson",
        category: "marketing",
        level: "beginner",
        duration: "8 weeks",
        students: 3456,
        rating: 4.7,
        price: 199,
        originalPrice: 299,
        image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Complete guide to SEO, social media, and online advertising",
        lessons: 32,
        certificate: true
    },
    {
        id: 4,
        title: "UI/UX Design Fundamentals",
        instructor: "Emily Chen",
        category: "design",
        level: "beginner",
        duration: "10 weeks",
        students: 2156,
        rating: 4.6,
        price: 249,
        originalPrice: 349,
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Design thinking, Figma, user research, and prototyping",
        lessons: 38,
        certificate: true
    },
    {
        id: 5,
        title: "Mobile App Development with React Native",
        instructor: "David Rodriguez",
        category: "mobile",
        level: "intermediate",
        duration: "14 weeks",
        students: 1789,
        rating: 4.8,
        price: 349,
        originalPrice: 449,
        image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Build cross-platform mobile apps for iOS and Android",
        lessons: 52,
        certificate: true
    },
    {
        id: 6,
        title: "AI & Deep Learning Bootcamp",
        instructor: "Dr. Lisa Park",
        category: "ai",
        level: "advanced",
        duration: "20 weeks",
        students: 987,
        rating: 4.9,
        price: 599,
        originalPrice: 799,
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Neural networks, TensorFlow, computer vision, and NLP",
        lessons: 75,
        certificate: true
    }
];

// DOM elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const courseSearch = document.getElementById('course-search');
const categoryFilter = document.getElementById('category-filter');
const levelFilter = document.getElementById('level-filter');
const coursesGrid = document.getElementById('courses-grid');
const contactForm = document.getElementById('contact-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCourses();
    initializeContactForm();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = ['home', 'courses', 'services', 'contact', 'about'];
        const scrollPosition = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current nav link
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
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

// Course functionality
function initializeCourses() {
    if (!coursesGrid) return;

    renderCourses(courses);
    
    // Search functionality
    if (courseSearch) {
        courseSearch.addEventListener('input', filterCourses);
    }
    
    // Filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCourses);
    }
    
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCourses);
    }
}

function renderCourses(coursesToRender) {
    if (!coursesGrid) return;

    coursesGrid.innerHTML = '';
    
    coursesToRender.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-item bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group';
    
    const levelBadgeColor = getLevelBadgeColor(course.level);
    const stars = generateStars(course.rating);
    
    card.innerHTML = `
        <div class="relative overflow-hidden">
            <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
            <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full text-sm font-semibold ${levelBadgeColor}">
                    ${course.level}
                </span>
            </div>
            <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                $${course.price}
            </div>
            ${course.originalPrice ? `
                <div class="absolute top-12 right-4 bg-gray-500 text-white px-2 py-1 rounded text-xs line-through">
                    $${course.originalPrice}
                </div>
            ` : ''}
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <button class="bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">${course.title}</h3>
            <p class="text-gray-600 mb-2">by ${course.instructor}</p>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2">${course.description}</p>

            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${course.duration}
                </div>
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    ${course.lessons} lessons
                </div>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    ${course.students.toLocaleString()} students
                </div>
                ${course.certificate ? `
                    <div class="flex items-center text-green-600">
                        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                        Certificate
                    </div>
                ` : ''}
            </div>

            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                    <div class="flex items-center">
                        ${stars}
                    </div>
                    <span class="ml-2 text-sm font-semibold text-gray-900">${course.rating}</span>
                </div>
            </div>

            <button class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                Enroll Now
            </button>
        </div>
    `;
    
    return card;
}

function getLevelBadgeColor(level) {
    switch (level) {
        case 'beginner': return 'bg-green-100 text-green-800';
        case 'intermediate': return 'bg-yellow-100 text-yellow-800';
        case 'advanced': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= Math.floor(rating);
        stars += `
            <svg class="h-4 w-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
        `;
    }
    return stars;
}

function filterCourses() {
    const searchTerm = courseSearch ? courseSearch.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedLevel = levelFilter ? levelFilter.value : 'all';

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                             course.instructor.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
        
        return matchesSearch && matchesCategory && matchesLevel;
    });

    renderCourses(filteredCourses);
}

// Contact form functionality
function initializeContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateContactForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors.join(', '));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.innerHTML = `
        <div class="flex items-center">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Message sent successfully! We'll get back to you soon.
        </div>
    `;
    
    contactForm.insertBefore(successMessage, contactForm.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const existingMessage = document.querySelector('.error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message bg-red-500 text-white p-4 rounded-lg mb-4';
    errorMessage.innerHTML = `
        <div class="flex items-center">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${message}
        </div>
    `;
    
    contactForm.insertBefore(errorMessage, contactForm.firstChild);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.course-item, .bg-white, .text-center');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll event listener for header background
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('bg-opacity-95');
    } else {
        header.classList.remove('bg-opacity-95');
    }
});

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.7';
});

// Console welcome message
console.log('%c🎓 Welcome to EduTech!', 'color: #ef4444; font-size: 20px; font-weight: bold;');
console.log('%cTransform your future with our cutting-edge courses!', 'color: #374151; font-size: 14px;');