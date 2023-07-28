import Nav from "components/Nav";
export default function MainLayout({ children, color }) {
  return (
    <div>
      <Nav color={color} />
      {children}
    </div>
  );
}
