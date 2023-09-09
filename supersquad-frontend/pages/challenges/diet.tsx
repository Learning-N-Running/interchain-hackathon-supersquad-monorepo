import styled from "styled-components";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { depositAmountState } from "../../src/lib/states";
import DepositSlider from "../../src/DepositSlider";

import {
  IsOpenProps,
  BackgroundColorProps,
  TitleContentProps,
} from "../../src/lib/interfaces";
import Head from "next/head";
import { useChain } from "@cosmos-kit/react";
import { StdFee } from "@cosmjs/amino";
import { SigningStargateClient } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

import {
  chainassets,
  chainName,
  coin,
  dependencies,
  products,
} from "../../config";

import { WalletStatus } from "@cosmos-kit/core";

import { cosmos } from "osmojs";

const library = {
  title: "OsmoJS",
  text: "OsmoJS",
  href: "https://github.com/osmosis-labs/osmojs",
};

const sendTokens = (
  getSigningStargateClient: () => Promise<SigningStargateClient>,
  setResp: (resp: string) => any,
  address: string,
  calculatedDeposit: number
) => {
  return async () => {
    const stargateClient = await getSigningStargateClient();
    if (!stargateClient || !address) {
      console.error("stargateClient undefined or address undefined.");
      return;
    }

    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

    const msg = send({
      amount: [
        {
          denom: coin.base,
          amount: calculatedDeposit.toString(),
        },
      ],
      toAddress:
        "osmo1al27p5xs74h5kdez7jlxs0hg8qcukqx5w3u4ntuel4s4yltsqdtsgmpxzt",
      fromAddress: address,
    });

    const fee: StdFee = {
      amount: [
        {
          denom: coin.base,
          amount: "2000",
        },
      ],
      gas: "863640", //revert when gas is higher than this.
    };
    const response = await stargateClient.signAndBroadcast(address, [msg], fee);
    setResp(JSON.stringify(response, null, 2));
  };
};

const ChallengesDiet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getSigningStargateClient, address, status, getRpcEndpoint } =
    useChain(chainName);

  const [resp, setResp] = useState("");

  const handleIAmInButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleXButtonClick = () => {
    setIsModalOpen(false);
  };
  const [deposit, setDeposit] = useRecoilState(depositAmountState);
  const calculatedDeposit = deposit * 10 ** 6;
  return (
    <Container>
      <ChallengeThumbnailImage
        src="/pages/challenges/diet/miracleMorningEx.svg"
        alt="miracleMorningChallengeThumbnail"
      />
      {isModalOpen == false && (
        <>
          <ChallengeContainer>
            <TagsContainer>
              <TagWrapper backgroundColor="#ECECEC">Everyday</TagWrapper>
              <TagWrapper backgroundColor="#D6C0F0">1 Month</TagWrapper>
            </TagsContainer>
            <ChallengeTitle>Lose 6lbs</ChallengeTitle>
            <ChallengeInfoContainer>
              <ChallengeInfo
                title="Schedule"
                content="September 11st - October 11st"
              />
              <ChallengeInfo title="Prove" content="Everyday" />
              <ChallengeInfo title="How To" content="Snap your scale" />
              <ChallengeInfo title="Estimated Yield" content="6.86%" />
            </ChallengeInfoContainer>
          </ChallengeContainer>
          <BlackFixedButton onClick={handleIAmInButtonClick}>
            I am in!
          </BlackFixedButton>
        </>
      )}

      <Modal isOpen={isModalOpen}>
        <img
          src="/pages/challenges/diet/x.svg"
          width={24}
          height={24}
          style={{ left: 24, top: 24, position: "absolute" }}
          onClick={handleXButtonClick}
        />
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            marginTop: 44.5,

            height: 44.5,
          }}
        >
          Win Your Goal
        </div>
        <ModalChallengeInfoContainer>
          <ModalChallengeInfoWrapper>
            <div>Period</div>
            <div style={{ fontWeight: 700 }}>Sep 11st - Oct 11st</div>
          </ModalChallengeInfoWrapper>
          <ModalChallengeInfoWrapper>
            <div>Frequency</div>
            <div style={{ fontWeight: 700 }}>Everyday</div>
          </ModalChallengeInfoWrapper>
          <ModalChallengeInfoWrapper style={{ marginBottom: 0 }}>
            <div>Deposit</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontWeight: 700, marginRight: 15 }}>0</div>
              <DepositSlider />
              <div style={{ fontWeight: 700, marginLeft: 15 }}>200</div>
            </div>
          </ModalChallengeInfoWrapper>
        </ModalChallengeInfoContainer>
        <DepositWrapper>${deposit} OSMO</DepositWrapper>
        <UserAverageWrapper>
          Members deposit &nbsp;<OrangeText>100 OSMO</OrangeText>&nbsp;/ 3 week
          in average
        </UserAverageWrapper>
        <BlackFixedButton
          onClick={sendTokens(
            getSigningStargateClient as () => Promise<SigningStargateClient>,
            setResp as () => any,
            address as string,
            calculatedDeposit as number
          )}
        >
          Charge Deposit
        </BlackFixedButton>
      </Modal>
    </Container>
  );
};

