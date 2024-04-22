import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import Title from "./Title";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";
import CandleChart from "./CandleChart";
import LinkURL from "./Link";
import {
  faYoutube,
  faFacebook,
  faReddit,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { theme } from "../theme";

interface Params {
  coinId: string;
}

interface State {
  name: string;
}

const Container = styled.div`
  padding: 10px 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderWrapperLeft = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;

const InfoBox = styled.div`
  height: 100px;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.infoBox};
  border-radius: 15px;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const InfoBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const InfoBoxItem2 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DescriptionTitle = styled.div`
  width: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Description = styled.p`
  padding: 0 5px;
  word-break: break-all;
`;

const Tabs = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.div<{ isActive: boolean }>`
  width: 200px;
  height: 50px;
  background-color: ${(props) => (props) => props.theme.infoBox};
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.isActive
      ? (props) => props.theme.accentColor
      : (props) => props.theme.textColor};
  &:hover {
    color: ${(props) => (props) => props.theme.accentColor};
  }
`;

const Home = styled.div`
  background-color: ${(props) => (props) => props.theme.infoBox};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin: 10px 0px;
  border-radius: 50%;
  position: absolute;
  left: 0;
`;

const LinkContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props) => props.theme.infoBox};
  border-radius: 15px;
  margin-top: 15px;
  padding: 15px;
`;

const ReferenceLink = styled.span``;

const LinkWrapper = styled.div`
  margin-top: 15px;
  padding: 0 10px;
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links_extended: object;
  first_data_at: string;
  last_data_at: string;
  links: {
    explorer: string;
    facebook: string;
    reddit: string;
    source_code: string;
    website: string;
    youtube: string;
  };
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useParams<Params>();
  const { state } = useLocation<State>(); // react router DOM이 보내주는 location에 접근하기 위해선 useLocation()을 사용
  const isChartMatch = useRouteMatch(`/:${coinId}/chart`);
  const isCandleChartMatch = useRouteMatch(`/:${coinId}/candlechart`);
  const isPriceMatch = useRouteMatch("/:coinId/price");

  // useQuery를 사용하여 info Api를 얻어옴, isLoading의 이름을 infoLoading으로 변경
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });

  // useQuery를 사용하여 price Api를 얻어옴, isLoading을 priceLoading으로 변경
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>({
    queryKey: ["ticker", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });

  let git;
  if (infoData?.links?.source_code && infoData.links.source_code[0]) {
    git = infoData?.links.source_code[0];
  } else {
    git = "https://github.com/";
  }

  let reddit;
  if (infoData?.links?.reddit && infoData.links.reddit[0]) {
    reddit = infoData?.links.reddit[0];
  } else {
    reddit = "https://www.reddit.com/";
  }

  let facebook;
  if (infoData?.links?.facebook && infoData.links.facebook[0]) {
    facebook = infoData?.links.facebook[0];
  } else {
    facebook = "https://www.facebook.com/";
  }

  let youtube;
  if (infoData?.links?.youtube && infoData.links.youtube[0]) {
    youtube = infoData?.links.youtube[0];
  } else {
    youtube = "https://www.youtube.com/";
  }

  let website;
  if (infoData?.links?.website && infoData.links.website[0]) {
    website = infoData?.links.website[0];
  } else {
    website = "https://www.google.com/";
  }

  const loading = infoLoading || priceLoading;
  console.log(infoData);

  return (
    <Container>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>
      <Header>
        <Home>
          <Link to={`/`}>{"<"}</Link>
        </Home>
        <div>
          <Title name={infoData?.name}></Title>
        </div>
      </Header>
      <HeaderWrapper>
        <InfoBox style={{ width: "150px" }}>
          <InfoBoxItem>
            <span>Price</span>
            <span>{priceData?.quotes.USD.price?.toFixed(2)} $</span>
          </InfoBoxItem>
        </InfoBox>
        <HeaderWrapperLeft>
          <Img src={`https://static.coinpaprika.com/coin/${coinId}/logo.png`} />
        </HeaderWrapperLeft>
        <InfoBox style={{ width: "150px" }}>
          <InfoBoxItem>
            <span>Rank</span>
            <span>{infoData?.rank}</span>
          </InfoBoxItem>
        </InfoBox>
      </HeaderWrapper>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <InfoBox style={{ height: "100%", padding: "10px" }}>
            <InfoBoxItem2>
              <DescriptionTitle>
                What is &nbsp;
                <span
                  style={{
                    color: ` ${theme.accentColor}`,
                    fontWeight: "600",
                  }}
                >
                  {infoData?.name}
                </span>
              </DescriptionTitle>
              <Description>{infoData?.description}</Description>
            </InfoBoxItem2>
          </InfoBox>
          <Tabs>
            <Tab isActive={isChartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={isCandleChartMatch !== null}>
              <Link to={`/${coinId}/candlechart`}>Candlechart</Link>
            </Tab>
            <Tab isActive={isPriceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/candlechart`}>
              <CandleChart coinId={coinId} name={state?.name} />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} name={state?.name} price={priceData} />
            </Route>
          </Switch>
          <LinkContainer>
            <ReferenceLink>Reference Link</ReferenceLink>
            <LinkWrapper>
              <LinkURL
                name={"Code"}
                color={"black"}
                icon={faGithub}
                url={git}
              />
              <LinkURL
                name={"Reddit"}
                color={"orange"}
                icon={faReddit}
                url={reddit}
              />{" "}
              <LinkURL
                name={"Youtube"}
                color={"red"}
                icon={faYoutube}
                url={youtube}
              />
              <LinkURL
                name={"FaceBook"}
                color={"blue"}
                icon={faFacebook}
                url={facebook}
              />
              <LinkURL
                name={"Web Site"}
                color={"skyblue"}
                icon={faGlobe}
                url={website}
              />
            </LinkWrapper>
          </LinkContainer>
        </>
      )}
    </Container>
  );
}

export default Coin;
