import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ComponentsPage } from './pages/ComponentsPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/component-page' 
            element={
              <ComponentsPage />
            } 
          />
          <Route 
            path='/library' 
            element={
              <ProtectedRoute> 
                <LibraryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/login' 
            element={
              <LoginPage />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
