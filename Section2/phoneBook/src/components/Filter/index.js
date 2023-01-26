
const Filter = ({filter, filterBy}) => {

  return (
    <>
      <label>Filter<input value={filter} onChange={filterBy}/></label>
    </>
  )
}

export default Filter;