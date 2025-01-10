import mockData from "../../utils/mockData_Companies.json"

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            news: [],
            companies: []
        },
        actions: {
            fetchNews: async (setLoading) => {
                try {
                    setLoading(true);
                    const resp = await fetch(process.env.BACKEND_URL + "news");
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
                    setStore({ companies: mockData });
                    console.log(mockData);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    };
};

export default getState;
