import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import Journaling from './pages/JournalingPage';
import theme from './utils/theme';


function App() {
  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Journaling />}/>
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App
