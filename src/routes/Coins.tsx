import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "react-responsive";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul<{ isMobile: boolean }>`
  padding: 0;
  display: ${(props) => (props.isMobile ? "flex" : "grid")};
  flex-direction: column;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const Coin = styled.li<{ isMobile: boolean }>`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  width: ${(props) => (props.isMobile ? "100%" : "150px")};
  height: ${(props) => (props.isMobile ? "100%" : "150px")};
  cursor: pointer;
  font-weight: 600;
  display: ${(props) => (props.isMobile ? "flex" : "")};
  flex-direction: row;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    width: 100%;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img<{ isMobile: boolean }>`
  margin-bottom: 10px;
  width: ${(props) => (props.isMobile ? "30px" : "80px")};
  height: ${(props) => (props.isMobile ? "30px" : "80px")};
  display: block;
`;

const CoinName = styled.span`
  max-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <CoinList isMobile={isMobile}>
          {data?.map((coin) => (
            <Coin isMobile={isMobile} key={coin.id}>
              <Link
                // obj 형식으로 데이터를 전송
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Img
                  isMobile={isMobile}
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                <CoinName>{coin.name}</CoinName>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
