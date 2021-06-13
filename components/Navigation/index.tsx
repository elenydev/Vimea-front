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
import { useSelector } from "react-redux";
import { getUser, getUserManager } from "@/../components/App/domain/selectors";

const index = (): JSX.Element => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [handleScroll, setHandleScroll] = useState(0);
  const [hamburgerHeight, setHamburgerHeight] = useState(null);
  const [navHeight, setNavHeight] = useState(null);
  const [isUserSigned, setIsUserSigned] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const currentUser = useSelector(getUser);
  const userManager = useSelector(getUserManager);

  const removeCurrentUser = useCallback(() => {
    handleNavClick();
    userManager.removeUser();
  }, [userManager]);

  const handleNavClick = (): void => {
    const hamburger = document.querySelector(".hamburger_inner");
    const nav = document.querySelector(".nav");
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("active");
  };

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
  }, [handleScroll, navHeight]);

  useEffect(() => {
    setNavHeight(navRef?.current?.scrollHeight);
  }, [navRef]);

  useEffect(() => {
    setHamburgerHeight(hamburgerRef?.current?.scrollHeight);
  }, [hamburgerRef]);

  useEffect(() => {
    setIsUserSigned(currentUser ? true : false);
  },[currentUser]);

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
        <HamburgerBox className="hamburger_box">
          <HamburgerInner className="hamburger_inner"></HamburgerInner>
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
              <Link href="/#latest">
                <a>{Text.app.main.navigation.latest}</a>
              </Link>
            </li>
            {!isUserSigned ? (
              <li onClick={handleNavClick}>
              <Link href="/#contact">
                <a>{Text.app.main.navigation.contact}</a>
              </Link>
              </li>
            ) : (
              <li onClick={handleNavClick}>
              <Link href="/user/home">
                <a>{Text.app.main.navigation.account}</a>
              </Link>
              </li>
            )}
            
            {isUserSigned && (
              <li onClick={handleNavClick}>
              <Link href="/user/favourites">
                <a>{Text.app.main.navigation.favourites}</a>
              </Link>
            </li>
            )}
            {!isUserSigned ? (
              <li onClick={handleNavClick}>
                <Link href="/auth/signIn">
                  <a>{Text.app.main.navigation.join_us}</a>
                </Link>
              </li>
            ) : (
              <li onClick={removeCurrentUser}>
                <Link href="/">
                  <a>{Text.app.main.navigation.sign_out}</a>
                </Link>
              </li>
            )}
            
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
