import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailsList from "./components/EmailsList";
import ReferralsList from "./components/ReferralsList";
import HomeScreen from "./components/HomeScreen";
import { Container } from "@mui/material";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          px: 4,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<UserForm />} />
          <Route path="/emails" element={<EmailsList />} />
          <Route path="/referrals-list" element={<ReferralsList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
