//update data
import axios from 'axios';
import { showAlert } from './alert';

export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/v1/users/updateme',
      data: {
        name,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'User data changed successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
