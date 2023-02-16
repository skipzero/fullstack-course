const Person = ({name, number, id, deletedPerson}) => {
    return <div>{name} {number} <button onClick={() => window.confirm(`delete ${name}`) ? deletedPerson(id) : ''}>delete</button></div>
}

export default Person;