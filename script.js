document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
    button.style.transition = 'all 0.3s ease';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

document.querySelectorAll('.testimonial-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-4px)';
    item.style.transition = 'all 0.3s ease';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
  });
});

window.addEventListener('scroll', () => {
  const title = document.querySelector('.intro .title');
  if (window.scrollY > 100) {
    title.style.color = '#1a237e';
  } else {
    title.style.color = '#337aff';
  }
});

document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    const platform = link.querySelector('img').alt;
    link.setAttribute('title', platform);
  });
});








