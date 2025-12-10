const CategoryHero = ({ title, description, image }) => {
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl mb-8">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryHero;
