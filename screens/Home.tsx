import { RootStackParamList } from "@/components/navigator";
import colors from "@/constants/colors";
import { useDB } from "@/context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { styled } from "styled-components/native";

const View = styled.View`
  flex: 1;
  padding: 0 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  font-weight: 500;
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
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  gap: 10px;
`;

const Emotion = styled.Text`
  font-size: 24px;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;

interface Feeling {
  _id: number;
  emotion: string;
  message: string;
}

export default function Home({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const realm = useDB();
  const [feelings, setFeelings] = useState(realm?.objects<Feeling>("Feeling"));
  const { navigate } = navigation;
  useEffect(() => {
    const results = realm?.objects<Feeling>("Feeling");
    setFeelings(results);
    results?.addListener(() => {
      const results = realm?.objects<Feeling>("Feeling");
      setFeelings(results);
    });
    return () => {
      results?.removeAllListeners();
    };
  }, [realm]);
  return (
    <View>
      <Title>My Journal</Title>
      <FlatList
        data={feelings}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
        contentContainerStyle={{ gap: 10 }}
      ></FlatList>
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
