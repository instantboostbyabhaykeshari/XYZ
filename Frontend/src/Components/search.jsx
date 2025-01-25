import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "../Styles/search.css";

const Search = () => {
    return (
        <div className="search">
            <input className="searchBar" type="search" placeholder="Search your craving!" />
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="maginifyGlass"/> */}
        </div>
    )
}

export default Search;