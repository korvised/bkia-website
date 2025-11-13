interface HeaderProps {
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSignOut }) => (
  <header>
    <h2>Header</h2>
    <button onClick={onSignOut}>Sign Out</button>
  </header>
);
