const expense = document.querySelector("#expense");
const expenseAmount = document.querySelector("#expenseAmount");
const addExpense = document.querySelector("#addExpense");
const clearBtn = document.querySelector("#clear");
const expenseList = document.querySelector("#expenseList");
const totalExpenses = document.querySelector("#totalExpenses");
// const alertCtrl = document.querySelector("ion-alert");
// Works better with createElement
let totExpenses = 0;
function clear() {
  expense.value = "";
  expenseAmount.value = "";
}
async function presentAlert()
{
    const alert = document.createElement('ion-alert');
    alert.header = 'Invalid Input';
    alert.message = 'Please enter valid input.';
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    await alert.present();
  
    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  
}

clearBtn.addEventListener("click", clear);
addExpense.addEventListener("click", () => {
  const expenseReason = expense.value;
  const enteredExpense = expenseAmount.value;
  if (
    expenseReason.trim().length <= 0 ||
    enteredExpense <= 0 ||
    enteredExpense.trim().length <= 0
  ) {
    presentAlert();
    return;
  }
  console.log(enteredExpense, expenseReason);
  const newExpense = document.createElement("ion-item");
  newExpense.textContent = expenseReason + " :$" + enteredExpense;
  expenseList.appendChild(newExpense);
  totExpenses += +enteredExpense;
  totalExpenses.textContent = "$ " + totExpenses;
  clear();
});


