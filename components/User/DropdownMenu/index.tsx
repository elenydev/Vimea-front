import React, { useState, useCallback, SyntheticEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import { Text } from "@/../dictionary/text";
import { useSelector } from "react-redux";
import { getUserManager } from "@/../components/App/domain/selectors";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import { Menu as MenuComponent } from "@/../components/User/DropdownMenu/dropdownMenu.styles";

interface StyledMenuProps {
  open: boolean;
  id: string;
  anchorEl: HTMLElement;
  keepMounted: boolean;
  onClose: () => void;
}

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "#a10d2b",
    padding: "0px",
  },
  list: {
      padding: '0px'
  }
})((props: StyledMenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    open={props.open}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

interface ComponentProps {
  handleNavClick: () => void;
}

const index = (props: ComponentProps) => {
  const { handleNavClick } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const userManager = useSelector(getUserManager);

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const removeCurrentUser = useCallback(
    () => {
      handleNavClick();
      userManager.removeUser();
    },
    [userManager]
  );

  return (
    <div>
      <Icon>
        <AccountCircleIcon onClick={handleClick} />
      </Icon>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuComponent>
          <li onClick={removeCurrentUser}>
            <Link href="/">
              <a>{Text.app.main.navigation.sign_out}</a>
            </Link>
          </li>
        </MenuComponent>
      </StyledMenu>
    </div>
  );
};

export default index;
