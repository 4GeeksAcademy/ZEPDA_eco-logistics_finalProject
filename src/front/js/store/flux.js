import mockData from "../../utils/mockData_Companies.json"

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      news: [],
      companies: {},
      token: "",
      profile: {}
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
      saveUserData: (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      },
      recoverUser: () => {
        const savedUser = JSON.parse(localStorage.getItem("user")) || null;
        const savedToken = localStorage.getItem("token") || null;
        
        if (savedUser && savedToken) {
          setStore({ profile: savedUser });
          setStore({ token: savedToken });
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
          console.log(data);
          setStore({ token: data.token });
          localStorage.setItem("token", data.token);
          const user = await getActions().getUserProfile(); // actualiza profile
          console.log(user);
          // getActions().saveUserData(user, data.token);
          // don't forget to return something, that is how the async resolves
          return data.authorize;
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
          console.log(data);
          return true;
        } catch (err) {
          console.log("Error sending customer to back backend", err);
        }
      },
//************************************************************************************************ */

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
