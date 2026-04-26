import "./WalletDashboard.css"
import React from "react"

import logoImg from "../../assets/img/nitrogem.png"

import { ConnectWalletButton } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/solflare/styles.css';

export const WalletDashboard = () => {

  return (
    <div className="walletDashboardPage">
      <div className="walletDashboardInner">
        <img className="walletDashboardLogo" src={logoImg} alt="" />
        <h1 className="walletDashboardBrand">NitroGem</h1>
        <p className="walletDashboardTagline">
          Discover, vote on, and promote tokens — connect a wallet to open your dashboard.
        </p>
        <p className="walletDashboardContinue">Connect a wallet to continue</p>
        <div className="walletDashboardPanel">
          <p className="walletDashboardSubtitle">
            Choose a browser wallet you have installed (MetaMask, Rabby, Phantom, and others).
          </p>
          <ConnectWalletButton userId="sousa" />
        </div>
      </div>
    </div>
  )
}

export default WalletDashboard
