const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      {props.total.reduce((acc, exercise) => {
        return acc + exercise.exercises;
      }, 0)}
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
