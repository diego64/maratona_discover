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

const Transaction = {
    //Add entries (Somar as entradas)
    incomes() {

    },
    //Add the exits (Somas as saídas)
    expenses() {

    },
    //Sum of inputs minus sum of outputs (Valor total)
    total() {

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
      const html = `
                <td class="description">${transaction.description}</td>
                <td class="expense">${transaction.amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                     <img src="./assets/minus.svg" alt="Remover transação"> 
                </td>
        `

        return html
    }
}

transactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
})