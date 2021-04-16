import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { connect } from 'react-redux';
import { formatMoney } from '../../utils/formatting_util';

const mapStateToProps = state => {
  return { lastLogin: state.session.lastLogin }
}

class Snapshot extends React.Component{
  constructor(props){
    super(props);
    this.state = { infoTooltip: false }
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  formatDate(date){
    let dateString = date.toDateString();
    dateString = dateString.slice(4,10) + ',' + dateString.slice(10);
    let timeString = date.toLocaleTimeString();
    timeString = timeString.slice(0, 4) + timeString.slice(7)
    return (dateString + ' • ' + timeString)
  };

  toggleTooltip(){
    this.setState({ infoTooltip: !this.state.infoTooltip })
  }

  render(){
    const totalBalance = Object.values(this.props.categoryBalances).reduce((sum, balance) => sum + balance)
    return(
      <div className='snapshot-container'>
          {this.state.infoTooltip && 
            <div className='info-tooltip-container'>
              <div className='arrow-holder'><span id='dropdown-arrow'></span></div>
              <p>Your Total Balance is the sum of the available balances of your Money Market, Online Savings and Interest Checking accounts. </p>
            </div>
          }
        <section className='left-view'>
          <h1>Snapshot</h1>
          <p>Hello, {this.props.currentUser.fname}</p>
          <p>Last Login: {this.formatDate(new Date(window.lastLogin))}</p>

          <h2 id='balance-header'>
            TOTAL BALANCE
            <span className='question-icon' onMouseOver={this.toggleTooltip} onMouseOut={this.toggleTooltip}>?</span>
          </h2>
          <h2 id='balance'>{formatMoney(totalBalance)}</h2>
        </section>

        <svg>
          <PieChart
            data={[
              { title: '', value: this.props.categoryBalances['Interest Checking'], color: '#03A9F4' },
              { title: '', value: this.props.categoryBalances['High-Yield Savings'], color: '#3F51B5' },
              { title: '', value: this.props.categoryBalances['Money Markets'], color: '#009688' },
            ]}
            radius={44}
            startAngle={-90}
            lineWidth={20}
          />;
        </svg>

        <section className='right-view'>
            <div>
              <h1>BANK ACCOUNTS</h1>
              <h1>AVAILABLE BALANCE</h1>
            </div>
            <ul>
              {Object.keys(this.props.categoryBalances).map(category => {
                if (category === 'total') return null;
                return <li key={Math.floor(Math.random() * 1000)}>
                  <div className='account-div'>
                    <h1>{category}</h1>
                    <h1>{formatMoney(this.props.categoryBalances[category])}</h1>
                  </div>
                </li>
              })}
            </ul>
        </section>
      </div>
    )
  }
};

export default connect(mapStateToProps)(Snapshot);