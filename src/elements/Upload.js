import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import { actionCreators as imageActions } from "../redux/modules/Image";
import { useDispatch, useSelector } from "react-redux";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e.target.files);
    console.log(fileInput.current.files);
    const reader = new FileReader();
    const file = e.target.files[0];

    // 파일 내용을 불러온다
    reader.readAsDataURL(file);
    // 읽기가 끝나면 실행된다.
    reader.onloadend = () => {
      // reader.result는 파일의 내용물이다.
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  //firebase Storage에 저장하는 함수
  const UploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <React.Fragment>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading}
      ></input>
    </React.Fragment>
  );
};

export default Upload;
