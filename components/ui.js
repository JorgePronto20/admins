// ===============================
// UI HELPERS
// ===============================

// Mostra secção
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Mostra JSON formatado
function show(data) {
  const out = document.getElementById("output");
  if (out) {
    out.textContent = JSON.stringify(data, null, 2);
  }
}

// Mostra loading numa div
function setLoading(targetId, text = "A carregar…") {
  document.getElementById(targetId).innerHTML = `<p>${text}</p>`;
}

// Cria tabela HTML a partir de dados
function createTable(headers, rows) {
  let html = "<table border='1' cellpadding='6' cellspacing='0'><tr>";

  headers.forEach(h => html += `<th>${h}</th>`);
  html += "</tr>";

  rows.forEach(row => {
    html += "<tr>";
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += "</tr>";
  });

  html += "</table>";
  return html;
}
