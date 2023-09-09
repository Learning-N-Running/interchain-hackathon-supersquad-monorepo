import { type } from "os";
import { useState } from "react";
import { useRef } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { upLoadImageBoolState } from "./lib/states";

const UploadedImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [upLoadImageBool, setUpLoadImageBool] =
    useRecoilState(upLoadImageBoolState);

  const handleClick = () => {
    // input 엘리먼트가 클릭되었을 때 input 버튼을 클릭하기 위해 click() 메서드를 사용
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [imageSrc, setImageSrc]: any = useState(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      console.log(file);
      if (file !== undefined) {
        setUpLoadImageBool(true);
      }
      // updateRegisterHomeUpLoadFile(file);
      // updateRegisterHomeWholeInfo(file.name, 1);
    }
  };

  return (
    <>
      <BlackButton onClick={handleClick}>
        <input
          ref={inputRef}
          accept="image/*"
          type="file"
          onChange={onUpload}
          style={{ display: "none" }}
        />
        Complete Mission
      </BlackButton>
    </>
  );
};

export default UploadedImage;

interface Props {
  imageUrl: string;
}

const HomeInfoImage: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div
      style={{
        width: "200px", // 원하는 크기로 설정
        height: "150px",
        overflow: "hidden", // 이미지 영역을 넘어가는 부분은 보이지 않도록 설정
        borderRadius: "10px",
      }}
    >
      <img
        src={imageUrl}
        alt="Cropped Image"
        style={{
          width: "200px",
          objectFit: "cover", // 이미지 비율에 맞게 잘리도록 설정
        }}
      />
    </div>
  );
};

const BlackButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 151px;
    height: 44px;

    border-radius: 50px;

    margin-top: 20px;
  }

  background-color: #121212;
  &:hover {
    background-color: #3a3a3a;
  }

  color: white;

  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;
