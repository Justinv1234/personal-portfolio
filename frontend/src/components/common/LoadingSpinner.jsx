function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-400 mb-4"></div>
      <p>Gathering data…</p>
    </div>
  );
}

export default LoadingSpinner;
