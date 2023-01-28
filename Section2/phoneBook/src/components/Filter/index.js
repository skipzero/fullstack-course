
const Filter = ({filter, handleFilter}) => {

  return (
    <>
      <label>Filter<input value={filter} onChange={handleFilter}/></label>
    </>
  )
}

export default Filter;