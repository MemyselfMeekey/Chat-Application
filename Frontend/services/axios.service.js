// import axiosInstance from "./axios.connection.js"

// class HttpService{
//     #headers;
//     setHeaders=(config)=>{
//         if (config && ( config.file || config.files)){
//             this.#headers={
//                 "Content-type":"multipart/form-data"
//             }
//         }
//         if (config && config.auth){
//             const token=localStorage.getItem("_act") || null
//             if(!token){
//                 throw new Error("Please login first")
//             }
//             this.#headers={
//                 ...this.#headers,
//                 "Authorization":"Bearer "+token
//             }
//         }
//     }
//         //This is an api caller
//         postRequest=async(url,data={},config=null)=>{
//             try{
//                 this.setHeaders(config)
               
//                 const response=await axiosInstance.post(
//                     url,
//                     data,
//                     {
//                         headers:{
//                                 ...this.#headers
//                         }
//                     }
//                 )
//                 return response
//             }
            
//             catch(exception){
//                 throw exception
//             }
//         }
//         getRequest=async(url,config=null)=>{
//             try{
//                 this.setHeaders(config)
               
//                 const response=await axiosInstance.get(
//                     url,
//                     {
//                         headers:{
//                                 ...this.#headers
//                         }
//                     }
//                 )
//                 return response
//             }
            
//             catch(exception){
//                 throw exception
//             }
//         }
//         putRequest=async(url,data={},config=null)=>{
//             try{
//             this.setHeaders(config)
//             const response=await axiosInstance.put(
//                 url,
//                 data,
//                 {
//                     headers:{
//                         ...this.#headers
//                     }
//                 }
//             )
//             return response
           
                
//             }
//             catch(exception){
//                 throw exception
//             }
//         }
// }
// export default HttpService