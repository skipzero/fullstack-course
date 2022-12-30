const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log('part', props)
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  const propArr = props.parts.map((prop) => {
    return (
      prop.name
    )
  })
  return (
    <>
      <Part part={propArr} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      {props.exercises1 + props.exercises2 + props.exercises3}
    </>
  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]}


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
}

export default App;
