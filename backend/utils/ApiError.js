class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors =[],
        stack,
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.errors = errors;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }else{
           Error.captureStackTrace(this,this.constructor)
        }

        
    }
    toJSON(){
        return {
            statusCode: this.statusCode,
            message: this.message,  // Include message field explicitly
            data: this.data,
            errors: this.errors,
            success: this.success
        };
    }
}

export {ApiError}