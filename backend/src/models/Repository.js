import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(

    //Fields
    {
        name: { 
            type: String, 
            required: true, 
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        userId: { 
            type: String, 
            required: true
        }
    },

    //Models
    {
        timestamps: true
    }
)

export default mongoose.model("Repository", repositorySchema);