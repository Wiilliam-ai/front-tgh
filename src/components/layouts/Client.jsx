import { Outlet } from "react-router-dom"

const Client = () => {
  return (
    <div>
      <header>This is a header</header>
      <Outlet />
    </div>
  )
}

export default Client