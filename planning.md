Step-by-Step Planning





Project Setup:





Create React app with TypeScript: npx create-react-app shopping-list-app --template typescript.



Install dependencies: npm install redux react-redux @types/react-redux @reduxjs/toolkit react-router-dom@6 axios bcryptjs json-server react-toastify @types/bcryptjs.



Set up json-server: Create db.json for users and shopping lists. Run json-server --watch db.json --port 3001.



Configure Redux store with slices for auth and shopping lists.



Database Structure (db.json):





Users: Array of objects { id, email, password (hashed), name, surname, cellNumber }.



ShoppingLists: Array of objects { id, userId, name, quantity, notes, category, imageUrl, dateAdded }.



Authentication:





Register: Form to collect info, hash password with bcryptjs, POST to /users.



Login: Form, fetch user by email, compare hashed password, store token/user in Redux/localStorage.



Note: Since json-server lacks real auth, we'll handle hashing in frontend (not ideal for prod, but for task). For "decryption", it's actually hash comparison.



Protected Routes: Use react-router-dom with a PrivateRoute component checking Redux auth state.



Pages and Navigation:





Use BrowserRouter, Routes, Route.



Login/Register: Public.



Home/Profile: Protected.



Navigation: Navbar component with Links.



Shopping List Features:





Home Page: List all user’s lists (GET /shoppingLists?userId=), add form, edit/delete buttons.



CRUD: Axios for API calls, dispatched via Redux actions.



Search: Input field, update URL with ?search=keyword using useSearchParams, filter lists.



Sort: Dropdown for name/category/dateAdded, update URL with ?sort=field&order=asc/desc, sort accordingly.



Categories: Dropdown with options like Groceries, Electronics, etc.



Images: Input for URL or upload simulation (store URL).



Share: Generate a shareable link (e.g., /share/listId), but view-only.



Profile Management:





View/Update profile: Form pre-filled with user data, PUT to /users/id.



Update credentials: Separate form for password change (re-hash).



State Management:





Redux slices: authSlice (user, isAuthenticated), listsSlice (shoppingLists, loading).



Use RTK Query or thunks for async API calls.



UI/UX Enhancements:





Responsive: Media queries for breakpoints (320px, 480px, 768px, 1024px, 1200px).



Notifications: react-toastify for success/error.



Interactivity: CSS hover effects, cursor: pointer.



Accessibility: Alt text for images, ARIA labels.



Git Workflow:





Main branch: Only planning initially.



Development branch: Active coding.



Feature branches: Min 6 (e.g., feat/auth, feat/lists-crud, feat/search-sort, feat/profile, feat/ui-responsive, feat/redux-setup).



Commits: At least 10, frequent for each feature/sub-feature.



Merge to development after features, then PR to main after review.



Optimization/Security:





Lazy loading for components.



Protect routes.



Data privacy: No real sensitive data, but hash passwords.



Documentation:





README.md: Project overview, setup instructions, features, screenshots.