// startMenu.js
document.addEventListener('DOMContentLoaded', function() {
    // Refresh button functionality - ACTUALLY REFRESH THE PAGE
    document.getElementById("refreshBtn").addEventListener('click', function() {
        location.reload(); // This actually refreshes/reloads the page
    });

    // Start with About submenu open for presentation
    setTimeout(() => {
        openAboutSubmenu();
    }, 100);

    // About menu click functionality
    const aboutRow = document.getElementById("startBodyRaw1");
    let aboutSubmenu = null;
    let isSubmenuOpen = false;

    aboutRow.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        if (isSubmenuOpen) {
            // Close submenu if already open
            closeAboutSubmenu();
        } else {
            // Open submenu
            openAboutSubmenu();
        }
    });

    function openAboutSubmenu() {
        // Remove existing submenu if any
        if (aboutSubmenu) {
            aboutSubmenu.remove();
        }

        // Create new submenu window
        aboutSubmenu = document.createElement('div');
        aboutSubmenu.className = 'submenu-window';
        aboutSubmenu.innerHTML = `
            <div class="submenu-header">
                <span class="submenu-title">About</span>
            </div>
            <div class="submenu-row">
                <p>portfolio.html<span class="menu-arrow"></span></p>
            </div>
        `;

        // Position it beside the start menu
        const startBody = document.getElementById('startBody');
        const startBodyRect = startBody.getBoundingClientRect();
        
        aboutSubmenu.style.left = (startBodyRect.right + 5) + 'px';
        aboutSubmenu.style.top = startBodyRect.top + 'px';

        // Add to the document
        document.body.appendChild(aboutSubmenu);
        isSubmenuOpen = true;

        // Add click event to portfolio.html - CLOSE submenu after selection
        const portfolioItem = aboutSubmenu.querySelector('.submenu-row p');
        portfolioItem.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent closing when clicking portfolio item
            
            // Show the main portfolio window
            const portfolioWindow = document.getElementById('contBody');
            portfolioWindow.style.display = 'flex';
            bringToFront(portfolioWindow);
            
            // CLOSE submenu after selection (realistic behavior)
            closeAboutSubmenu();
        });

        // Close submenu when clicking outside
        document.addEventListener('click', closeAboutSubmenuOnClickOutside);
    }

    function closeAboutSubmenu() {
        if (aboutSubmenu) {
            aboutSubmenu.remove();
            aboutSubmenu = null;
        }
        isSubmenuOpen = false;
        document.removeEventListener('click', closeAboutSubmenuOnClickOutside);
    }

    function closeAboutSubmenuOnClickOutside(e) {
        if (aboutSubmenu && !aboutSubmenu.contains(e.target) && 
            !document.getElementById('startBodyRaw1').contains(e.target)) {
            closeAboutSubmenu();
        }
    }

    // Grey out Projects and Contact rows
    const projectsRow = document.getElementById("startBodyRaw2");
    const contactRow = document.getElementById("startBodyRaw3");
    
    if (projectsRow) {
        projectsRow.style.opacity = "0.5";
        projectsRow.style.cursor = "not-allowed";
        
        projectsRow.addEventListener('click', function(e) {
            if (projectsRow.style.opacity === "0.5") {
                e.preventDefault();
                e.stopPropagation();
                console.log("Projects section coming soon!");
            }
        });
    }
    
    if (contactRow) {
        contactRow.style.opacity = "0.5";
        contactRow.style.cursor = "not-allowed";
        
        contactRow.addEventListener('click', function(e) {
            if (contactRow.style.opacity === "0.5") {
                e.preventDefault();
                e.stopPropagation();
                console.log("Contact section coming soon!");
            }
        });
    }
});
