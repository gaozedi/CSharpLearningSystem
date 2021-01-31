import { ICode, IMFQAnswer } from "../models/code";
import { ITutorialUnit } from "../models/unit";
import axios, { AxiosResponse } from "axios";
import { IUser, IUserFormValues } from "../models/user";
import { toast } from "react-toastify";
import { history } from "../..";

//set the base URL
//axios.defaults.baseURL = "http://localhost:5000/api";


//for every request we make, we check if there's a token, 
//if we have the token, attach this to the Header
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
})

//first para: what to do when the response is fullfilled, second para:onRejected
axios.interceptors.response.use(undefined, (error) => {
  //for some reason like the API is not running, if the error message is Network Error and the response is undefined
  if ((error.message = "Network Error" && !error.response)) {
    toast.error('Network error- make sure API is running')
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  //if it's a get request and the error has a key 'id' so the error is get a invalid GUID kind of error
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terminal for more info");
  }
  throw error.response;
});



//store our request in a const
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

//create a const for our activty's feature,all our activities' request are go inside our Activities object
const TutorialUnits = {
  list: (): Promise<ITutorialUnit[]> => requests.get("http://localhost:5000/api/tutorialunits"),
  details: (id: string) => requests.get(`http://localhost:5000/api/tutorialunits/${id}`),
  compile: (code: ICode) => requests.post("http://localhost:5000/api/tutorialunits/Compiler", code),
  AICodeInspect:(code:ICode)=>requests.post("https://localhost:44314/api/Predict", code),
  AIMFQ:(answer:IMFQAnswer)=>requests.post("http://127.0.0.1:8000/api/task-create/", answer)
};


const User ={
  current:():Promise<IUser>=>requests.get('http://localhost:5000/api/user'),
  login:(user:IUserFormValues):Promise<IUser>=>requests.post(`http://localhost:5000/api/user/login`,user),
  register:(user:IUserFormValues):Promise<IUser>=>requests.post(`http://localhost:5000/api/user/register`,user),
}

export default {
  TutorialUnits,
  User
};
