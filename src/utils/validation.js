import * as Yup from 'yup';

//=========== AUTH ========== //

export const SignInValidationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.min(8, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/\d/, 'Password must contain at least one number')
		.matches(/[@$!%*?&:#]/, 'Password must contain at least one special character')
		.required('Password is required'),
})

//=========== Category ========== //
export const CategoryValidationSchema = Yup.object().shape({
	category_name: Yup.string().required('Required'),
});

//=========== Workers ========== //
const validSizes = ['M', 'CM', 'D', 'C', 'XC', 'L', 'XL', 'X', 'V', 'I'];

export const WorkersValidationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	age: Yup.string().required('Age is required'),
	phone_number: Yup.string().required('Phone is required'),
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	password: Yup.string()
		.min(8, 'Too Short!')
		.max(50, 'Too Long!')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/\d/, 'Password must contain at least one number')
		.matches(/[@$!%*?&:#]/, 'Password must contain at least one special character')
		.required('Password is required'),
	gender: Yup.string()
		.oneOf(['male', 'female'], 'Gender must be either male or female')
		.required('Gender is required')
});

//=========== Products ========== //

export const ProductValidationSchema = Yup.object().shape({
	age_max: Yup.number().required("Max Age is required").positive("Age must be a positive number"),
    age_min: Yup.number().required("Min Age is required").positive("Age must be a positive number"),
    category_id: Yup.string().required("Category ID is required"),
    color: Yup.string()
        .required("Color is required")
        .test('is-valid-colors', "Each color must be at least 3 characters long", function(value) {
            if (!value) return false;
            const colors = value.split(/\s+/).map(c => c.trim());
            return colors.every(color => color.length >= 4);
        }),
    cost: Yup.number().required("Cost is required").positive("Cost must be a positive number"),
    count: Yup.number().required("Count is required").positive("Count must be a positive number"),
    discount: Yup.number().required("Discount is required").positive("Discount must be a positive number"),
    for_gender: Yup.string().required("For Gender is required"),
    made_in: Yup.string().required("Made In is required"),
    product_name: Yup.string().required("Product Name is required"),
    size: Yup.string()
        .required("Size is required")
        .test('is-valid-sizes', "Size must be one or more of the following: M, CM, D, C, XC, L, XL, X, V, I", function(value) {
            if (!value) return false;
            const sizes = value.split(/\s+/).map(s => s.trim());
            return sizes.every(size => validSizes.includes(size));
        }),
    description: Yup.string().required("Description is required"),
});
