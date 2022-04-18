const mongoose = require('mongoose');

const FooSchema = new mongoose.Schema({
	email: {
		type: String,
	},
	password: {
		type: String,
	}
});

// DO NOT CONVERT TO ARROW FUNCTION:
// arrow functions have provide different contexts for `this`
// and these hooks will no work if they cannot access the
// correct context for `this`
FooSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
//		this.password = await hash(this.password);
	}

	return next();
});

exports.Foo = mongoose.model('Foo', FooSchema, 'foos');