// draggableWindow.js - Updated with navbar boundary
function dragElement(elem) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;

    const header = elem.querySelector('.window-header');
    if (header) {
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('close-btn') || e.target.classList.contains('priority-btn')) {
                return;
            }
            dragMouseDown(e);
        });
        
        header.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('close-btn') || e.target.classList.contains('priority-btn')) {
                return;
            }
            dragMouseDown(e);
        }, { passive: false });
    }

    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = true;
        
        if (windowManager) {
            windowManager.bringToFront(elem);
        }
        
        if (e.type === 'touchstart') {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('touchend', closeDragElement);
        document.addEventListener('touchmove', elementDrag, { passive: false });
        
        elem.classList.add('dragging');
    }

    function elementDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        
        // Calculate new position with viewport AND navbar constraints
        const newTop = elem.offsetTop - pos2;
        const newLeft = elem.offsetLeft - pos1;
        
        // Keep window within viewport bounds
        const navbarHeight = 80; // Match your navbar height
        const maxTop = window.innerHeight - elem.offsetHeight;
        const maxLeft = window.innerWidth - elem.offsetWidth;
        
        // Prevent overlapping navbar (minimum top position)
        const minTop = navbarHeight + 5; // 5px buffer below navbar
        
        elem.style.top = Math.max(minTop, Math.min(newTop, maxTop)) + "px";
        elem.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
    }

    function closeDragElement() {
        isDragging = false;
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('touchmove', elementDrag);
        
        elem.classList.remove('dragging');
    }
}
