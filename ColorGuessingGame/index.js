// ColorGuessingGame/index.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useStore } from "./store";
import { getRandomRGB, translations } from "./utils";
import { supabase } from "../supabaseClient";

const ColorGuessingGame = () => {
  const { language, mode, score, incrementScore } = useStore();
  const [targetColor, setTargetColor] = useState(getRandomRGB());
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [playerName, setPlayerName] = useState("");

  const generateColors = () => {
    const newTarget = getRandomRGB();
    setTargetColor(newTarget);
    const optionsCount = mode === "easy" ? 3 : 6;
    const newOptions = Array.from({ length: optionsCount }, (_, i) =>
      i === 0 ? newTarget : getRandomRGB()
    ).sort(() => Math.random() - 0.5);
    setOptions(newOptions);
    setStatus("");
  };

  useEffect(() => {
    generateColors();
  }, [mode]);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setStatus(translations[language].correct);
      incrementScore();
    } else {
      setStatus("Try Again");
    }
  };

  const saveScore = async () => {
    if (!playerName) return Alert.alert("Enter Name");
    const { data, error } = await supabase
      .from("scores")
      .insert([{ name: playerName, date: new Date(), score }]);
    if (error) console.error(error);
    else Alert.alert("Score Saved");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{translations[language].title}</Text>
      <Text style={styles.rgbText}>{targetColor}</Text>
      <View style={styles.colorOptions}>
        {options.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => handleGuess(color)}
          />
        ))}
      </View>
      <Text style={styles.statusText}>{status}</Text>
      <TouchableOpacity style={styles.button} onPress={generateColors}>
        <Text>
          {status === translations[language].correct
            ? translations[language].playAgain
            : translations[language].newColors}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text>{translations[language].finish}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalView}>
          <Text>{translations[language].instructions}</Text>
          <TextInput
            placeholder="Enter Name"
            value={playerName}
            onChangeText={setPlayerName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={saveScore}>
            <Text>Save Score</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ColorGuessingGame;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  rgbText: { fontSize: 20, textAlign: "center", marginVertical: 10 },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  colorBox: { width: 60, height: 60, borderRadius: 5 },
  statusText: { textAlign: "center", marginVertical: 10, fontSize: 18 },
  button: {
    backgroundColor: "#306590",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  input: { borderBottomWidth: 1, width: "80%", marginVertical: 10 },
});
