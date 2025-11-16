// windowManager.js v1.2 - Dynamic Sizing & Centering
console.log('✅ windowManager.js loaded');

class WindowManager {
    constructor() {
        console.log('🔄 WindowManager constructor called');
        this.windows = new Map();
        this.zIndex = 1000;
        this.init();
    }

    init() {
        console.log('🎯 Initializing WindowManager');
        this.createAboutWindow();
        this.createEducationWindow();
        this.setupEventListeners();
        this.showWindow('about');
        console.log('✅ WindowManager initialized with', this.windows.size, 'windows');
    }

    getOptimalWindowSize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Let CSS media queries handle the scaling
        // Just return a reasonable base size
        return { 
            width: Math.min(1200, screenWidth - 40), 
            height: Math.min(800, screenHeight - 50) 
        };
    }

    // Calculate centered position for window
    getCenteredPosition(width, height) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // More precise margin calculation
        const navbarHeight = 80;
        const topMargin = navbarHeight + 20; // 100px total
        const availableHeight = screenHeight - topMargin;
        
        const position = {
            left: Math.max(20, (screenWidth - width) / 2), // Ensure at least 20px from edge
            top: Math.max(navbarHeight + 20, topMargin + (availableHeight - height) / 2)
        };
        
        console.log('🎯 Centered position:', position);
        return position;
    }

    createAboutWindow() {
        console.log('📝 Creating About window');
        const size = this.getOptimalWindowSize();
        const position = this.getCenteredPosition(size.width, size.height);
        
        console.log('📊 About window size:', size, 'position:', position);
        
        const aboutWindow = this.createWindowElement(
            'about', 
            'aboutMe.html', 
            position.left, 
            position.top, 
            size.width, 
            size.height
        );
        
        const content = `
            <div class="window-content-inner">
                <h1 id="welcome">Welcome</h1>
                <h4 id="who">I'm Sean Rodriguez</h4>
                <hr>
                <div class="content">
                    <h3 class="subheader">About Me</h3>
                    <div class="content-row">
                        <div class="text-column">
                            <p style="margin-top:14px;">Hello, I'm <b>Sean Vincent Rodriguez</b>; a first-year Computer Science student currently exploring:</p>
                            <ul class="interests-list">
                                <li>Retrocomputing;</li>
                                <li>Game Development;</li>
                                <li>Cybersecurity;</li>
                                <li>Operating Systems.</li>
                            </ul>
                            <p>I enjoy understanding how systems work at a low level and seeing how everything comes to be.</p>
                        </div>
                        <div class="image-column">
                            <figure class="image-figure">
                                <img id="me" src="/assets/sprites/seanRodriguez.jpg?v=2" alt="Sean Rodriguez">
                                <figcaption><b>Figure 1:</b> Me, November 2025</figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="content contact-list">
                    <h3 class="subheader">Contact</h3>
                    <p><img src="./assets/icons/e-mail.png" alt="e-mail" class="dev-tag">Email: <a href="mailto:rodriguezseanvincent@gmail.com">rodriguezseanvincent@gmail.com</a></p>
                    <p><img src="./assets/icons/github.png" alt="github" class="dev-tag">GitHub: <a href="https://www.github.com/wintriest" target="_blank">@wintriest</a></p>
                </div>
            </div>
        `;
        
        aboutWindow.querySelector('.window-content').innerHTML = content;
        this.windows.set('about', aboutWindow);
        console.log('✅ About window created');
    }

    createEducationWindow() {
        console.log('📚 Creating Education window');
        const size = this.getOptimalWindowSize();
        const basePosition = this.getCenteredPosition(size.width, size.height);
        const position = {
            left: basePosition.left + 50,
            top: basePosition.top + 50
        };
        
        console.log('📊 Education window size:', size, 'position:', position);
        
        const educationWindow = this.createWindowElement(
            'education', 
            'educationalAttainment.html', 
            position.left, 
            position.top, 
            size.width, 
            size.height
        );
        
        const content = `
            <div class="window-content-inner">
                <h1 class="welcome">Academic Journey</h1>
                <hr class="div">
                <div class="content">
                    <h3 class="subheader">Educational Attainment</h3>
                    <div class="education-list">
                        <!-- First row: Elementary & Senior High side by side -->
                        <div class="education-row">
                            <div class="education-item elementary-highschool">
                                <h4>Agoo Montessori Learning Center & High School Inc.</h4>
                                <p class="degree"><b>Elementary - High School (Grade 1 - 10)</b></p>
                                <p class="duration">2013 - 2023</p>
                                <p class="achievement">Consistently ranked & graduated with honors.</p>
                            </div>
                            <div class="education-item senior-high">
                                <h4>Agoo Montessori Learning Center & High School Inc.</h4>
                                <p class="degree"><b>Science, Technology, Engineering, and Math (STEM)</b></p>
                                <p class="duration">2023 - 2025</p>
                                <p class="achievement">Graduated with honors and several awards.</p>
                            </div>
                        </div>
                        <!-- Second row: College on its own -->
                        <div class="education-item college">
                            <h4>University of the Cordilleras</h4>
                            <p class="degree"><b>Bachelor of Science in Computer Science (BSCS)</b></p>
                            <p class="duration">2025 - Present</p>
                            <p class="status">Currently pursuing degree.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        educationWindow.querySelector('.window-content').innerHTML = content;
        this.windows.set('education', educationWindow);
        console.log('✅ Education window created');
    }

    createWindowElement(id, title, left, top, width, height) {
        console.log('🛠️ Creating window element:', { id, title, left, top, width, height });
        
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.id = `${id}Window`;
        windowElement.dataset.windowId = id;
        windowElement.style.cssText = `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; display: none;`;
        
        windowElement.innerHTML = `
            <div class="window-header">
                <button class="priority-btn"></button>
                <span class="title-text">${title}</span>
                <button class="close-btn">×</button>
            </div>
            <div class="window-content"></div>
        `;
        
        document.getElementById('contMain').appendChild(windowElement);
        
        // Add close button functionality
        const closeBtn = windowElement.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            this.closeWindow(id);
        });
        
        // Add priority button functionality
        const priorityBtn = windowElement.querySelector('.priority-btn');
        priorityBtn.addEventListener('click', () => {
            this.bringToFront(windowElement);
        });
        
        dragElement(windowElement);
        
        console.log('✅ Window element created with style:', windowElement.style.cssText);
        return windowElement;
    }

    setupEventListeners() {
        console.log('🎧 Setting up event listeners');
        
        // Navigation clicks
        document.querySelectorAll('.navLinks a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const windowId = link.getAttribute('href').substring(1);
                console.log('🔗 Nav clicked:', windowId);
                this.showWindow(windowId);
            });
        });

        // Re-center windows on screen resize
        window.addEventListener('resize', () => {
            console.log('🔄 Window resized');
            this.handleResize();
        });
        
        console.log('✅ Event listeners set up');
    }

    handleResize() {
        console.log('📏 Handling resize');
        this.windows.forEach((window, id) => {
            const newSize = this.getOptimalWindowSize();
            const newPosition = this.getCenteredPosition(newSize.width, newSize.height);
            
            if (window.style.display !== 'none') {
                window.style.width = `${newSize.width}px`;
                window.style.height = `${newSize.height}px`;
                window.style.left = `${newPosition.left}px`;
                window.style.top = `${newPosition.top}px`;
                console.log('🔄 Resized window:', id, newSize);
            }
        });
    }

    showWindow(windowId) {
        console.log('🪟 Showing window:', windowId);
        
        // Hide all windows first
        this.windows.forEach((window, id) => {
            window.style.display = 'none';
        });

        const targetWindow = this.windows.get(windowId);
        if (targetWindow) {
            // Re-center the window before showing it
            const newSize = this.getOptimalWindowSize();
            const newPosition = this.getCenteredPosition(newSize.width, newSize.height);
            
            targetWindow.style.width = `${newSize.width}px`;
            targetWindow.style.height = `${newSize.height}px`;
            targetWindow.style.left = `${newPosition.left}px`;
            targetWindow.style.top = `${newPosition.top}px`;
            targetWindow.style.display = 'flex';
            this.bringToFront(targetWindow);
            
            console.log('✅ Window shown with size:', newSize);
        } else {
            console.error('❌ Window not found:', windowId);
        }
    }

    closeWindow(windowId) {
        console.log('❌ Closing window:', windowId);
        const window = this.windows.get(windowId);
        if (window) {
            window.style.display = 'none';
        }
        
        const anyWindowVisible = Array.from(this.windows.values()).some(win => win.style.display !== 'none');
        if (!anyWindowVisible) {
            this.showWindow('about');
        }
    }

    bringToFront(window) {
        this.zIndex++;
        window.style.zIndex = this.zIndex;
    }
}

// Initialize window manager when DOM is loaded
let windowManager;
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Content Loaded - Initializing WindowManager');
    windowManager = new WindowManager();
});
