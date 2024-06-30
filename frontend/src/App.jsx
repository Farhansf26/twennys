import Header from './components/layout/Header'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import useUserRoutes from './routes/UserRoutes'
import useAdminRoutes from './routes/AdminRoutes'
import NotFound from './components/layout/NotFound'

function App() {

  const userRoutes = useUserRoutes()
  const adminRoutes = useAdminRoutes()

  return (
    <>
      <Header/>
      <Toaster position='top-center'/>

      <div className='container'>
        <Routes>
          {userRoutes}
          {adminRoutes}
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
