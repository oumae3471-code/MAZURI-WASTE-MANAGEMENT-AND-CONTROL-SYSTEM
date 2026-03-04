import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collections: [],
  filteredCollections: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  pageSize: 10
};

const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    fetchCollectionsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCollectionsSuccess: (state, action) => {
      state.loading = false;
      state.collections = action.payload.data;
      state.total = action.payload.total;
    },
    fetchCollectionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilteredCollections: (state, action) => {
      state.filteredCollections = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addCollection: (state, action) => {
      state.collections.unshift(action.payload);
    },
    updateCollection: (state, action) => {
      const index = state.collections.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.collections[index] = action.payload;
      }
    },
    deleteCollection: (state, action) => {
      state.collections = state.collections.filter(c => c._id !== action.payload);
    }
  }
});

export const {
  fetchCollectionsRequest,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  setFilteredCollections,
  setCurrentPage,
  addCollection,
  updateCollection,
  deleteCollection
} = collectionSlice.actions;

export default collectionSlice.reducer;
