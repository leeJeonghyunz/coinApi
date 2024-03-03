import styled from "styled-components";

// App을 ThemeProvider가 감싸고 있기에 가능
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <H1>Hello~~</H1>
    </Wrapper>
  );
}

export default App;
