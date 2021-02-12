const Modal = {
    //Open the modal with the filling options
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    //Close the modal with the filling options
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '07/02/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '07/02/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '07/02/2021'
    },
]

// Functions responsible for the calculation (Funções responsaveis pelo calculo)
const Transaction = {
    all: transactions,
    add(transaction) { 
        Transaction.all.push(transaction)

        console.log(Transaction.all)
    },
    //Add entries (Somar as entradas)
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },
    //Add the exits (Somas as saídas)
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    //Sum of inputs minus sum of outputs (Valor total)
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
      const CSSclass = transaction.amount > 0 ? "income" : "expense";

      const amount = Utils.formatCurrency(transaction.amount)

      const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                     <img src="./assets/minus.svg" alt="Remover transação"> 
                </td>
        `

        return html
    },
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML =  Utils.formatCurrency(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML =  Utils.formatCurrency(Transaction.total());
    }
}

const Utils = { 
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";
        
        value = String(value).replace(/\D/g, "");
        
        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) 
         
        return signal + value;
    }
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})

DOM.updateBalance();

Transaction.add({
    id: 40,
    description: 'Teste',
    amount: 100,
    date: '12/02/2021'
});