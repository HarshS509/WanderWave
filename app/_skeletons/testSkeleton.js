// components/Skeleton.js

const Skeleton = () => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-24 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
