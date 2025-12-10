import * as LucideIcons from 'lucide-react';

const CategoryIcon = ({ iconName, className = "w-5 h-5", ...props }) => {
  // Get the icon component from Lucide
  const IconComponent = LucideIcons[iconName];
  
  // Fallback to a default icon if not found
  if (!IconComponent) {
    const DefaultIcon = LucideIcons.Box;
    return <DefaultIcon className={className} {...props} />;
  }
  
  return <IconComponent className={className} {...props} />;
};

export default CategoryIcon;
