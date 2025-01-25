import Bottom from './bottom'
import Categories from './categories'
import FoodList from './foodList'
import Header from './header'
import Search from './search'

const WebApp = () => {
    return (
        <div>
            <Header/>
            <Search/>
            <Categories/>
            <FoodList/>
            <Bottom homeIconColor='#4FAF5A'/>
        </div>
    )
}

export default WebApp;