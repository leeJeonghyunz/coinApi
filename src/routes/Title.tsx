import styled from "styled-components";

interface ITitleProps {
  name: string | undefined;
}

const TitleDiv = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 15px;
`;

function Title({ name }: ITitleProps) {
  return <TitleDiv>{name || "Loading..."}</TitleDiv>;
}

export default Title;
