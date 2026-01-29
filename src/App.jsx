import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Board from "./pages/Board";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [prefilledEmail, setPrefilledEmail] = useState("");

  const goToLoginWithEmail = (email) => {
    setPrefilledEmail(email);
    setCurrentPage("login");
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="w-full min-h-screen bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {currentPage === "login" && (
            <Login
              onLogin={() => setCurrentPage("drag")}
              onBackToRegister={() => setCurrentPage("register")}
              prefilledEmail={prefilledEmail}
            />
          )}

          {currentPage === "register" && (
            <Register
              onBackToLogin={() => setCurrentPage("login")}
              onGoToLoginWithEmail={goToLoginWithEmail}
            />
          )}

          {currentPage === "drag" && <Board />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
