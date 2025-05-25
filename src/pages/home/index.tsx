import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface coinProps {
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
  formatedPrice?: string;
  formatedVolume?: string;
  formatedMarket?: string;
}


const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [coins, setCoins] = useState<coinProps[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getData();
  }, [offset]);

  async function getData() {
    const apiKey =
      "b576a8993367f2d7a903a2c5d453a54510270d68fc57e8a1eeab5abca7d61534";
    const url = `https://rest.coincap.io/v3/assets?limit=10&offset=${offset}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    const coinsData = data.data;

    const price = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const priceCompact = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });

    const formatedResult = coinsData.map((item: { priceUsd: any; marketCapUsd: any; volumeUsd24Hr: any; }) => ({
      ...item,
      formatedPrice: price.format(Number(item.priceUsd)),
      formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
      formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
    }));

    const listCoins = [...coins, ...formatedResult];
    setCoins(listCoins);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(search);

    if (search === "") return;

    navigate(`/detail/${search}`);
  }

  function handleGetMore() {
    if(offset === 0){
      setOffset(10);
      return
    }
    setOffset(offset + 10);
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
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={styles.tr} key={item.id}>
                <td className={styles.tdLabel} data-Label="Moeda">
                  <div className={styles.name}>
                    <img
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                      alt="Logo Cripto"
                      className={styles.logo}
                    />
                    <Link to={`/detail/${item.id}`}>
                      <span>{item.name}</span> | {item.symbol}
                    </Link>
                  </div>
                </td>
                <td className={styles.tdLabel} data-Label="Valor mercado">
                  {item.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-Label="Preço">
                  {item.formatedPrice}
                </td>
                <td className={styles.tdLabel} data-Label="Volume">
                  {item.formatedVolume}
                </td>
                <td
                  className={
                    Number(item.changePercent24Hr) > 0
                      ? styles.tdProfit
                      : styles.tdLoss
                  }
                  data-Label="Mudança 24h"
                >
                  <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className={styles.buttonMore} onClick={handleGetMore}>
        Buscar +
      </button>
    </main>
  );
};

export default Home;
