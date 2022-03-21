import { Input } from "../../components/common/input/styles";
import { Title, Wrapper } from "./styles/styles";
import { LoginButton } from "../auth/login/style/style";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserByIdTC } from "../../bll/reducer/usersReducer";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { updateUserType } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

export const UserSettings = () => {
  const dispatch = useDispatch();
  const currentUserId = getCurrentUserId();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [profileImage, setProfileImage] = useState<Blob>();
  const navigate = useNavigate();

  const handleUpdateRequest = () => {
    const payload: updateUserType = {
      userId: currentUserId,
    };

    username && (payload.username = username);
    description && (payload.desc = description);
    city && (payload.city = city);
    profileImage && (payload.profilePicture = profileImage);

    dispatch(updateUserByIdTC(payload, navigate));
  };

  return (
    <Wrapper>
      <Title>Edit Profile</Title>
      <Input
        onChange={(e) => setUsername(e.currentTarget.value)}
        value={username}
        type={"text"}
        id="user-settings-username"
        label="Username"
      />
      <Input
        onChange={(e) => setDescription(e.currentTarget.value)}
        value={description}
        type={"text"}
        id="user-settings-desc"
        label="Description"
      />
      <Input
        onChange={(e) => setCity(e.currentTarget.value)}
        value={city}
        type={"text"}
        id="user-settings-city"
        label="City"
      />
      <Input
        type={"file"}
        id="user-settings-profile-image"
        label="Profile Image"
        onChange={(e) => setProfileImage(e.currentTarget.files![0])}
      />
      <LoginButton onClick={handleUpdateRequest}>Change</LoginButton>
    </Wrapper>
  );
};
