import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../store';

interface Props {
  isAuthenticated: boolean;
  logout: () => void;
}

class Navbar extends Component<Props> {
  render() {
    const { isAuthenticated, logout } = this.props;
    return (
      <nav className="bg-blue-500 p-4 text-white">
        <ul className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
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