import { RootStackParamList } from "@/components/navigator";
import colors from "@/constants/colors";
import { useDB } from "@/context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert } from "react-native";
import {
  AdEventType,
  RewardedAdEventType,
  RewardedInterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
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
  width: 70%;
  align-self: center;
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
      return Alert.alert(
        "이모지와 내용 모두 적어주세용.",
        "안 적으면 아쉽게 된거죵",
      );
    }

    const cleanup = () => {
      unsubscribeLoaded();
      unsubscribeRewarded();
      unsubscribeClosed();
    };

    const rewardedInterstitialAd = RewardedInterstitialAd.createForAdRequest(
      TestIds.REWARDED_INTERSTITIAL,
    );

    const unsubscribeLoaded = rewardedInterstitialAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => rewardedInterstitialAd.show(),
    );

    const unsubscribeRewarded = rewardedInterstitialAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        realm?.write(() => {
          realm.create("Feeling", {
            _id: Date.now(),
            emotion: selectedEmotion,
            message: feelings,
          });
        });
      },
    );

    const unsubscribeClosed = rewardedInterstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        cleanup();
        goBack();
      },
    );

    rewardedInterstitialAd.load();
  };
  return (
    <View>
      <Text>종현이가 당신의 기분을 어떻게 만들었나요?</Text>
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
        placeholder="종현이를 저주하세요..."
        placeholderTextColor={"gray"}
      />
      <Btn onPress={onSubmit} style={{ elevation: 5 }}>
        <BtnText>저장띠</BtnText>
      </Btn>
    </View>
  );
}
