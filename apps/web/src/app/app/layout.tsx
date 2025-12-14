interface AppLayoutProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export default function AppLayout({ header, children }: AppLayoutProps) {
  return (
    <div className="h-dvh flex flex-col">
      <header>{header}</header>
      <main className="grow p-4 flex flex-col">{children}</main>
    </div>
  );
}