export default ChallengesDiet;

const ChallengeInfo = ({ title, content }: TitleContentProps) => {
  return (
    <ChallengeInfoWrapper>
      <img
        src="/pages/challenges/diet/checkmark.svg"
        width={20}
        height={20}
        style={{ left: 24, position: "absolute" }}
      />
      <div
        style={{
          left: 54,
          fontSize: 14,
          fontWeight: 500,
          position: "absolute",
        }}
      >
        {title}
      </div>
      <div
        style={{
          right: 24,
          fontSize: 14,
          fontWeight: 400,
          position: "absolute",
        }}
      >
        {content}
      </div>
    </ChallengeInfoWrapper>
  );
};
interface DepositSliderProps {
  setDeposit: any;
}

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
  justify-content: center;

  /* background-color: red;
  border: 1px solid green;
  box-sizing: border-box; */
`;

const ChallengeThumbnailImage = styled.img`
  position: absolute;
  width: 100%;

  top: 0px;
`;

const ChallengeContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: 430px;

    background-color: white;

    top: 290px;
  }

  position: absolute;

  width: 100%;

  display: flex;
  flex-direction: column;
`;

const TagsContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    height: 27px;
    margin-top: 20px;
    padding-left: 24px;
  }
  width: 100%;
  display: flex;

  /* box-sizing: content-box;
  background-color: red;
  border: 1px solid black; */
`;

const TagWrapper = styled.div<BackgroundColorProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 3px;

    margin-right: 10px;

    height: 27px;

    border-radius: 10px;

    font-size: 14px;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
`;

const ChallengeTitle = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    //mobile
    font-size: 24px;
    text-align: center;

    margin-left: 24px;
    margin-top: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ChallengeInfoContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 20px;
  }

  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: white;

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ChallengeInfoWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 345px;
    height: 50px;

    border-radius: 20px;

    margin-bottom: 14px;
  }

  position: relative;
  display: flex;
  align-items: center;

  background-color: #f6f6f6;
`;

const BlackFixedButton = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 60px;

    border-radius: 20px;

    margin-bottom: 14px;
  }

  position: fixed;
  bottom: 0px;

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

const Modal = styled.div<IsOpenProps>`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    height: 390px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1); // 그림자 추가
  }

  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;

  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.3s ease-in-out;
`;

const ModalChallengeInfoContainer = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    margin-top: 20px;
    width: 343px;
  }

  /* border: 1px solid black;
  box-sizing: border-box; */
`;

const ModalChallengeInfoWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    height: 21px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DepositWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 48px;

    margin-top: 20px;
    padding-left: 12px;

    border-radius: 8px;
  }

  display: flex;
  align-items: center;
  text-align: center;

  border: 1px solid #ececec;
`;

const UserAverageWrapper = styled.div`
  /* @media (max-width: 2160px) {
    //PC
  } */
  @media (max-width: 576px) {
    width: 343px;
    height: 22px;
    font-size: 14px;
  }
  color: #898989;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const OrangeText = styled.span`
  color: #eb4826;
`;
