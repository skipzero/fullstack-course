const Person = ({name, number, id, deletePerson}) => {
    return <div>{name} {number} <button onClick={() => window.confirm(`delete ${name}`) ? deletePerson(id) : ''}>delete</button></div>
}

export default Person;