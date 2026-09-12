export const metadata = {
  title: "wont-be-late API",
  description: "Backend for the Will I be late? Newbithon project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "monospace", padding: 24 }}>{children}</body>
    </html>
  );
}
