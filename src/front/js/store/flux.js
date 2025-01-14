import mockData from "../../utils/mockData_Companies.json"

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      news: [],
      companies: {},
      token: localStorage.getItem("token") || "",
      profile: JSON.parse(localStorage.getItem("profile")) || {},
    },
    actions: {
      fetchNews: async (setLoading) => {
        try {
          setLoading(true);
          const resp = await fetch(process.env.BACKEND_URL + "api/news");
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await resp.json();
          console.log(data);
          setStore({ news: data });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
      loadDummyCompanies: async () => {
        try {
            // Reestructuramos los datos para almacenarlos como un objeto
            const companies = mockData.reduce((acc, category) => {
                const [key, value] = Object.entries(category)[0];
                acc[key] = value;
                return acc;
            }, {});

            console.log(companies);
            setStore({ companies });
        } catch (error) {
            console.log(error);
        }
      },
      createUser: async (user) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const data = await resp.json();
          return true;
        } catch (err) {
          console.log("Error sending customer to back backend", err);
        }
      },
        // Verificación si el correo ya está registrado
        checkEmailExists: async (email) => {
          try {
            const resp = await fetch(process.env.BACKEND_URL + "api/check-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email }),
            });
            const data = await resp.json();
            return data.exists; // Regresa true si el correo existe, false si no
          } catch (error) {
            console.log("Error checking email:", error);
            return false;
          }
        },
//*********************************** **************************************************************** */
      getIsLogin: () => {
        return getStore();
      },

      resetLocalStorage: () => {
        const store = getStore();
        localStorage.removeItem("token");
        setStore({ ...store, token: null, profile: null });
      },
      loginUser: async ({ email, contraseña }) => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, contraseña }),
          });
          const data = await resp.json();
          if(data.token){
          console.log(data);
          setStore({ token: data.token });
          localStorage.setItem("token", data.token);
          const user = await getActions().getUserProfile();
          console.log(user);
          // don't forget to return something, that is how the async resolves
          return data.authorize;
          }else{
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      getUserProfile: async () => {
        const store = getStore();
        console.log(store.token);
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "api/profile/user",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + store.token,
              },
            }
          );
          if (resp.status == 200) {
            const data = await resp.json();
            console.log(data);
            setStore({ profile: data });
            localStorage.setItem("profile", JSON.stringify(data)); 
            return true;
          }
          console.log("expired");
          return false;
        } catch (error) {
          console.log("Error loading message from backend", error);
          return false;
        }
      },
      createUser: async (user) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const data = await resp.json();
          return true;
        } catch (err) {
          console.log("Error sending customer to back backend", err);
        }
      },
//************************************************************************************************ */

      logoutUser: () => {
          const store = getStore();
            localStorage.removeItem("token");  // Remove token from localStorage
            localStorage.removeItem("profile");  // Remove user profile from localStorage
          setStore({ ...store, token: null, profile: null });  // Reset store state
      },

      createCompany: async (user1) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "api/registerCompany", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user1),
          });
          const data = await resp.json();
          return true;
        } catch (err) {
          console.log("Error sending customer to back backend", err);
        }
      },
      // logOut: (type) => {
      //   localStorage.removeItem(type);
      //   setStore({ token: null, token1: null, profile: null });
      // },

    },
  };
};

export default getState;
