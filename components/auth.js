// Guarda o adminSecret no localStorage
function saveAdminSecret(secret) {
  localStorage.setItem("adminSecret", secret);
}

// Vai buscar o adminSecret guardado
function getAdminSecret() {
  return localStorage.getItem("adminSecret");
}

// Verifica se o utilizador está autenticado
function isAuthenticated() {
  return !!getAdminSecret();
}

// Logout
function logout() {
  localStorage.removeItem("adminSecret");
  location.reload();
}
