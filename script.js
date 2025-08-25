function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

  const targetPage = document.getElementById(pageId);
  if (targetPage) targetPage.classList.add('active');

  const targetNav = document.querySelector(`[data-page="${pageId}"]`);
  if (targetNav) targetNav.classList.add('active');

  if (pageId === 'resume') {
    setTimeout(() => animateSkillBars(), 300);
  }
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.getAttribute('data-page'));
  });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    window.location.href = "thank.html";
  } else {
    alert("Please fill all required fields.");
  }
  return false;
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach((fill, index) => {
    const width = fill.dataset.width;
    setTimeout(() => {
      fill.style.width = width;
    }, index * 300);
  });
}

window.addEventListener('load', () => {
  const resumeSection = document.getElementById('resume');
  if (resumeSection && resumeSection.classList.contains('active')) {
    animateSkillBars();
  }
});

function setupCustomScrollbar(containerId, barId, thumbId) {
  const container = document.getElementById(containerId);
  const bar = document.getElementById(barId);
  const thumb = document.getElementById(thumbId);

  if (!container || !bar || !thumb) {
    console.warn(`Scrollbar setup failed for ${containerId} - elements not found`);
    return;
  }

  function updateThumb() {
    const containerWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;

    if (containerWidth <= visibleWidth) {
      bar.style.display = "none";
      return;
    } else {
      bar.style.display = "block";
    }

    const maxScroll = containerWidth - visibleWidth;
    const scrollRatio = maxScroll > 0 ? scrollLeft / maxScroll : 0;

    const barWidth = bar.clientWidth;
    const thumbWidth = thumb.clientWidth;
    const maxThumbMove = barWidth - thumbWidth;
    
    if (maxThumbMove > 0) {
      thumb.style.left = (scrollRatio * maxThumbMove) + "px";
    }
  }

  container.addEventListener("scroll", updateThumb);
  bar.addEventListener("click", (e) => {
    if (e.target === thumb) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = bar.clientWidth;
    const thumbWidth = thumb.clientWidth;

    const maxThumbMove = barWidth - thumbWidth;
    const clickRatio = Math.max(0, Math.min(1, (clickX - thumbWidth / 2) / maxThumbMove));

    const containerWidth = container.scrollWidth;
    const visibleWidth = container.clientWidth;
    const maxScroll = containerWidth - visibleWidth;

    if (maxScroll > 0) {
      container.scrollLeft = clickRatio * maxScroll;
    }
  });

  let isDragging = false;
  let startX, startLeft;

  thumb.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startLeft = parseInt(window.getComputedStyle(thumb).left, 10) || 0;
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const barWidth = bar.clientWidth;
    const thumbWidth = thumb.clientWidth;
    const maxThumbMove = barWidth - thumbWidth;
    const newLeft = Math.max(0, Math.min(startLeft + dx, maxThumbMove));
    
    thumb.style.left = newLeft + "px";

    if (maxThumbMove > 0) {
      const scrollRatio = newLeft / maxThumbMove;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = scrollRatio * maxScroll;
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = "auto";
    }
  });

  const initScrollbar = () => {
    setTimeout(updateThumb, 100);
  };

  window.addEventListener("load", initScrollbar);
  window.addEventListener("resize", updateThumb);
  initScrollbar();
}

document.addEventListener('DOMContentLoaded', () => {
  setupCustomScrollbar("servicesGrid", "servicesScrollIndicator", "servicesScrollThumb");
  setupCustomScrollbar("testimonialsContainer", "testimonialsScrollIndicator", "testimonialsScrollThumb");
});
