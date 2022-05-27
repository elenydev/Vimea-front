import { getUserManager } from "components/User/domain/selectors";
import React, { ChangeEvent, FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { ImageWrapper } from "./avatar.styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

const index: FC = () => {
  const manager = useSelector(getUserManager);
  const currentUser = manager?.getCurrentUserInstance();

  const currentUserAvatar = useMemo((): string => {
    return currentUser?.avatar;
  }, [currentUser]);

  const changeAvatar = (event: ChangeEvent<HTMLInputElement>): void => {
    manager?.changeAvatar((event.target as HTMLInputElement).files[0]);
  };

  return (
    <ImageWrapper>
      <img src="https://via.placeholder.com/150" alt="Avatar" />
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept=".png, .jpg, .jpeg"
        onChange={changeAvatar}
      />
      <label htmlFor="avatar">
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </ImageWrapper>
  );
};

export default index;
