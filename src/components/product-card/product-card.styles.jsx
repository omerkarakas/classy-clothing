import styled from 'styled-components';
import {
  BaseButton, GoogleSignInButton, InvertedButton
} from '../button/button.styles';

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

 

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }  
`;

export const ProductCardImage = styled.img`
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
`;

export const ProductCardButton = styled(InvertedButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
  z-index: 100
`;

export const ProductCardFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  .name {
    width: 80%;
    text-align: left;
    margin-bottom: 15px;
    margin-left: 5px;
  }

  .price {
    width: 10%;
    text-align: right;
    margin-right: 5px;
  }
`;