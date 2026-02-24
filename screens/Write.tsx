import { RootStackParamList } from "@/components/navigator";
import colors from "@/constants/colors";
import { useDB } from "@/context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert } from "react-native";
import { styled } from "styled-components/native";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0 30px;
`;

const Text = styled.Text`
  color: ${colors.textColor};
  margin-top: 50px;
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  background-color: ${colors.btnColor};
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity<{ $selected: boolean }>`
  background-color: white;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
  padding: 5px;
  border-radius: 10px;
  border-width: ${(props) => (props.$selected ? "2px" : "0px")};
  transform: scale(${(props) => (props.$selected ? 1.3 : 1)});
  border-color: rgba(0, 0, 0, 0.5);
`;

const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ["🤯", "🥲", "🤬", "🤗", "🥰", "😊", "🤩"];

export default function Write({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Write">) {
  const { goBack } = navigation;
  const realm = useDB();
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [feelings, setFeelings] = useState("");
  const onChangeText = (text: string) => setFeelings(text);
  const onEmotionPress = (face: string) => setSelectedEmotion(face);
  const onSubmit = () => {
    if (selectedEmotion === "" || feelings === "") {
      return Alert.alert("Please complete form.");
    }
    realm?.write(() => {
      realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    goBack();
  };
  return (
    <View>
      <Text>How do you feel today?</Text>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            style={{ elevation: 5 }}
            $selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
        placeholderTextColor={"gray"}
      />
      <Btn onPress={onSubmit} style={{ elevation: 5 }}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
}
