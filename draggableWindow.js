document.addEventListener('DOMContentLoaded', function() {
    dragElement(document.getElementById("contBody"));
    
    // Close button functionality
    document.getElementById("closeBtn").addEventListener('click', function() {
        document.getElementById("contBody").style.display = 'none';
    });
    
    // Priority button functionality (bring to front)
    document.getElementById("priorityBtn").addEventListener('click', function() {
        bringToFront(document.getElementById("contBody"));
    });
});

function dragElement(elem) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // Only make the header area (not the buttons) draggable
    elem.querySelector('.title-text').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // Bring to front when starting to drag
        bringToFront(elem);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Function to bring window to front
function bringToFront(elem) {
    // Remove 'front' class from all windows
    var allWindows = document.querySelectorAll('.window');
    allWindows.forEach(function(window) {
        window.classList.remove('front');
    });
    
    // Add 'front' class to clicked window
    elem.classList.add('front');
}

// Optional: Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var frontWindow = document.querySelector('.window.front');
        if (frontWindow) {
            frontWindow.style.display = 'none';
        }
    }
});