import axios from 'axios'

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
        return [];
    }
}
//User
export async function GetUser(username, password) {
    try {
        const response = await axios.post(`http://localhost:5000/login/login`, {
            username, password
        })
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
export async function GetDetailUser(id) {
    try {
        const response = await axios.get(`http://localhost:5000/login/${id}`)
        if (response) {
            console.log(response.data)
            return response.data[0];
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
//OTP
export async function GetOTP(email) {
    try {
        const response = await axios.post(`http://localhost:5000/login/sendOTP`, {email});
        if(response){
            return response.data.otp;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
export async function VerifyOTP(otp) {
    try {
        console.log("Mã OTP: " + otp + typeof(otp))
        const response = await axios.post(`http://localhost:5000/login/verifyOTP`, {otp});
        console.log(response)
        if(response){
            return response.data;
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return null;
    }
}
//History
export async function HistoryOrder(id) {
    try {
        const response = await axios.get(`http://localhost:5000/order/${id}`)
        if (response) {
            console.log(response.data)
            return response.data;
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
export async function InsertDetailCart(cartID) {
    try {
        const cart = JSON.parse(localStorage.getItem('cartTCG'));
        for (const item of cart) {
            const response = await axios.post(`http://localhost:5000/cart/insertDetail`, {
                ID: cartID,
                IdItem: item.id,
                Quantity: item.quantity,
                Price: item.cardmarket?.prices?.trendPrice
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