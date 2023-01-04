import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import User from "../screens/User";

const Tab = createBottomTabNavigator();

const AppLayout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={Home}></Tab.Screen>
        <Tab.Screen name="user" component={User}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppLayout;
