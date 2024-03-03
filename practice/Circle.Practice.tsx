import { useState } from "react";
import styled from "styled-components";

// Circle->Container로 가는 prop
interface ContainerProps {
  borderColor: string;
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  border: 3px solid ${(props) => props.borderColor};
`;

// props의 type을 지정해 줌.
interface CirclePros {
  bgColor: string;
  borderColor?: string; // optional(필수가 아님)을 하기 위해 물음표 사용
  text?: string;
}

// bgColor의 type이 CircleProps.
function Circle({ bgColor, borderColor, text = "Default value" }: CirclePros) {
  const [value, setValue] = useState<number | string>(0);
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  ); // borderColor가 있으면 그 borderColor를 받고 없으면 bgColor로부터 받아낸다.
}

export default Circle;
