import React from 'react';

class NewTransferForm extends React.Component {
  render(){
    if (!this.props.accounts) return null;
    return(
      <div className='transfer-form-container'>
        <h1>Transfers</h1>
        
      </div>
    )
  }
};

export default NewTransferForm;