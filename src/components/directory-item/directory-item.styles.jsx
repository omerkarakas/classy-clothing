import styled from 'styled-components';

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transform: scale(1.1);
  transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  background-image: ${({imageUrl}) => `url(${imageUrl})`};
`;

export const Body = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 1px transparent;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgba(98, 203, 241, 0.7);
    opacity: 0.7;
    position: absolute;
    margin-bottom: 0px;

    h2 {
      font-weight: bold;
      margin: 3px 3px;
      font-size: 22px;
      color: #2b2b2b;
      text-transform: uppercase;
    }

    p {
      font-weight: lighter;
      font-size: 16px;
    }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border: 1px transparent;
  margin: 0 7.5px 15px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 15px 30px 5px rgba(0, 0, 0, 0.4);

  &:first-child {
    margin-right: 7.5px;
    min-width: 50%;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    cursor: pointer;

    &${BackgroundImage} {
      opacity: 0.9;
      //transform: scale(1.1);
      filter: brightness(150%);
    }

    & ${Body} {
      // opacity: 0.5;
      filter: brightness(150%);
      border: 1px solid rgba(255, 255, 255);)
    }
  }
`;



