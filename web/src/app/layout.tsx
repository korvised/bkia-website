import "./globals.css";

export const metadata = {
  title: {
    template: "%s | Bokeo International Airport",
    default: "Bokeo International Airport - Gateway to Laos",
  },
  description: "Experience seamless travel at Bokeo International Airport",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
