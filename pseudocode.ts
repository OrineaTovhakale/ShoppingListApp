// db.json
{
  "users": [],
  "shoppingLists": []
}

// Redux Store
configureStore({
  reducer: {
    auth: authReducer,
    lists: listsReducer
  }
})

// authSlice
initialState: { user: null, isAuthenticated: false }
reducers: login, logout
extraReducers: registerThunk, loginThunk (hash compare with bcrypt.compareSync)

// listsSlice
initialState: { shoppingLists: [], loading: false }
extraReducers: fetchListsThunk, addListThunk, updateListThunk, deleteListThunk

// PrivateRoute Component
if (!isAuthenticated) redirect to /login
else render children

// Login Page
form submit: dispatch(loginThunk({email, password}))

// Register Page
form submit: hashedPw = bcrypt.hashSync(password, 10)
dispatch(registerThunk({email, hashedPw, name, ...}))

// Home Page
useEffect: dispatch(fetchLists(userId))
display lists in table/cards
search: useSearchParams, filter lists by name.includes(search)
sort: parse params, sort lists array by field/order
add form: dispatch(addList({name, quantity, ... , userId}))
edit/delete: similar

// Profile Page
fetch user, display form
update: dispatch(updateUserThunk(updatedData))

// Navbar
Links: Home, Profile, Logout (dispatch logout)