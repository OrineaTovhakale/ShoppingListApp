import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../store';

interface Props {
  isAuthenticated: boolean;
  logout: () => void;
}

interface State {
  isMenuOpen: boolean;
}

class Navbar extends Component<Props, State> {
  state = { isMenuOpen: false };

  toggleMenu = () => {
    this.setState(prev => ({ isMenuOpen: !prev.isMenuOpen }));
  };

  render() {
    const { isAuthenticated, logout } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <nav className="bg-blue-500 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>Shopping List</div>
          <button className="md:hidden" onClick={this.toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <ul className={`flex flex-col md:flex-row md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          {isAuthenticated ? (
            <>
              <li><Link to="/" className="block py-2 md:py-0">Home</Link></li>
              <li><Link to="/profile" className="block py-2 md:py-0">Profile</Link></li>
              <li><button onClick={logout} className="block py-2 md:py-0">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="block py-2 md:py-0">Login</Link></li>
              <li><Link to="/register" className="block py-2 md:py-0">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);