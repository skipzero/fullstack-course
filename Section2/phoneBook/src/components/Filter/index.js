
const Filter = ({filter, onChange}) => {

  return (
    <>
      <label>Filter<input value={filter} onChange={onChange}/></label>
    </>
  )
}

export default Filter;