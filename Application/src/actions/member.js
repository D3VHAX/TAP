import ErrorMessages from 'constants/errors';
import statusMessage from './status';


/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);
    statusMessage(dispatch, 'loading', false);
    return resolve();
    /*
    return register()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
      }).catch(reject); */
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Get this User's Details
  */


const timeout = ms => new Promise(res => setTimeout(res, ms));
/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    await timeout(2000);
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    const user = {
      mail: 'a',
      pass: 'a',
    };

    if (email !== user.mail) return reject({ message: ErrorMessages.userNotFound });
    if (password !== user.pass) return reject({ message: ErrorMessages.passwordsDontMatch });
    await statusMessage(dispatch, 'loading', false);

    return resolve(dispatch({
      type: 'USER_LOGIN',
      data: {
        email,
        emailVerified: true,
        firstName: 'xd3',
      },
    }));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;
  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    await statusMessage(dispatch, 'loading', true);
    await timeout(2000);
    await statusMessage(dispatch, 'loading', false);
    return resolve(dispatch({ type: 'USER_RESET' }));
    /*
    return process
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
    */
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    await statusMessage(dispatch, 'success', 'Profile Updated');
    return resolve();
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve) => {
    dispatch({ type: 'USER_RESET' });
    setTimeout(resolve, 1000);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
