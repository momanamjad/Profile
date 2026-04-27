export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.contactSubmit');
      const originalBtnText = submitBtn.textContent;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.style.display = 'block';
      formStatus.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      formStatus.style.color = 'white';
      formStatus.textContent = 'Sending your message...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
          formStatus.style.color = '#28a745';
          formStatus.textContent = 'Message sent successfully!';
          contactForm.reset();
        } else {
          const data = await response.json();
          formStatus.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
          formStatus.style.color = '#dc3545';
          formStatus.textContent = data.message || 'Oops! There was a problem submitting your form';
        }
      } catch (error) {
        formStatus.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
        formStatus.style.color = '#dc3545';
        formStatus.textContent = 'Oops! There was a problem connecting to the server';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
}
