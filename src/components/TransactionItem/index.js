import './index.css'

const TransactionItem = props => {
  const {det, delThing} = props
  const {id, title, amount, type} = det
  const doThis = () => {
    delThing(id)
  }

  return (
    <li className="transactionItemList">
      <p className="titlePara">{title}</p>
      <p className="amountPara">{`Rs ${amount}`}</p>
      <p className="typeThingPara">{type}</p>
      <div>
        <button
          className="delBtn"
          data-testid="delete"
          onClick={doThis}
          type="button"
        >
          <img
            className="delImg"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
