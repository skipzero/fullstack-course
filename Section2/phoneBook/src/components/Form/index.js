const Form = ({addPerson, handleNameChange,handleNumberChange, newNumber, newName}) => {
    return (
      <form onSubmit={addPerson}>
        <div><label>Name: <input onChange={handleNameChange} value={newName}className='name'/></label></div>
        <div><label>Number: <input onChange={handleNumberChange} value={newNumber} className='number'/></label></div>
        <div><button type="submit" >add</button></div>
      </form>)
  }
  
  export default Form;