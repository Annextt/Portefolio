document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggle-theme');
  const icon = toggleBtn.querySelector('i');
  
  // Função para verificar se localStorage está disponível
  function isLocalStorageAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  // Função para aplicar o tema
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      icon.className = 'fas fa-sun';
    } else {
      document.body.classList.remove('light-theme');
      icon.className = 'fas fa-moon';
    }
  }
  
  // Função para alternar tema
  function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    
    applyTheme(newTheme);
    
    // Salva no localStorage se disponível
    if (isLocalStorageAvailable()) {
      localStorage.setItem('theme', newTheme);
    }
    
    // Adiciona feedback visual
    toggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      toggleBtn.style.transform = 'scale(1)';
    }, 150);
  }
  
  // Event listener para o botão
  toggleBtn.addEventListener('click', toggleTheme);
  
  // Detecta preferência do sistema
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Aplica tema inicial
  function initTheme() {
    let savedTheme = null;
    
    // Tenta recuperar tema salvo
    if (isLocalStorageAvailable()) {
      savedTheme = localStorage.getItem('theme');
    }
    
    // Usa tema salvo ou preferência do sistema
    const initialTheme = savedTheme || getSystemTheme();
    applyTheme(initialTheme);
  }
  
  // Escuta mudanças na preferência do sistema
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(() => {
      // Só aplica automaticamente se não houver preferência salva
      if (isLocalStorageAvailable() && !localStorage.getItem('theme')) {
        initTheme();
      }
    });
  }
  
  // Inicializa o tema
  initTheme();
  
  // Adiciona transição suave ao body (opcional)
  document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
});

