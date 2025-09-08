import { createSlice, createAsyncThunk} from'@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  quantity: number;
  notes?: string;
  category: string;
  imageUrl?: string;
  dateAdded: string;
}

interface ListsState {
  shoppingLists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  shoppingLists: [],
  loading: false,
  error: null,
};

// Fetch lists
export const fetchLists = createAsyncThunk<ShoppingList[], number, { rejectValue: string }>(
  'lists/fetchLists',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<ShoppingList[]>(`http://localhost:3001/shoppingLists?userId=${userId}`);
      return response.data;
    } catch {
      return rejectWithValue('Failed to fetch lists');
    }
  }
);

// Add list
export const addList = createAsyncThunk<ShoppingList, Omit<ShoppingList, 'id'>, { rejectValue: string }>(
  'lists/addList',
  async (listData, { rejectWithValue }) => {
    try {
      const response = await axios.post<ShoppingList>('http://localhost:3001/shoppingLists', {
        ...listData,
        dateAdded: new Date().toISOString(),
      });
      return response.data;
    } catch {
      return rejectWithValue('Failed to add list');
    }
  }
);

// Update list
export const updateList = createAsyncThunk<ShoppingList, ShoppingList, { rejectValue: string }>(
  'lists/updateList',
  async (listData, { rejectWithValue }) => {
    try {
      const response = await axios.put<ShoppingList>(
        `http://localhost:3001/shoppingLists/${listData.id}`,
        listData
      );
      return response.data;
    } catch {
      return rejectWithValue('Failed to update list');
    }
  }
);

// Delete list
export const deleteList = createAsyncThunk<number, number, { rejectValue: string }>(
  'lists/deleteList',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
      return id;
    } catch {
      return rejectWithValue('Failed to delete list');
    }
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action: PayloadAction<ShoppingList[]>) => {
        state.shoppingLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        state.shoppingLists.push(action.payload);
      })

      // Update
      .addCase(updateList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        const index = state.shoppingLists.findIndex((list) => list.id === action.payload.id);
        if (index !== -1) state.shoppingLists[index] = action.payload;
      })

      // Delete
      .addCase(deleteList.fulfilled, (state, action: PayloadAction<number>) => {
        state.shoppingLists = state.shoppingLists.filter((list) => list.id !== action.payload);
      });
  },
});

export default listsSlice.reducer;
