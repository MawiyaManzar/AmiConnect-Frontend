
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface SharedLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  title: string;
}

const SharedLayout = ({ children, showNav = true, title }: SharedLayoutProps) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && (
        <header className="border-b shadow-sm bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amiconnect-primary">
                AmiConnect
              </span>
            </Link>

            <nav>
              <ul className="flex items-center space-x-6">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/recommendations" className="text-gray-600 hover:text-amiconnect-primary">
                        Recommendations
                      </Link>
                    </li>
                    <li>
                      <Button variant="ghost" onClick={logout}>
                        Logout
                      </Button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="text-gray-600 hover:text-amiconnect-primary">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup">
                        <Button>Sign Up</Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {title && <h1 className="text-3xl font-bold mb-6 text-center text-amiconnect-text">{title}</h1>}
          {children}
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} AmiConnect - Amity University</p>
        </div>
      </footer>
    </div>
  );
};

export default SharedLayout;
