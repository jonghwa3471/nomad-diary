import { RootStackParamList } from "@/components/navigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Btn = styled.TouchableOpacity``;

const BtnText = styled.Text``;

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const { navigate } = navigation;
  return (
    <View>
      <Btn onPress={() => navigate("Write")}>
        <BtnText>Write</BtnText>
      </Btn>
      <Text>Home</Text>
    </View>
  );
}
