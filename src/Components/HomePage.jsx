import React from 'react'
import Home from '../Images/Home.svg'

const HomePage = () => {



  return (
    <div>
      <header>
        <div className="gif-title">
          <a href="/">
            <img className="svg" src={Home} alt="Home"/>
          </a>
        </div>
      </header>
    </div>
  )
}

export default HomePage
