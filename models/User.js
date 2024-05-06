const { model, Schema } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./Task")
const validators = require("validator")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validators(value) {
            if (!validators.isEmail(value)) {
                throw new Error("email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validators(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password can not contain password word")

            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validators(value) {
            if (value < 0) {
                throw new Error("age must be an positive integer ")
            }
        }
    },
    token: [{
        type: String,
        required: true
    }],
    avatar: {
        type: Buffer
    }

}, { timpestamp: true }

)



userSchema.virtual("tasks",{ref:"Task",localField:'_id',
foreignField:'owner'})



userSchema.methods.toJson = function(){
    const userObject = this.toObject()
    delete userObject.password,
    delete userObject.token,
    delete userObject.__v,
    delete userObject.avatar
    return userObjectuser
}
userSchema.methods.generateAuthToken = async function() {
    console.log("reaching here");
    const token = await jwt.sign({ _id: this._id.toString() }, "test");
    this.token = this.token.concat(token);
    await this.save();
    return token;
};

userSchema.statics.findByLoginCredentials = async function (email, password) {
	const user = await this.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}
	const verifyPassword = await bcrypt.compare(password, user.password);
	if (!verifyPassword) {
		throw new Error('Unable to login');
	}
	return user;
};


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8)//here 8 is the salting round for thre password 

    }
    next()

})

userSchema.pre("remove",async function(next){
   
         await Task.deleteMany({owner:this._id})//here 8 is the salting round for thre password 


    next()

})


module.exports = model("User",userSchema)