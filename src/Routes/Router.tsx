import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:id',
    element: <ChatRoom />,
  },
]);

export default router;
