import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ComponentsPage } from './pages/ComponentPage/ComponentsPage';
import { LibraryLayout } from './components/LibraryLayout/LibraryLayout';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AllBooksPage } from './pages/AllBooksPage/AllBooksPage.';
import { QuoteLibraryPage } from './pages/QuoteLibraryPage/QuoteLibraryPage';
import { BookDetailPage } from './pages/BookDetailPage/BookDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/component-page" element={<ComponentsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/library" element={<LibraryLayout><LibraryPage /></LibraryLayout>} />
        <Route path="/books/:id" element={<LibraryLayout><BookDetailPage /></LibraryLayout>} />
        <Route path="/quote-library" element={<LibraryLayout><QuoteLibraryPage /></LibraryLayout>} />
        <Route path="/all-books" element={<LibraryLayout><AllBooksPage /></LibraryLayout>} />
        <Route path="*" element={<Navigate to="/library" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
