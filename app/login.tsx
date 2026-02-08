import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { setLoggedIn, setUsername } from "../components/checkAuth";



export default function LoginScreen() {

    const [username, setUsernameInput] = useState("");
    
  return (
    <View style={styles.screen}>
      {/* Logo area (temp placeholder) */}
      <View style={styles.logoWrap}>
        {/* Replace this with your actual art later */}
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>GG</Text>
        </View>

        <Text style={styles.subtitle}>go garbage</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="enter username"
          placeholderTextColor="#8A8A8A"
          style={styles.input}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="enter password"
          placeholderTextColor="#8A8A8A"
          style={styles.input}
          secureTextEntry
        />

        <Pressable style={styles.loginBtn} onPress={async () => {
            await setLoggedIn(true); 
            await setUsername(username);
            router.replace("/");
        }}>
          <Text style={styles.loginBtnText}>login</Text>
        </Pressable>

        <Text style={styles.or}>or</Text>

        <Pressable style={styles.createBtn} >
          <Text style={styles.createBtnText}>create account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#DFF5EF",
    paddingHorizontal: 28,
    paddingTop: 42,
  },

  // Top / logo block
  logoWrap: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 26,
  },
  logoBox: {
    width: 240,
    height: 140,
    borderRadius: 0,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2,
    borderColor: "#BEB7B0",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Pixel", // fallback will be system if Pixel not loaded
    fontSize: 64,
    color: "#6E6E6E",
    letterSpacing: 4,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: "Pixel",
    fontSize: 20,
    color: "#6E6E6E",
    letterSpacing: 1,
  },

  // Form block
  form: {
    alignItems: "center",
    gap: 14,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#D8D3CF",
    borderWidth: 2,
    borderColor: "#BEB7B0",
    borderRadius: 0,
    paddingHorizontal: 14,
    fontFamily: "Pixel",
    fontSize: 16,
    color: "#6E6E6E",
  },

  loginBtn: {
    width: 120,
    height: 36,
    backgroundColor: "#D8D3CF",
    borderWidth: 2,
    borderColor: "#BEB7B0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    marginTop: 4,
  },
  loginBtnText: {
    fontFamily: "Pixel",
    color: "#6E6E6E",
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "lowercase",
  },

  or: {
    fontFamily: "Pixel",
    fontSize: 14,
    color: "#6E6E6E",
    opacity: 0.85,
    marginTop: 2,
  },

  createBtn: {
    width: 180,
    height: 44,
    backgroundColor: "#8C7E6C", // darker button like screenshot
    borderWidth: 2,
    borderColor: "#7A6D5E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  createBtnText: {
    fontFamily: "Pixel",
    color: "#DFF5EF",
    fontSize: 14,
    letterSpacing: 1,
    textTransform: "lowercase",
  },
});
