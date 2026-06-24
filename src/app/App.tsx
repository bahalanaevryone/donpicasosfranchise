import { RouterProvider } from 'react-router';
import { router } from './routes';
import FoodPatternBackground from './components/FoodPatternBackground';

export default function App() {
  return (
    <>
      <FoodPatternBackground />
      <div className="relative z-10 min-h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
