import { RootStackParamList } from "@/components/navigator";
import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";

const View = styled.View`
  flex: 1;
  padding: 0 50px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;

const Btn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  bottom: 80px;
  right: 40px;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const { navigate } = navigation;
  return (
    <View>
      <Title>My Journal</Title>
      <Btn
        onPress={() => navigate("Write")}
        style={{
          elevation: 5,
        }}
      >
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  );
}
