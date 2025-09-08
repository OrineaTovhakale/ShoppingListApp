import React, { Component } from 'react';

interface Props {
  list: {
    id: number;
    name: string;
    quantity: number;
    notes?: string;
    category: string;
    imageUrl?: string;
    dateAdded: string;
  };
  onEdit: (list: any) => void;
  onDelete: (id: number) => void;
}

class ListCard extends Component<Props> {
  render() {
    const { list, onEdit, onDelete } = this.props;
    return (
      <div className="border p-4 rounded shadow hover:shadow-lg">
        {list.imageUrl && <img src={list.imageUrl} alt={list.name} className="w-full h-32 object-cover mb-2" />}
        <h2 className="text-xl">{list.name}</h2>
        <p>Quantity: {list.quantity}</p>
        <p>Category: {list.category}</p>
        <p>Notes: {list.notes}</p>
        <p>Added: {new Date(list.dateAdded).toLocaleDateString()}</p>
        <button
          onClick={() => onEdit(list)}
          className="bg-yellow-500 text-white p-1 mr-2 hover:bg-yellow-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(list.id)}
          className="bg-red-500 text-white p-1 hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/share/${list.id}`)}
          className="bg-green-500 text-white p-1 mt-2 hover:bg-green-600 cursor-pointer"
        >
          Share
        </button>
      </div>
    );
  }
}

export default ListCard;