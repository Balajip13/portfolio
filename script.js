const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page-section');

function showPage(pageId) {

  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  const targetNav = document.querySelector(`[data-page="${pageId}"]`);
  if (targetNav) {
    targetNav.classList.add('active');
  }

  if (pageId === 'resume') {
    setTimeout(() => {
      animateSkillBars();
    }, 300);
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    showPage(pageId);
  });
});

const servicesGrid = document.getElementById('servicesGrid');
const servicesScrollThumb = document.getElementById('servicesScrollThumb');
const servicesScrollIndicator = document.getElementById('servicesScrollIndicator');

function updateServicesScrollThumb() {
  if (!servicesGrid || !servicesScrollThumb || !servicesScrollIndicator) return;
  
  const scrollLeft = servicesGrid.scrollLeft;
  const scrollWidth = servicesGrid.scrollWidth;
  const clientWidth = servicesGrid.clientWidth;
  
  const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
  const indicatorWidth = servicesScrollIndicator.offsetWidth;
  const thumbWidth = servicesScrollThumb.offsetWidth;
  const maxThumbLeft = indicatorWidth - thumbWidth;
  
  servicesScrollThumb.style.left = `${scrollPercentage * maxThumbLeft}px`;
}

if (servicesGrid) {
  servicesGrid.addEventListener('scroll', updateServicesScrollThumb);
}

if (servicesScrollIndicator) {
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
}

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

if (testimonialsBar) {
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
}

if (testimonialsContainer) {
  testimonialsContainer.addEventListener("scroll", updateTestimonialsThumb);

  

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  testimonialsContainer.addEventListener('mouseenter', stopAutoScroll);
  testimonialsContainer.addEventListener('mouseleave', startAutoScroll); 
}


const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

function sendMessage(event) {
  event.preventDefault(); 

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if(name && email && message) {
    alert(`Thank you, ${name}! Your message has been sent.`);
  } else {
    alert("Please fill all required fields.");
  }
}


window.addEventListener('load', function() {
  updateTestimonialsThumb();
  updateServicesScrollThumb();
});

window.addEventListener('resize', function() {
  updateTestimonialsThumb();
  updateServicesScrollThumb();
});

function animateSkills() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = width;
    }, 100);
  });
}


const skillsContainer = document.getElementById('skillsContainer');
const skillsScrollThumb = document.getElementById('skillsScrollThumb');
const skillsScrollIndicator = document.getElementById('skillsScrollIndicator');

function updateSkillsScrollThumb() {
  if (!skillsContainer || !skillsScrollThumb || !skillsScrollIndicator) return;
  
  const scrollLeft = skillsContainer.scrollLeft;
  const scrollWidth = skillsContainer.scrollWidth;
  const clientWidth = skillsContainer.clientWidth;
  
if (skillsScrollIndicator.parentElement) {
  skillsScrollIndicator.parentElement.style.display = 'flex';
}

  

  
  const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
  const indicatorWidth = skillsScrollIndicator.offsetWidth;
  const thumbWidth = skillsScrollThumb.offsetWidth;
  const maxThumbLeft = indicatorWidth - thumbWidth;
  
  const newPosition = Math.max(0, Math.min(maxThumbLeft, scrollPercentage * maxThumbLeft));
  skillsScrollThumb.style.left = `${newPosition}px`;
}

if (skillsContainer) {
  skillsContainer.addEventListener('scroll', updateSkillsScrollThumb);
  
  window.addEventListener('resize', () => {
    setTimeout(updateSkillsScrollThumb, 100);
  });
}

if (skillsScrollIndicator) {
  let isDragging = false;
  
  skillsScrollIndicator.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleSkillsScrollIndicatorInteraction(e);
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      handleSkillsScrollIndicatorInteraction(e);
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  skillsScrollIndicator.addEventListener('click', handleSkillsScrollIndicatorInteraction);
  
  function handleSkillsScrollIndicatorInteraction(e) {
    if (!skillsContainer || !skillsScrollThumb || !skillsScrollIndicator) return;
    
    const rect = skillsScrollIndicator.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const indicatorWidth = skillsScrollIndicator.offsetWidth;
    const thumbWidth = skillsScrollThumb.offsetWidth;
    const maxThumbLeft = indicatorWidth - thumbWidth;
    
    let scrollPercentage;
    if (e.target === skillsScrollThumb && !isDragging) {
      return;
    }
    
    scrollPercentage = Math.max(0, Math.min(1, (clickX - thumbWidth/2) / maxThumbLeft));
    
    const scrollWidth = skillsContainer.scrollWidth;
    const clientWidth = skillsContainer.clientWidth;
    
    skillsContainer.scrollLeft = scrollPercentage * (scrollWidth - clientWidth);
  }
}

function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach((fill, index) => {
    const width = fill.getAttribute('data-width');
    setTimeout(() => {
      fill.style.width = width;
    }, index * 200);
  });
  
  setTimeout(() => {
    updateSkillsScrollThumb();
  }, skillFills.length * 200 + 500);
}

function initializeSkillsSection() {
  setTimeout(() => {
    animateSkillBars();
    updateSkillsScrollThumb();
  }, 500);
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  const targetNav = document.querySelector(`[data-page="${pageId}"]`);
  if (targetNav) {
    targetNav.classList.add('active');
  }

  if (pageId === 'resume') {
    setTimeout(() => {
      initializeSkillsSection();
    }, 300);
  }
}

window.addEventListener('load', function() {
  const resumeSection = document.getElementById('resume');
  if (resumeSection && resumeSection.classList.contains('active')) {
    initializeSkillsSection();
  }
  
  updateTestimonialsThumb();
  updateServicesScrollThumb();
});

        window.addEventListener('load', function() {
            const skillFills = document.querySelectorAll('.skill-fill');
            skillFills.forEach((fill, index) => {
                const currentWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = currentWidth;
                }, index * 200 + 500);
            });
        });
