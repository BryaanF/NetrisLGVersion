import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import {
	SplashScreen,
	Login,
	Register,
	Nerby,
	Home,
	ProfileScreen,
} from "./screens";
import {
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";
import FlashMessage from "react-native-flash-message";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Tetap menampilkan splash screen sampai font selesai dimuat
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const TabList = () => {
	return (
		<Tab.Navigator
			initialRouteName={"Home"}
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let rn = route.name;

					if (rn === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (rn === "Nerby") {
						iconName = focused ? "map-marker" : "map-marker-outline";
					} else if (rn === "ProfileScreen") {
						iconName = focused ? "account" : "account-outline";
					}

					return (
						<MaterialCommunityIcons
							name={iconName}
							size={30}
							color={color}
							style={styles.tabIcon}
						/>
					);
				},
				tabBarStyle: {
					height: 65,
					paddingBottom: 8,
					backgroundColor: "#ffffff",
				},
				tabBarActiveTintColor: "#774494",
				tabBarInactiveTintColor: "#C7C7C7",
				tabBarShowLabel: false,
			})}>
			<Tab.Screen name={"Home"} component={Home} />
			<Tab.Screen name={"Nerby"} component={Nerby} />
			<Tab.Screen name={"ProfileScreen"} component={ProfileScreen} />
		</Tab.Navigator>
	);
};

const CustomTabIcon = ({ name, focused, size, color }) => {
	console.log("CustomTabIcon", { name, focused, size, color }); // Debugging
	return (
		<View style={styles.tabIconContainer}>
			{focused && (
				<View
					style={{
						width: "100%",
						height: 7,
						backgroundColor: "#774494",
						borderBottomLeftRadius: 5,
						borderBottomRightRadius: 5,
					}}
				/>
			)}
			<MaterialCommunityIcons
				name={name}
				size={30}
				color={color}
				style={styles.tabIcon}
			/>
		</View>
	);
};

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Inter_700Bold,
	});

	if (!fontsLoaded) {
		return null; // Pastikan untuk menampilkan layar kosong sampai font dimuat
	}

	// Menyembunyikan splash screen setelah font dimuat
	React.useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Splash"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name={"Splash"} component={SplashScreen} />
				<Stack.Screen name={"Login"} component={Login} />
				<Stack.Screen name={"Register"} component={Register} />
				<Stack.Screen name={"HomeTab"} component={TabList} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	tabIconContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: 100,
		overflow: "hidden",
	},
	tabIcon: {
		width: "100%",
		height: "100%",
		textAlign: "center",
		textAlignVertical: "center",
	},
});
