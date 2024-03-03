import styled, { keyframes } from "styled-components";

const Parents = styled.div`
  display: flex;
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${(props) => props.bgcolor};
`;

// Box의 스타일을 그대로 가져온다.
const Circle = styled(Box)`
  border-radius: 50%;
`;

const Btn = styled.button`
  color: white;
  background-color: red;
`;

// attrs(attributes)를 이용하여 속성을 설정 가능하다.
const Input = styled.input.attrs({ required: true, minLength: 5 })`
  background-color: red;
`;

const animation = keyframes`
  from{
    transform:rotate(0deg)
  }
  to{
    transform:rotate(360deg)
  }
`;

const Box2 = styled.div`
  height: 100px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 50px;
    }
  }
`;

function App() {
  return (
    <div>
      <Parents>
        <Box bgcolor="teal" />
        <Circle bgcolor="yellow" />
        <div>
          <Btn>Hello</Btn>
          <Btn as="a" href="https://naver.com">
            {/* as를 사용하여 a태그화 */}
            Hello
          </Btn>
        </div>
      </Parents>
      <div>
        <Input />
        <Input />
        <Input />
        <Input />
      </div>
      <div>
        <Box2>
          <span>🤔</span>
        </Box2>
      </div>
    </div>
  );
}

export default App;
