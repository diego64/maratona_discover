const Modal = {
    open(){
        //Open the modal with the filling options
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
       //Close the modal with the filling options
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

//Functions responsible for the calculation (Funções responsaveis pelo calculo)
const Transaction = {
    all: Storage.get(),

    //Adding a transaction (Adcionando uma nova transação)
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

     //Removing a transaction (Removendo uma nova transação)
    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    //Add entries (Somar as entradas)
    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })
        return income;
    },
    //Add the exits (Somas as saídas)
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
     //Handling the case that the user put a period in place of a comma (Tratando o caso que o usuário colocar ponto no lugar de vígula)
    formatAmount(value){
        //value = Number(value.replace(/\,\./g, "")) * 100 //value = Number(value.replace(/\,\./g, "")) * 100;
        //return value

        value = value * 100;
        return Math.round(value);
    },

    //Date formatting yy/dd/mm to mm/dd/yy (Formatação da data yy/dd/mm para mm/dd/yy)
    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    //Configuration and formatting of data for Brazilian currency (Configuração e formatação dos dados para a moeda do Brasil)
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

       return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    //Fetching data in HTML (Buscando os dados no HTML)
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    //Validating the data (Validando os dados )
    validateFields() {
        const { description, amount, date } = Form.getValues()
        
        if( description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos")
        }
    },

    //Data formatting (Formatação dos dados)
    formatValues() {
        let { description, amount, date } = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    //Clearing data on the form (Limpeza de dados no formulário)
    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            //Verification of filled fields (Verificação dos campos preencidos)
            Form.validateFields();

            //Format the data to save (Formatar os dados para salvar)
            const transaction = Form.formatValues();

            //Save the data (Salvar os dados)
            Transaction.add(transaction);
            
            //Erase form data (Apagar os dados do formulário)            
            Form.clearFields();

            //Close the modal (Fechar o modal)
            Modal.close();
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()