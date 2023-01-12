const Course = () => {

    return (
        <>
            <p>{Course.name}</p>
        </>
    )
}


const Courses = (props) => {


    return (
        <>
            {props.courses}
        </>
    )
}

export default Courses;