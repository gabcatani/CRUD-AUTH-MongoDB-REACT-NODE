import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    //Fields
    {
        email: { 
            type: String, 
            required: true, 
            index: {
                unique: true
            } 
        },
        password: {
            type: String, 
            required: true
        },
    },
    
    //Models
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema);