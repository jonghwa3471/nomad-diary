import Navigator from "@/components/navigator";
import { DBContext } from "@/context";
import { SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [realm, setRealm] = useState<Realm>();
  useEffect(() => {
    async function prepare() {
      try {
        const connection = await Realm.open({
          path: "nomadDiaryDB",
          schema: [FeelingSchema],
        });
        setRealm(connection);
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

  return (
    <DBContext.Provider value={realm}>
      <Navigator />
    </DBContext.Provider>
  );
}
