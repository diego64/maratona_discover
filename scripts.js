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
    innerHTMLTransaction() {

        const html = `
            <tr>
                <td class="description">Luz</td>
                <td class="expense">- R$ 500,00</td>
                <td class="date">16/01/2021</td>
                <td>
                     <img src="./assets/minus.svg" alt="Remover transação"> 
                </td>
             </tr>
        `
    }
}