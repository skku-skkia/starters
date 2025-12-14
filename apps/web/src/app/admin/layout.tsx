interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="p-10">
      <main>{children}</main>
    </div>
  );
}
