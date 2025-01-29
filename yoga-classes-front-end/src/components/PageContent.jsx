
function PageContent({ title, children }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;