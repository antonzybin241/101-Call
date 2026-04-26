import "./WalletDashboard.css"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import logoImg from "../../assets/img/nitrogem.png"
import { AppContext } from "../../context"
import { connectWithProvider } from "../../helpers/wallet"
import { describeInjectedWallets } from "../../helpers/injectedWallets"
import { NotificationManager } from "react-notifications"

import { ConnectWalletButton } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/solflare/styles.css';

export const WalletDashboard = () => {
  const navigate = useNavigate()
  const { handleWalletAddress } = useContext(AppContext)
  const [wallets, setWallets] = useState([])
  const [connectingName, setConnectingName] = useState("")

  const refreshWallets = useCallback(() => {
    setWallets(describeInjectedWallets())
  }, [])

  useEffect(() => {
    refreshWallets()
    const onFocus = () => refreshWallets()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [refreshWallets])

  const onPickWallet = async (provider, name) => {
    setConnectingName(name)
    try {
      const res = await connectWithProvider(provider)
      handleWalletAddress(res.address)
      if (!res.address) {
        NotificationManager.warning(res.status || "Could not connect wallet.")
      } else {
        NotificationManager.success(`Connected with ${name}`)
        navigate("/home", { replace: true })
      }
    } catch (e) {
      NotificationManager.error(e?.message || "Connection error")
    } finally {
      setConnectingName("")
    }
  }

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
