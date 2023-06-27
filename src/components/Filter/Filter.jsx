

export const Filter = ({filter, handleSearch}) => {
    return (
      <>
        <h3>Find contacts by name</h3>
        <input type="text" value={filter} onChange={event => handleSearch(event)} />
      </>
    );
}