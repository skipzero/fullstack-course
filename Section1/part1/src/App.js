import { useState } from "react"

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({stats}) => {
  console.log('stats', stats)
  const sum = stats.reduce((acc, numb) => {
    console.log('summm', acc, numb)
    acc += numb;
    return acc;
  }, 0)
  const [good, neutral, bad] = stats;
  const percentGood = good / sum;
  const aveRate = good - bad/sum;
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="Good" value={percentGood} />
        <StatisticLine text="Average" value={aveRate} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Anecdote = ({line, votes}) => {
  return (
    <div>
      <p>{line}</p>
      <p>has {votes} votes</p>
    </div>
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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [anecdoteLine, setAnecdoteLine] = useState(anecdotes[0])
  const [votes, setVotes] = useState(0)


  const stats = [good, neutral, bad]

  const getRandom = () => {
    return Math.floor(Math.random() * lines.length);
  }

  const test = getRandom();

  const vote = () => {
    let newVote = [ ...anecdotes ]
    newVote[0].votes++
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="ssNeutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <h1>Statistics</h1>
        {good === 0 ?
            <p>No Feedback Given</p> :
          <>
            <Statistics stats={stats}/>
          </>
        }
      <div>
        <Anecdote line={anecdoteLine.line} votes={anecdoteLine.votes}/>
        <Button handleClick={() => {
          console.log('ave', anecdoteLine, anecdoteLine.index)
          return setAnecdoteLine({line: anecdoteLine[getRandom()]})
        }} 
        text="Next Anecdote" /> 
        <Button handleClick={() => vote()} text="Votes"/>
      </div>
    </div>
    
  )
}

export default App;
