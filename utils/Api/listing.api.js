import axios from "axios";
import config from "../config";

const getAllListing = async (
  city = undefined,
  roomType = undefined,
  limit,
  pageNo
) => {
  const roomTypeString = roomType ? "&typeOfRoom=" + roomType : "";
  const cityString = city ? "&city=" + city : "";
  const response = await axios.get(
    `${config.url}/api/listing?limit=${limit}&page=${pageNo}${roomTypeString}${cityString}`
  );
  return response.data;
};
const getAllListingForAdmin = async (
  city = undefined,
  limit,
  pageNo,
  token
) => {
  const cityString = city ? "&city=" + city : "";
  const response = await axios.get(
    `${config.url}/api/listing/admin/all?limit=${limit}&page=${pageNo}${cityString}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
const getListingById = async (id) => {
  const response = await axios.get(`${config.url}/api/listing/${id}`);
  return response.data;
};
const addNewListing = async (body, token) => {
  const response = await axios.post(`${config.url}/api/listing?`, body, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getAnalitic = async () => {
  const response = await axios.get(`${config.url}/api/listing/analitic`);
  return response.data;
};

const listingApi = {
  getAllListing,
  addNewListing,
  getListingById,
  getAllListingForAdmin,
  getAnalitic,
};
export default listingApi;
