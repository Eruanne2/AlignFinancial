import React from 'react';
import SplashNavbar from './splash_navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class Splash extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checking: true,
      savings: true,
      mm: true,
      cd: false,
      ira: false
    }
  };

  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <h1>better banking starts <span>here.</span></h1>
          <p>It’s not about finding a place for your money, it’s about finding</p>
          <p>the right place for your money.</p>
          <Link to='/open-account'><button>Open Account</button></Link>
        </section>
        <section className='compare-accts-panel'>
          <h1>Don’t just store your money. Grow it.</h1>
          <p>We offer some of the most competitive rates around, and with</p> 
          <p>interest compounded daily, your money grows even faster. </p>
          <p><span>Now that’s banking in your best interest. </span></p>
          <div className='mini-nav'>
            <h2>Featured</h2>
            <h2>Savings</h2>
            <h2>Checking</h2>
            <h2>Money Market</h2>
            <h2>Coming Soon</h2>
          </div>
          <ul>
            {this.state.savings &&
              <div className='acct-display'>
                <h1>Online Savings</h1>

                <section className='standout'>
                  <i><FontAwesomeIcon icon={faCheckCircle}/></i>
                  <p><span>Best for:</span> Earning interest at a variable rate with the ability to access your money at any time.</p>
                </section>
                <section className='apy'>
                  <p>Annual Percentage Yield</p>
                  <h1>1.20%</h1>
                  <p>on all balance tiers</p>
                </section>
                <ul className='benefits'>
                  <li>Six withdrawals limit per statement cycle</li>
                  <li>Rate is variable and may change after the account is opened</li>
                  <li>Fees may reduce earnings</li>
                  <li>Coming Soon: Use buckets to organize your money and visualize what you’re saving for</li>
                  <li>Coming Soon: Set up boosters to optimize and maximize your saving</li>
                </ul>
                <button><Link to='/open-account'>Open Account</Link></button>
              </div>
            }

          </ul>
          <p>Annual Percentage Yields (APYs) displayed are accurate as of {new Date().toLocaleDateString('en-GB')}.</p>
          <p>For IRAs, an additional IRS tax may also apply; please consult your tax professional.</p>

        </section>
      </div>
    )
  }
};

export default Splash;