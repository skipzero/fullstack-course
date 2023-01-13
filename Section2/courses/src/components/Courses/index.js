
const CourseParts = ({parts}) => {
    return parts.map(({name, exercises, id}) => <CourseContent name={name} key={id} exercises={exercises} />)
    
}

const CourseContent = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Exercises = ({parts}) => {
    const total = parts.reduce((acc, numb) => {
        console.log('extra', acc, numb)
        acc = acc + numb.exercises;
        return acc
    }, 0)
    return (<strong>Total of {total} exercises</strong>)
}


const Course = ({id,name,parts}) => {

    console.log('courses', name)
    return (
        <>
            <h2>{name}</h2>
            <CourseParts parts={parts} />
            <Exercises parts={parts} />
        </>
    )
}

export default Course;