import Menu from "./menu";
import "../Styles/foodList.css";

const FoodList = () => {
    return (
        <div className="list">
            <Menu foodName={"Peppy Paneer Pizza"} description={"Flavorful combination of seasoned paneer, bell peppers, onions, and spices on a crispy crust, topped with melted cheese and rich tomato sauce."} imageUrl={"/images/pizza-main.jpg"}/>
            <Menu foodName={"Cheese Burst Pizza"} description={"Indulge in the rich, melty goodness of our Cheese Burst Pizza, loaded with extra cheese and packed with flavor in every bite."} imageUrl={"/images/cheese-pizza.jpg"}/>
            <Menu foodName={"Steamed Veg Momos"} description={"Deliciously soft and steamed to perfection, these Veg Momos are filled with a flavorful blend of fresh vegetables and served with a tangy dipping sauce."} imageUrl={"/images/momos-main.jpg"}/>
            <Menu foodName={"Classic Cheeseburger"} description={"Savor the juicy, tender beef patty topped with melted cheese, fresh lettuce, tomatoes, and a zesty sauce, all sandwiched in a soft, toasted bun."} imageUrl={"/images/hamburger.jpg"}/>
        </div>
    )
}

export default FoodList;