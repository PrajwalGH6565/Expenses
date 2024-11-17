let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (description && amount) {
    const expense = { id: Date.now(), description, amount, category };
    expenses.push(expense);
    saveAndRender();
    clearForm();
  }
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveAndRender();
}

function editExpense(id) {
  const expense = expenses.find(expense => expense.id === id);
  document.getElementById("description").value = expense.description;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;

  deleteExpense(id);
}

function filterExpenses() {
  const category = document.getElementById("categoryFilter").value;
  renderExpenses(category === "All" ? expenses : expenses.filter(e => e.category === category));
}

function calculateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  document.getElementById("totalAmount").innerText = total.toFixed(2);
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(expenses);
  calculateTotal();
}

function renderExpenses(expensesToRender) {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";
  expensesToRender.forEach(expense => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>
        <button onclick="editExpense(${expense.id})">Edit</button>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
      </td>
    `;
    expenseTable.appendChild(row);
  });
}

function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "Food";
}

window.onload = () => {
  renderExpenses(expenses);
  calculateTotal();
};
