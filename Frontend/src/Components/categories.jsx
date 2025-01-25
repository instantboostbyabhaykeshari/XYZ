import { Link } from "react-router-dom";
import "../Styles/categories.css";

const Categories = () => {
    


    return (
        <div className="mid">
            <div className="topCategories">
                <h2>Top Categories</h2>
                <Link to={"/all-food-items"} style={{textDecoration: "none", color: "#C2C2C2"}}><p>See All</p></Link>
            </div>
            <div className="top">
                <div className="pizza">
                    <div className="showCategories first"></div>
                    <p>Pizza</p>
                </div>
                <div className="burger">
                    <div className="showCategories second"></div>
                    <p>Burger</p>
                </div>
                <div className="momos">
                    <div className="showCategories third"></div>
                    <p>Momos</p>
                </div>
                <div className="chow">
                    <div className="showCategories fourth"></div>
                    <p>Chowmein</p>
                </div>
            </div>
        </div>
    )
}

export default Categories;