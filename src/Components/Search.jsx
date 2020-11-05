import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Enter from '../Images/Enter.svg';

const Search = ({search, setSearch, fetchData, setTitle}) => {
  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    // PREVENT DEFAULT
    e.preventDefault();
    // SET TITLE
    setTitle(search);
    // FETCH
    fetchData(search);
    // RESET FORM SEARCH
    setSearch('');
}
  // RETURN    
  return (
    <>
      {/* <div>
          <form className='gif-search' onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={ e => setSearch(e.target.value)} /> 
            <button className='gif-btn-submit' type='submit'>
              <img className='svg' src={Enter} alt="enter" />
            </button>
          </form>
      </div> */}

      <div>
      <Form inline onSubmit={handleSubmit}>
        <FormControl Search className="gif-search mr-sm-2" type="text" placeholder="Search GIF!"
        // search={Search}
        value={search}
        setSearch={setSearch} 
        fetchData={fetchData}
        onChange={ e => setSearch(e.target.value)}
        setTitle={setTitle} />
        <Button className='gif-btn-submit' type='submit'>
            <img className='svg' src={Enter} alt="enter" />
        </Button>
      </Form>
      </div>
    </>
  )
}

export default Search
