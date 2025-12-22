import "@/app/globals.css";

export default function SignInLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="flex h-screen bg-white">{children}</div>
            </body>
        </html>
    )
}