/** Page-fade перехід між сторінками (template ремонтується на кожній навігації). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
