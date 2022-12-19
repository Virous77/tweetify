import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { db, auth } from "../firebase/firebase.config";
import { useAction } from "./actionContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState1 = {
    email: "",
    password: "",
    name: "",
    uniqueId: "",
    monthInfo: "",
    dayInfo: "",
    yearInfo: "",
    isLoggedIn: false,
  };

  const getLocalStorage = () => {
    const data = localStorage.getItem("tweet");
    const result = data ? JSON.parse(data) : initialState1;
    return result;
  };

  ///////State////////////////////////////
  const initialState = {
    month: false,
    day: false,
    years: false,
  };
  const [showInfo, setShowInfo] = useState(initialState);
  const [focus, setFocus] = useState("");
  const [user, setUser] = useState(getLocalStorage());
  const { email, password, name, uniqueId, monthInfo, dayInfo, yearInfo } =
    user;
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [news, setNews] = useState("");
  //////////////////////////////////////////////
  const { setShowLogin, setShowRealLogin } = useAction();
  const navigate = useNavigate();
  const { data, getCollection } = useFetchCollection("users");

  /////Onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  ///New user by Email
  const submitUser = async () => {
    if (!email || !password || !name || !monthInfo || !dayInfo || !yearInfo) {
      setLoading(false);
      toast.error("All fields must be filled..");
      return;
    }

    setLoading(true);
    try {
      const { user: users } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setLoading(false);
      const tempdata = {
        isLoggedIn: true,
      };

      const userData = {
        name,
        uniqueId,
        dob: {
          DoB: monthInfo + " " + dayInfo + " " + yearInfo,
          month: monthInfo,
          date: dayInfo,
          year: yearInfo,
        },
        email,
        uid: users.uid,
        photoURL: users.photoURL || null,
        createdAt: serverTimestamp(),
        birthType: "public",
        tweet: [],
        locationType: "public",
      };

      localStorage.setItem("tweet", JSON.stringify(tempdata));
      await addDoc(collection(db, "users"), userData);
      setUser(tempdata);
      navigate("/");
      setShowLogin(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  ///LoginUser
  const LoginUser = async () => {
    if (!password || !email) {
      setLoading(false);
      toast.error("All fields must be filled..");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      const tempdata = {
        isLoggedIn: true,
      };
      localStorage.setItem("tweet", JSON.stringify(tempdata));
      navigate("/");
      setShowRealLogin(false);
      setUser(tempdata);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  ///ActivetUser data
  const getCurrentUser = () => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  //////Logout
  const logout = async () => {
    await signOut(auth);
    navigate("/");
    setUser(initialState);
    localStorage.removeItem("tweet");
  };

  ////GoogleLogin
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user: users } = await signInWithPopup(auth, provider);
      setNews(users.uid);

      const unique = data.find((ids) => ids.uid === users.uid);

      const userData = {
        name: users.displayName,
        uniqueId: users.email.slice(0, 5),
        dob: {
          DoB: null,
          month: "",
          date: "",
          year: "",
        },
        email: users.email,
        uid: users.uid,
        photoURL: users.photoURL || null,
        birthType: "public",
        locationType: "public",
        tweet: [],
        createdAt: serverTimestamp(),
      };

      const tempdata = {
        isLoggedIn: true,
      };
      localStorage.setItem("tweet", JSON.stringify(tempdata));

      if (!unique) {
        await addDoc(collection(db, "users"), userData);
      }
      setUser(tempdata);
      setShowLogin(false);
      setShowRealLogin(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, [news]);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleChange,
        submitUser,
        LoginUser,
        loading,
        getCurrentUser,
        logout,
        activeUser,
        googleLogin,
        showInfo,
        setShowInfo,
        initialState,
        setUser,
        focus,
        setFocus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
