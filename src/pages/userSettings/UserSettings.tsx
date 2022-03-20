import { Wrapper } from "./styles/styles";
import { Input } from "../../components/common/input/styles";
import { Title } from "./styles/styles";
import { LoginButton } from "../auth/login/style/style";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserByIdTC } from "../../bll/reducer/usersReducer";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { useParams } from "react-router";
import { updateUserType } from "../../api/api";
import { useNavigate } from "react-router-dom"

export const UserSettings = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate()

  const handleUpdateRequest = () => {
    const payload: updateUserType = {
      userId: currentUserId,
    };

    username && (payload.username = username);
    description && (payload.desc = description);
    city && (payload.city = city);

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
      />
      <LoginButton onClick={handleUpdateRequest}>Change</LoginButton>
    </Wrapper>
  );
};
