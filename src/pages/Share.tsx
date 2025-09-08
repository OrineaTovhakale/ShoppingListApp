import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Share = () => {
  const { id } = useParams();
  const [list, setList] = useState<any>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/shoppingLists/${id}`)
      .then(response => setList(response.data))
      .catch(() => setList(null));
  }, [id]);

  if (!list) return <p>List not found</p>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">{list.name}</h1>
      {list.imageUrl && <img src={list.imageUrl} alt={list.name} className="w-full h-32 object-cover mb-2" />}
      <p>Quantity: {list.quantity}</p>
      <p>Category: {list.category}</p>
      <p>Notes: {list.notes}</p>
      <p>Added: {new Date(list.dateAdded).toLocaleDateString()}</p>
    </div>
  );
};

export default Share;