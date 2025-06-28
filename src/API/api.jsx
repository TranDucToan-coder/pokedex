import axios from 'axios'

const InstanceAxios = axios.create(
    {
        baseURL: "https://pokeapi.co",
        timeout: 2000,
        headers: { 'Authorization': 'Bearer ' }
    }
)

export async function getData() {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const pokemonList = await Promise.all(
            response.data.results.map(async (pokemon) => {
                const details = await axios.get(pokemon.url);
                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id: details.data.id,
                    image: details.data.sprites.other["official-artwork"].front_default
                };
            })
        );
        return pokemonList;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return [];
    }
}
export async function DetailPokemon(id) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const responseDescription = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        if (!response.data) {
            throw new Error("Dữ liệu API không hợp lệ");
        }
        const data = response.data;
        const description = responseDescription.data;
        return {
            data,
            description,
            image: data.sprites.other["official-artwork"].front_default,
        };
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
export async function GetDataTCG() {
    try {
        const API_KEY = "e0c83582-4297-4389-8785-b40e769c5178";
        const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
            headers: { 'X-Api-Key': API_KEY }
        })
        if (response) {
            return response.data.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
export async function GetDetailTCG(id) {
    try {
        const API_KEY = "e0c83582-4297-4389-8785-b40e769c5178";
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`, {
            headers: { 'X-Api-Key': API_KEY }
        })
        if (response) {
            return response.data.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
//User
export async function GetUser(username, password) {
    try {
        const response = await axios.post(`http://localhost:5000/login/login`, {
            username, password
        })
        if (response) {
            return response.data[0];
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
//Cart
export async function InsertCart(IdUser, OrderDate, total) {
    try {
        const response = await axios.post(`http://localhost:5000/cart/insert`, {
            IdUser, 
            OrderDate, 
            total
        });
        if (response) {
            console.log(response.data.ID)
            return response.data.ID;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
export async function InsertDetailCart(IdUser, OrderDate, total) {
    try {
        const cart = JSON.parse(localStorage.getItem('cartTCG'));
        const cartID = await InsertCart(IdUser, OrderDate, total);
        for(const item of cart){
            const response = await axios.post(`http://localhost:5000/cart/insertDetail`, {
                ID : cartID, 
                IdItem : item.id, 
                Quantity : item.quantity, 
                Price : item.cardmarket?.prices?.trendPrice
            })
            console.log("📦 Sending item:", item);
            if (!response) return null;
        }
        return true;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}