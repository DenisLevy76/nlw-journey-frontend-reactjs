import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTripPage } from './pages/create-trip'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
])

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
