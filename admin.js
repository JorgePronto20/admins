const API = "https://faturalite-licenses-prod.jorgepronto20.workers.dev";

function show(data) {
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

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

async function simulatePayment() {
  const payment_id = document.getElementById("paymentId").value;
  const adminSecret = document.getElementById("adminSecret").value;

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "simulate-payment",
      payment_id,
      adminSecret
    })
  });

  show(await res.json());
}
