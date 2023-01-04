import { useState } from "react"

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Averages = ({total, text}) => {

  return (
    <div>
      <p>{text} {total}</p>
      {/* <p>Positive {avegood}</p> */}
    </div>
  )
}

const Display = ({value, text}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Anecdote = ({line, votes}) => {
  return (
    <p>{line}</p>
  )
}

const lines = [
  'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const anecdotes = lines.map((line, index) => {
  return {line, 'votes':0, index}
})

console.log(anecdotes)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [anecdoteLine, setAnecdoteLine] = useState(anecdotes[0])
  const [votes, setVotes] = useState(0)

  const sumArray = [good, neutral, bad]

  const getRandom = () => {
    return Math.random() * (anecdotes.length - 1) + anecdotes.length - 1;
  }

  const vote = () => {
    let newVote = [ ...anecdotes ]
    newVote[0].votes++
  }

  const sum = sumArray.reduce((acc, numb) => {
    acc += numb
    console.log(acc)
    return acc;
  }, 0)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h2>Stats</h2>
      <Display value={good} text='Good' />
      <Display value={neutral} text='Neutral' />
      <Display value={bad} text='bad' />

      <Averages total={good / sum} text='Good'/>
      <Averages total={sum - good / sum} text='Average' />

      <div>
        <Anecdote line={anecdoteLine.line} votes={anecdoteLine.votes}/>
        <Button handleClick={() => {
          console.log('ave', anecdoteLine, anecdoteLine.index)
          return setAnecdoteLine({line: anecdoteLine[getRandom()]})
        }} 
        text="Next Anecdote" /> {votes}
        <Button handleClick={() => vote()} text="Votes"/>
      </div>
    </div>
  )
}

export default App
