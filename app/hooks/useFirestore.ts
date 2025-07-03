import firestore, {
  addDoc,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {APPOINTMENTS, USERS} from '../services';
import {delay} from '../utils';
import {useUser} from './useUser';

export const useFirestore = (loading: boolean = true) => {
  const {uid} = useUser();
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);

  const [isLoading, setLoading] = useState<boolean>(loading);
  const [error, setError] = useState<boolean>();

  const recommendedDoctors = async () => {
    try {
      //true :just for testing
      const collection = await firestore()
        .collection(USERS)
        .where('userType', '==', 'doctor')
        .where('verified', '==', false)
        .limit(5)
        .get();

      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const getUser = async (userID: string) => {
    const user = (await firestore().collection(USERS).doc(userID).get()).data();
    return user;
  };
  const specialistDoctors = async (area: string) => {
    try {
      //true :just for testing

      const collection = await firestore()
        .collection(USERS)
        .where('userType', '==', 'doctor')
        .where('verified', '==', false)
        .where('specialty', '==', area)
        .get();
      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const bookAppointment = async (
    doctorID: string,
    appointmentDate: any,
    appointmentTime: any,
  ) => {
    setLoading(true);
    try {
      const docRef = await addDoc(firestore().collection(APPOINTMENTS), {
        patientID: uid,
        doctorID,
        bookingDate: new Date(),
        appointmentDate,
        appointmentTime,
      });
      if (docRef.id) {
        await delay(2000);
        setLoading(false);
        setData([{bookingStatus: true}]);
      }
    } catch {
      setLoading(false);
    }
  };
  const appointmentTiming = async (appointmentDate: string) => {
    try {
      const collection = await firestore()
        .collection(APPOINTMENTS)
        .where('patientID', '==', uid)
        .where('appointmentDate', '==', appointmentDate)
        .get();

      const newData = collection.docs.map(doc => ({...doc.data()}));
      setData(newData);
      await delay(2500);
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };
  const upcoming = async () => {
    try {
      const collection = await firestore()
        .collection(APPOINTMENTS)
        .where('patientID', '==', uid)
        .get();
      const newData = collection.docs
        .map(doc => ({...doc.data()}))
        .filter(d => new Date(d.appointmentTime[0].startTime) >= new Date())[0];
      if (newData.length === 0) {
        setData([]);
      } else {
        setData([newData]);
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return {
    recommendedDoctors,
    isLoading,
    data,
    appointmentTiming,
    upcoming,
    error,
    getUser,
    specialistDoctors,
    bookAppointment,
  };
};
