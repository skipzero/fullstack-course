const Person = (props) => {
    return <div key={props.name}>{props.name} {props.number}</div>
}

export default Person;