import "./WalletDashboard.css"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import logoImg from "../../assets/img/nitrogem.png"
import { AppContext } from "../../context"
import { connectWithProvider } from "../../helpers/wallet"
import { describeInjectedWallets } from "../../helpers/injectedWallets"
import { NotificationManager } from "react-notifications"

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
          <div className="walletDashboardWalletList">
            {wallets.length === 0 ? (
              <p className="walletDashboardEmpty">
                No injected wallets detected. Install a wallet extension and refresh this page.
              </p>
            ) : (
              wallets.map((w) => (
                <button
                  key={w.id || w.name}
                  className="walletDashboardWalletBtn"
                  onClick={() => onPickWallet(w.provider, w.name)}
                  disabled={!!connectingName}
                  type="button"
                >
                  {connectingName === w.name ? `Connecting ${w.name}...` : `Connect ${w.name}`}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletDashboard
