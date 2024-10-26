import Link from 'next/link';

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">This page is available to admins only</h1>
        <p className="text-gray-700 mb-6">
          You can only access this page if you have the appropriate permissions.
        </p>
        <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" href="/">
          
            Return to Homepage
       
        </Link>
      </div>
    </div>
  );
}
