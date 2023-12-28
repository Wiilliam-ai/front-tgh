import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Client from "./components/layouts/Client"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/intranet" element={<Client/>}>
          <Route index element={<h1>Welcome to system</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App