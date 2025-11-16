export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container py-4">
        <div className="text-center text-sm text-gray-600">
          © {currentYear} Airport CMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
