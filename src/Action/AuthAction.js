import {GET_USER_DATA} from './type';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const usergetdata = (object, callback) => async (dispatch) => {
  try {
    await firestore()
      .collection('Users')
      .doc(object.uid)
      .update(object)
      .then((res) => {
        dispatch({type: GET_USER_DATA, payload: object});
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    console.log('data not find');
  }
};
export const UserGetData = () => async (dispatch) => {
  const id = auth().currentUser.uid;
  try {
    await firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then((res) => {
        dispatch({type: GET_USER_DATA, payload: res._data});
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    console.log('data not find');
  }
};
