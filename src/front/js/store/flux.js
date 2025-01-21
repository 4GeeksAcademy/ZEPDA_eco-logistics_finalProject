import mockData from "../../utils/mockData_Companies.json"

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      news: [],
      companies: {},
      token: localStorage.getItem("token") || "",
      profile: JSON.parse(localStorage.getItem("profile")) || {},
      favoriteCompanies: []
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
          // console.log(data); // lista de noticias descargadas de la API
          setStore({ news: data });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
      // --- CLOUDINARY ---
      uploadImage: async (file, type = undefined, id = null) => {
        const formData = new FormData();
        formData.append('file', file);
      
        // Añadir los IDs al formulario si están presentes
        if (type !== undefined) {
          switch(type) {
            case 'user':
              formData.append('user_id', id);
              break;
            case 'company':
              formData.append('company_id', id);
              break;
            default:
              break;
          }
        }
      
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/upload`, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const data = await response.json();
            return data; // Devuelve los datos de la imagen subida
          } else {
            throw new Error('Error subiendo la imagen');
          }
        } catch (error) {
          console.error('Error subiendo la imagen:', error);
          throw error;
        }
      },      
      getAllImages: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/images`, { method: 'GET' });
      
          if (response.ok) {
            const data = await response.json();
            return data; // Devuelve la lista de imágenes
          } else {
            throw new Error('Error obteniendo las imágenes');
          }
        } catch (error) {
          console.error('Error obteniendo las imágenes:', error);
          throw error;
        }
      },
      getImageUrl: async (publicId) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/image/${publicId}`, {
            method: 'GET',
          });
      
          if (response.ok) {
            const data = await response.json();
            return data.url; // Devuelve la URL de la imagen
          } else {
            throw new Error('Error obteniendo la imagen');
          }
        } catch (error) {
          console.error('Error obteniendo la imagen:', error);
          throw error;
        }
      },
      deleteImage: async (publicId) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/delete/${publicId}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            const data = await response.json();
            return data; // Devuelve la respuesta de la imagen eliminada
          } else {
            throw new Error('Error eliminando la imagen');
          }
        } catch (error) {
          console.error('Error eliminando la imagen:', error);
          throw error;
        }
      },
      deleteAllImages: async () => {
        try {
          // Primero obtenemos todas las imágenes
          const response = await fetch(`${process.env.BACKEND_URL}api/images`, { method: 'GET' });
      
          if (response.ok) {
            const actions = await getActions();
            const images = await response.json();
      
            // Iteramos sobre las imágenes y las eliminamos
            for (const image of images) {
              await actions.deleteImage(image.public_id);
              console.log('imagen eliminada');
            }
      
            return { message: 'Todas las imágenes han sido eliminadas' };
          } else {
            throw new Error('Error obteniendo las imágenes');
          }
        } catch (error) {
          console.error('Error eliminando las imágenes:', error);
          throw error;
        }
      },         
      // ------------------
      loadDummyCompanies: async () => {
        try {
          // Reestructuramos los datos para almacenarlos como un objeto
          const companies = mockData.reduce((acc, category) => {
            const [key, value] = Object.entries(category)[0];
            acc[key] = value;
            return acc;
          }, {});

            // console.log(companies); // empresas de ejemplo desde json local
            setStore({ companies });
        } catch (error) {
          console.log(error);
        }
      },
      saveUserData: (user, token) => {
        localStorage.setItem("profile", JSON.stringify(user));
        localStorage.setItem("token", token);
      },
      recoverUser: () => {
        const savedUser = JSON.parse(localStorage.getItem("profile")) || null;
        const savedToken = localStorage.getItem("token") || null;

        if (savedUser && savedToken) {
          setStore({ profile: savedUser });
          setStore({ token: savedToken });
        }
      },
      updateUser: async (id, newValues) => {
        console.log(newValues);
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}api/users/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newValues),
          });
          const data = await resp.json();
          setStore({ profile: data });
          localStorage.setItem("profile", JSON.stringify(data));
          // console.log(data);
          return true;
        } catch (err) {
          console.log("Error updating user in backend", err);
        }
      },
      deleteUser: async (id) => {
        const store = getStore();
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}api/users/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + store.token,
            },
          });

          if (resp.ok) {
            await getActions().logoutUser();
            console.log("User deleted successfully");
            return true;
          } else {
            console.log("ALGO ESTÁ FALLANDO...");
            const errorData = await resp.json();
            console.error(errorData.message);
          }
        } catch (err) {
          console.log("ALGO ESTÁ FALLANDO...");
          console.log("Error deleting user in backend", err);
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
      logoutUser: () => {
        const store = getStore();
        localStorage.removeItem("token");  // Remove token from localStorage
        localStorage.removeItem("profile");  // Remove user profile from localStorage
        setStore({ ...store, token: null, profile: null });  // Reset store state
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
            const user = await getActions().getUserProfile(); // actualiza profile
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
      addFavoriteCompany: (company) => {
        const store = getStore();
        const updatedFavorites = [...store.favoriteCompanies, company];
        setStore({ favoriteCompanies: updatedFavorites });
      },
      removeFavoriteCompany: (company) => {
          const store = getStore();
          const updatedFavorites = store.favoriteCompanies.filter(fav => fav.id !== company.id);
          setStore({ favoriteCompanies: updatedFavorites });
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
      }
    }
  };
};

export default getState;
