import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { coinProps } from "../home";

interface ResponseData {
  data: coinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

const Detail = () => {

  const { cripto } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<coinProps>();

  useEffect(() => {
    async function getCoin() {

      try {
        fetch(`https://api.coingecko.com/api/v3/coins/${cripto}`)
          .then(response => response.json())
          .then((data: DataProps) => {
            console.log(data);

            if ("error" in data) {
              navigate("/")
              return;
            }

            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });

            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            });

            const resultData = {
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
              formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            }
            setCoin(resultData);
          })
      } catch (error) {
        navigate("/");
      }
    }
    getCoin();
  }, [cripto]);

  return (
    <div>
      <h1>Detail</h1>
      {cripto}

    </div>
  )
}

export default Detail