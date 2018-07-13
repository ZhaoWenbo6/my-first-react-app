/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-10 18:16:00
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-10 18:17:29
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import styled, { css } from 'styled-components';
import JDlogo from '../../../image/logo/JDlogo.png';

export const Logo = styled.div`
  width: 120px;
  height: 45px;
  background-image: url(${JDlogo});
  background-size: 100% 100%;
  margin: 16px 28px 16px 0;
  float: left;
  ${props =>
    props.primary &&
    css`
      color: white;
    `};
`;
