document.addEventListener('DOMContentLoaded', function() {
    // Debug function
    function debugLog(message) {
        console.log(`[20th Birthday Debug] ${message}`);
        updateDebugInfo(message);
    }
    
    // Create debug info display
    function createDebugInfo() {
        const debugDiv = document.createElement('div');
        debugDiv.className = 'debug-info';
        debugDiv.id = 'debug-info';
        debugDiv.innerHTML = 'Debug: Page loaded';
        document.body.appendChild(debugDiv);
    }
    
    function updateDebugInfo(message) {
        const debugDiv = document.getElementById('debug-info');
        if (debugDiv) {
            debugDiv.innerHTML = `Debug: ${message}<br>Time: ${new Date().toLocaleTimeString()}`;
        }
    }
    
    // Create debug info
    createDebugInfo();
    debugLog('Birthday app initialized');
    
    // Confetti animation for landing section
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                
                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.transform = 'rotate(45deg)';
                }
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    // Start confetti animation
    createConfetti();
    
    // Repeat confetti every 10 seconds
    setInterval(createConfetti, 10000);
    
    // Celebrate button interaction - MODIFIED TO OPEN SECOND PAGE
    const celebrateBtn = document.querySelector('.celebrate-btn');
    celebrateBtn.addEventListener('click', function() {
        // Create burst of confetti
        createConfetti();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Create heart burst effect
        createHeartBurst();
        
        // Hide landing section and show cake section after animation
        setTimeout(() => {
            const landingSection = document.querySelector('.landing-section');
            const cakeSection = document.querySelector('.cake-section');
            
            // Add fade out effect to landing section
            landingSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            landingSection.style.opacity = '0';
            landingSection.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                // Hide landing section completely
                landingSection.style.display = 'none';
                
                // Show cake section with fade in effect
                cakeSection.style.display = 'flex';
                cakeSection.style.opacity = '0';
                cakeSection.style.transform = 'scale(1.1)';
                cakeSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                // Trigger reflow
                cakeSection.offsetHeight;
                
                cakeSection.style.opacity = '1';
                cakeSection.style.transform = 'scale(1)';
                
                // Auto-light all candles after page transition
                setTimeout(() => {
                    autoLightAllCandles();
                }, 1000);
            }, 800);
        }, 500);
    });
    
    // Heart burst effect
    function createHeartBurst() {
        const heartsContainer = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.position = 'absolute';
            heart.style.animation = 'none';
            
            const angle = (i * 30) * Math.PI / 180;
            const distance = 100 + Math.random() * 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(-50%, -50%)`;
            heartsContainer.appendChild(heart);
            
            // Animate heart burst
            setTimeout(() => {
                heart.style.transition = 'all 1s ease-out';
                heart.style.transform = `translate(${endX}px, ${endY}px) scale(0)`;
                heart.style.opacity = '0';
            }, 50);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }
    }
    
    // Cake Section Functionality
    let totalCandles = 20;
    let candlesLit = 0;
    let cakeCut = false;
    
    const candles = document.querySelectorAll('.candle');
    const cake = document.querySelector('.cake');
    const lightCandlesBtn = document.getElementById('lightCandlesBtn');
    const cutCakeBtn = document.getElementById('cutCakeBtn');
    const resetCakeBtn = document.getElementById('resetCakeBtn');
    const cakeConfettiContainer = document.querySelector('.cake-confetti-container');
    
    // Auto light all candles function (called from celebrate button)
    function autoLightAllCandles() {
        debugLog('Auto-lighting all 20 candles...');
        const candles = document.querySelectorAll('.candle');
        
        candles.forEach((candle, index) => {
            setTimeout(() => {
                if (!candle.classList.contains('lit')) {
                    candle.classList.add('lit');
                    candlesLit++;
                    debugLog(`Candle ${index + 1}/20 lit automatically`);
                    
                    if (candlesLit === totalCandles) {
                        cutCakeBtn.disabled = false;
                        cutCakeBtn.innerHTML = '<span>🔪 Cut Your 20th Birthday Cake!</span>';
                        debugLog('All 20 candles lit! Ready to cut cake');
                    }
                }
            }, index * 100);
        });
    }
    
    // Individual candle lighting
    candles.forEach(candle => {
        candle.addEventListener('click', function() {
            if (!this.classList.contains('lit') && !cakeCut) {
                this.classList.add('lit');
                candlesLit++;
                
                // Create small sparkle effect
                createCandleSparkle(this);
                
                // Check if all candles are lit
                if (candlesLit === totalCandles) {
                    cutCakeBtn.disabled = false;
                    cutCakeBtn.innerHTML = '<span>🔪 Cut Your 20th Birthday Cake!</span>';
                    createCakeConfetti();
                }
                
                updateCandleProgress();
            }
        });
    });
    
    // Light all candles button
    lightCandlesBtn.addEventListener('click', function() {
        debugLog('Lighting all 20 candles...');
        this.disabled = true;
        this.innerHTML = '<span>🕯️ Lighting...</span>';
        
        const candles = document.querySelectorAll('.candle');
        candles.forEach((candle, index) => {
            setTimeout(() => {
                if (!candle.classList.contains('lit')) {
                    candle.classList.add('lit');
                    candlesLit++;
                    
                    if (candlesLit === totalCandles) {
                        cutCakeBtn.disabled = false;
                        cutCakeBtn.innerHTML = '<span>🔪 Cut Your 20th Birthday Cake!</span>';
                        this.innerHTML = '<span>🕯️ All 20 Candles Lit!</span>';
                        debugLog('All 20 candles successfully lit!');
                    }
                }
            }, index * 150);
        });
    });
    
    // Cut cake button - FIXED TO GO TO MESSAGE PAGE
    cutCakeBtn.addEventListener('click', function() {
        if (candlesLit === totalCandles && !cakeCut) {
            debugLog('Cake cutting started');
            cakeCut = true;
            cake.classList.add('cutting');
            
            setTimeout(() => {
                cake.classList.add('cut');
                cake.classList.remove('cutting');
                createMegaCakeConfetti();
                debugLog('Cake cut animation completed');
                
                // Blow out candles after cutting
                setTimeout(() => {
                    blowOutCandles();
                    debugLog('Candles blown out');
                }, 1000);
                
                // Navigate to message page after celebration
                setTimeout(() => {
                    debugLog('Starting navigation to message page...');
                    navigateToMessagePage();
                }, 3000);
                
            }, 1000);
            
            this.disabled = true;
            this.innerHTML = '<span>🎉 Cake Cut!</span>';
        }
    });
    
    // Navigate to birthday message page - ENHANCED WITH DEBUGGING
    function navigateToMessagePage() {
        const cakeSection = document.querySelector('.cake-section');
        const messageSection = document.querySelector('.message-section');
        
        debugLog('navigateToMessagePage function called');
        
        if (!cakeSection) {
            debugLog('ERROR: cake-section not found!');
            return;
        }
        
        if (!messageSection) {
            debugLog('ERROR: message-section not found!');
            return;
        }
        
        debugLog('Both sections found, starting transition...');
        
        // Fade out cake section
        cakeSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        cakeSection.style.opacity = '0';
        cakeSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            // Hide cake section
            cakeSection.style.display = 'none';
            debugLog('Cake section hidden');
            
            // Show message section with fade in
            messageSection.style.display = 'flex';
            messageSection.style.opacity = '0';
            messageSection.style.transform = 'scale(1.1)';
            messageSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            // Trigger reflow
            messageSection.offsetHeight;
            
            messageSection.style.opacity = '1';
            messageSection.style.transform = 'scale(1)';
            debugLog('Message section shown');
            
            // Start message animations
            setTimeout(() => {
                debugLog('Starting message animations...');
                startMessageAnimations();
            }, 500);
        }, 1000);
    }
    
    // Message section animations - ENHANCED WITH DEBUGGING
    function startMessageAnimations() {
        const messageCard = document.querySelector('.message-card');
        const messageText = document.querySelector('.message-text');
        const messageSignature = document.querySelector('.message-signature');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        debugLog(`Found elements: card=${!!messageCard}, text=${!!messageText}, signature=${!!messageSignature}, floating=${floatingElements.length}`);
        
        // Animate card entrance
        setTimeout(() => {
            if (messageCard) {
                messageCard.classList.add('show');
                debugLog('Message card animation started');
            }
        }, 300);
        
        // Animate text
        setTimeout(() => {
            if (messageText) {
                messageText.classList.add('show');
                debugLog('Message text animation started');
            }
        }, 800);
        
        // Animate signature
        setTimeout(() => {
            if (messageSignature) {
                messageSignature.classList.add('show');
                debugLog('Message signature animation started');
            }
        }, 1500);
        
        // Animate floating elements
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('show');
                debugLog(`Floating element ${index + 1} animated`);
            }, 2000 + (index * 200));
        });
        
        // Start message confetti
        setTimeout(() => {
            debugLog('Starting message confetti...');
            createMessageConfetti();
        }, 2500);
        
        // Add button to go to memories after message is complete
        setTimeout(() => {
            addMemoriesButton();
        }, 4000);
    }
    
    // Add memories button to message section
    function addMemoriesButton() {
        const messageContainer = document.querySelector('.message-container');
        if (!messageContainer) return;
        
        // Check if button already exists
        if (messageContainer.querySelector('.to-memories-btn')) return;
        
        const toMemoriesBtn = document.createElement('button');
        toMemoriesBtn.innerHTML = '<span>📸 View Memories →</span>';
        toMemoriesBtn.className = 'to-memories-btn';
        toMemoriesBtn.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: pulseMemories 2s infinite;
        `;
        
        // Add pulse animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulseMemories {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.05); }
            }
        `;
        document.head.appendChild(pulseStyle);
        
        toMemoriesBtn.addEventListener('click', function() {
            debugLog('Navigating to memories page...');
            navigateToMemoriesPage();
        });
        
        messageContainer.appendChild(toMemoriesBtn);
    }
    
    // Navigate to memories page
    function navigateToMemoriesPage() {
        const messageSection = document.querySelector('.message-section');
        const memoriesSection = document.querySelector('.memories-section');
        
        if (!messageSection || !memoriesSection) {
            debugLog('ERROR: Required sections not found for memories navigation');
            return;
        }
        
        // Fade out message section
        messageSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        messageSection.style.opacity = '0';
        messageSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            messageSection.style.display = 'none';
            
            // Show memories section
            memoriesSection.style.display = 'flex';
            memoriesSection.style.opacity = '0';
            memoriesSection.style.transform = 'scale(1.1)';
            memoriesSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            memoriesSection.offsetHeight;
            memoriesSection.style.opacity = '1';
            memoriesSection.style.transform = 'scale(1)';
            
            setTimeout(() => {
                startMemoriesAnimations();
            }, 500);
        }, 1000);
    }
    
    // Memories section functionality
    let currentSlide = 0;
    let isSliderView = true;
    
    function startMemoriesAnimations() {
        debugLog('Starting memories animations...');
        
        const memoriesHeader = document.querySelector('.memories-header');
        const galleryControls = document.querySelector('.gallery-controls');
        const memoriesGrid = document.querySelector('.memories-grid');
        const memoriesSlider = document.querySelector('.memories-slider');
        const memoriesNavigation = document.querySelector('.memories-navigation');
        
        // Animate elements
        setTimeout(() => memoriesHeader?.classList.add('show'), 200);
        setTimeout(() => galleryControls?.classList.add('show'), 400);
        setTimeout(() => {
            if (isSliderView) {
                memoriesSlider?.classList.add('show');
            } else {
                memoriesGrid?.classList.add('show');
            }
        }, 600);
        setTimeout(() => memoriesNavigation?.classList.add('show'), 800);
        
        // Initialize gallery functionality
        initializeGallery();
        
        // Start memories confetti
        setTimeout(() => createMemoriesConfetti(), 1000);
    }
    
    function initializeGallery() {
        const gridViewBtn = document.getElementById('gridViewBtn');
        const sliderViewBtn = document.getElementById('sliderViewBtn');
        const memoriesGrid = document.getElementById('memoriesGrid');
        const memoriesSlider = document.getElementById('memoriesSlider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const sliderDots = document.querySelectorAll('.dot');
        
        // View toggle functionality
        gridViewBtn?.addEventListener('click', () => switchView('grid'));
        sliderViewBtn?.addEventListener('click', () => switchView('slider'));
        
        // Slider controls
        prevBtn?.addEventListener('click', () => changeSlide(-1));
        nextBtn?.addEventListener('click', () => changeSlide(1));
        
        // Dot navigation
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Auto-play slider
        setInterval(() => {
            if (isSliderView && memoriesSlider?.style.display !== 'none') {
                changeSlide(1);
            }
        }, 5000);
        
        // Memory card click effects
        const memoryCards = document.querySelectorAll('.memory-card');
        memoryCards.forEach(card => {
            card.addEventListener('click', function() {
                createCardClickEffect(this);
            });
        });
        
        // Navigation buttons
        document.getElementById('backToMessageBtn')?.addEventListener('click', () => {
            navigateFromMemoriesTo('message');
        });
        
        document.getElementById('backToHomeBtn')?.addEventListener('click', () => {
            navigateFromMemoriesTo('landing');
        });
    }
    
    function switchView(view) {
        const gridViewBtn = document.getElementById('gridViewBtn');
        const sliderViewBtn = document.getElementById('sliderViewBtn');
        const memoriesGrid = document.getElementById('memoriesGrid');
        const memoriesSlider = document.getElementById('memoriesSlider');
        
        isSliderView = view === 'slider';
        
        // Update button states
        gridViewBtn?.classList.toggle('active', view === 'grid');
        sliderViewBtn?.classList.toggle('active', view === 'slider');
        
        // Switch views
        if (view === 'grid') {
            memoriesSlider.style.display = 'none';
            memoriesGrid.style.display = 'grid';
            memoriesGrid.classList.add('show');
        } else {
            memoriesGrid.style.display = 'none';
            memoriesSlider.style.display = 'block';
            memoriesSlider.classList.add('show');
        }
    }
    
    function changeSlide(direction) {
        const totalSlides = 6;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlider();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function updateSlider() {
        const sliderTrack = document.getElementById('sliderTrack');
        const sliderDots = document.querySelectorAll('.dot');
        const sliderItems = document.querySelectorAll('.slider-item');
        
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update dots
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update slide states
        sliderItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSlide);
        });
    }
    
    function createCardClickEffect(card) {
        // Create sparkle burst effect
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.background = '#FFD700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            
            const angle = (i * 45) * Math.PI / 180;
            const distance = 80 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.style.transition = 'all 0.8s ease-out';
                sparkle.style.transform = `translate(${endX}px, ${endY}px) scale(0)`;
                sparkle.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 900);
        }
    }
    
    function createMessageConfetti() {
        const messageConfettiContainer = document.querySelector('.message-confetti-container');
        if (!messageConfettiContainer) {
            debugLog('ERROR: message-confetti-container not found!');
            return;
        }
        
        debugLog('Creating message confetti...');
        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#96ceb4'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('message-confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 4 + 3) + 's';
                
                // Random shapes
                const size = Math.random() * 6 + 4;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                if (Math.random() > 0.6) {
                    confetti.style.borderRadius = '50%';
                } else if (Math.random() > 0.3) {
                    confetti.style.transform = 'rotate(45deg)';
                    confetti.innerHTML = '♥';
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.background = 'transparent';
                    confetti.style.fontSize = size + 'px';
                }
                
                messageConfettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 8000);
            }, i * 60);
        }
        
        debugLog('Message confetti created successfully');
    }
    
    // Add back buttons for message section - ENHANCED
    function addMessageBackButtons() {
        const messageContainer = document.querySelector('.message-container');
        if (!messageContainer) {
            debugLog('ERROR: message-container not found for back buttons!');
            return;
        }
        
        debugLog('Adding message back buttons...');
        
        // Remove existing buttons first
        const existingButtons = messageContainer.querySelectorAll('.back-to-cake-btn, .back-to-landing-from-message-btn');
        existingButtons.forEach(btn => btn.remove());
        
        // Back to cake button
        const backToCakeBtn = document.createElement('button');
        backToCakeBtn.innerHTML = '<span>← Back to Cake</span>';
        backToCakeBtn.className = 'back-to-cake-btn';
        backToCakeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            left: 20px;
            background: linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        // Back to landing button
        const backToLandingBtn = document.createElement('button');
        backToLandingBtn.innerHTML = '<span>🏠 Home</span>';
        backToLandingBtn.className = 'back-to-landing-from-message-btn';
        backToLandingBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
            border: 2px solid rgba(255,255,255,0.3);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        // Add hover effects
        [backToCakeBtn, backToLandingBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2))';
                this.style.transform = 'scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                this.style.transform = 'scale(1)';
            });
        });
        
        // Back to cake functionality
        backToCakeBtn.addEventListener('click', function() {
            debugLog('Back to cake button clicked');
            const messageSection = document.querySelector('.message-section');
            const cakeSection = document.querySelector('.cake-section');
            
            messageSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            messageSection.style.opacity = '0';
            messageSection.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                messageSection.style.display = 'none';
                cakeSection.style.display = 'flex';
                cakeSection.style.opacity = '0';
                cakeSection.style.transform = 'scale(1.1)';
                cakeSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                cakeSection.offsetHeight;
                cakeSection.style.opacity = '1';
                cakeSection.style.transform = 'scale(1)';
                debugLog('Navigated back to cake section');
            }, 800);
        });
        
        // Back to landing functionality
        backToLandingBtn.addEventListener('click', function() {
            debugLog('Back to landing button clicked');
            const messageSection = document.querySelector('.message-section');
            const landingSection = document.querySelector('.landing-section');
            
            messageSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            messageSection.style.opacity = '0';
            messageSection.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                messageSection.style.display = 'none';
                landingSection.style.display = 'flex';
                landingSection.style.opacity = '0';
                landingSection.style.transform = 'scale(1.1)';
                landingSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                landingSection.offsetHeight;
                landingSection.style.opacity = '1';
                landingSection.style.transform = 'scale(1)';
                
                resetCake();
                debugLog('Navigated back to landing section');
            }, 800);
        });
        
        messageContainer.appendChild(backToCakeBtn);
        messageContainer.appendChild(backToLandingBtn);
        debugLog('Message back buttons added successfully');
    }
    
    // Modified initialize pages to include message section - ENHANCED
    function initializePages() {
        const cakeSection = document.querySelector('.cake-section');
        const messageSection = document.querySelector('.message-section');
        const memoriesSection = document.querySelector('.memories-section');
        const loveSection = document.querySelector('.love-section');
        const endingSection = document.querySelector('.ending-section');
        
        debugLog(`Initializing pages... Found: cake=${!!cakeSection}, message=${!!messageSection}, memories=${!!memoriesSection}, love=${!!loveSection}, ending=${!!endingSection}`);
        
        // Hide sections initially
        if (cakeSection) cakeSection.style.display = 'none';
        if (messageSection) messageSection.style.display = 'none';
        if (memoriesSection) memoriesSection.style.display = 'none';
        if (loveSection) loveSection.style.display = 'none';
        if (endingSection) endingSection.style.display = 'none';
        
        // Add back buttons
        addBackButton();
        addMessageBackButtons();
        
        debugLog('Pages initialization completed');
    }
    
    // Cake cutting confetti - MODIFIED FOR MEGA CONFETTI
    function createMegaCakeConfetti() {
        const cakeConfettiContainer = document.querySelector('.cake-confetti-container');
        if (!cakeConfettiContainer) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#96ceb4'];
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('cake-confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 4 + 3) + 's';
                
                // Random shapes
                const size = Math.random() * 8 + 6;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                if (Math.random() > 0.7) {
                    confetti.style.borderRadius = '50%';
                } else if (Math.random() > 0.4) {
                    confetti.style.transform = 'rotate(45deg)';
                    confetti.innerHTML = '🎂';
                    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.background = 'transparent';
                    confetti.style.fontSize = size + 'px';
                }
                
                cakeConfettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 8000);
            }, i * 40);
        }
    }
    
    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.98) {
            createSparkle(e.clientX, e.clientY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.backgroundColor = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleAnim 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add sparkle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is loaded
    initializePages();
    
    // Add navigation to love page from memories section
    function navigateFromMemoriesTo(destination) {
        const memoriesSection = document.querySelector('.memories-section');
        
        memoriesSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        memoriesSection.style.opacity = '0';
        memoriesSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            memoriesSection.style.display = 'none';
            
            if (destination === 'message') {
                const messageSection = document.querySelector('.message-section');
                messageSection.style.display = 'flex';
                messageSection.style.opacity = '0';
                messageSection.style.transform = 'scale(1.1)';
                messageSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                messageSection.offsetHeight;
                messageSection.style.opacity = '1';
                messageSection.style.transform = 'scale(1)';
            } else if (destination === 'landing') {
                const landingSection = document.querySelector('.landing-section');
                landingSection.style.display = 'flex';
                landingSection.style.opacity = '0';
                landingSection.style.transform = 'scale(1.1)';
                landingSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                landingSection.offsetHeight;
                landingSection.style.opacity = '1';
                landingSection.style.transform = 'scale(1)';
                
                resetCake();
            } else if (destination === 'love') {
                navigateToLovePage();
            }
        }, 800);
    }
    
    // Add love button to memories section
    function addLoveButton() {
        const memoriesContainer = document.querySelector('.memories-container');
        if (!memoriesContainer || memoriesContainer.querySelector('.to-love-btn')) return;
        
        const toLoveBtn = document.createElement('button');
        toLoveBtn.innerHTML = '<span>💕 Things I Love About You →</span>';
        toLoveBtn.className = 'to-love-btn';
        toLoveBtn.style.cssText = `
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff9a9e, #fecfef);
            border: none;
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: lovePulse 2s infinite;
        `;
        
        // Add love pulse animation
        if (!document.querySelector('#lovePulseStyle')) {
            const loveStyle = document.createElement('style');
            loveStyle.id = 'lovePulseStyle';
            loveStyle.textContent = `
                @keyframes lovePulse {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    50% { transform: translateX(-50%) scale(1.05); }
                }
            `;
            document.head.appendChild(loveStyle);
        }
        
        toLoveBtn.addEventListener('click', function() {
            debugLog('Navigating to love page...');
            navigateFromMemoriesTo('love');
        });
        
        memoriesContainer.appendChild(toLoveBtn);
    }
    
    // Enhanced memories animations to include love button
    function startMemoriesAnimations() {
        debugLog('Starting memories animations...');
        
        const memoriesHeader = document.querySelector('.memories-header');
        const galleryControls = document.querySelector('.gallery-controls');
        const memoriesGrid = document.querySelector('.memories-grid');
        const memoriesSlider = document.querySelector('.memories-slider');
        const memoriesNavigation = document.querySelector('.memories-navigation');
        
        // Animate elements
        setTimeout(() => memoriesHeader?.classList.add('show'), 200);
        setTimeout(() => galleryControls?.classList.add('show'), 400);
        setTimeout(() => {
            if (isSliderView) {
                memoriesSlider?.classList.add('show');
            } else {
                memoriesGrid?.classList.add('show');
            }
        }, 600);
        setTimeout(() => memoriesNavigation?.classList.add('show'), 800);
        
        // Initialize gallery functionality
        initializeGallery();
        
        // Start memories confetti
        setTimeout(() => createMemoriesConfetti(), 1000);
        
        // Add love button after animations
        setTimeout(() => addLoveButton(), 2000);
    }
    
    // Navigate to love page
    function navigateToLovePage() {
        const memoriesSection = document.querySelector('.memories-section');
        const loveSection = document.querySelector('.love-section');
        
        if (!memoriesSection || !loveSection) {
            debugLog('ERROR: Required sections not found for love navigation');
            return;
        }
        
        // Fade out memories section
        memoriesSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        memoriesSection.style.opacity = '0';
        memoriesSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            memoriesSection.style.display = 'none';
            
            // Show love section
            loveSection.style.display = 'flex';
            loveSection.style.opacity = '0';
            loveSection.style.transform = 'scale(1.1)';
            loveSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            loveSection.offsetHeight;
            loveSection.style.opacity = '1';
            loveSection.style.transform = 'scale(1)';
            
            setTimeout(() => {
                startLoveAnimations();
            }, 500);
        }, 1000);
    }
    
    // Love section functionality
    function startLoveAnimations() {
        debugLog('Starting love animations...');
        
        const loveHeader = document.querySelector('.love-header');
        const loveContent = document.querySelector('.love-content');
        const loveItems = document.querySelectorAll('.love-item');
        const loveSummary = document.querySelector('.love-summary');
        const loveNavigation = document.querySelector('.love-navigation');
        
        // Animate header
        setTimeout(() => loveHeader?.classList.add('show'), 200);
        
        // Animate content container
        setTimeout(() => loveContent?.classList.add('show'), 400);
        
        // Animate love items one by one
        loveItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
                createItemSparkle(item);
            }, 600 + (index * 150));
        });
        
        // Animate summary and navigation
        setTimeout(() => loveSummary?.classList.add('show'), 600 + (loveItems.length * 150) + 300);
        setTimeout(() => loveNavigation?.classList.add('show'), 600 + (loveItems.length * 150) + 500);
        
        // Initialize love interactions
        initializeLoveInteractions();
        
        // Start love confetti
        setTimeout(() => createLoveConfetti(), 1000);
    }
    
    function initializeLoveInteractions() {
        // Heart click effects
        const loveHearts = document.querySelectorAll('.love-heart');
        loveHearts.forEach(heart => {
            heart.addEventListener('click', function() {
                createHeartBurstEffect(this);
            });
        });
        
        // Love item hover effects
        const loveItems = document.querySelectorAll('.love-item');
        loveItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                createLoveSparkles(this);
            });
        });
        
        // Navigation buttons
        document.getElementById('backToMemoriesBtn')?.addEventListener('click', () => {
            navigateFromLoveTo('memories');
        });
        
        document.getElementById('loveBackToHomeBtn')?.addEventListener('click', () => {
            navigateFromLoveTo('landing');
        });
        
        document.getElementById('loveCelebrationBtn')?.addEventListener('click', () => {
            createMegaLoveCelebration();
        });
    }
    
    function createItemSparkle(item) {
        const rect = item.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.right - 20) + 'px';
        sparkle.style.top = (rect.top + 20) + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.innerHTML = '✨';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleAppear 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
        
        // Add sparkle appear animation
        if (!document.querySelector('#sparkleAppearStyle')) {
            const style = document.createElement('style');
            style.id = 'sparkleAppearStyle';
            style.textContent = `
                @keyframes sparkleAppear {
                    0% { transform: scale(0) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                    100% { transform: scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function createHeartBurstEffect(heart) {
        const rect = heart.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const heartEmojis = ['💖', '💕', '💝', '💞', '💓', '💗', '💘'];
        
        for (let i = 0; i < 6; i++) {
            const burstHeart = document.createElement('div');
            burstHeart.style.position = 'fixed';
            burstHeart.style.left = centerX + 'px';
            burstHeart.style.top = centerY + 'px';
            burstHeart.style.fontSize = '1.2rem';
            burstHeart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            burstHeart.style.pointerEvents = 'none';
            burstHeart.style.zIndex = '9999';
            
            const angle = (i * 60) * Math.PI / 180;
            const distance = 60 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            document.body.appendChild(burstHeart);
            
            setTimeout(() => {
                burstHeart.style.transition = 'all 1s ease-out';
                burstHeart.style.transform = `translate(${endX}px, ${endY}px) scale(0) rotate(360deg)`;
                burstHeart.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                if (burstHeart.parentNode) {
                    burstHeart.parentNode.removeChild(burstHeart);
                }
            }, 1100);
        }
    }
    
    function createLoveSparkles(item) {
        const rect = item.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                sparkle.style.fontSize = '0.8rem';
                sparkle.innerHTML = '✨';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '9999';
                sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1500);
            }, i * 100);
        }
        
        // Add sparkle float animation
        if (!document.querySelector('#sparkleFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'sparkleFloatStyle';
            style.textContent = `
                @keyframes sparkleFloat {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    50% { transform: translateY(-20px) scale(1); opacity: 1; }
                    100% { transform: translateY(-40px) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function createLoveConfetti() {
        const loveConfettiContainer = document.querySelector('.love-confetti-container');
        if (!loveConfettiContainer) return;
        
        const heartEmojis = ['💖', '💕', '💝', '💞', '💓', '💗', '💘', '💙', '💚', '💛', '🧡', '💜'];
        const colors = ['#ff6b6b', '#ff9ff3', '#feca57', '#4ecdc4', '#a8edea'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('love-confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 4 + 4) + 's';
                
                if (Math.random() > 0.5) {
                    // Heart emoji confetti
                    confetti.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                    confetti.style.fontSize = (Math.random() * 10 + 10) + 'px';
                } else {
                    // Colored shape confetti
                    const size = Math.random() * 8 + 4;
                    confetti.style.width = size + 'px';
                    confetti.style.height = size + 'px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                }
                
                loveConfettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 8000);
            }, i * 60);
        }
    }
    
    function createMegaLoveCelebration() {
        debugLog('Starting mega love celebration!');
        
        // Create massive heart burst from center
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const heartEmojis = ['💖', '💕', '💝', '💞', '💓', '💗', '💘', '💙', '💚', '💛', '🧡', '💜'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const celebrationHeart = document.createElement('div');
                celebrationHeart.style.position = 'fixed';
                celebrationHeart.style.left = centerX + 'px';
                celebrationHeart.style.top = centerY + 'px';
                celebrationHeart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                celebrationHeart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                celebrationHeart.style.pointerEvents = 'none';
                celebrationHeart.style.zIndex = '9999';
                
                const angle = (i * 12) * Math.PI / 180;
                const distance = 150 + Math.random() * 200;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                document.body.appendChild(celebrationHeart);
                
                setTimeout(() => {
                    celebrationHeart.style.transition = 'all 2s ease-out';
                    celebrationHeart.style.transform = `translate(${endX}px, ${endY}px) scale(0) rotate(720deg)`;
                    celebrationHeart.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    if (celebrationHeart.parentNode) {
                        celebrationHeart.parentNode.removeChild(celebrationHeart);
                    }
                }, 2200);
            }, i * 50);
        }
        
        // Extra confetti burst
        setTimeout(() => createLoveConfetti(), 500);
        setTimeout(() => createLoveConfetti(), 1000);
    }
    
    // Add navigation to ending page from love section
    function navigateFromLoveTo(destination) {
        const loveSection = document.querySelector('.love-section');
        
        loveSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        loveSection.style.opacity = '0';
        loveSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            loveSection.style.display = 'none';
            
            if (destination === 'memories') {
                const memoriesSection = document.querySelector('.memories-section');
                memoriesSection.style.display = 'flex';
                memoriesSection.style.opacity = '0';
                memoriesSection.style.transform = 'scale(1.1)';
                memoriesSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                memoriesSection.offsetHeight;
                memoriesSection.style.opacity = '1';
                memoriesSection.style.transform = 'scale(1)';
            } else if (destination === 'landing') {
                const landingSection = document.querySelector('.landing-section');
                landingSection.style.display = 'flex';
                landingSection.style.opacity = '0';
                landingSection.style.transform = 'scale(1.1)';
                landingSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                landingSection.offsetHeight;
                landingSection.style.opacity = '1';
                landingSection.style.transform = 'scale(1)';
                
                resetCake();
            } else if (destination === 'ending') {
                navigateToEndingPage();
            }
        }, 800);
    }
    
    // Add ending button to love section
    function addEndingButton() {
        const loveContainer = document.querySelector('.love-container');
        if (!loveContainer || loveContainer.querySelector('.to-ending-btn')) return;
        
        const toEndingBtn = document.createElement('button');
        toEndingBtn.innerHTML = '<span>✨ Final Message →</span>';
        toEndingBtn.className = 'to-ending-btn';
        toEndingBtn.style.cssText = `
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #000428, #004e92);
            border: 2px solid #ffd700;
            color: #ffd700;
            padding: 15px 30px;
            border-radius: 30px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: endingPulse 2s infinite;
        `;
        
        // Add ending pulse animation
        if (!document.querySelector('#endingPulseStyle')) {
            const endingStyle = document.createElement('style');
            endingStyle.id = 'endingPulseStyle';
            endingStyle.textContent = `
                @keyframes endingPulse {
                    0%, 100% { 
                        transform: translateX(-50%) scale(1); 
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(255, 215, 0, 0.7);
                    }
                    50% { 
                        transform: translateX(-50%) scale(1.05); 
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px 10px rgba(255, 215, 0, 0.3);
                    }
                }
            `;
            document.head.appendChild(endingStyle);
        }
        
        toEndingBtn.addEventListener('click', function() {
            debugLog('Navigating to ending page...');
            navigateFromLoveTo('ending');
        });
        
        loveContainer.appendChild(toEndingBtn);
    }
    
    // Enhanced love animations to include ending button
    function startLoveAnimations() {
        debugLog('Starting love animations...');
        
        const loveHeader = document.querySelector('.love-header');
        const loveContent = document.querySelector('.love-content');
        const loveItems = document.querySelectorAll('.love-item');
        const loveSummary = document.querySelector('.love-summary');
        const loveNavigation = document.querySelector('.love-navigation');
        
        // Animate header
        setTimeout(() => loveHeader?.classList.add('show'), 200);
        
        // Animate content container
        setTimeout(() => loveContent?.classList.add('show'), 400);
        
        // Animate love items one by one
        loveItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
                createItemSparkle(item);
            }, 600 + (index * 150));
        });
        
        // Animate summary and navigation
        setTimeout(() => loveSummary?.classList.add('show'), 600 + (loveItems.length * 150) + 300);
        setTimeout(() => loveNavigation?.classList.add('show'), 600 + (loveItems.length * 150) + 500);
        
        // Initialize love interactions
        initializeLoveInteractions();
        
        // Start love confetti
        setTimeout(() => createLoveConfetti(), 1000);
        
        // Add ending button after animations
        setTimeout(() => addEndingButton(), 3000);
    }
    
    // Navigate to ending page
    function navigateToEndingPage() {
        const loveSection = document.querySelector('.love-section');
        const endingSection = document.querySelector('.ending-section');
        
        if (!loveSection || !endingSection) {
            debugLog('ERROR: Required sections not found for ending navigation');
            return;
        }
        
        // Fade out love section
        loveSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        loveSection.style.opacity = '0';
        loveSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            loveSection.style.display = 'none';
            
            // Show ending section
            endingSection.style.display = 'flex';
            endingSection.style.opacity = '0';
            endingSection.style.transform = 'scale(1.1)';
            endingSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            endingSection.offsetHeight;
            endingSection.style.opacity = '1';
            endingSection.style.transform = 'scale(1)';
            
            setTimeout(() => {
                startEndingAnimations();
            }, 500);
        }, 1000);
    }
    
    // Ending section functionality
    function startEndingAnimations() {
        debugLog('Starting ending animations...');
        
        const finalMessage = document.querySelector('.final-message');
        const endingSubtitle = document.querySelector('.ending-subtitle');
        const wishCards = document.querySelectorAll('.wish-card');
        const endingSignature = document.querySelector('.ending-signature');
        const endingActions = document.querySelector('.ending-actions');
        
        // Animate main message
        setTimeout(() => finalMessage?.classList.add('show'), 500);
        setTimeout(() => endingSubtitle?.classList.add('show'), 1000);
        
        // Animate wish cards
        wishCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
                createWishSparkle(card);
            }, 1500 + (index * 300));
        });
        
        // Animate signature and actions
        setTimeout(() => endingSignature?.classList.add('show'), 1500 + (wishCards.length * 300) + 300);
        setTimeout(() => endingActions?.classList.add('show'), 1500 + (wishCards.length * 300) + 600);
        
        // Initialize ending interactions
        initializeEndingInteractions();
        
        // Start ambient sparkles
        setTimeout(() => startAmbientSparkles(), 2000);
    }
    
    function initializeEndingInteractions() {
        // Fireworks button
        document.getElementById('createFireworksBtn')?.addEventListener('click', () => {
            createFireworksShow();
        });
        
        // Final celebration button
        document.getElementById('finalCelebrationBtn')?.addEventListener('click', () => {
            createGrandFinale();
        });
        
        // Start over button
        document.getElementById('startOverBtn')?.addEventListener('click', () => {
            navigateToLandingFromEnding();
        });
    }
    
    function createWishSparkle(card) {
        const rect = card.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.right - 30) + 'px';
        sparkle.style.top = (rect.top + 10) + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.innerHTML = '✨';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'wishSparkle 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
        
        // Add wish sparkle animation
        if (!document.querySelector('#wishSparkleStyle')) {
            const style = document.createElement('style');
            style.id = 'wishSparkleStyle';
            style.textContent = `
                @keyframes wishSparkle {
                    0% { transform: scale(0) rotate(0deg); opacity: 0; }
                    20% { transform: scale(1.2) rotate(72deg); opacity: 1; }
                    40% { transform: scale(1) rotate(144deg); opacity: 1; }
                    60% { transform: scale(1.1) rotate(216deg); opacity: 1; }
                    80% { transform: scale(1) rotate(288deg); opacity: 1; }
                    100% { transform: scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function startAmbientSparkles() {
        const sparkleContainer = document.querySelector('.sparkle-trail-container');
        if (!sparkleContainer) return;
        
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle-trail');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.backgroundColor = ['#ffd700', '#fff', '#ffed4e', '#ffe135'][Math.floor(Math.random() * 4)];
            
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, 500);
    }
    
    function createFireworksShow() {
        debugLog('Creating fireworks show...');
        const fireworksCanvas = document.getElementById('fireworksCanvas');
        if (!fireworksCanvas) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#ffd700', '#fff'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.6) + 50;
                
                createSingleFirework(x, y, colors[Math.floor(Math.random() * colors.length)]);
            }, i * 300);
        }
    }
    
    function createSingleFirework(x, y, color) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = color;
            
            const angle = (i * 360 / particleCount) * Math.PI / 180;
            const distance = Math.random() * 100 + 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.style.transition = 'all 2s ease-out';
                firework.style.transform = `translate(${endX}px, ${endY}px)`;
            }, 50);
            
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 2100);
        }
    }
    
    function createGrandFinale() {
        debugLog('Starting grand finale!');
        
        // Create massive fireworks display
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.7) + 50;
                const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#ffd700', '#fff'];
                createSingleFirework(x, y, colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
        
        // Create confetti storm
        setTimeout(() => createEndingConfetti(), 500);
        setTimeout(() => createEndingConfetti(), 1000);
        setTimeout(() => createEndingConfetti(), 1500);
        
        // Create sparkle explosion
        setTimeout(() => createSparkleExplosion(), 2000);
    }
    
    function createEndingConfetti() {
        const confettiContainer = document.querySelector('.ending-confetti-container');
        if (!confettiContainer) return;
        
        const symbols = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎆', '🎇'];
        const colors = ['#ff6b6b', '#4ecdc4', '#feca57', '#ff9ff3', '#54a0ff', '#ffd700'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('ending-confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                if (Math.random() > 0.5) {
                    // Symbol confetti
                    confetti.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
                    confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
                } else {
                    // Shape confetti
                    const size = Math.random() * 8 + 4;
                    confetti.style.width = size + 'px';
                    confetti.style.height = size + 'px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                }
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 6000);
            }, i * 30);
        }
    }
    
    function createSparkleExplosion() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.style.left = centerX + 'px';
                sparkle.style.top = centerY + 'px';
                sparkle.style.width = '6px';
                sparkle.style.height = '6px';
                sparkle.style.backgroundColor = '#ffd700';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '9999';
                
                const angle = (i * 7.2) * Math.PI / 180;
                const distance = Math.random() * 300 + 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.style.transition = 'all 3s ease-out';
                    sparkle.style.transform = `translate(${endX}px, ${endY}px) scale(0)`;
                    sparkle.style.opacity = '0';
                }, 100);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 3200);
            }, i * 50);
        }
    }
    
    function navigateToLandingFromEnding() {
        const endingSection = document.querySelector('.ending-section');
        const landingSection = document.querySelector('.landing-section');
        
        endingSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        endingSection.style.opacity = '0';
        endingSection.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            endingSection.style.display = 'none';
            landingSection.style.display = 'flex';
            landingSection.style.opacity = '0';
            landingSection.style.transform = 'scale(1.1)';
            landingSection.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            landingSection.offsetHeight;
            landingSection.style.opacity = '1';
            landingSection.style.transform = 'scale(1)';
            
            resetCake();
        }, 1000);
    }
});
