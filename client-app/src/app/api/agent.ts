import { ICode } from "./../model/code";
import { ITutorialUnit } from "./../model/unit";
import axios, { AxiosResponse } from "axios";


//set the base URL
//axios.defaults.baseURL = "http://localhost:5000/api";

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
  AICodeInspect:(code:ICode)=>requests.post("https://localhost:44314/api/Predict", code)
};



export default {
  TutorialUnits,
};
