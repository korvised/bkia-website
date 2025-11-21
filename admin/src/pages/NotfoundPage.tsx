import { Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuHouse } from "react-icons/lu";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Code */}
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LuArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <Link
            to="/home"
            className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
          >
            <LuHouse className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
