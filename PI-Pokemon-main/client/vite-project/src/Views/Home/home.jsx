import SearchBar from "../../Components/SearchBar/Searchbar"
import Cards from "../../Components/Cards/Cards"
import useHome from "../../Hooks/useHome"
import home from "../../assets/home.png"
import "../Home/home.css"

const Home = () => {
  const arrayPoke = useHome()
  return (
    <div className="home-container">
      <SearchBar/>
      <Cards arrayPoke = { arrayPoke }></Cards>
    </div>
  );
}

export default Home;