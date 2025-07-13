const FullScreenSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black-100 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className='bg-white rounded-lg flex items-center justify-center shadow-lg py-2.5 p-3'>
        <div className="animate-spin rounded-full border-4 border-blue-200 border-t-blue-500 w-6 h-6"></div>
        <p className="mx-2 text-black">Loading...</p>
      </div>
    </div>
  );
};
 
export default FullScreenSpinner;