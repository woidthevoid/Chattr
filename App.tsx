import React, { useEffect, useState } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import MainScreen from "./screens/MainScreen";
import auth from "@react-native-firebase/auth";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Auth listener
    const unsubscribe = auth().onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={MainScreen} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
