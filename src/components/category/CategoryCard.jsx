import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, description, image, itemCount, path, icon }) => {
  return (
    <Link
      to={path}
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">{title}</h3>
          {icon && <span className="text-3xl">{icon}</span>}
        </div>
        
        {description && (
          <p className="text-sm text-white/90 mb-3">{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          {itemCount !== undefined && (
            <span className="text-sm text-white/80">{itemCount} Ürün</span>
          )}
          <div className="flex items-center space-x-1 text-sm font-medium group-hover:translate-x-1 transition-transform">
            <span>Keşfet</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
