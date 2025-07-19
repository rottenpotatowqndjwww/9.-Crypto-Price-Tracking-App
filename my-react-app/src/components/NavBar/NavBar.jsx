import React, { useContext } from 'react'
import './NavBar.css'
import logo from '../../assets/logo1.png'
import sign_up from '../../assets/arrow_icon.png'
import { Link } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
const NavBar = () => { 

  const {setCurrency} = useContext(CoinContext)
  const currencyHandler =(event)=>{
    switch (event.target.value){

      case "usd" : {
        setCurrency({name : "usd", symbol : "$" })
        break;
      }

      case "eur" : {
        setCurrency({name : "eur", symbol : "€" })
        break;
      }

      case "inr" : {
        setCurrency({name : "inr", symbol : "NRs" })
        break;
      }
      
      default : {
        setCurrency({name: "usd", symbol : "$"})
        break;
      }
    }
           
  }
  return (
    <div className='navbar'>
      <Link to={"/"}> <img src={logo} alt="" className='logo' /></Link>
      <ul>
        <Link to={`/`}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select name="" id="" onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">Euro</option>
            <option value="inr">NPR</option>
        </select>
        <button>Sign Up <img src={sign_up} alt="" /></button>
      </div>
    </div>
  )
}

export default NavBar
