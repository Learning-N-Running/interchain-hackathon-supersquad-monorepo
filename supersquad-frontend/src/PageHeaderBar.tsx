import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";

const PageHeaderBar = () => {
  const router = useRouter();
  const { pathname } = router;

  const shouldShowProfilePath = [
    "/challenges/diet",
    "/",
    "/myChallenges/ongoing",
    "/forDemo",
  ];

  const shouldShowHeaderTitlePath: { [key: string]: string } = {
    "/myChallenges/ongoing": "My Challenges",
  };

  return (
    <Container>
      {shouldShowProfilePath.includes(pathname) ? (
        <>
          <GoBackButton
            src="/PageHeaderBar/chevron-left.svg"
            alt="goBack"
            onClick={() => {
              router.push("/forDemo");
            }}
          />
          {pathname in shouldShowHeaderTitlePath && (
            <PageHeaderTitle>
              {shouldShowHeaderTitlePath[pathname]}
            </PageHeaderTitle>
          )}

          <ProfileImage src="/PageHeaderBar/profileEx.svg" alt="profileEx" />
          <NotificationButton
            src="/PageHeaderBar/notification.svg"
            alt="notification"
          />
          <SearchButton src="/PageHeaderBar/search.svg" alt="search" />
        </>
      ) : (
        <>
          <GoBackButton
            src="/PageHeaderBar/chevron-left.svg"
            alt="goBack"
            onClick={() => {
              router.push("/forDemo");
            }}
          />
        </>
      )}
    </Container>
  );
};

export default PageHeaderBar;

const Container = styled.div`
  position: fixed;
  z-index: 100;

  width: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;

  @media (max-width: 2160px) {
    //PC
    height: 96px;
  }
  @media (max-width: 576px) {
    //mobile
    height: 48px;
  }

  background-color: white;
`;

const GoBackButton = styled.img`
  position: absolute;
  @media (max-width: 2160px) {
    //PC
    width: 48px;
    height: 48px;

    left: 48px;
  }
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;

    left: 24px;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 33px;
    height: 33px;
    right: 24px;
  }
`;

const NotificationButton = styled.img`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;
    right: 65px;
  }
`;

const SearchButton = styled.img`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    width: 24px;
    height: 24px;
    right: 97px;
  }
`;

const PageHeaderTitle = styled.div`
  position: absolute;
  /* @media (max-width: 2160px) {
    //PC
    
  } */
  @media (max-width: 576px) {
    //mobile
    left: 60px;
    font-size: 24px;
    font-weight: 500;
  }
`;
