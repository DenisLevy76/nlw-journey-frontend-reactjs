import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trip-details',
    element: <TripDetailsPage />,
  },
])

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
