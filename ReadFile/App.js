import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Linking } from "react-native";
import * as FileSystem from "expo-file-system";

export default function App() {
    const handleDeeplink = async (contentUri) => {
        const { exists } = await FileSystem.getInfoAsync(contentUri);
        if (!exists) {
            alert("File does not exist");
            return;
        }

        const fileUriIncomplete = FileSystem.cacheDirectory + "deep-link";
        await FileSystem.copyAsync({
            from: contentUri,
            to: fileUriIncomplete,
        });
        const body = await FileSystem.readAsStringAsync(fileUriIncomplete);
        const header = body.substring(0, 20);
        alert("First few files bytes: " + header);
    };

    useEffect(() => {
        const setupInitial = async () => {
            Linking.addEventListener("url", ({ url }) => {
                if (url.startsWith("file://")) handleDeeplink(url);
                if (url.startsWith("content://")) handleDeeplink(url);
            });

            const initialUri = await Linking.getInitialURL();
            if (initialUri) {
                if (
                    initialUri.startsWith("content://") ||
                    initialUri.startsWith("file://")
                ) {
                    handleDeeplink(initialUri);
                    return;
                }
            }
        };
        setupInitial();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
