import Navigator from "@/components/navigator";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import Realm from "realm";

SplashScreen.preventAutoHideAsync();

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        const realm = await Realm.open({
          path: "nomadDiaryDB",
          schema: [FeelingSchema],
        });
        console.log(realm);
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  return <Navigator />;
}
