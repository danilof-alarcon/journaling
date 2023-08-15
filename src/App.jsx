import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Home from './pages/HomePage';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
