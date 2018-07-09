import styled, { css } from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin: 10px 0;
  background-color: #e6f7ff;
  color: #2496ff;
  border-left: 10px solid transparent;
  border-radius: 4px;
  ${props =>
    props.primary &&
    css`
      color: white;
    `};
`;
