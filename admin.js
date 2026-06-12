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
// ===============================
// DASHBOARD
// ===============================

async function loadDashboard() {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "list",
      adminSecret: ADMIN_SECRET
    })
  });

  const data = await res.json();

  if (!data.ok) {
    document.getElementById("dashboard").innerHTML = "<p>Erro ao carregar dashboard.</p>";
    return;
  }

  const all = data.licenses;

  const pendentes = all.filter(x => x.status === "pending");
  const concluidos = all.filter(x => x.status === "paid");
  const licencas = all.filter(x => x.license_key);

  const ultimoPagamento = all[all.length - 1];
  const ultimaLicenca = licencas[licencas.length - 1];

  document.getElementById("dashboard").innerHTML = `
    <h2>Dashboard</h2>

    <div class="box">
      <h3>Resumo</h3>
      <p><strong>Pagamentos Pendentes:</strong> ${pendentes.length}</p>
      <p><strong>Pagamentos Concluídos:</strong> ${concluidos.length}</p>
      <p><strong>Licenças Emitidas:</strong> ${licencas.length}</p>
    </div>

    <div class="box">
      <h3>Último Pagamento</h3>
      <pre>${ultimoPagamento ? JSON.stringify(ultimoPagamento, null, 2) : "Nenhum pagamento encontrado"}</pre>
    </div>

    <div class="box">
      <h3>Última Licença Emitida</h3>
      <pre>${ultimaLicenca ? JSON.stringify(ultimaLicenca, null, 2) : "Nenhuma licença emitida"}</pre>
    </div>
  `;
}

  initApp();
}

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

  showSection("dashboard");
}

function logout() {
  ADMIN_SECRET = "";
  initApp();
}


// ===============================
// UTILIDADES
// ===============================

function show(data) {
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}


// ===============================
// PAGAMENTOS
// ===============================

// Criar pagamento
async function createPayment() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "create-payment",
      name,
      email,
      phone
    })
  });

  show(await res.json());
}



// Listar pagamentos pendentes
async function listPayments() {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "list",
      adminSecret: ADMIN_SECRET
    })
  });

  const data = await res.json();

  if (!data.ok) {
    document.getElementById("payments").innerHTML = "<p>Erro ao carregar pagamentos.</p>";
    return;
  }

  const pending = data.licenses.filter(item => item.status === "pending");

  if (pending.length === 0) {
    document.getElementById("payments").innerHTML = "<p>Sem pagamentos pendentes.</p>";
    return;
  }

  let html = `
    <table border="1" cellpadding="6" cellspacing="0">
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Estado</th>
        <th>Ação</th>
      </tr>
  `;

  for (const p of pending) {
    html += `
      <tr>
        <td>${p.key}</td>
        <td>${p.name}</td>
        <td>${p.email}</td>
        <td>${p.phone}</td>
        <td>${p.status}</td>
        <td>
          <button onclick="simulatePaymentFromList('${p.key}')">Simular</button>
        </td>
      </tr>
    `;
  }

  html += "</table>";

  document.getElementById("payments").innerHTML = html;
}



// Simular pagamento manual
async function simulatePayment() {
  const payment_id = document.getElementById("paymentId").value;

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "simulate-payment",
      payment_id,
      adminSecret: ADMIN_SECRET
    })
  });

  show(await res.json());
}



// Simular pagamento a partir da tabela
async function simulatePaymentFromList(payment_id) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "simulate-payment",
      payment_id,
      adminSecret: ADMIN_SECRET
    })
  });

  show(await res.json());

  // Atualiza a lista automaticamente
  listPayments();
}



// ===============================
// INICIAR APP
// ===============================
initApp();
