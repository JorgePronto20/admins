// ===============================
// PAGAMENTOS — MÓDULO COMPLETO
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
  setLoading("payments");

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

  const headers = ["ID", "Nome", "Email", "Telefone", "Estado", "Ação"];

  const rows = pending.map(p => [
    p.key,
    p.name,
    p.email,
    p.phone,
    p.status,
    `<button onclick="simulatePaymentFromList('${p.key}')">Simular</button>`
  ]);

  document.getElementById("payments").innerHTML = createTable(headers, rows);
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
