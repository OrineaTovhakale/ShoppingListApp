import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, addList, updateList, deleteList } from '../features/lists/listsSlice';
import type { RootState, AppDispatch } from '../store';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListCard from '../components/ListCard';

const Home = () => {
  const { shoppingLists, loading } = useSelector((state: RootState) => state.lists);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'name';
  const order = searchParams.get('order') || 'asc';

  useEffect(() => {
    if (user) dispatch(fetchLists(user.id));
  }, [dispatch, user]);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const listData = { name, quantity, notes, category, imageUrl, userId: user!.id };
    if (editId) {
      const existingList = shoppingLists.find(list => list.id === editId);
      if (!existingList) {
        toast.error('List not found!');
        return;
      }
      dispatch(updateList({ ...listData, id: editId, dateAdded: existingList.dateAdded }))
        .then(() => toast.success('List updated!'));
      setEditId(null);
    } else {
      dispatch(addList({ ...listData, dateAdded: new Date().toISOString() }))
        .then(() => toast.success('List added!'));
    }
    resetForm();
  };

  const handleEdit = (list: any) => {
    setName(list.name);
    setQuantity(list.quantity);
    setNotes(list.notes || '');
    setCategory(list.category);
    setImageUrl(list.imageUrl || '');
    setEditId(list.id);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteList(id))
      .then(() => toast.success('List deleted!'));
  };

  const resetForm = () => {
    setName('');
    setQuantity(1);
    setNotes('');
    setCategory('');
    setImageUrl('');
  };

  const filteredLists = shoppingLists
    .filter(list => list.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sort === 'category') return order === 'asc' ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
      if (sort === 'dateAdded') return order === 'asc' ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime() : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      return 0;
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value, sort, order });
  };

  const handleSortChange = (newSort: string) => {
    const newOrder = sort === newSort && order === 'asc' ? 'desc' : 'asc';
    setSearchParams({ search, sort: newSort, order: newOrder });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Shopping Lists</h1>
      
      {/* Add/Edit Form */}
      <form onSubmit={handleAddOrUpdate} className="mb-8">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} placeholder="Quantity" className="border p-2 mr-2" required />
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="border p-2 mr-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mr-2" required>
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="border p-2 mr-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 hover:bg-blue-600 cursor-pointer">{editId ? 'Update' : 'Add'}</button>
      </form>
      
      {/* Search and Sort */}
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search by name" className="border p-2 mb-4 w-full" />
      <div className="mb-4">
        Sort by: 
        <button onClick={() => handleSortChange('name')} className="ml-2 hover:underline">Name</button>
        <button onClick={() => handleSortChange('category')} className="ml-2 hover:underline">Category</button>
        <button onClick={() => handleSortChange('dateAdded')} className="ml-2 hover:underline">Date Added</button>
      </div>
      
      {/* Lists Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLists.map(list => (
          <ListCard key={list.id} list={list} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;