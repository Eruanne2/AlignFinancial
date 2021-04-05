import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Navbar from './navbar';

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout())
  };
};

export default connect(null, mapDispatchToProps)(Navbar);