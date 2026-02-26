import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import Account from "./pages/Account";

function App() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-200 w-full max-w-4xl min-h-[50vh] flex flex-col items-center justify-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hero" element={<Hero />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default App;
