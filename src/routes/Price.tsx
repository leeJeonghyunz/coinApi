import styled from "styled-components";

interface IPriceProps {
  coinId: string;
  name: string;
  price: any;
}

const Wrapper = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const Div = styled.div`
  background-color: ${(props) => props.theme.infoBox};
  height: 100px;
  width: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  span:first-child {
    color: grey;
    font-size: 20px;
  }
  span:last-child {
    color: red;
    font-size: 40px;
    font-weight: 600;
  }
  span:last-child[data-value^="-"] {
    color: blue;
  }
`;

function Price({ coinId, name, price }: IPriceProps) {
  console.log(price);
  return (
    <Wrapper>
      <Div>
        <span>From 30m ago</span>
        <span data-value={price.quotes.USD.percent_change_30m}>
          {price.quotes.USD.percent_change_30m > 0 ? "+" : null}
          {price.quotes.USD.percent_change_30m}%
        </span>
      </Div>
      <Div>
        <span>From 1h ago</span>
        <span data-value={price.quotes.USD.percent_change_1h}>
          {" "}
          {price.quotes.USD.percent_change_1h > 0 ? "+" : null}
          {price.quotes.USD.percent_change_1h}%
        </span>
      </Div>
      <Div>
        <span>From 12h ago</span>
        <span data-value={price.quotes.USD.percent_change_12h}>
          {" "}
          {price.quotes.USD.percent_change_12h > 0 ? "+" : null}
          {price.quotes.USD.percent_change_12h}%
        </span>
      </Div>
      <Div>
        <span>From 24h ago</span>
        <span data-value={price.quotes.USD.percent_change_24h}>
          {" "}
          {price.quotes.USD.percent_change_24h > 0 ? "+" : null}
          {price.quotes.USD.percent_change_24h}%
        </span>
      </Div>
      <Div>
        <span>From 7d ago</span>
        <span data-value={price.quotes.USD.percent_change_7d}>
          {" "}
          {price.quotes.USD.percent_change_7d > 0 ? "+" : null}
          {price.quotes.USD.percent_change_7d}%
        </span>
      </Div>
      <Div>
        <span>From 30d ago</span>
        <span data-value={price.quotes.USD.percent_change_30d}>
          {" "}
          {price.quotes.USD.percent_change_30d > 0 ? "+" : null}
          {price.quotes.USD.percent_change_30d}%
        </span>
      </Div>
    </Wrapper>
  );
}

export default Price;
