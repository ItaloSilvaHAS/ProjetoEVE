(() => {
    // Dark mode toggle
    const darkToggle = document.getElementById('dark-toggle');
    const htmlEl = document.documentElement;
    const darkModeStored = localStorage.getItem('eve-dark-mode');
    if (darkModeStored === 'true') {
      htmlEl.classList.add('dark');
      darkToggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>';
      darkToggle.setAttribute('aria-label', 'Alternar modo claro');
    } else {
      darkToggle.innerHTML = '<i class="fas fa-moon text-gray-700 dark:text-gray-300"></i>';
      darkToggle.setAttribute('aria-label', 'Alternar modo escuro');
    }
    darkToggle.addEventListener('click', () => {
      if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('eve-dark-mode', 'false');
        darkToggle.innerHTML = '<i class="fas fa-moon text-gray-700 dark:text-gray-300"></i>';
        darkToggle.setAttribute('aria-label', 'Alternar modo escuro');
      } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('eve-dark-mode', 'true');
        darkToggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>';
        darkToggle.setAttribute('aria-label', 'Alternar modo claro');
      }
    });
  
    // Mobile menu toggle
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    btnMenu.addEventListener('click', () => {
      const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        mobileMenu.classList.add('hidden');
        btnMenu.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        btnMenu.setAttribute('aria-expanded', 'true');
      }
    });
  
    // Login modal
    const btnLogin = document.getElementById('btn-login');
    const btnMobileLogin = document.getElementById('mobile-login');
    const btnHeroLogin = document.getElementById('btn-hero-login');
    const modalLogin = document.getElementById('modal-login');
    const modalRegister = document.getElementById('modal-register');
    const closeLogin = document.getElementById('close-login');
    const closeRegister = document.getElementById('close-register');
    const btnRegisterSwitch = document.getElementById('btn-register-switch');
    const btnLoginSwitch = document.getElementById('btn-login-switch');
  
    function openModal(modal) {
      modal.classList.remove('hidden');
      modal.querySelector('input, button, textarea, select').focus();
      document.body.style.overflow = 'hidden';
    }
    function closeModal(modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  
    btnLogin.addEventListener('click', () => openModal(modalLogin));
    btnMobileLogin.addEventListener('click', () => {
      openModal(modalLogin);
      mobileMenu.classList.add('hidden');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
    btnHeroLogin.addEventListener('click', () => openModal(modalLogin));
    closeLogin.addEventListener('click', () => closeModal(modalLogin));
    closeRegister.addEventListener('click', () => closeModal(modalRegister));
  
    btnRegisterSwitch.addEventListener('click', () => {
      closeModal(modalLogin);
      openModal(modalRegister);
    });
    btnLoginSwitch.addEventListener('click', () => {
      closeModal(modalRegister);
      openModal(modalLogin);
    });
  
    // Close modals on outside click or ESC
    [modalLogin, modalRegister].forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (!modalLogin.classList.contains('hidden')) closeModal(modalLogin);
        if (!modalRegister.classList.contains('hidden')) closeModal(modalRegister);
        if (!dashboard.classList.contains('hidden')) closeDashboard();
      }
    });
  
    // Login form validation & fake auth
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const dashboard = document.getElementById('dashboard');
    const dashboardClose = document.getElementById('dashboard-close');
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    formLogin.addEventListener('submit', e => {
      e.preventDefault();
      const email = formLogin.email.value.trim();
      const password = formLogin.password.value.trim();
      if (!validateEmail(email) || password.length < 6) {
        alert('Por favor, insira um email válido e senha com no mínimo 6 caracteres.');
        return;
      }
      // Simulação de autenticação segura (fake)
      alert(`Bem-vindo(a), ${email}!`);
      closeModal(modalLogin);
      openDashboard();
    });
  
    formRegister.addEventListener('submit', e => {
      e.preventDefault();
      const name = formRegister.name.value.trim();
      const email = formRegister.email.value.trim();
      const password = formRegister.password.value.trim();
      const passwordConfirm = formRegister.passwordConfirm.value.trim();
      if (!name || !validateEmail(email) || password.length < 6 || password !== passwordConfirm) {
        alert('Por favor, preencha todos os campos corretamente e confirme a senha.');
        return;
      }
      alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}!`);
      closeModal(modalRegister);
      openDashboard();
    });
  
    // Dashboard open/close
    function openDashboard() {
      dashboard.classList.remove('hidden');
      dashboard.focus();
      document.body.style.overflow = 'hidden';
      loadDashboardData();
    }
    function closeDashboard() {
      dashboard.classList.add('hidden');
      document.body.style.overflow = '';
    }
    dashboardClose.addEventListener('click', closeDashboard);
  
    // Dashboard data (fake)
    const progressList = document.getElementById('progress-list');
    const certificatesList = document.getElementById('certificates-list');
    const calendarList = document.getElementById('calendar-list');
    const networkingList = document.getElementById('networking-list');
  
    function loadDashboardData() {
      // Clear previous
      progressList.innerHTML = '';
      certificatesList.innerHTML = '';
      calendarList.innerHTML = '';
      networkingList.innerHTML = '';
  
      // Progresso
      const progressData = [
        { course: 'Programação Web', percent: 75 },
        { course: 'Marketing Digital', percent: 40 },
        { course: 'Inglês Avançado', percent: 90 },
        { course: 'Finanças Pessoais', percent: 20 },
      ];
      progressData.forEach(({ course, percent }) => {
        const li = document.createElement('li');
        li.className = 'space-y-1';
        li.innerHTML = `
          <div class="flex justify-between font-semibold text-gray-900 dark:text-gray-100">${course} <span>${percent}%</span></div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div class="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-500" style="width: ${percent}%;"></div>
          </div>
        `;
        progressList.appendChild(li);
      });
  
      // Certificados
      const certificatesData = [
        { course: 'Introdução à Programação', date: '15/03/2024' },
        { course: 'Design Gráfico Básico', date: '10/04/2024' },
      ];
      certificatesData.forEach(({ course, date }) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-md p-3 shadow-sm';
        li.innerHTML = `
          <span class="font-semibold text-gray-900 dark:text-gray-100">${course}</span>
          <span class="text-sm text-gray-600 dark:text-gray-400">${date}</span>
          <button class="btn-secondary px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-green-400" aria-label="Baixar certificado do curso ${course}">Baixar</button>
        `;
        certificatesList.appendChild(li);
      });
  
      // Calendário
      const calendarData = [
        { date: '10/06/2024', course: 'Programação Web', topic: 'JavaScript Avançado' },
        { date: '12/06/2024', course: 'Marketing Digital', topic: 'SEO e SEM' },
        { date: '15/06/2024', course: 'Inglês Avançado', topic: 'Conversação' },
      ];
      calendarData.forEach(({ date, course, topic }) => {
        const li = document.createElement('li');
        li.className = 'bg-gray-100 dark:bg-gray-800 rounded-md p-3 shadow-sm';
        li.innerHTML = `<time class="block font-semibold text-blue-600 dark:text-blue-400">${date}</time><p><strong>${course}</strong>: ${topic}</p>`;
        calendarList.appendChild(li);
      });
  
      // Networking
      const networkingData = [
        { name: 'Ana Silva', role: 'Desenvolvedora Front-end', avatar: 'https://placehold.co/64x64/3b82f6/ffffff?text=A' },
        { name: 'Carlos Souza', role: 'Especialista em Marketing', avatar: 'https://placehold.co/64x64/2563eb/ffffff?text=C' },
        { name: 'Mariana Lima', role: 'Professora de Inglês', avatar: 'https://placehold.co/64x64/1e40af/ffffff?text=M' },
        { name: 'João Pereira', role: 'Consultor Financeiro', avatar: 'https://placehold.co/64x64/3b82f6/ffffff?text=J' },
        { name: 'Fernanda Costa', role: 'Designer Gráfico', avatar: 'https://placehold.co/64x64/2563eb/ffffff?text=F' },
      ];
      networkingData.forEach(({ name, role, avatar }) => {
        const div = document.createElement('div');
        div.className = 'flex flex-col items-center min-w-[96px] bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
        div.tabIndex = 0;
        div.setAttribute('role', 'button');
        div.setAttribute('aria-label', `Contato para networking: ${name}, ${role}`);
        div.innerHTML = `
          <img src="${avatar}" alt="Avatar de ${name}" class="w-16 h-16 rounded-full mb-2" draggable="false" />
          <span class="font-semibold text-gray-900 dark:text-gray-100 text-center">${name}</span>
          <span class="text-sm text-gray-600 dark:text-gray-400 text-center">${role}</span>
        `;
        networkingList.appendChild(div);
      });
    }
  
    // Cursos data
    const coursesData = [
      {
        id: 1,
        title: 'Programação Web',
        description: 'Aprenda a criar sites modernos e responsivos usando HTML, CSS, JavaScript e frameworks populares.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Programação+Web',
        curriculum: [
          'Introdução ao HTML5 e CSS3',
          'JavaScript Básico',
          'Frameworks Front-end',
          'Projeto Final',
        ],
        professors: [
          { name: 'Lucas Almeida', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=L' },
          { name: 'Marina Santos', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=M' },
        ],
        dates: 'Início: 01/07/2024 - Término: 30/09/2024',
      },
      {
        id: 2,
        title: 'Marketing Digital',
        description: 'Aprenda estratégias para promover marcas e produtos no ambiente digital com eficiência.',
        modality: 'ead',
        area: 'gestao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Marketing+Digital',
        curriculum: [
          'Fundamentos do Marketing Digital',
          'SEO e SEM',
          'Redes Sociais',
          'Análise de Métricas',
        ],
        professors: [
          { name: 'Carla Mendes', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=C' },
        ],
        dates: 'Início: 15/07/2024 - Término: 15/10/2024',
      },
      {
        id: 3,
        title: 'Design Gráfico',
        description: 'Domine as principais ferramentas de design para criar artes visuais impactantes e profissionais.',
        modality: 'presencial',
        area: 'design',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Design+Gráfico',
        curriculum: [
          'Fundamentos do Design',
          'Adobe Photoshop e Illustrator',
          'Criação de Identidade Visual',
          'Projeto Final',
        ],
        professors: [
          { name: 'Fernanda Lima', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=F' },
        ],
        dates: 'Início: 01/08/2024 - Término: 30/10/2024',
      },
      {
        id: 4,
        title: 'Inglês Avançado',
        description: 'Aprimore sua fluência e compreensão para comunicação profissional e acadêmica.',
        modality: 'ead',
        area: 'idiomas',
        level: 'avancado',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Inglês+Avançado',
        curriculum: [
          'Conversação Avançada',
          'Gramática e Vocabulário',
          'Redação Acadêmica',
          'Preparação para Certificações',
        ],
        professors: [
          { name: 'John Smith', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=J' },
        ],
        dates: 'Início: 10/07/2024 - Término: 10/10/2024',
      },
      {
        id: 5,
        title: 'Finanças Pessoais',
        description: 'Controle seu orçamento, investimentos e aprenda a planejar seu futuro financeiro.',
        modality: 'ead',
        area: 'gestao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Finanças+Pessoais',
        curriculum: [
          'Orçamento e Controle Financeiro',
          'Investimentos Básicos',
          'Planejamento de Aposentadoria',
          'Ferramentas Financeiras',
        ],
        professors: [
          { name: 'Ricardo Alves', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=R' },
        ],
        dates: 'Início: 05/08/2024 - Término: 05/10/2024',
      },
      {
        id: 6,
        title: 'Desenvolvimento Mobile',
        description: 'Crie aplicativos para Android e iOS utilizando as tecnologias mais atuais.',
        modality: 'presencial',
        area: 'tecnologia',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Desenvolvimento+Mobile',
        curriculum: [
          'Introdução ao Desenvolvimento Mobile',
          'Android Studio e Swift',
          'Design Responsivo',
          'Publicação de Apps',
        ],
        professors: [
          { name: 'Paula Costa', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=P' },
        ],
        dates: 'Início: 20/07/2024 - Término: 20/10/2024',
      },
      {
        id: 7,
        title: 'Liderança e Gestão',
        description: 'Desenvolva habilidades para liderar equipes e gerenciar projetos com sucesso.',
        modality: 'presencial',
        area: 'gestao',
        level: 'avancado',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Liderança+e+Gestão',
        curriculum: [
          'Fundamentos da Liderança',
          'Gestão de Equipes',
          'Metodologias Ágeis',
          'Comunicação Eficaz',
        ],
        professors: [
          { name: 'Eduardo Silva', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=E' },
        ],
        dates: 'Início: 01/09/2024 - Término: 30/11/2024',
      },
      {
        id: 8,
        title: 'Ciência de Dados',
        description: 'Analise grandes volumes de dados para gerar insights e apoiar decisões.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'avancado',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Ciência+de+Dados',
        curriculum: [
          'Estatística Aplicada',
          'Python para Data Science',
          'Machine Learning',
          'Projeto Final',
        ],
        professors: [
          { name: 'Marcos Pereira', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=M' },
        ],
        dates: 'Início: 15/08/2024 - Término: 15/11/2024',
      },
      {
        id: 9,
        title: 'Educação Infantil',
        description: 'Capacite-se para atuar com crianças em creches e escolas de educação infantil.',
        modality: 'presencial',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Educação+Infantil',
        curriculum: [
          'Desenvolvimento Infantil',
          'Metodologias Ativas',
          'Psicologia da Criança',
          'Prática Pedagógica',
        ],
        professors: [
          { name: 'Ana Paula', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=A' },
        ],
        dates: 'Início: 01/07/2024 - Término: 30/09/2024',
      },
      {
        id: 10,
        title: 'Fotografia Digital',
        description: 'Aprenda técnicas de fotografia e edição para capturar imagens incríveis.',
        modality: 'ead',
        area: 'design',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Fotografia+Digital',
        curriculum: [
          'Fundamentos da Fotografia',
          'Técnicas de Composição',
          'Edição com Lightroom',
          'Projeto Fotográfico',
        ],
        professors: [
          { name: 'Bruna Martins', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=B' },
        ],
        dates: 'Início: 10/07/2024 - Término: 10/10/2024',
      },
      {
        id: 11,
        title: 'Psicologia Aplicada',
        description: 'Estude os fundamentos da psicologia e suas aplicações práticas no cotidiano.',
        modality: 'ead',
        area: 'educacao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Psicologia+Aplicada',
        curriculum: [
          'Teorias Psicológicas',
          'Psicologia do Desenvolvimento',
          'Psicologia Organizacional',
          'Estudos de Caso',
        ],
        professors: [
          { name: 'Renata Souza', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=R' },
        ],
        dates: 'Início: 20/08/2024 - Término: 20/11/2024',
      },
      {
        id: 12,
        title: 'Educação Física',
        description: 'Capacite-se para atuar em atividades esportivas e promoção da saúde física.',
        modality: 'presencial',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Educação+Física',
        curriculum: [
          'Anatomia e Fisiologia',
          'Treinamento Esportivo',
          'Nutrição e Saúde',
          'Prática de Atividades',
        ],
        professors: [
          { name: 'Carlos Mendes', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=C' },
        ],
        dates: 'Início: 01/09/2024 - Término: 30/11/2024',
      },
      {
        id: 13,
        title: 'Jornalismo Digital',
        description: 'Aprenda técnicas para produção de conteúdo jornalístico para plataformas digitais.',
        modality: 'ead',
        area: 'gestao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Jornalismo+Digital',
        curriculum: [
          'Redação Jornalística',
          'Multimídia e Vídeo',
          'Redes Sociais',
          'Ética e Legislação',
        ],
        professors: [
          { name: 'Paulo Henrique', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=P' },
        ],
        dates: 'Início: 15/07/2024 - Término: 15/10/2024',
      },
      {
        id: 14,
        title: 'Empreendedorismo',
        description: 'Desenvolva habilidades para criar e gerir seu próprio negócio com sucesso.',
        modality: 'ead',
        area: 'gestao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Empreendedorismo',
        curriculum: [
          'Plano de Negócios',
          'Marketing para Startups',
          'Gestão Financeira',
          'Pitch e Investimento',
        ],
        professors: [
          { name: 'Mariana Oliveira', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=M' },
        ],
        dates: 'Início: 01/08/2024 - Término: 30/10/2024',
      },
      {
        id: 15,
        title: 'Educação Ambiental',
        description: 'Promova a conscientização e práticas sustentáveis para o meio ambiente.',
        modality: 'presencial',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Educação+Ambiental',
        curriculum: [
          'Ecologia e Sustentabilidade',
          'Políticas Ambientais',
          'Projetos Sociais',
          'Prática de Campo',
        ],
        professors: [
          { name: 'Lucas Ferreira', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=L' },
        ],
        dates: 'Início: 10/09/2024 - Término: 10/12/2024',
      },
      {
        id: 16,
        title: 'Redação e Comunicação',
        description: 'Melhore suas habilidades de escrita e comunicação oral para diversas situações.',
        modality: 'ead',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Redação+e+Comunicação',
        curriculum: [
          'Técnicas de Redação',
          'Comunicação Oral',
          'Apresentações Eficazes',
          'Prática e Feedback',
        ],
        professors: [
          { name: 'Ana Clara', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=A' },
        ],
        dates: 'Início: 05/07/2024 - Término: 05/10/2024',
      },
      {
        id: 17,
        title: 'Desenvolvimento Back-end',
        description: 'Aprenda a construir a lógica e infraestrutura por trás de aplicações web.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Desenvolvimento+Back-end',
        curriculum: [
          'Node.js e Express',
          'Banco de Dados',
          'APIs REST',
          'Segurança e Autenticação',
        ],
        professors: [
          { name: 'Felipe Santos', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=F' },
        ],
        dates: 'Início: 20/07/2024 - Término: 20/10/2024',
      },
      {
        id: 18,
        title: 'Segurança da Informação',
        description: 'Proteja sistemas e dados contra ameaças e ataques cibernéticos.',
        modality: 'presencial',
        area: 'tecnologia',
        level: 'avancado',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Segurança+da+Informação',
        curriculum: [
          'Fundamentos de Segurança',
          'Criptografia',
          'Testes de Penetração',
          'Políticas de Segurança',
        ],
        professors: [
          { name: 'Roberta Lima', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=R' },
        ],
        dates: 'Início: 01/09/2024 - Término: 30/11/2024',
      },
      {
        id: 19,
        title: 'Ciência de Dados Avançada',
        description: 'Aprofunde seus conhecimentos em análise de dados e machine learning.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'avancado',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Ciência+de+Dados+Avançada',
        curriculum: [
          'Deep Learning',
          'Redes Neurais',
          'Big Data',
          'Projeto Final',
        ],
        professors: [
          { name: 'Marcos Pereira', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=M' },
        ],
        dates: 'Início: 15/10/2024 - Término: 15/01/2025',
      },
      {
        id: 20,
        title: 'Idiomas Espanhol',
        description: 'Aprenda espanhol para comunicação básica, intermediária e avançada.',
        modality: 'presencial',
        area: 'idiomas',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Idiomas+Espanhol',
        curriculum: [
          'Gramática Básica',
          'Conversação',
          'Cultura Hispânica',
          'Prática Oral',
        ],
        professors: [
          { name: 'Sofia Ramirez', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=S' },
        ],
        dates: 'Início: 01/08/2024 - Término: 30/10/2024',
      },
      {
        id: 21,
        title: 'Técnicas de Vendas',
        description: 'Aprenda estratégias para aumentar suas vendas e fidelizar clientes.',
        modality: 'ead',
        area: 'gestao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Técnicas+de+Vendas',
        curriculum: [
          'Psicologia do Consumidor',
          'Negociação',
          'Fidelização',
          'CRM',
        ],
        professors: [
          { name: 'Ricardo Gomes', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=R' },
        ],
        dates: 'Início: 10/07/2024 - Término: 10/10/2024',
      },
      {
        id: 22,
        title: 'Educação Especial',
        description: 'Capacite-se para atuar com alunos com necessidades especiais e inclusão.',
        modality: 'presencial',
        area: 'educacao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Educação+Especial',
        curriculum: [
          'Legislação e Políticas',
          'Metodologias Inclusivas',
          'Tecnologias Assistivas',
          'Prática Pedagógica',
        ],
        professors: [
          { name: 'Patrícia Alves', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=P' },
        ],
        dates: 'Início: 15/09/2024 - Término: 15/12/2024',
      },
      {
        id: 23,
        title: 'Administração Pública',
        description: 'Conheça os processos e práticas da gestão pública e serviços governamentais.',
        modality: 'ead',
        area: 'gestao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Administração+Pública',
        curriculum: [
          'Gestão Pública',
          'Políticas Públicas',
          'Orçamento e Finanças',
          'Legislação',
        ],
        professors: [
          { name: 'João Carvalho', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=J' },
        ],
        dates: 'Início: 01/10/2024 - Término: 31/12/2024',
      },
      {
        id: 24,
        title: 'Educação Empreendedora',
        description: 'Incentive o espírito empreendedor com técnicas e práticas inovadoras.',
        modality: 'presencial',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Educação+Empreendedora',
        curriculum: [
          'Mentalidade Empreendedora',
          'Inovação e Criatividade',
          'Plano de Negócios',
          'Pitch',
        ],
        professors: [
          { name: 'Mariana Silva', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=M' },
        ],
        dates: 'Início: 05/09/2024 - Término: 05/12/2024',
      },
      {
        id: 25,
        title: 'Educação para a Sustentabilidade',
        description: 'Promova práticas sustentáveis para um futuro mais verde e consciente.',
        modality: 'ead',
        area: 'educacao',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Educação+para+a+Sustentabilidade',
        curriculum: [
          'Sustentabilidade Global',
          'Práticas Sustentáveis',
          'Projetos Sociais',
          'Educação Ambiental',
        ],
        professors: [
          { name: 'Lucas Almeida', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=L' },
        ],
        dates: 'Início: 10/10/2024 - Término: 10/01/2025',
      },
      {
        id: 26,
        title: 'Desenvolvimento Front-end',
        description: 'Crie interfaces interativas e responsivas para web usando as tecnologias mais modernas.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Desenvolvimento+Front-end',
        curriculum: [
          'HTML, CSS e JavaScript',
          'Frameworks Front-end',
          'Design Responsivo',
          'Projeto Final',
        ],
        professors: [
          { name: 'Lucas Almeida', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=L' },
        ],
        dates: 'Início: 01/07/2024 - Término: 30/09/2024',
      },
      {
        id: 27,
        title: 'Gestão de Projetos',
        description: 'Aprenda a planejar, executar e controlar projetos de forma eficiente.',
        modality: 'presencial',
        area: 'gestao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Gestão+de+Projetos',
        curriculum: [
          'Fundamentos de Gestão',
          'Metodologias Ágeis',
          'Planejamento e Controle',
          'Softwares de Gestão',
        ],
        professors: [
          { name: 'Eduardo Silva', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=E' },
        ],
        dates: 'Início: 15/08/2024 - Término: 15/11/2024',
      },
      {
        id: 28,
        title: 'Desenvolvimento de Jogos',
        description: 'Crie jogos digitais para diversas plataformas utilizando engines populares.',
        modality: 'ead',
        area: 'tecnologia',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/3b82f6/ffffff?text=Desenvolvimento+de+Jogos',
        curriculum: [
          'Introdução a Game Design',
          'Engines de Jogos',
          'Programação para Jogos',
          'Projeto Final',
        ],
        professors: [
          { name: 'Paula Costa', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=P' },
        ],
        dates: 'Início: 01/09/2024 - Término: 30/11/2024',
      },
      {
        id: 29,
        title: 'Nutrição e Saúde',
        description: 'Aprenda sobre alimentação saudável, dietas e promoção da saúde.',
        modality: 'ead',
        area: 'saude',
        level: 'iniciante',
        image: 'https://placehold.co/400x200/2563eb/ffffff?text=Nutrição+e+Saúde',
        curriculum: [
          'Fundamentos da Nutrição',
          'Dietas e Suplementação',
          'Promoção da Saúde',
          'Prática e Avaliação',
        ],
        professors: [
          { name: 'Fernanda Costa', photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=F' },
        ],
        dates: 'Início: 10/07/2024 - Término: 10/10/2024',
      },
      {
        id: 30,
        title: 'Psicopedagogia',
        description: 'Estude as técnicas para auxiliar no processo de aprendizagem e desenvolvimento.',
        modality: 'ead',
        area: 'educacao',
        level: 'intermediario',
        image: 'https://placehold.co/400x200/1e40af/ffffff?text=Psicopedagogia',
        curriculum: [
          'Fundamentos da Psicopedagogia',
          'Diagnóstico e Intervenção',
          'Transtornos de Aprendizagem',
          'Estudos de Caso',
        ],
        professors: [
          { name: 'Renata Souza', photo: 'https://placehold.co/64x64/2563eb/ffffff?text=R' },
        ],
        dates: 'Início: 20/08/2024 - Término: 20/11/2024',
      },
    ];
  
    // Render courses list
    const coursesList = document.getElementById('courses-list');
    const filterModality = document.getElementById('filter-modality');
    const filterArea = document.getElementById('filter-area');
    const filterLevel = document.getElementById('filter-level');
    const btnClearFilters = document.getElementById('btn-clear-filters');
  
    function renderCourses(courses) {
      coursesList.innerHTML = '';
      if (courses.length === 0) {
        coursesList.innerHTML = '<p class="col-span-full text-center text-gray-600 dark:text-gray-400">Nenhum curso encontrado com os filtros selecionados.</p>';
        return;
      }
      courses.forEach(course => {
        const article = document.createElement('article');
        article.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500';
        article.tabIndex = 0;
        article.setAttribute('role', 'button');
        article.setAttribute('aria-label', `Curso ${course.title}, clique para ver detalhes`);
        article.innerHTML = `
          <img src="${course.image}" alt="Imagem representando o curso ${course.title}" class="w-full h-40 object-cover" draggable="false" />
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
            <p class="text-gray-700 dark:text-gray-300 flex-grow">${course.description}</p>
            <div class="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p><strong>Modalidade:</strong> ${course.modality === 'ead' ? 'EAD' : 'Presencial'}</p>
              <p><strong>Área:</strong> ${capitalize(course.area)}</p>
              <p><strong>Nível:</strong> ${capitalize(course.level)}</p>
              <p><strong>Datas:</strong> ${course.dates}</p>
            </div>
            <button class="mt-4 btn-primary py-2 rounded-md font-semibold focus:ring-2 focus:ring-blue-500 self-start" aria-label="Inscrever-se no curso ${course.title}">Inscrever-se</button>
          </div>
        `;
        article.querySelector('button').addEventListener('click', () => openCourseModal(course));
        coursesList.appendChild(article);
      });
    }
  
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    function filterCourses() {
      let filtered = coursesData;
      const modality = filterModality.value;
      const area = filterArea.value;
      const level = filterLevel.value;
  
      if (modality !== 'all') filtered = filtered.filter(c => c.modality === modality);
      if (area !== 'all') filtered = filtered.filter(c => c.area === area);
      if (level !== 'all') filtered = filtered.filter(c => c.level === level);
  
      renderCourses(filtered);
    }
  
    filterModality.addEventListener('change', filterCourses);
    filterArea.addEventListener('change', filterCourses);
    filterLevel.addEventListener('change', filterCourses);
    btnClearFilters.addEventListener('click', () => {
      filterModality.value = 'all';
      filterArea.value = 'all';
      filterLevel.value = 'all';
      filterCourses();
    });
  
    renderCourses(coursesData);
  
    // Course detail modal
    let courseModal = null;
    function openCourseModal(course) {
      if (courseModal) courseModal.remove();
      courseModal = document.createElement('div');
      courseModal.setAttribute('role', 'dialog');
      courseModal.setAttribute('aria-modal', 'true');
      courseModal.setAttribute('aria-labelledby', 'course-modal-title');
      courseModal.tabIndex = -1;
      courseModal.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50 overflow-auto';
      courseModal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full shadow-lg p-8 relative fade-in max-h-[90vh] overflow-y-auto">
          <button aria-label="Fechar detalhes do curso" class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" id="close-course-modal">
            <i class="fas fa-times text-2xl"></i>
          </button>
          <h2 id="course-modal-title" class="text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">${course.title}</h2>
          <img src="${course.image}" alt="Imagem do curso ${course.title}" class="w-full h-48 object-cover rounded-lg mb-6" draggable="false" />
          <p class="mb-6 text-gray-700 dark:text-gray-300">${course.description}</p>
          <h3 class="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Grade Curricular</h3>
          <ul class="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300">
            ${course.curriculum.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <h3 class="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Professores Envolvidos</h3>
          <div class="flex flex-wrap gap-6 mb-6">
            ${course.professors.map(prof => `
              <div class="flex items-center space-x-4">
                <img src="${prof.photo}" alt="Foto do professor ${prof.name}" class="w-14 h-14 rounded-full object-cover" draggable="false" />
                <span class="font-semibold text-gray-900 dark:text-gray-100">${prof.name}</span>
              </div>
            `).join('')}
          </div>
          <p class="mb-6 text-gray-700 dark:text-gray-300"><strong>Datas:</strong> ${course.dates}</p>
          <button id="btn-enroll" class="btn-primary px-6 py-3 rounded-md font-semibold focus:ring-2 focus:ring-blue-500">Inscrever-se</button>
        </div>
      `;
      document.body.appendChild(courseModal);
      courseModal.focus();
  
      document.getElementById('close-course-modal').addEventListener('click', () => {
        courseModal.remove();
        courseModal = null;
      });
      document.getElementById('btn-enroll').addEventListener('click', () => {
        alert(`Inscrição realizada com sucesso no curso ${course.title}!`);
        courseModal.remove();
        courseModal = null;
      });
  
      // Close modal on outside click
      courseModal.addEventListener('click', e => {
        if (e.target === courseModal) {
          courseModal.remove();
          courseModal = null;
        }
      });
  
      // Close modal on ESC
      document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape' && courseModal) {
          courseModal.remove();
          courseModal = null;
          document.removeEventListener('keydown', escListener);
        }
      });
    }
  
    // Testimonials carousel
    const testimonials = [
      {
        name: 'João Silva',
        role: 'Desenvolvedor Front-end',
        photo: 'https://placehold.co/64x64/3b82f6/ffffff?text=J',
        text: 'A Plataforma EVE transformou minha carreira! Os cursos são completos e os professores muito atenciosos.',
      },
      {
        name: 'Maria Oliveira',
        role: 'Especialista em Marketing',
        photo: 'https://placehold.co/64x64/2563eb/ffffff?text=M',
        text: 'O ambiente de aprendizado é incrível, e o networking me ajudou a conseguir ótimas oportunidades.',
      },
      {
        name: 'Carlos Pereira',
        role: 'Estudante de Administração',
        photo: 'https://placehold.co/64x64/1e40af/ffffff?text=C',
        text: 'Os cursos presenciais são muito bem estruturados e o suporte da equipe é excelente.',
      },
    ];
    let currentTestimonial = 0;
    const testimonialContainer = document.getElementById('testimonial-container');
    const btnPrevTestimonial = document.getElementById('prev-testimonial');
    const btnNextTestimonial = document.getElementById('next-testimonial');
  
    function renderTestimonial(index) {
      const t = testimonials[index];
      testimonialContainer.innerHTML = `
        <div class="flex flex-col items-center text-center space-y-4">
          <img src="${t.photo}" alt="Foto de ${t.name}" class="w-20 h-20 rounded-full object-cover shadow-md" draggable="false" />
          <p class="text-lg italic text-gray-700 dark:text-gray-300 max-w-xl">"${t.text}"</p>
          <p class="font-semibold text-blue-600 dark:text-blue-400">${t.name}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">${t.role}</p>
        </div>
      `;
    }
    btnPrevTestimonial.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });
    btnNextTestimonial.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });
    renderTestimonial(currentTestimonial);
  
    // Contact form validation & submission
    const contactForm = document.getElementById('contact-form');
    const contactFeedback = document.getElementById('contact-feedback');
  
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactFeedback.textContent = '';
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();
  
      if (!name || !email || !subject || !message || !validateEmail(email)) {
        contactFeedback.textContent = 'Por favor, preencha todos os campos corretamente.';
        contactFeedback.className = 'text-center mt-4 font-semibold text-red-600 dark:text-red-400';
        return;
      }
  
      // Exemplo de função matemática: calcular a soma dos caracteres da mensagem e mostrar no alert
      const charCount = message.length;
      alert(`Mensagem enviada com sucesso!\nSua mensagem tem ${charCount} caracteres. Obrigado, ${name}!`);
  
      contactForm.reset();
      contactFeedback.textContent = '';
    });
  
    // Accessibility: trap focus in modals and dashboard
    function trapFocus(element) {
      const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
      element.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      });
    }
    trapFocus(modalLogin);
    trapFocus(modalRegister);
    trapFocus(dashboard);
  
  })();