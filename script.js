// Tela de login — Nexora

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const emailError = document.getElementById('emailError');
const senhaError = document.getElementById('senhaError');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const togglePasswordBtn = document.getElementById('togglePassword');
const iconEye = togglePasswordBtn.querySelector('.icon-eye');
const iconEyeOff = togglePasswordBtn.querySelector('.icon-eye-off');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mostrar/ocultar senha
togglePasswordBtn.addEventListener('click', () => {
  const isPassword = senhaInput.type === 'password';
  senhaInput.type = isPassword ? 'text' : 'password';
  togglePasswordBtn.setAttribute('aria-pressed', String(isPassword));
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
  iconEye.hidden = isPassword;
  iconEyeOff.hidden = !isPassword;
});

function setFieldError(input, errorEl, message) {
  const field = input.closest('.field');
  if (message) {
    field.classList.add('has-error');
    errorEl.textContent = message;
  } else {
    field.classList.remove('has-error');
    errorEl.textContent = '';
  }
}

function validate() {
  let valid = true;

  if (!emailInput.value.trim()) {
    setFieldError(emailInput, emailError, 'Informe seu e-mail.');
    valid = false;
  } else if (!EMAIL_REGEX.test(emailInput.value.trim())) {
    setFieldError(emailInput, emailError, 'Informe um e-mail válido.');
    valid = false;
  } else {
    setFieldError(emailInput, emailError, '');
  }

  if (!senhaInput.value) {
    setFieldError(senhaInput, senhaError, 'Informe sua senha.');
    valid = false;
  } else if (senhaInput.value.length < 6) {
    setFieldError(senhaInput, senhaError, 'A senha precisa ter pelo menos 6 caracteres.');
    valid = false;
  } else {
    setFieldError(senhaInput, senhaError, '');
  }

  return valid;
}

// Limpa o erro do campo assim que a pessoa começa a corrigi-lo
emailInput.addEventListener('input', () => setFieldError(emailInput, emailError, ''));
senhaInput.addEventListener('input', () => setFieldError(senhaInput, senhaError, ''));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  formStatus.textContent = '';
  formStatus.className = 'form-status';

  if (!validate()) {
    return;
  }

  // Não há backend conectado ainda — este bloco simula o envio.
  // Troque por uma chamada real de autenticação (fetch/axios) quando a API estiver pronta.
  submitBtn.disabled = true;
  submitBtn.classList.add('is-loading');

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.classList.remove('is-loading');
    formStatus.textContent = 'Login simulado com sucesso. Conecte este formulário à sua API de autenticação.';
    formStatus.classList.add('success');
  }, 900);
});