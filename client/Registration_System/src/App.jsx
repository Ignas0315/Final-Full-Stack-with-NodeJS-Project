import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

// const App = () => {
//     return <></>;
// };

const App = () => <RouterProvider router={routes} />;

export default App;
