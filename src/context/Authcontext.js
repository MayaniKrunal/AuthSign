import CreateContext from "../context/CreateContext";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { encrypt, decrypt } from 'react-native-simple-encryption';
import firestore from '@react-native-firebase/firestore';
import { call } from "react-native-reanimated";
// const navigation = useNavigation();
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SignUpErr':
            return { ...state, signupErrMsg: action.playload }
        case 'UserData':
            return { ...state, UserData: action.playload }
        default:
            return state;
    }
};
const SignIn = () => {
    return async ({ email, password }, callback) => {
        try {
            auth().signInWithEmailAndPassword(email, encrypt('@123', password))
                .then(() => {
                    callback();
                })
        } catch (err) {
            console.log(err);
        }
    }
};
const getUserData = dispatch => {
    return async () => {
        const id = auth().currentUser.uid;
        try {
            await firestore().collection("Users").doc(id).get()
                .then((res) => {
                    dispatch({ type: 'UserData', playload: res._data })
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
            console.log('data not find')
        }
    }
}
const SignUp = dispatch => {
    return async ({ object }, callback) => {
        // console.log(object.email);
        auth().createUserWithEmailAndPassword(object.email, object.password)
            .then((res) => {
                console.log(res.user.uid);
                firestore().collection("Users").doc(res.user.uid).set(object)
                    .then(() => {
                        // dispatch({ type: 'UserData', playload: object })
                        console.log(object);
                        callback();
                    })
            })
            .catch(() => {
                dispatch({ type: 'SignUpErr', playload: 'email address is already in use by another account' })
            });
    }
}
const updateUserDate = () => {
    return async ({ object }, callback) => {
        // console.log(object);
        const id = auth().currentUser.uid;

        firestore().collection('Users').doc(id).update(object)
            .then(() => {
                callback();
            });
    }
}

export const { Context, Provider } = CreateContext(
    authReducer,
    {
        SignIn, SignUp, getUserData, updateUserDate
    },
    []

)


