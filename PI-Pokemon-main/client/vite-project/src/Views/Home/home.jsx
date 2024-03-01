import SearchBar from "../../Components/SearchBar/Searchbar"
import Cards from "../../Components/Cards/Cards"
import useHome from "../../Hooks/useHome"
import "../Home/home.css"
import { setHistory } from "../../redux/pokeSlice"
import { useSelector } from "react-redux"

const Home = () => {
  const historyRenderData = useSelector((state) => state.pokemon.historyRenderData);
  const arrayPoke = useHome()
  return (
    <div className="home-container">
      <SearchBar/>
      <Cards arrayPoke = { arrayPoke } historyRenderData = { historyRenderData }></Cards>
    </div>
  );
}

export default Home;