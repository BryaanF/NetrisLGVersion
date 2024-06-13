import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Separator } from "../components";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  starContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    height: Dimensions.get("window").height * 0.40,
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#A7A7A7",
    marginHorizontal: 15,
    marginVertical: 20,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemTextContainer: {
    flex: 1.3,
    paddingLeft: 10,
    justifyContent: "center",
  },
  itemTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#5A1781",
  },
  itemText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});

const StarRating = ({ rating }) => {
  // Buat array dengan panjang sesuai dengan nilai rating
  const stars = Array(rating).fill(null);

  return (
    <View style={styles.starContainer}>
      {stars.map((_, index) => (
        <FontAwesome key={index} name="star" size={24} color="#ffe234" />
      ))}
    </View>
  );
};

const Nerby = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [chooseItem, setChooseItem] = useState(0);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        setError("Error getting user location: " + error);
      }
    };
    fetchCurrentLocation();
  }, []);

  const listTambalBan = [
    {
      id: 0,
      nama: "Tambal Ban Goldy",
      tipe: "Bengkel motor",
      rating: 5,
      alamat: "Jl bareng cuma temen",
      fasilitas : [
        'Tambal ban tubles',
        'Pompa angin ban',
        'Bengkel',
      ]
    },
    {
      id: 1,
      nama: "Tambal Ban Praba",
      tipe: "Bengkel motor",
      rating: 3,
      alamat: "Jl bareng cuma temen",
      fasilitas : [
        'Tambal ban biasa',
        'Isi angin',
        'Bengkel',
      ]
    },
    {
      id: 2,
      nama: "Tambal Ban Chandra",
      tipe: "Bengkel Mobil",
      rating: 4,
      alamat: "Jl bareng cuma temen",
      fasilitas : [
        'Tambal ban mobil',
        'Isi nitrogen',
        'Bengkel',
      ]
    },
    {
      id: 2,
      nama: "Tambal Ban Subagyo",
      tipe: "Bengkel motor dan mobil",
      rating: 5,
      alamat: "Jl bareng cuma temen",
      fasilitas : [
        'Tambal ban mobil',
        'Isi nitrogen',
        'Tambal ban tubles',
      ]
    },
    // Tambahkan data lainnya jika diperlukan
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChooseItem(item.id);
        }}
        style={[
          styles.itemContainer,
          { backgroundColor: index === chooseItem ? "#DCCDE5" : "#FFFFFF" },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={styles.itemImage}
            source={require("../assets/tambalBan.jpg")}
          />
        </View>
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.nama}</Text>
          <Separator h={3} />
          <StarRating rating={item.rating} />
          <Separator h={3} />
          <Text style={styles.itemText}>{item.tipe}</Text>
          <Separator h={3} />
          <Text style={styles.itemText}>{item.alamat}</Text>
          <Separator h={3} />
          <Text style={styles.itemText}>Fasilitas :</Text>
          {item.fasilitas.map((fasilitas, index) => (
            <View key={index} style={styles.bulletPoint}>
              <Text style={styles.bulletText}>• </Text>
              <Text style={styles.bulletText}>{fasilitas}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: parseFloat(-7.3385169),
            longitude: parseFloat(112.719163),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        ></MapView>
      </View>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={listTambalBan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Nerby;
