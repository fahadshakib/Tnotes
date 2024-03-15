import './search-box.styles.scss';


const SearchBox = ({handleChange}) => {


    return (

            <input type="text" 
            name="note" 
            id="note" 
            className='search-box' 
            placeholder='search notes here' 
            onChange={handleChange}/>
    )
}

export default SearchBox;