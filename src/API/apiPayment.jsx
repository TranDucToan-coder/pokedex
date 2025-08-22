import axios from 'axios'

export default async function CreatePayment(amount) {
  try {
    const response = await axios.post('http://localhost:5000/payment/create_payment', {
      amount
    });
    if(response){
        return response.data;
    }
    else{
        console.error("Không có dữ liệu trả về!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo yêu cầu:", error);
    return null;
  }
}
