import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    tranList: [],
    titleIn: '',
    amountIn: '',
    selectOption: transactionTypeOptions[0].optionId,
  }

  titleInput = event => {
    this.setState({titleIn: event.target.value})
  }

  amountInput = event => {
    this.setState({amountIn: event.target.value})
  }

  selectThing = event => {
    this.setState({selectOption: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()

    const {titleIn, amountIn, selectOption} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === selectOption,
    )
    const {displayText} = typeOption

    const newTran = {
      id: uuidv4(),
      title: titleIn,
      amount: amountIn,
      type: displayText,
    }

    this.setState(prevState => ({
      tranList: [...prevState.tranList, newTran],
      titleIn: '',
      amountIn: '',
    }))
  }

  delThing = id => {
    const {tranList} = this.state
    this.setState({tranList: tranList.filter(each => each.id !== id)})
  }

  calC = () => {
    const {tranList} = this.state

    let balance = 0
    let income = 0
    let expenses = 0

    tranList.forEach(eachTr => {
      const integerAmount = parseInt(eachTr.amount)
      if (eachTr.type === 'Income') {
        income += integerAmount
      } else {
        expenses += integerAmount
      }
    })

    balance = income - expenses

    return {
      balance,
      income,
      expenses,
    }
  }

  render() {
    const {tranList, titleIn, amountIn} = this.state
    const {balance, income, expenses} = this.calC()

    const moneyDetails = [
      {
        imgURL:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        altTag: 'balance',
        name: 'Your Balance',
        price: balance,
        boxClass: 'box1',
        testAtt: 'balanceAmount',
      },
      {
        imgURL:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        altTag: 'income',
        name: 'Your Income',
        price: income,
        boxClass: 'box2',
        testAtt: 'incomeAmount',
      },
      {
        imgURL:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        altTag: 'expenses',
        name: 'Your Expenses',
        price: expenses,
        boxClass: 'box3',
        testAtt: 'expensesAmount',
      },
    ]

    return (
      <div className="totalThing">
        <div className="headerDiv">
          <h1 className="headerHead">Hi, Richard</h1>
          <p className="headerPara">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <div className="monDetUl">
          {moneyDetails.map(each => (
            <MoneyDetails key={each.altTag} val={each} />
          ))}
        </div>

        <div className="footerDiv">
          <form onSubmit={this.addTransaction} className="addTransDiv">
            <h1 className="footerPara">ADD TRANSACTION</h1>

            <label htmlFor="titleIn">TITLE</label>
            <input
              onChange={this.titleInput}
              id="titleIn"
              placeholder="TITLE"
              value={titleIn}
            />

            <label htmlFor="amountIn">AMOUNT</label>
            <input
              onChange={this.amountInput}
              id="amountIn"
              placeholder="AMOUNT"
              value={amountIn}
            />

            <label htmlFor="typeIn">TYPE</label>
            <select onChange={this.selectThing} id="typeIn">
              <option value={transactionTypeOptions[0].optionId}>
                {transactionTypeOptions[0].displayText}
              </option>
              <option value={transactionTypeOptions[1].optionId}>
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button className="addBtn" type="submit">
              Add
            </button>
          </form>

          <div className="lastDiv">
            <h1 className="footerPara">HISTORY</h1>
            <ul>
              <li className="topicDiv">
                <p className="tPara">Title</p>
                <p className="aPara">Amount</p>
                <p className="typePara">Type</p>
              </li>

              {tranList.map(eachTran => (
                <TransactionItem
                  key={eachTran.id}
                  delThing={this.delThing}
                  det={eachTran}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
