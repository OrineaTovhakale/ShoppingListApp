import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';
import type { AppDispatch, RootState } from '../store';
import { toast } from 'react-toastify';

interface Props {
  user: any;
  updateUser: (userData: any) => void;
}

interface State {
  email: string;
  name: string;
  surname: string;
  cellNumber: string;
  password: string;
}

class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      surname: props.user.surname,
      cellNumber: props.user.cellNumber,
      password: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<State, keyof State>);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { user, updateUser } = this.props;
    const updatedData = {
      ...user,
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      cellNumber: this.state.cellNumber,
      password: this.state.password || user.password,
    };
    updateUser(updatedData);
    toast.success('Profile updated!');
  };

  render() {
    return (
      <div>
        <h1 className="text-2xl mb-4">Profile</h1>
        <form onSubmit={this.handleSubmit} className="max-w-md mx-auto">
          <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" className="border p-2 mb-2 w-full" required />
          <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" className="border p-2 mb-2 w-full" required />
          <input name="surname" value={this.state.surname} onChange={this.handleChange} placeholder="Surname" className="border p-2 mb-2 w-full" required />
          <input name="cellNumber" value={this.state.cellNumber} onChange={this.handleChange} placeholder="Cell Number" className="border p-2 mb-2 w-full" required />
          <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="New Password (optional)" className="border p-2 mb-2 w-full" type="password" />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600 cursor-pointer">Update Profile</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateUser: (userData: any) => dispatch(updateUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);