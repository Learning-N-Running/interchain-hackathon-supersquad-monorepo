import type { AppProps } from "next/app";
import { ChainProvider } from "@cosmos-kit/react";
import { ChakraProvider } from "@chakra-ui/react";
import { aminoTypes, registry } from "../config/defaults";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";

import { assets, chains } from "chain-registry";
import { GasPrice } from "@cosmjs/stargate";
import { SignerOptions } from "@cosmos-kit/core";
import "@interchain-ui/react/styles";
import { defaultTheme } from "../config";

import Head from "next/head";
import { theme } from "../styles/theme";
import PageHeaderBar from "../src/PageHeaderBar";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { PageHeaderBarPlaceholder } from "../src/PlaceHolder";
import { RecoilRoot } from "recoil";
import NavigationBar from "../src/NavigationBar";
import { useRouter } from "next/router";

import { testosmosis, testosmosisAsset } from "../config/testosmosis";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const dontShowPageHeaderBarPath = ["/"];
  const shouldShowNavigationBarPath = ["/myChallenges/ongoing"];

  const signerOptions: SignerOptions = {
    signingStargate: () => {
      return {
        aminoTypes,
        registry,
      };
    },
    signingCosmwasm: (chain) => {
      switch (chain.chain_name) {
        case "osmosis":
        case "osmosistestnet":
          return {
            gasPrice: GasPrice.fromString("0.0025uosmo"),
          };
      }
    },
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider
        chains={[...chains, testosmosis]}
        assetLists={[...assets, testosmosisAsset]}
        wallets={[...keplrWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmoskit.com/",
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        <>
          <GlobalStyle />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>SuperSquad</title>
          </Head>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              {!dontShowPageHeaderBarPath.includes(pathname) && (
                <>
                  <PageHeaderBar />
                  <PageHeaderBarPlaceholder />
                </>
              )}

              <Component {...pageProps} />
              {shouldShowNavigationBarPath.includes(pathname) && (
                <NavigationBar />
              )}
            </ThemeProvider>
          </RecoilRoot>
        </>
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
