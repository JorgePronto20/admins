// ===============================
// LICENÇAS — MÓDULO COMPLETO
// ===============================

// Listar licenças emitidas
async function listLicenses() {
  setLoading("licenses");

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "list",
      adminSecret: ADMIN_SECRET
    })
  });

  const data = await res.json();

  // Se não houver dados, tratamos como base vazia
  if (!data.ok || !Array.isArray(data.licenses)) {
    document.getElementById("licenses").innerHTML = "<p>Nenhuma licença emitida.</p>";
    return;
  }

  const licenses = data.licenses.filter(x => x.license_key);

  if (licenses.length === 0) {
    document.getElementById("licenses").innerHTML = "<p>Nenhuma licença emitida.</p>";
    return;
  }

  const headers = ["Licença", "Nome", "Email", "Plano", "Validade", "Ações"];

  const rows = licenses.map(lic => [
    lic.license_key,
    lic.name,
    lic.email,
    lic.plan || "-",
    lic.expiry || "-",
    `
      <button onclick="copyLicense('${lic.license_key}')">Copiar</button>
      <button onclick="showLicenseDetails('${lic.license_key}')">Detalhes</button>
    `
  ]);

  document.getElementById("licenses").innerHTML = createTable(headers, rows);
}



// Copiar licença para clipboard
function copyLicense(key) {
  navigator.clipboard.writeText(key);
  alert("Licença copiada: " + key);
}



// Mostrar detalhes da licença
async function showLicenseDetails(key) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "list",
      adminSecret: ADMIN_SECRET
    })
  });

  const data = await res.json();

  if (!data.ok || !Array.isArray(data.licenses)) {
    document.getElementById("licenseDetails").textContent = "Nenhuma licença encontrada.";
    return;
  }

  const lic = data.licenses.find(x => x.license_key === key);

  document.getElementById("licenseDetails").textContent =
    lic ? JSON.stringify(lic, null, 2) : "Licença não encontrada.";
}
