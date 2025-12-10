import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
          )}
          {index === 0 ? (
            <Link
              to={item.path}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              <span>{item.title}</span>
            </Link>
          ) : index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.title}</span>
          ) : (
            <Link
              to={item.path}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
