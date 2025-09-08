import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import type { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ email, password, name, surname, cellNumber }))
      .unwrap()
      .then(() => {
        toast.success('Registered successfully! Please login.');
        navigate('/login');
      })
      .catch((error) => toast.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 mb-2 w-full" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 mb-2 w-full" required />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 mb-2 w-full" required />
      <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" className="border p-2 mb-2 w-full" required />
      <input type="tel" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} placeholder="Cell Number" className="border p-2 mb-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600 cursor-pointer">Register</button>
    </form>
  );
};

export default Register;