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

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sumArray = [good, neutral, bad]

  const sum = sumArray.reduce((acc, numb) => {
    acc += numb
    console.log(acc)
    return acc;
  }, 0)
  // const [average, setAverage] = useState(0)
  // const [aveGood, setAveGood] = useState(0)
  // let total = good + bad + neutral;
  // let goodTotal = good / total;
  // setAverage(goodTotal)
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
    </div>
  )
}

export default App

// const Header = (props) => {
//   return (
//     <h1>{props.course}</h1>
//   )
// }

// const Part = (props) => {
//   return (
//     <div>
//       <p>{props.part} {props.exercises}</p>
//     </div>
//   )
// }

// const Content = (props) => {
//   return (
//     <>
//       {props.parts.map((part) => (
//         <Part part={part.name} exercises={part.exercises} key={part.name} />
//       ))}
//     </>
//   )
// }

// const Total = (props) => {
//   return (
//     <>
//       {props.total.reduce((acc, exercise) => {
//         return acc + exercise.exercises;
//       }, 0)}
//     </>
//   )
// }

// const App = () => {
  
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//     name: 'Fundamentals of React',
//     exercises: 10
//   },
//   {
//     name: 'Using props to pass data',
//     exercises: 7
//   },
//   {
//     name: 'State of a component',
//     exercises: 14
//   }]}


//   return (
//     <div>
//       <Header course={course.name}/>
//       <Content parts={course.parts} />
//       <Total total={course.parts} />
//     </div>
//   );
// }

// export default App;
