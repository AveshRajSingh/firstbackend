class ApiResponse {
    constructor(statusCode,message, data){
        this.data = data;
        this.statusCode = statusCode
        this.message = message;
    }
}

export {ApiResponse};