// ===============================
// DASHBOARD — MÓDULO COMPLETO
// ===============================

async function loadDashboard() {
  setLoading("dashboard");

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "list",
      adminSecret: ADMIN_SECRET
    })
  });

  const data = await res.json();

  // Se não houver dados, tratamos como base vazia (não como erro)
  if (!data.ok || !Array.isArray(data.licenses)) {
    document.getElementById("dashboard").innerHTML = `
      <h2>Dashboard</h2>
      <div class="box">
        <h3>Resumo</h3>
        <p><strong>Pagamentos Pendentes:</strong> 0</p>
        <p><strong>Pagamentos Concluídos:</strong> 0</p>
        <p><strong>Licenças Emitidas:</strong> 0</p>
      </div>

      <div class="box">
        <h3>Último Pagamento</h3>
        <pre>Nenhum pagamento encontrado</pre>
      </div>

      <div class="box">
        <h3>Última Licença Emitida</h3>
        <pre>Nenhuma licença emitida</pre>
      </div>
    `;
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
