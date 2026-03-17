export const metadata = {
  title: "Student Job Platform",
  description: "Сайт поиска работы для студентов",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}