import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ComponentsPage } from './pages/ComponentPage/ComponentsPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AllBooksPage } from './pages/AllBooksPage/AllBooksPage.';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <LandingPage />
            } 
          />
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
          <Route 
            path='/all-books' 
            element={
              <ProtectedRoute> 
                <AllBooksPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
