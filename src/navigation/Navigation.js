import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import ContactScreen from "../screens/ContactScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SignUpScreen"
        >
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ContactScreen" component={ContactScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
