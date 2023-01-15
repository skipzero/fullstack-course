const Form = ({addPerson, handleNameChange,handleNumberChange, newNumber, newName}) => {
    return (
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameChange} value={newName}className='name'/></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} className='number'/></div>
        <div><button type="submit" >add</button></div>
      </form>)
  }
  
  export default Form;