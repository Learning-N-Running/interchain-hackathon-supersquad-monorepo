import styled from "styled-components";
import React, { useState } from "react";
import UploadedImage from "../../src/UploadedImage";
import { useRecoilState } from "recoil";
import { upLoadImageBoolState } from "../../src/lib/states";

const ProoveDiet = () => {
  const [upLoadImageBool, setUpLoadImageBool] =
    useRecoilState(upLoadImageBoolState);
  return (
    <Container>
      <CheckImage src="/pages/proove/diet/purpleCheck.svg" alt="prooveCheck" />
      {upLoadImageBool == false ? (
        <>
          <ProoveTitle>Snap Your Scale</ProoveTitle>
          <ProoveDetail>
            Take a picture of your scale everyday to proove your weight. <br />
            Remind to have your both feet shown!
          </ProoveDetail>
          <UploadedImage />
        </>
      ) : (
        <>
          <ProoveTitle>Congrats</ProoveTitle>
          <ProoveDetail>You have completed today&apos;s challenge</ProoveDetail>
          <BlackButton style={{ marginTop: "30px" }}>
            Check Your Status
          </BlackButton>
        </>
      )}
    </Container>
  );
};

export default ProoveDiet;

const Container = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: fit-content;
  }

  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: red; */
  /* border: 1px solid green;
  box-sizing: border-box; */
`;

const CheckImage = styled.img`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 48px;
    height: 48px;
    margin-top: 180px;
  }
`;

const ProoveTitle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    width: 261px;
    margin-top: 20px;

    font-size: 24px;
  }
  font-weight: 600;
  color: #121212;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProoveDetail = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    margin-top: 5px;
    width: 261px;

    font-size: 14px;
  }
  font-weight: 500;
  line-height: 1.5;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

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
