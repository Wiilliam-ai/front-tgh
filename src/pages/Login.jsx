import { useEffect, useState } from "react";
import Error from "../components/alerts/Error";
import apiClient from "../conf/axiosApi";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await apiClient.get("/customer/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        if (result.data?.cardId) {
          navigate("/intranet");
        }
      } catch (error) {
        console.error("Error");
      }
    }

    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, [navigate])
  

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.email.trim() === "" || state.password.trim() === "") {
      setError(true);
      setErrorMessage({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      setTimeout(() => {
        setError(false);
        setErrorMessage({});
      }, 1500);
      return;
    }
    try {
      const { data } = await apiClient.post("/customer/login", {...state});
      localStorage.setItem("token", data.token);
      if (data.status === true) {
        navigate("/intranet");
      }
    } catch (error) {
      setError(true);
      setErrorMessage({
        message: error.response.data?.msg,
        type: "error",
      });
      setTimeout(() => {
        setError(false);
        setErrorMessage({});
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Meraki UI
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Iniciar Sesión
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                {error && <Error result={errorMessage} />}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={state.email}
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={state.password}
                    placeholder="Ingrese su clave"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <input
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    type="submit"
                    value="Iniciar Sesión"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
