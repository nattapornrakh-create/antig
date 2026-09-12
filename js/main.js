/**
 * PORTFOLIO JAVASCRIPT LOGIC
 * Digital Business Portfolio
 * Features: Dark/Light Mode, Typing Effect, Project Filtering, Modal Details, Scroll Effects, Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Typing Animation Effect in Hero
  initTypingEffect();

  // 3. Scroll Progress & Sticky Navbar & Back to Top
  initScrollFeatures();

  // 4. Project Filter System
  initProjectFilter();

  // 5. Project Detail Modal
  initProjectModal();

  // 6. Contact Form Validation & Submission
  initContactForm();
});

/* ==========================================================================
   1. Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill text-warning';
      } else {
        themeIcon.className = 'bi bi-moon-stars-fill text-primary';
      }
    }
  }
}

/* ==========================================================================
   2. Typing Animation Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Digital Marketing & Growth Strategist',
    'E-Commerce Specialist & Store Optimizer',
    'Data & Business Analytics Enthusiast',
    'UX/UI Designer & Digital Innovator',
    'นักกลยุทธ์การตลาดและนวัตกรรมธุรกิจดิจิทัล'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Scroll Effects: Progress Bar, Sticky Navbar, Back to Top
   ========================================================================== */
function initScrollFeatures() {
  const scrollProgressBar = document.getElementById('scrollProgress');
  const navbar = document.querySelector('.custom-navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // 1. Update Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Navbar Scrolled Style
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 3. Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   4. Project Filtering
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Project Modal Details
   ========================================================================== */
const projectDatabase = {
  'ecommerce': {
    title: 'E-Commerce Growth & Conversion Rate Optimization (CRO)',
    category: 'E-Commerce & Omnichannel',
    image: 'assets/images/project-ecommerce.jpg',
    metric: 'ยอดขายเติบโต +230% | ROAS 4.8x',
    overview: 'โครงการปรับปรุงและวางระบบร้านค้าออนไลน์แบบ Omnichannel (TikTok Shop, Shopee, Lazada และ Shopify) ให้แก่แบรนด์สินค้าไลฟ์สไตล์',
    problem: 'ร้านค้าเดิมมีอัตราการทิ้งตะกร้าสินค้า (Cart Abandonment Rate) สูงถึง 78% และขั้นตอนการชำระเงินซับซ้อน ทำให้พลาดโอกาสในการสร้างยอดขายจาก Traffic ที่ยิงแคมเปญเข้ามา',
    solution: 'วิเคราะห์พฤติกรรมลูกค้าด้วย Heatmaps และ GA4 Funnel เพื่อปรับปรุง UX ของหน้า Checkout, เพิ่มฟังก์ชัน 1-Click Payment, เชื่อมระบบ Loyalty Points และทำ Automate Cart Recovery ผ่าน LINE OA',
    results: [
      'Conversion Rate เพิ่มขึ้นจาก 1.4% เป็น 3.41% (+143%)',
      'ลด Cart Abandonment Rate ลงเหลือ 48%',
      'สร้างรายได้รวมกว่า ฿1.8M ในแคมเปญ 9.9 Mega Sale'
    ],
    tools: ['Shopify', 'TikTok Shop Partner', 'Google Analytics 4', 'Hotjar', 'LINE Official Account']
  },
  'marketing': {
    title: 'Omnichannel Performance Marketing & Viral Campaign',
    category: 'Digital Marketing & Ads',
    image: 'assets/images/project-marketing.svg',
    metric: 'ROAS 4.82x | ยอดวิว 1.85M',
    overview: 'การวางแผนและยิงแคมเปญโฆษณาครอบคลุมทั้ง Meta Ads (Facebook & Instagram), TikTok Ads และ Google Search สำหรับเจาะกลุ่มลูกค้า Gen-Z',
    problem: 'ต้นทุนค่าโฆษณาต่อผลลัพธ์ (Cost Per Acquisition - CPA) ของแบรนด์เดิมสูงขึ้นเรื่อยๆ เนื่องจากการกำหนดกลุ่มเป้าหมายกว้างเกินไปและชิ้นงานโฆษณา (Ad Creatives) ขาดความน่าดึงดูด',
    solution: 'ทำ A/B Testing คอนเทนต์กว่า 30 รูปแบบ เน้น Short-form Video สไตล์ UGC (User Generated Content) บน TikTok พร้อมวาง Retargeting Funnel ใน Meta Ads และเจาะ Intent ด้วย Google Search',
    results: [
      'สร้างยอดการมองเห็น (Impressions) กว่า 1,850,000 ครั้ง',
      'ค่าเฉลี่ย ROAS อยู่ที่ 4.82 เท่า (เพิ่มขึ้น +145% จากเป้าหมาย)',
      'ต้นทุน CPA ลดลง 38% เมื่อเทียบกับแคมเปญเดิม'
    ],
    tools: ['Meta Ads Manager', 'TikTok Ads Manager', 'Google Ads (SEM)', 'CapCut Pro', 'Canva Pro']
  },
  'fintech': {
    title: 'SmartPay: FinTech & Smart Loyalty UX/UI Redesign',
    category: 'UX/UI & Digital Product',
    image: 'assets/images/project-fintech.svg',
    metric: 'Usability Score 88.5/100 | -42% เวลาชำระเงิน',
    overview: 'การออกแบบ User Experience และ User Interface สำหรับแอปพลิเคชันกระเป๋าเงินดิจิทัลและสะสมแต้มอัจฉริยะสำหรับกลุ่มคนรุ่นใหม่และร้านค้า SME',
    problem: 'ผู้ใช้งานรู้สึกว่าขั้นตอนการสแกนจ่ายและการแลกคูปองโปรโมชันมีความสับสน ต้องคลิกหลายขั้นตอนกว่าจะทำรายการเสร็จสิ้น',
    solution: 'ทำ User Research สัมภาษณ์เชิงลึกกลุ่มเป้าหมาย 25 คน สร้าง User Journey Map และออกแบบ High-fidelity Prototype ด้วย Figma โดยนำเสนอระบบ Quick-Pay Widget และ AI Auto-suggest Coupon',
    results: [
      'ผลคะแนนความพึงพอใจการใช้งาน (SUS Score) สูงถึง 88.5 / 100',
      'ระยะเวลาเฉลี่ยในการทำรายการชำระเงินลดลง 42%',
      'ได้รับรางวัล Best UX Design ในงาน University Business Pitching Hackathon'
    ],
    tools: ['Figma', 'Miro (User Research)', 'Design System Tokens', 'Prototyping', 'Usability Testing']
  },
  'analytics': {
    title: 'Executive Business Intelligence & Customer Lifetime Value (CLV)',
    category: 'Data & Business Analytics',
    image: 'assets/images/project-data.svg',
    metric: 'Retention +18.2% | วิเคราะห์ 4,800+ ลูกค้า',
    overview: 'การรวบรวมข้อมูลยอดขายและพฤติกรรมลูกค้ามาสร้าง Dashboard วิเคราะห์เชิงลึกด้วย Power BI และ Looker Studio เพื่อสนับสนุนการตัดสินใจของผู้บริหาร',
    problem: 'ข้อมูลการขายกระจายตัวอยู่ในหลายระบบ (POS, E-Commerce, CRM) ทำให้ทีมบริหารไม่เห็นภาพรวมของลูกค้าประจำ และไม่สามารถคาดการณ์อัตราการสูญเสียลูกค้า (Churn Rate) ได้ทันเวลา',
    solution: 'ออกแบบกระบวนการ Data Pipeline เชื่อมต่อข้อมูลด้วย SQL และสร้าง RFM Model (Recency, Frequency, Monetary) เพื่อจัดกลุ่มลูกค้า 5 กลุ่ม พร้อมตั้งระบบ Alert เมื่อลูกค้ากลุ่ม VIP มีแนวโน้ม Churn',
    results: [
      'อัตราการกลับมาซื้อซ้ำ (Repeat Purchase Rate) เพิ่มขึ้น 18.2%',
      'ทีมการตลาดสามารถส่งโปรโมชันเฉพาะกลุ่มได้อย่างแม่นยำ (Personalized Offers)',
      'ลดเวลาในการจัดทำรายงานประจำสัปดาห์ของผู้บริหารลงได้ 8 ชั่วโมงต่อสัปดาห์'
    ],
    tools: ['Google Looker Studio', 'Microsoft Power BI', 'SQL (BigQuery)', 'Google Sheets Advanced', 'RFM Modeling']
  },
  'seo': {
    title: 'Technical SEO & Content Hub Organic Growth Strategy',
    category: 'SEO & Content Marketing',
    image: 'assets/images/project-seo.svg',
    metric: 'Organic Clicks +240% | 42 Keywords ติดอันดับ 1-3',
    overview: 'กลยุทธ์การทำ Search Engine Optimization แบบครบวงจร ทั้ง Technical SEO, On-Page Optimization และ Topic Cluster Content',
    problem: 'เว็บไซต์ธุรกิจมีทราฟฟิกพึ่งพาการยิงแอดมากเกินไป (Paid Traffic 90%) ทำให้ต้นทุนการตลาดต่อเดือนสูง และเว็บไซต์ขาดความน่าเชื่อถือใน Google Search',
    solution: 'แก้ไขปัญหา Core Web Vitals, ทำ Schema Markup โครงสร้างบทความ, ค้นหา High-intent Keywords และสร้าง Pillar Content และ Topic Clusters กว่า 20 บทความคุณภาพสูง',
    results: [
      'ยอด Organic Clicks เติบโตขึ้น 240% ภายในระยะเวลา 6 เดือน',
      'มีคีย์เวิร์ดที่สำคัญต่อธุรกิจติดอันดับ Top 3 ของ Google มากถึง 42 คำค้นหา',
      'ประหยัดงบประมาณการยิง Search Ads ได้มากกว่า ฿85,000 ต่อเดือน'
    ],
    tools: ['Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'WordPress SEO']
  }
};

function initProjectModal() {
  const modalElement = document.getElementById('projectModal');
  if (!modalElement) return;

  const projectModal = new bootstrap.Modal(modalElement);
  const detailButtons = document.querySelectorAll('.btn-view-project');

  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-project-id');
      const data = projectDatabase[projectId];

      if (!data) return;

      // Populate Modal Fields
      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectImage').src = data.image;
      document.getElementById('modalProjectMetric').textContent = data.metric;
      document.getElementById('modalProjectOverview').textContent = data.overview;
      document.getElementById('modalProjectProblem').textContent = data.problem;
      document.getElementById('modalProjectSolution').textContent = data.solution;

      // Results List
      const resultsContainer = document.getElementById('modalProjectResults');
      resultsContainer.innerHTML = '';
      data.results.forEach(res => {
        const li = document.createElement('li');
        li.className = 'mb-1 text-muted';
        li.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i>${res}`;
        resultsContainer.appendChild(li);
      });

      // Tools List
      const toolsContainer = document.getElementById('modalProjectTools');
      toolsContainer.innerHTML = '';
      data.tools.forEach(tool => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = tool;
        toolsContainer.appendChild(span);
      });

      projectModal.show();
    });
  });
}

/* ==========================================================================
   6. Contact Form Validation & Submission
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const alertBox = document.getElementById('contactAlert');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      showAlert('danger', 'กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('warning', 'กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง');
      return;
    }

    // Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>กำลังส่งข้อความ...';

    // Simulate sending network request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      showAlert('success', `ขอบคุณครับคุณ ${name}! ข้อความของคุณถูกส่งเรียบร้อยแล้ว ผมจะติดต่อกลับทางอีเมล ${email} โดยเร็วที่สุดครับ`);
      contactForm.reset();
    }, 1200);
  });

  function showAlert(type, text) {
    if (!alertBox) return;
    alertBox.className = `alert alert-${type} alert-dismissible fade show`;
    alertBox.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2 fs-5"></i>
        <div>${text}</div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertBox.classList.remove('d-none');

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      alertBox.classList.add('d-none');
    }, 6000);
  }
}
