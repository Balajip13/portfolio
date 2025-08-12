const servicesGrid = document.getElementById('servicesGrid');
const servicesScrollThumb = document.getElementById('servicesScrollThumb');
const servicesScrollIndicator = document.getElementById('servicesScrollIndicator');

function updateServicesScrollThumb() {
    const scrollLeft = servicesGrid.scrollLeft;
    const scrollWidth = servicesGrid.scrollWidth;
    const clientWidth = servicesGrid.clientWidth;
    
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const indicatorWidth = servicesScrollIndicator.offsetWidth;
    const thumbWidth = servicesScrollThumb.offsetWidth;
    const maxThumbLeft = indicatorWidth - thumbWidth;
    
    servicesScrollThumb.style.left = `${scrollPercentage * maxThumbLeft}px`;
}

servicesGrid.addEventListener('scroll', updateServicesScrollThumb);

servicesScrollIndicator.addEventListener('click', (e) => {
    const rect = servicesScrollIndicator.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const indicatorWidth = servicesScrollIndicator.offsetWidth;
    const thumbWidth = servicesScrollThumb.offsetWidth;
    const maxThumbLeft = indicatorWidth - thumbWidth;
    
    const scrollPercentage = clickX / indicatorWidth;
    const scrollWidth = servicesGrid.scrollWidth;
    const clientWidth = servicesGrid.clientWidth;
    
    servicesGrid.scrollLeft = scrollPercentage * (scrollWidth - clientWidth);
});

// Initialize scroll position
updateServicesScrollThumb();
const testimonialsContainer = document.getElementById("testimonialsContainer");
const testimonialsThumb = document.getElementById("testimonialsScrollThumb");
const testimonialsBar = document.getElementById("testimonialsScrollIndicator");

function updateTestimonialsThumb() {
    if (!testimonialsContainer || !testimonialsThumb || !testimonialsBar) return;
    
    const containerWidth = testimonialsContainer.scrollWidth;
    const visibleWidth = testimonialsContainer.clientWidth;
    const scrollLeft = testimonialsContainer.scrollLeft;

    if (containerWidth <= visibleWidth) {
        testimonialsThumb.style.display = 'none';
        return;
    } else {
        testimonialsThumb.style.display = 'block';
    }

    const maxScroll = containerWidth - visibleWidth;
    const scrollRatio = scrollLeft / maxScroll;

    const maxThumbMove = testimonialsBar.clientWidth - testimonialsThumb.clientWidth;
    testimonialsThumb.style.left = Math.max(0, Math.min(maxThumbMove, scrollRatio * maxThumbMove)) + "px";
}

testimonialsBar.addEventListener('click', function(e) {
    if (e.target === testimonialsThumb) return;
    
    const rect = testimonialsBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = testimonialsBar.clientWidth;
    const thumbWidth = testimonialsThumb.clientWidth;
    
    const maxThumbMove = barWidth - thumbWidth;
    const clickRatio = Math.max(0, Math.min(1, (clickX - thumbWidth/2) / maxThumbMove));
    
    const containerWidth = testimonialsContainer.scrollWidth;
    const visibleWidth = testimonialsContainer.clientWidth;
    const maxScroll = containerWidth - visibleWidth;
    
    testimonialsContainer.scrollLeft = clickRatio * maxScroll;
});

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

testimonialsThumb.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = testimonialsContainer.scrollLeft;
    testimonialsThumb.style.cursor = 'grabbing';
    e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const barWidth = testimonialsBar.clientWidth;
    const thumbWidth = testimonialsThumb.clientWidth;
    const maxThumbMove = barWidth - thumbWidth;
    
    const containerWidth = testimonialsContainer.scrollWidth;
    const visibleWidth = testimonialsContainer.clientWidth;
    const maxScroll = containerWidth - visibleWidth;
    
    const scrollDelta = (deltaX / maxThumbMove) * maxScroll;
    testimonialsContainer.scrollLeft = Math.max(0, Math.min(maxScroll, startScrollLeft + scrollDelta));
});

document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        testimonialsThumb.style.cursor = 'pointer';
    }
});

testimonialsContainer.addEventListener('keydown', function(e) {
    const scrollAmount = 200;
    if (e.key === 'ArrowLeft') {
        testimonialsContainer.scrollLeft -= scrollAmount;
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        testimonialsContainer.scrollLeft += scrollAmount;
        e.preventDefault();
    }
});

testimonialsContainer.addEventListener("scroll", updateTestimonialsThumb);

let autoScrollInterval;
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        const maxScroll = testimonialsContainer.scrollWidth - testimonialsContainer.clientWidth;
        if (testimonialsContainer.scrollLeft >= maxScroll) {
            testimonialsContainer.scrollLeft = 0;
        } else {
            testimonialsContainer.scrollLeft += 400;
        }
    }, 4000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

testimonialsContainer.addEventListener('mouseenter', stopAutoScroll);
testimonialsContainer.addEventListener('mouseleave', startAutoScroll);

window.addEventListener('load', function() {
    updateTestimonialsThumb();
});

window.addEventListener('resize', updateTestimonialsThumb);
