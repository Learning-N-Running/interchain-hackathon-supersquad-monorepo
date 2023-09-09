import styled from "styled-components";
import React from "react";
import { IsClickedProps } from "@/src/lib/interfaces";
import { useRouter } from "next/router";

export const MyChallengesPageHeaderBar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <MyChallengesPageHeaderBarContainer>
      <MyChallengesPageHeaderBarWrapper
        isClicked={pathname === "/myChallenges/ongoing"}
        onClick={() => {
          router.push("/myChallenges/ongoing");
        }}
      >
        Ongoing (1)
      </MyChallengesPageHeaderBarWrapper>
      <MyChallengesPageHeaderBarWrapper
        isClicked={pathname === "/myChallenges/completed"}
        onClick={() => {
          router.push("/myChallenges/completed");
        }}
      >
        Completed (14)
      </MyChallengesPageHeaderBarWrapper>
    </MyChallengesPageHeaderBarContainer>
  );
};

const MyChallengesPageHeaderBarContainer = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    top: 68px;
    height: 30px;
  }
  position: fixed;
  z-index: 100;
  width: 100%;

  background-color: white;

  display: flex;

  /* border: 1px solid black;
    box-sizing: border-box; */
`;

const MyChallengesPageHeaderBarWrapper = styled.div<IsClickedProps>`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    font-size: 14px;
  }
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-weight: 500;
  color: #6f7789;

  border-bottom: ${(props) => (props.isClicked ? "1px solid #121212" : "none")};
  box-sizing: border-box;
`;
