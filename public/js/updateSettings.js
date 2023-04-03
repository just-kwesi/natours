//update data
import axios from 'axios';
import { showAlert } from './alert';

//type is either 'password' or 'data'
export const updateData = async (data, type) => {
  try {
    const url =
      type === 'data'
        ? '/api/v1/users/updateme'
        : '/api/v1/users/updatemypassword';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `User ${type} changed successfully!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
