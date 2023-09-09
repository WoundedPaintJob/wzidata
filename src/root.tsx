import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="container mx-auto sm:px-4 lg:px-6">
      <Outlet />
    </div>
  );
};
export default Root;
