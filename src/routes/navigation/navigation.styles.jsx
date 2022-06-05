import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from "../../assets/classy.svg";


export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100px;
  width: 200px;
  padding: 25px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const ClassyLogo = styled(Logo)`
  width: 100px !important;
  height: 50px !important;
`;
// .navigation {


//   .logo-container {


//     .logo {
//       width: 5em !important;
//       height: 2.5em !important;
//     }
//   }


//   .nav-links-container {
//    

//     .nav-link {
//       padding: 10px 15px;
//       cursor: pointer;
//     }
//   }
// }