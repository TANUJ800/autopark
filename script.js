tailwind.config = {
    theme: {
      extend: {
       colors: {
          primary: {
            50: '#f8f8f8',
            100: '#e8e8e8',
            200: '#d3d3d3',
            300: '#a3a3a3',
            400: '#737373',
            500: '#525252',
            600: '#404040',
            700: '#262626',
            800: '#171717',
            900: '#0a0a0a',
            950: '#030303',
          },
          secondary: {
            50: '#f8f8f8',
            100: '#e8e8e8',
            200: '#d3d3d3',
            300: '#a3a3a3',
            400: '#737373',
            500: '#525252',
            600: '#404040',
            700: '#262626',
            800: '#171717',
            900: '#0a0a0a',
            950: '#030303',
          },
          accent: {
            50: '#f8f8f8',
            100: '#e8e8e8',
            200: '#d3d3d3',
            300: '#a3a3a3',
            400: '#737373',
            500: '#525252',
            600: '#404040',
            700: '#262626',
            800: '#171717',
            900: '#0a0a0a',
            950: '#030303',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        },
        spacing: {
          '18': '4.5rem',
          '22': '5.5rem',
          '30': '7.5rem',
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in',
          'fade-out': 'fadeOut 0.5s ease-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.5s ease-out',
          'slide-left': 'slideLeft 0.5s ease-out',
          'slide-right': 'slideRight 0.5s ease-out',
          'scale-in': 'scaleIn 0.5s ease-out',
          'scale-out': 'scaleOut 0.5s ease-out',
          'spin-slow': 'spin 3s linear infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 3s infinite',
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          fadeOut: {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideLeft: {
            '0%': { transform: 'translateX(20px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideRight: {
            '0%': { transform: 'translateX(-20px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          scaleIn: {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          scaleOut: {
            '0%': { transform: 'scale(1.1)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        aspectRatio: {
          'portrait': '3/4',
          'landscape': '4/3',
          'ultrawide': '21/9',
        },
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        cursor: ['disabled'],
        backgroundColor: ['active', 'disabled'],
        textColor: ['active', 'disabled'],
      },
    },
  }


  document.addEventListener('DOMContentLoaded', () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            const tempImage = new Image();
            tempImage.onload = () => {
              img.src = img.dataset.src;
              img.classList.remove('opacity-0');
              img.classList.add('opacity-100');
            };
            tempImage.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    const loadImage = (img) => {
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
      }
      
      img.classList.add('transition-opacity', 'duration-300', 'opacity-0');
      
      img.onerror = () => {
        const width = img.getAttribute('width') || img.clientWidth || 300;
        const height = img.getAttribute('height') || img.clientHeight || 200;
        img.src = `https://placehold.co/${width}x${height}/DEDEDE/555555?text=Image+Unavailable`;
        img.alt = 'Image unavailable';
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100', 'error-image');
      };

      if (img.dataset.src) {
        imageObserver.observe(img);
      } else {
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
      }
    };

    document.querySelectorAll('img[data-src], img:not([data-src])').forEach(loadImage);

    // Watch for dynamically added images
    new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') {
              loadImage(node);
            }
            node.querySelectorAll('img').forEach(loadImage);
          }
        });
      });
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  // Performance monitoring
  if ('performance' in window && 'PerformanceObserver' in window) {
    // Create performance observer
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          // console.log(`LCP: ${entry.startTime}ms`);
        }
        if (entry.entryType === 'first-input') {
          // console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
        if (entry.entryType === 'layout-shift') {
          // console.log(`CLS: ${entry.value}`);
        }
      });
    });

    // Observe performance metrics
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Log basic performance metrics
    window.addEventListener('load', () => {
      const timing = performance.getEntriesByType('navigation')[0];
      console.log({
        'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
        'TCP Connection': timing.connectEnd - timing.connectStart,
        'DOM Content Loaded': timing.domContentLoadedEventEnd - timing.navigationStart,
        'Page Load': timing.loadEventEnd - timing.navigationStart
      });
    });
  }

  // Handle offline/online status
  window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    console.log('Connection restored');
  });
  
  window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    console.log('Connection lost');
  });


  const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                if (!this.hash) return;
                const target = document.querySelector(this.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    if (window.innerWidth < 768) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });