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
            <h2 onClick={e=>this.setState({ checking: true, savings: true, mm: true, ira: false, cd: false})}>
              Featured
            </h2>
            <h2 onClick={e=>this.setState({ checking: false, savings: true, mm: false, ira: false, cd: false})}>
              Savings
            </h2>
            <h2 onClick={e=>this.setState({ checking: true, savings: false, mm: false, ira: false, cd: false})}>
              Checking
            </h2>
            <h2 onClick={e=>this.setState({ checking: false, savings: false, mm: true, ira: false, cd: false})}>
              Money Market
            </h2>
            <h2 onClick={e=>this.setState({ checking: false, savings: false, mm: false, ira: true, cd: true})}>
              Coming Soon
            </h2>
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
            {this.state.checking &&
              <div className='acct-display'>
                <h1>Interest Checking</h1>

                <section className='standout'>
                  <i><FontAwesomeIcon icon={faCheckCircle}/></i>
                  <p><span>Best for:</span> Unlimited deposits and withdrawals as well as access to bill pay and Zelle®, checks and debit cards.</p>
                </section>
                <section className='apy'>
                  <p>Annual Percentage Yield</p>
                  <h1>0.50%</h1>
                  <p>on all balance tiers</p>
                </section>
                <ul className='benefits'>
                  <li>Use any Allpoint® ATM in the U.S. for free, plus reimbursements of up to $10 per statement cycle for fees charged at other ATMs nationwide</li>
                  <li>Rate is variable and may change after the account is opened</li>
                  <li>Fees may reduce earnings</li>
                </ul>
                <button><Link to='/open-account'>Open Account</Link></button>
              </div>
            }
            {this.state.mm &&
              <div className='acct-display'>
                <h1>Money Market</h1>

                <section className='standout'>
                  <i><FontAwesomeIcon icon={faCheckCircle}/></i>
                  <p><span>Best for:</span> Unlimited deposits as well as access to Zelle®, checks and debit cards. Limited withdrawals.</p>
                </section>
                <section className='apy'>
                  <p>Annual Percentage Yield</p>
                  <h1>1.50%</h1>
                  <p>on all balance tiers</p>
                </section>
                <ul className='benefits'>
                  <li>Debit card and check access</li>
                  <li>Unlimited deposits and ATM withdrawals + 6 additional withdrawals per statement cycle</li>
                  <li>Rate is variable and may change after the account is opened</li>
                  <li>Fees may reduce earnings</li>
                </ul>
                <button><Link to='/open-account'>Open Account</Link></button>
              </div>
            }
            {this.state.cd &&
              <div className='acct-display'>
                <h1>Raise Your Rate CD</h1>

                <section className='standout'>
                  <i><FontAwesomeIcon icon={faCheckCircle}/></i>
                  <p><span>Best for:</span> Earning interest with the flexibility to raise your CD rate. If our CD rate goes up, yours can too.</p>
                </section>
                <section className='apy'>
                  <p>Annual Percentage Yield</p>
                  <h1>1.55%</h1>
                  <p>on all balance tiers</p>
                </section>
                <ul className='benefits'>
                  <li>No minimum deposit required</li>
                  <li>Start with a great rate, plus have the opportunity to increase your rate once over the 2-year term or twice over the 4-year term, if our rate for your term and balance tier goes up</li>
                  <li>Early withdrawal penalty will apply</li>
                </ul>
                <button><Link to='/open-account'>Open Account</Link></button>
              </div>
            }
            {this.state.ira &&
              <div className='acct-display'>
                <h1>IRA High Yield CD</h1>

                <section className='standout'>
                  <i><FontAwesomeIcon icon={faCheckCircle}/></i>
                  <p><span>Best for:</span> Maximum savings at a fixed rate when you lock in funds for the term length.</p>
                </section>
                <section className='apy'>
                  <p>Annual Percentage Yield</p>
                  <h1>1.55%</h1>
                  <p>on all balance tiers</p>
                </section>
                <ul className='benefits'>
                  <li>Maximum savings with a fixed rate</li>
                  <li>Available as Roth, SEP or Traditional IRA</li>
                  <li>Your deposits are insured by the FDIC up to the maximum allowed by law</li>
                  <li>Early withdrawal penalty will apply</li>
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