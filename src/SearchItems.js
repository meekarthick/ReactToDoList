import React from 'react' 
const SearchItems = ({newSearch,setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) =>e.preventDefault()}>
        <label htmlFor='search'>Search</label>
        <input
        id='search'
        type="text"
        placeholder='Search Items'
         role='searchbox'
        value={newSearch}
        onChange = {(e) => setSearch(e.target.value)}
        />
    </form>
  )
}

export default SearchItems;