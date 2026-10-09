import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ComponentsPage } from './pages/ComponentsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/component-page' element={<ComponentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
