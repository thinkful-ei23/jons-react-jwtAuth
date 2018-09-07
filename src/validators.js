//*===== First three validators are used for the username and password =====*//

// required checks that a value has been entered.
export const required = value => (value ? undefined : 'Required');

// nonEmpty checks that a string which isn't just whitespace has been entered.
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

// isTrimmed makes sure that the user hasn't entered a string with any leading or trailing whitespace.
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';



//*===== Password field uses the length validators to check that the password contains the right number of characters.
// The length validator is a function which returns another function, and it is this inner function which returns the string if the field is invalid. 

// It is a --validator creator function--
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

// matches is also a --validator creator--
// it ensures that two fields have identical values entered

// The field argument to the creator function is the name of the field which we want to have an identical value for. The validator function returned by the creator makes uses of a second argument provided by Redux Form, allValues. This is an object which contains the values entered into each form field. If the two fields don't match, then we return an error message.
// Here we say that the passwordConfirm field should match the password field.

// in registration form - <Field name="passwordConfirm">
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';
