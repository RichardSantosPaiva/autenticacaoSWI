// Função para validar todos os campos e atualizar o estado dos botões e mensagens de erro
function validateFields() {
  toggleButtonDisabled();
  toggleEmailErrors();
  togglePasswordErrors();
}

// Função de login utilizando Firebase Authentication
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('Login bem-sucedido', response);
      window.location.href = "pages/home/home.html";
    })
    .catch(error => {
      alert(getErrorMessage(error))
    });
}

function getErrorMessage(error){
  if(error.code == 'auth/usere-not-found'){
    return'usuario nao encontrado'
  }
  return error.message
}
// Função para redirecionar para a página de registro
function register() {
  window.location.href = "pages/register/register.html";
}

// Função para verificar se o email é válido
function isEmailValid() {
  const email = document.getElementById("email").value;
  return email && validateEmail(email);
}

// Função para verificar se a senha é válida
function isPasswordValid() {
  const password = document.getElementById('password').value;
  return password.trim().length > 0;
}

// Função para exibir ou ocultar mensagens de erro relacionadas ao email
function toggleEmailErrors() {
  const email = document.getElementById('email').value;
  
  document.getElementById("email-required-error").style.display = email ? "none" : "block";
  document.getElementById("email-invalid-error").style.display = validateEmail(email) ? "none" : "block";
}

// Função para exibir ou ocultar mensagens de erro relacionadas à senha
function togglePasswordErrors() {
  const password = document.getElementById('password').value;
  
  document.getElementById("password-required-error").style.display = password.trim() ? "none" : "block";
}

// Função para habilitar ou desabilitar os botões com base na validade dos campos
function toggleButtonDisabled() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();

  document.getElementById('recover-password-button').disabled = !emailValid;
  document.getElementById('login-button').disabled = !(emailValid && passwordValid);
}

// Função para validar o formato do email
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
