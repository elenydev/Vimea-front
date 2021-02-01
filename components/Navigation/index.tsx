import React from "react";
import Link from "next/link";

import {
  Hamburger,
  HamburgerBox,
  HamburgerInner,
  NavigationWrapper,
  Nav,
  NavList,
  LinksWrapper,
} from "./navigation.styles";

const index = (): JSX.Element => {
  const handleNavClick = (): void => {
    const hamburger = document.querySelector(".hamburger__inner");
    const nav = document.querySelector(".nav");
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("active");
  };

  return (
    <>
      <Hamburger className='hamburger' onClick={handleNavClick}>
        <HamburgerBox className='hamburger__box'>
          <HamburgerInner className='hamburger__inner'></HamburgerInner>
        </HamburgerBox>
      </Hamburger>

      <NavigationWrapper className='nav'>
        <Nav>
          <div onClick={handleNavClick}>
            <Link href='/'>
              <a>
                <img src='/images/logo.png' alt='Logo' />
              </a>
            </Link>
          </div>

          <NavList>
            <li onClick={handleNavClick}>
              <Link href='/about'>
                <a>About Us</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href='/latest'>
                <a>Latest</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href='#contact'>
                <a>Contact</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href='/auth/signIn'>
                <a>Join Us</a>
              </Link>
            </li>
          </NavList>
        </Nav>
      </NavigationWrapper>
    </>
  );
};

export default index;
