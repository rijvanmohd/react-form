import { SnackbarProvider } from 'notistack';
import SignUp from "./pages/SignUp";
import "./index.css";

function App() {
  return (
    <SnackbarProvider 
      maxSnack={3} 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <SignUp/>
    </SnackbarProvider>
  );
}

export default App;
