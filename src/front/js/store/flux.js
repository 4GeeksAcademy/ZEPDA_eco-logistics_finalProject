const getState = ({ getStore, getActions, setStore }) => {

    
    return {
        store: {
            news: []
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
            }
        },
    };
};

export default getState;
