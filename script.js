/**
 * Warm Creative Portfolio - Anshul Dev Aryan
 * Interactive JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const EMAIL = 'anshul.26bcon2235@jecrcu.edu.in';

  /* ============================================================
     1. Toast Notification Utility
     ============================================================ */
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* ============================================================
     2. Clipboard Copy Functionality
     ============================================================ */
  function copyEmailToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(() => {
        showToast('Copied email: ' + EMAIL);
      }).catch(() => {
        fallbackCopy(EMAIL);
      });
    } else {
      fallbackCopy(EMAIL);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copied email: ' + text);
    } catch (err) {
      showToast('Email: ' + text);
    }
    document.body.removeChild(textArea);
  }

  // Bind copy triggers
  const quickCopyBtn = document.getElementById('copy-email-quick');
  const contactCopyBtn = document.getElementById('btn-copy-contact');
  const heroCardEmail = document.getElementById('card-email-badge');

  if (quickCopyBtn) quickCopyBtn.addEventListener('click', copyEmailToClipboard);
  if (contactCopyBtn) contactCopyBtn.addEventListener('click', copyEmailToClipboard);
  if (heroCardEmail) heroCardEmail.addEventListener('click', copyEmailToClipboard);

  /* ============================================================
     3. Navbar Scroll Effect & Mobile Navigation
     ============================================================ */
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ============================================================
     4. Active Nav Item On Scroll (IntersectionObserver)
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ============================================================
     5. Skills Filtering (All / Technical / Soft)
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ============================================================
     5.1. Roadmap Toggles (My Education vs Academic Experience)
     ============================================================ */
  const btnTabEdu = document.getElementById('btn-tab-edu');
  const btnTabExp = document.getElementById('btn-tab-exp');
  const roadmapRow = document.querySelector('.roadmap-row-1');

  const educationContent = `
    <div class="roadmap-node">
      <div class="node-dot-marker active"></div>
      <span class="node-year">2026 – Present</span>
      <h3 class="node-title">B.Tech First Year</h3>
      <p class="node-inst">JECRC University, Jaipur (Computer Science & Engineering)</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">2025 – 2026</span>
      <h3 class="node-title">12th Grade (PCM)</h3>
      <p class="node-inst">Senior Secondary Education • Physics, Chemistry & Mathematics</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">2023 – 2024</span>
      <h3 class="node-title">10th Grade</h3>
      <p class="node-inst">Secondary School Examination • All-Round Foundations</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">2026 Lab Work</span>
      <h3 class="node-title">C & Git Practice</h3>
      <p class="node-inst">Hands-On Systems Lab, Memory Pointers & Version Control</p>
    </div>
  `;

  const experienceContent = `
    <div class="roadmap-node">
      <div class="node-dot-marker active"></div>
      <span class="node-year">2026 Coursework</span>
      <h3 class="node-title">Systems Programming</h3>
      <p class="node-inst">Deep dive into C memory allocation, file pointers, and structured code</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">2026 Lab Collaboration</span>
      <h3 class="node-title">Peer Code Reviews</h3>
      <p class="node-inst">Collaborating with university peers on debugging and Git branches</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">2026 Seminar</span>
      <h3 class="node-title">Technical Presentations</h3>
      <p class="node-inst">Presenting computer fundamentals and OS concepts with clarity</p>
    </div>
    <div class="roadmap-node">
      <div class="node-dot-marker"></div>
      <span class="node-year">Continuous</span>
      <h3 class="node-title">Time & Study Management</h3>
      <p class="node-inst">Balancing academic requirements with independent software exploration</p>
    </div>
  `;

  if (btnTabEdu && btnTabExp && roadmapRow) {
    btnTabEdu.addEventListener('click', () => {
      btnTabEdu.classList.add('active');
      btnTabExp.classList.remove('active');
      roadmapRow.innerHTML = educationContent;
    });

    btnTabExp.addEventListener('click', () => {
      btnTabExp.classList.add('active');
      btnTabEdu.classList.remove('active');
      roadmapRow.innerHTML = experienceContent;
    });
  }

  /* ============================================================
     6. Projects Modal Data & Interactivity
     ============================================================ */
  const projectDetails = {
    'student-sys': {
      title: 'Student Record Management System in C',
      badge: 'C Programming & File I/O',
      description: `A foundational academic project written in C to simulate a real-world student administrative database.`,
      code: `// Sample Record Structure in C
#include <stdio.h>
#include <string.h>

struct Student {
    int rollNumber;
    char name[50];
    float gpa;
    char branch[30];
};

void saveRecord(struct Student s) {
    FILE *fp = fopen("records.dat", "ab");
    if(fp != NULL) {
        fwrite(&s, sizeof(struct Student), 1, fp);
        fclose(fp);
        printf("Record saved successfully!\\n");
    }
}`,
      highlights: [
        'Used binary file streams (fopen, fwrite, fread) to persist student records across executions.',
        'Implemented custom search algorithms to lookup records by Roll Number or Branch.',
        'Calculated class GPA averages and handled input validation for clean command line usage.'
      ]
    },
    'quiz-game': {
      title: 'Interactive Terminal Math & Logic Quiz',
      badge: 'Interactive CLI Application',
      description: `A fast-paced interactive terminal game programmed in C to reinforce mental calculations, conditional branching, and randomized challenges.`,
      code: `// Dynamic Question Generator
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int generateQuestion() {
    int a = rand() % 50 + 1;
    int b = rand() % 50 + 1;
    int ans;
    printf("Solve: %d + %d = ? ", a, b);
    scanf("%d", &ans);
    return (ans == (a + b));
}`,
      highlights: [
        'Randomized number generation using rand() and time(NULL) seed.',
        'Real-time scoring tracker with dynamic round progression.',
        'Modular design breaking gameplay into initialization, round evaluation, and score reporting.'
      ]
    },
    'bitwise-viz': {
      title: 'Binary & Bitwise Operations Visualizer',
      badge: 'Computer Fundamentals',
      description: `Developed to deeply comprehend how computers manipulate data at the silicon bit level.`,
      code: `// Bitwise Print Utility in C
void printBinary(unsigned int n) {
    for (int i = 31; i >= 0; i--) {
        int k = n >> i;
        if (k & 1) printf("1");
        else printf("0");
        if (i % 4 == 0) printf(" ");
    }
    printf("\\n");
}`,
      highlights: [
        'Visualizes bitwise AND (&), OR (|), XOR (^), NOT (~), and bit shifts (<<, >>).',
        'Helped build a strong mental model for two\'s complement, signed/unsigned integers, and masking.',
        'Tied directly to university coursework in Computer Organization and Digital Electronics.'
      ]
    },
    'git-hub': {
      title: 'B.Tech First-Year Code Repository & Git Workflow',
      badge: 'Version Control & Open Source',
      description: `A repository following industry-standard Git version control hygiene for tracking first-year coursework and assignments.`,
      code: `# Standard Git Workflow Practiced
$ git init
$ git add src/main.c include/student.h
$ git commit -m "feat: implement file I/O for student records"
$ git branch feature/search-algorithm
$ git checkout feature/search-algorithm
$ git push origin main`,
      highlights: [
        'Organized code into clean directories: /src, /include, /docs, /labs.',
        'Wrote structured markdown READMEs detailing program prerequisites and compilation instructions with gcc.',
        'Practiced branch creation, conflict resolution, and staging best practices.'
      ]
    }
  };

  const modalBackdrop = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalCloseSecondary = document.getElementById('modal-close-secondary');
  const modalTriggers = document.querySelectorAll('.code-modal-btn');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;

    let highlightsHtml = data.highlights.map(item => `<li>${item}</li>`).join('');

    modalBodyContent.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <span class="project-tag">${data.badge}</span>
      </div>
      <p style="margin-bottom: 1.25rem;">${data.description}</p>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Key Architecture Highlights:</h4>
      <ul style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.92rem;">
        ${highlightsHtml}
      </ul>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">C Code Snippet:</h4>
      <pre><code>${escapeHtml(data.code)}</code></pre>
    `;

    modalBackdrop.classList.add('show');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('show');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseSecondary) modalCloseSecondary.addEventListener('click', closeProjectModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('show')) {
      closeProjectModal();
    }
  });

  /* ============================================================
     7. Contact Form Handling & Validation
     ============================================================ */
  const contactForm = document.getElementById('contact-form');
  const senderName = document.getElementById('sender-name');
  const senderEmail = document.getElementById('sender-email');
  const senderSubject = document.getElementById('sender-subject');
  const senderMessage = document.getElementById('sender-message');
  const currentChars = document.getElementById('current-chars');
  const submitBtn = document.getElementById('submit-btn');
  const successBanner = document.getElementById('form-success-banner');

  // Character counter
  if (senderMessage && currentChars) {
    senderMessage.addEventListener('input', () => {
      const len = senderMessage.value.length;
      currentChars.textContent = len;
      if (len > 500) {
        currentChars.style.color = '#E74C3C';
      } else {
        currentChars.style.color = '';
      }
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    ['name-error', 'email-error', 'subject-error', 'message-error'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    [senderName, senderEmail, senderSubject, senderMessage].forEach(input => {
      if (input) input.classList.remove('error');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Name
      if (!senderName.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        senderName.classList.add('error');
        isValid = false;
      }

      // Validate Email
      if (!senderEmail.value.trim()) {
        document.getElementById('email-error').textContent = 'Please enter your email.';
        senderEmail.classList.add('error');
        isValid = false;
      } else if (!validateEmail(senderEmail.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        senderEmail.classList.add('error');
        isValid = false;
      }

      // Validate Subject
      if (!senderSubject.value.trim()) {
        document.getElementById('subject-error').textContent = 'Please provide a subject.';
        senderSubject.classList.add('error');
        isValid = false;
      }

      // Validate Message
      if (!senderMessage.value.trim()) {
        document.getElementById('message-error').textContent = 'Please write a message.';
        senderMessage.classList.add('error');
        isValid = false;
      } else if (senderMessage.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message should be at least 10 characters long.';
        senderMessage.classList.add('error');
        isValid = false;
      }

      if (!isValid) return;

      // Animate submit button
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
        </svg>
        <span>Sending Message...</span>
      `;

      // Simulate sending delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        if (successBanner) {
          successBanner.style.display = 'flex';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showToast('Message sent to Anshul Dev Aryan!');

        // Optional mailto trigger as fallback
        const mailtoSubject = encodeURIComponent(senderSubject.value.trim());
        const mailtoBody = encodeURIComponent(
          `Sender: ${senderName.value.trim()}\nEmail: ${senderEmail.value.trim()}\n\nMessage:\n${senderMessage.value.trim()}`
        );
        const mailtoLink = `mailto:${EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        // Add a helper link inside the success banner
        const successParagraph = successBanner.querySelector('p');
        if (successParagraph) {
          successParagraph.innerHTML = `Thank you for reaching out! You can also <a href="${mailtoLink}" style="color: #1E8449; text-decoration: underline; font-weight: bold;">click here to open in your default mail app</a> with your pre-filled message.`;
        }

        contactForm.reset();
        currentChars.textContent = '0';
      }, 1200);
    });
  }

  /* ============================================================
     8. Back to Top Button
     ============================================================ */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
