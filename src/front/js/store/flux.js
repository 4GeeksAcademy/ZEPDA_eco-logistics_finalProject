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
      uploadImage: async (file,type) => {
        const store = getStore();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
      
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/upload`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: "Bearer " + store.token,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            // console.log("Imagen subida exitosamente:", data);
            return data;
          } else {
            const errorData = await response.json();
            console.error("Error subiendo la imagen:", errorData.message);
            return null;
          }
        } catch (err) {
          console.error("Error subiendo la imagen en el backend", err);
          return null;
        }
      },
      associateImage: async (type, id, imageId) => {
        const store = getStore();
        const formData = new FormData();
        formData.append('type', type);
        formData.append('id', id);
      
        if (imageId !== null) {
          formData.append('image_id', imageId);
        }
      
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/associate_image`, {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: "Bearer " + store.token,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            // console.log("Imagen actualizada exitosamente:", data);
            return data;
          } else {
            const errorData = await response.json();
            console.error("Error actualizando la imagen:", errorData.message);
            return null;
          }
        } catch (err) {
          console.error("Error actualizando la imagen en el backend", err);
          return null;
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
      deleteImage: async (public_id) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}api/delete/${public_id}`, {
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
            console.log(images);
      
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
      getDummyCompanies: async () => {
        try {
          // Fetch data from the server
          const response = await fetch(`${process.env.BACKEND_URL}api/companies`, { method: 'GET' }); 
          const data = await response.json();
      
          // Restructurar los datos para almacenarlos como un objeto separado por sectores
          const companies = data.reduce((acc, company) => {
            const sector = company.sector;
            if (!acc[sector]) {
              acc[sector] = [];
            }
            acc[sector].push(company);
            return acc;
          }, {});
          console.log(companies);
      
          // Actualizar el store con los datos reestructurados
          setStore({ companies });
        } catch (error) {
          console.log(error);
        }
      },
      // ------------------  
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
        // console.log('newValues user', newValues);
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
          if (data.token) {
            console.log(data);
            setStore({ token: data.token });
            localStorage.setItem("token", data.token);
            const user = await getActions().getUserProfile(); // actualiza profile
            console.log(user);
            // don't forget to return something, that is how the async resolves
            return data.authorize;
          } else {
            return false;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      requestPasswordReset: async (email) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "api/request-reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          const data = await resp.json();
          if (resp.ok) {
            console.log("Te hemos enviado un correo para restablecer tu contraseña.");
            return { success: true };
          } else {
            console.log(data.error || "Hubo un error al enviar el correo. Intenta de nuevo.");
            return { success: false, message: data.error || "Hubo un error al enviar el correo. Intenta de nuevo." }; 
          }
        } catch (error) {
          console.error("Error enviando el correo de recuperación:", error);
          return { success: false, message: "Hubo un problema con el envío del correo. Intenta de nuevo" };
        }
      },
      resetPassword: async (password, confirmPassword, token) => {
        try {
          // Verificar si las contraseñas coinciden antes de hacer la solicitud
          if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden.");
            console.log("Las contraseñas no coinciden.");
            return;
          }
          // Realizar la solicitud para restablecer la contraseña
          const response = await fetch(process.env.BACKEND_URL + "api/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,  
            },
            body: JSON.stringify({
              password: password,
              confirm_password: confirmPassword,
            }),
          });
          // Si no es una respuesta exitosa, mostrar el error
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la solicitud:", errorData);  
            console.log(errorData.message || "Hubo un error al restablecer la contraseña.");
            return;
          }
          // Si la respuesta es exitosa, mostrara el mensaje adecuado
          const data = await response.json();
          console.log("Contraseña restablecida con éxito:", data);
          return { success: true, message: "Contraseña restablecida con éxito." }; 
        
        } catch (error) {
          console.error("Error en la solicitud:", error);
          console.log("Hubo un problema al restablecer la contraseña. " + error.message);
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
      },
      associateInitialCompaniesImages: async () => {
          try {
              // Fetch data from the server
              const response = await fetch(process.env.BACKEND_URL + 'api/initialCompanies-images', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
      
              if (response.ok) {
                  const data = await response.json();
                              
                  // Procesar las imágenes en el frontend
                  for (const sector_dict of data) {
                      for (const sector in sector_dict) {
                          const companyList = sector_dict[sector];
                          for (const company of companyList) {
                              const imagePath = `src/front/img/logos/${company.imagen}`;

                              // Crear un FormData para la carga de archivos
                              const formData = new FormData();
                              formData.append('file', imagePath);
                              formData.append('type', 'company');
      
                              // Subir la imagen al servidor
                              const uploadResponse = await fetch(process.env.BACKEND_URL + 'api/upload', {
                                  method: 'POST',
                                  body: formData
                              });
      
                              if (uploadResponse.ok) {
                                  const imageData = await uploadResponse.json();
                                  console.log(imageData);
      
                                  // Asociar la imagen a la empresa
                                  await fetch(process.env.BACKEND_URL + 'api/associate_image', {
                                      method: 'PUT',
                                      headers: {
                                          'Content-Type': 'application/x-www-form-urlencoded'
                                      },
                                      body: new URLSearchParams({
                                          'type': 'company',
                                          'id': company.id,
                                          'image_id': imageData.id
                                      })
                                  });
                              }
                          }
                      }
                  }
      
                  console.log('Images associated successfully');
                  // Puedes actualizar el store con el resultado, si es necesario
                  // setStore({ imagesAssociated: true });
              } else {
                  console.error('Failed to fetch initial companies:', response.statusText);
              }
          } catch (error) {
              console.error('Error associating images:', error);
          }
      },
    }
  };
};

export default getState;
