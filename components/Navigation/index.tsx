import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

import {
  Hamburger,
  HamburgerBox,
  HamburgerInner,
  NavigationWrapper,
  Nav,
  NavList,
  ArrowButton,
} from "./navigation.styles";
import { Text } from "@/../dictionary/text";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const index = (): JSX.Element => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [handleScroll, setHandleScroll] = useState(0);
  const [hamburgerHeight, setHamburgerHeight] = useState(null);
  const [navHeight, setNavHeight] = useState(null);
  const handleNavClick = (): void => {
    const hamburger = document.querySelector(".hamburger__inner");
    const nav = document.querySelector(".nav");
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("active");
  };
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const handleScrollPosition = useCallback(
    () => setHandleScroll(window.scrollY),
    []
  );
  const scrollTop = useCallback(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navHeight > window.scrollY) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }
    }
  }, [handleScroll]);

  useEffect(() => {
    setNavHeight(navRef?.current?.scrollHeight);
  }, [navRef]);

  useEffect(() => {
    setHamburgerHeight(hamburgerRef?.current?.scrollHeight);
  }, [hamburgerRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);

  return (
    <>
      <Hamburger
        className="hamburger"
        onClick={handleNavClick}
        isVisible={isNavVisible}
        ref={hamburgerRef}
        transformHeight={hamburgerHeight}
      >
        <HamburgerBox className="hamburger__box">
          <HamburgerInner className="hamburger__inner"></HamburgerInner>
        </HamburgerBox>
      </Hamburger>
      <NavigationWrapper
        className="nav"
        ref={navRef}
        isVisible={isNavVisible}
        transformHeight={navHeight}
      >
        <Nav>
          <div onClick={handleNavClick}>
            <Link href="/">
              <a>
                <img src="/images/logo.png" alt="Logo" />
              </a>
            </Link>
          </div>

          <NavList>
            <li onClick={handleNavClick}>
              <Link href="/about">
                <a>{Text.app.main.navigation.about}</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href="#latest">
                <a>{Text.app.main.navigation.latest}</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href="#contact">
                <a>{Text.app.main.navigation.contact}</a>
              </Link>
            </li>

            <li onClick={handleNavClick}>
              <Link href="/auth/signIn">
                <a>{Text.app.main.navigation.join__us}</a>
              </Link>
            </li>
          </NavList>
        </Nav>
      </NavigationWrapper>
      {!isNavVisible && (
        <ArrowButton onClick={scrollTop}>
          <ArrowUpwardIcon />
        </ArrowButton>
      )}
    </>
  );
};

export default index;
