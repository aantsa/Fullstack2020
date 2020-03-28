import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = props => {
  const {text, value} = props
  return(
    <tr>
    <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
const {good, neutral, bad} = props;
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={good + neutral + bad} />
      <StatisticLine text="average" value ={(good*1+neutral*0+bad*(-1)) / (good+neutral+bad)} />
      <StatisticLine text="positive" value ={((good)/(good+neutral+bad))*100 + "%"}  />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  if (good + bad + neutral > 0){
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>staistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

} else {
    return (
      <>
        <h1>give feedback</h1>
        <Button handleClick={() => setToGood(good + 1)} text="good" />
        <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setToBad(bad + 1)} text="bad" />
        <h1>staistics</h1>
        no feedback given
      </>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)