import './index.css'

const MoneyDetails = props => {
  const {val} = props
  const {imgURL, altTag, name, price, boxClass, testAtt} = val

  return (
    <div className={`monDetBox ${boxClass}`}>
      <img className="monDetImg" alt={altTag} src={imgURL} />
      <div>
        <p>{name}</p>
        <p data-testid={testAtt} className="pricePara">
          {`Rs ${price}`}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
