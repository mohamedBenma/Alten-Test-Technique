import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-full h-full bg-gray-100 p-4 space-y-4">
      <button onClick={() => navigate('/home')} className="flex items-center space-x-2 text-left hover:text-blue-600">
        <i className="pi pi-home" />
        <span>Accueil</span>
      </button>
      <button onClick={() => navigate('/products')} className="flex items-center space-x-2 text-left hover:text-blue-600">
        <i className="pi pi-barcode" />
        <span>Produits</span>
      </button>
       <button onClick={() => navigate('/contact')} className="flex items-center space-x-2 text-left hover:text-blue-600">
        <i className="pi pi-envelope" />
        <span>Contact</span>
      </button>
    </aside>
  );
};

export default Sidebar;