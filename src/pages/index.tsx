import Head from 'next/head'

import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useWallet } from "@solana/wallet-adapter-react";
import useCandyMachine from '../hooks/use-candy-machine';
import Header from '../components/header';
import Footer from '../components/footer';
import useWalletBalance from '../hooks/use-wallet-balance';
import { shortenAddress } from '../utils/candy-machine';
import usePreSaleContract, { Presale } from '../hooks/use-pre-sale';
import Countdown from 'react-countdown';
import { RecaptchaButton } from '../components/recaptcha-button';
import { Button, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectButton = styled(WalletMultiButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

const Home = () => {
  const [balance] = useWalletBalance()
  const [isActive, setIsActive] = useState(false);
  const wallet = useWallet();

  const presaleContract: Presale = usePreSaleContract();
  const candyMachine = useCandyMachine(presaleContract);

  // Minting status to all mint buttons
  const { isSoldOut, mintStartDate, isMinting, onMint, onMintMultiple, nftsData } = candyMachine;


  return (
    <main className="p-5">
      <Toaster />
      <Head>
        <title>Solana Candy Factory</title>
        <meta name="description" content="Solana blockchain candy machine app boilerplate on top of Metaplex Candy Machine. NextJS, Tailwind, Anchor, SolanaLabs.React, dev/mainnet automation scripts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MintContainer>
        <ConnectButton />

        {wallet.connected &&
          <p className="text-gray-800 font-bold text-lg cursor-default">Address: {shortenAddress(wallet.publicKey?.toBase58() || "")}</p>
        }

        {wallet.connected &&
          <>
            <p className="text-gray-800 font-bold text-lg cursor-default">Balance: {(balance || 0).toLocaleString()} SOL</p>
            <p className="text-gray-800 font-bold text-lg cursor-default">Available/Minted/Total: {nftsData.itemsRemaining}/{nftsData.itemsRedeemed}/{nftsData.itemsAvailable}</p>
          </>
        }
        {wallet.connected &&
          <MintButton
            variant="contained"
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
          >
            {isSoldOut ? (
              "SOLD OUT"
              ) : isActive ? (
                isMinting ? 
                <CircularProgress /> :
                <span>MINT</span>
              ) : 
              <Countdown
                date={mintStartDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            }
          </MintButton>
        }
        <br/>
        <br/>
        {wallet.connected &&
          <MintButton
            variant="contained"
            disabled={isSoldOut || isMinting || !isActive}
            onClick={() => onMintMultiple(10)}
          >
            {isSoldOut ? (
              "SOLD OUT"
              ) : isActive ? (
                isMinting ? 
                <CircularProgress /> :
                <span>MINT 10</span>
              ) : 
              <Countdown
                date={mintStartDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            }
          </MintButton>
        }
      </MintContainer>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <span className="text-gray-800 font-bold text-2xl cursor-default">
      Live in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};

export default Home;



