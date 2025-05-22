
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface coinProps{
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
}

interface dataProps{
  data: coinProps[];
}

const Home = () => {

  const [search, setSearch] = useState("");
  const navigate =useNavigate();
  //const [coins,setCoins] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  async function getData(){
    fetch("https://api.coincap.io/v2/assets?limit-10&offset=0")
    .then(response => response.json())
    .then((data: dataProps) => {
      const coinsData = data.data;

      const formatedResult = coinsData.map((item) => {
        const formated = {
          ...item, 
          nome: "MARTINHO",
        
        }
        return formated;
      })

      console.log(formatedResult); 

      

    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(search);

    if(search === "") return;

    navigate(`/detail/${search}`)
  }

  function handleGetMore(){
    alert("Testes")
  }
  
  
  

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Digite o nome da cripto...EX "bitcoin"'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-Label="Moeda">
              <div className={styles.name}>
                <Link to={"/details/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>
            <td className={styles.tdLabel} data-Label="Valor mercado">
              1T
            </td>
            <td className={styles.tdLabel} data-Label="Preço">
              8.000
            </td>
            <td className={styles.tdLabel} data-Label="Volume">
              2.2B
            </td>
            <td className={styles.tdProfit} data-Label="Mudança 24h">
              <span>1.20</span>
            </td>
          </tr>

          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-Label="Moeda">
              <div className={styles.name}>
                <Link to={"/details/bitcoin"}>
                  <span>Etheriun</span> | ETH
                </Link>
              </div>
            </td>
            <td className={styles.tdLabel} data-Label="Valor mercado">
              16.000
            </td>
            <td className={styles.tdLabel} data-Label="Preço">
              3.500
            </td>
            <td className={styles.tdLabel} data-Label="Volume">
              5M
            </td>
            <td className={styles.tdLoss} data-Label="Mudança 24h">
              <span>-4.79</span>
            </td>
          </tr>

        </tbody>
      </table>

      <button 
        className={styles.buttonMore}
        onClick={handleGetMore}
      >
        Buscar +
      </button>

    </main>
  );
};

export default Home;
