import ContextWrapper from "./src/context/ContextWrapper";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <ContextWrapper>
      <Navigation />
    </ContextWrapper>
  );
}
