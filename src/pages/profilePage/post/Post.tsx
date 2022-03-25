import React from "react";
import { useParams } from "react-router";
import { getCurrentUserId } from "../../../utils/getCurrentUserId";
import { createNewPostsType } from "../../../api/api";
import { editPostTC } from "../../../bll/reducer/postsReducer";
import { deletePostType } from "../../../api/api";
import { deletePostTC } from "../../../bll/reducer/postsReducer";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles/styles";
import { ButtonWrapper } from "./styles/styles";
import { Content } from "./styles/styles";
import { CratedDate } from "../../postsTape/post/styles/styles";
import { dayMonthYearDateParse } from "../../../utils/parseDate";
import { DeletePost } from "./styles/styles";
import { EditButton } from "./styles/styles";
import { EditContentWrapper } from "./styles/styles";
import { SaveButton } from "./styles/styles";
import { PostInputEdit } from "./styles/styles";
import { MainButtonsWrapper } from "./styles/styles";
import { InfoWrapper } from "./styles/styles";
import { LikeIcon } from "./styles/styles";
import { Like } from "./styles/styles";
import { LikeWrapper } from "./styles/styles";
import { reactOnPost } from "../../../bll/reducer/postsReducer";
//@ts-ignore
import likeLike from "../../../assets/images/icons/like-red-icon.svg";
//@ts-ignore
import darkLike from "../../../assets/images/icons/like-dark-icon.svg";

export const Post = ({
  m,
  showEditPost,
  setShowEditPost,
  inputValue,
  buttonClickId,
  profileImage,
  setProfileImage,
  setInputValue,
  setButtonClickId,
}: PostPropsType) => {
  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();
  const myLike = m.likes.find((likeId: string) => likeId === currentUserId);

  const editPostHandler = (idPost: string) => {
    const payload: createNewPostsType = {
      userId: currentUserId,
    };
    inputValue && (payload.desc = inputValue);
    profileImage && (payload.img = profileImage);
    dispatch(editPostTC(payload, idPost));
    setProfileImage(undefined);
    setShowEditPost(false);
    setInputValue("");
  };
  const deletePostHandler = (idPost: string) => {
    const payload: deletePostType = {
      userId: currentUserId,
    };
    dispatch(deletePostTC(idPost, payload));
  };

  const likePostHandler = () => {
    dispatch(reactOnPost(m._id, currentUserId));
  };

  return (
    <Wrapper>
      {m.desc}

      {m.img && <img src={m.img} alt={"image-post"} />}
      <Content>
        <ButtonWrapper>
          <MainButtonsWrapper id={m._id}>
            {id === currentUserId && (
              <>
                <EditButton
                  onClick={(e) => {
                    setShowEditPost(!showEditPost);
                    // @ts-ignore
                    setButtonClickId(e.target.parentElement.id);
                  }}
                >
                  Edit post
                </EditButton>

                <DeletePost onClick={() => deletePostHandler(m._id)}>
                  x
                </DeletePost>
              </>
            )}
            <div></div>
            <InfoWrapper>
              <CratedDate>
                Created: {dayMonthYearDateParse(m.createdAt)}
              </CratedDate>
              <LikeWrapper>
                <Like>Likes: {m.likes.length}</Like>
                <Like>
                  <LikeIcon
                    onClick={likePostHandler}
                    src={myLike ? likeLike : darkLike}
                    alt="Like / Unlike"
                  />
                </Like>
              </LikeWrapper>
            </InfoWrapper>
          </MainButtonsWrapper>

          {showEditPost && m._id === buttonClickId && (
            <EditContentWrapper>
              <PostInputEdit
                placeholder={"Enter new post text"}
                id="user-edit-post-desc"
                maxRows={7}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <input
                type={"file"}
                id="user-edit-post-image"
                onChange={(e) => setProfileImage(e.currentTarget.files![0])}
              />
              <SaveButton onClick={() => editPostHandler(m._id)}>
                Save
              </SaveButton>
            </EditContentWrapper>
          )}
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
};

type PostPropsType = {
  m: any;
  showEditPost: boolean;
  setShowEditPost: (showEditPost: boolean) => void;
  inputValue: string;
  buttonClickId: string;
  profileImage: Blob | undefined;
  setProfileImage: any;
  setInputValue: (inputValue: string) => void;
  setButtonClickId: (buttonClickId: string) => void;
};
