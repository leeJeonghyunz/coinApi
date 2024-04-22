import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const LinkBox = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  border-radius: 10px;
`;

const LinkName = styled.span`
  margin-left: 5px;
  font-size: 25px;
  color: ${(props) => props.theme.infoBox};
  font-weight: 600;
`;

interface ILinkURL {
  name: string;
  color: string;
  icon: any;
  url: string;
}

function LinkURL({ name, color, icon, url }: ILinkURL) {
  return (
    <>
      {name ? (
        <a href={url} target="blank">
          <LinkBox>
            <FontAwesomeIcon
              style={{ color: `${color}` }}
              icon={icon}
              size="2x"
            />{" "}
            <LinkName>{name}</LinkName>
          </LinkBox>
        </a>
      ) : null}
    </>
  );
}

export default LinkURL;
