import { ApiError } from "./ApiError.js";
const validateEmail = async (email) => {
  try {
    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}&ip_address`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
};

export { validateEmail };
