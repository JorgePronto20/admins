// ===============================
// CONFIG
// ===============================
const API = "https://faturalite-licenses-prod.jorgepronto20.workers.dev";

// Variável global para guardar o secret apenas enquanto a página está aberta
let ADMIN_SECRET = "";


// ===============================
// LOGIN / AUTENTICAÇÃO
// ===============================

function doLogin() {
  const secret = document.getElementById("loginSecret").value.trim();

  if (!secret) {
    alert("Insere o adminSecret");
    return;
  }

  ADMIN_SECRET = secret; // guarda apenas em memória

  initApp();
}


// ===============================
// INICIAR APP
// ===============================

function initApp() {
  if (!ADMIN_SECRET) {
    document.getElementById("login-screen").style.display = "block";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("content").style.display = "none";
    return;
  }

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("content").style.display = "block";

  // Secção inicial
  showSection("dashboard");
  loadDashboard();
}


// ===============================
// LOGOUT
// ===============================

function logout() {
  ADMIN_SECRET = "";
  initApp();
}


// ===============================
// INICIAR APP AO CARREGAR
// ===============================
initApp();
