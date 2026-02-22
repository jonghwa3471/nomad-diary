import Home from "@/screens/Home";
import Write from "@/screens/Write";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Write: undefined;
};

const Tabs = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Write" component={Write} />
    </Tabs.Navigator>
  );
}
