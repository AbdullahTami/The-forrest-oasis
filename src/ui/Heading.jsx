import styled, { css } from "styled-components";

// const text = css`
//   text-align: center;
//   ${10 > 30 && "background-color: yellow"}
// `;

// In the place where ths component instance is called we can define the as prop which let us render the element we want and hence, we can conditionally render it in our pages
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
      ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
  line-height: 1.4;
`;

export default Heading;
