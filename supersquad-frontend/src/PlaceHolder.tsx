import styled from "styled-components";
import React from "react";

export const PageHeaderBarPlaceholder = styled.div`
  @media (max-width: 2160px) {
    //PC
    height: 96px;
  }
  @media (max-width: 576px) {
    //mobile
    height: 48px;
  }
`;

export const MyChallengesPageHeaderBarPlaceholder = styled.div`
  /* @media (max-width: 2160px) {
      //PC
    } */
  @media (max-width: 576px) {
    //mobile
    margin-top: 20px;
    height: 30px;
  }
`;
