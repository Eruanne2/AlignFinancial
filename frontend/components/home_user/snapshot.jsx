import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { lastLogin: state.session.lastLogin }
}

class Snapshot extends React.Component{
  formatDate(date){
    let dateString = date.toDateString();
    dateString = dateString.slice(4,10) + ',' + dateString.slice(10);
    let timeString = date.toLocaleTimeString();
    timeString = timeString.slice(0, 4) + timeString.slice(7)
    return (dateString + ' • ' + timeString)
  };

  render(){
    return(
      <div className='snapshot-container'>
        <section className='left-view'>
          <h1>Snapshot</h1>
          <p>Hello, {this.props.currentUser.fname}</p>
          <p>Last Login: {this.formatDate(this.props.lastLogin)}</p>  {/* Apr 11, 2021 • 7:52 PM ET */}

          <h2 id='balance-header'>TOTAL BALANCE<span className='question-icon'>?</span></h2>
          <h2 id='balance'>${this.props.categoryBalances.total}</h2>
        </section>

        <svg>
          <PieChart
            data={[
              { title: 'sldj', value: this.props.categoryBalances['Interest Checking'], color: '#03A9F4' },
              { title: 'sld', value: this.props.categoryBalances['High-Yield Savings'], color: '#3F51B5' },
              { title: 'sldfkj', value: this.props.categoryBalances['Money Markets'], color: '#009688' },
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
                    <h1>${this.props.categoryBalances[category]}</h1>
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