import { View, Text, StyleSheet, FlatList, Image} from "react-native";
import React from "react";
import { Profile, Button, Separator } from "../components";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#DCCDE5",
    borderColor: 'black',
    padding: 10,
    borderRadius: 5
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    flex: 1
  },
  info: {
    flex: 2,
  },
});



const ProfileScreen = ({ navigation }) => {
  const dataBerita = [
    {
      id: 0,
      judul: "Pentingnya performa ban untuk berkendara",
      subJudul: "Performa buruk berbahaya",
      img: "https://i.ibb.co/mS5z6YM/ban.jpg",
    },
    {
      id: 1,
      judul: "Kriteria ban yang baik untuk kendaraanmu",
      subJudul: "beberapa kriteria ban yang baik",
      img: "https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2019/10/20210943/pjimage-2020-07-20T210935.586.jpg",
    },
    {
      id: 2,
      judul: "Ban bocor berpotensi sobek?",
      subJudul: "Bahaya ban bocor",
      img: "https://www.wahanahonda.com/assets/upload/berita/BERITA_1612703202_f313da56f339b5fb48dda003e147fb92.jpg",
    },
  ];
  
  const renderBerita = ({ item }) => {
    return (
      <>
        <View
          style={{
            width: "100%",
            height: 80,
            borderRadius: 10,
            backgroundColor: "#DCCDE5",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius:10 }}
                source={{
                  uri: item.img,
                }}
              ></Image>
              <View style={{ paddingHorizontal: 10, maxWidth: "80%" }}>
                <Text
                  style={{
                    fontFamily: "Inter_700Bold",
                    color: "#5A1781",
                    fontSize: 13,
                  }}
                >
                  {item.judul}
                </Text>
                {/* <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
                  {item.img}
                </Text> */}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                // backgroundColor: "blue",
              }}
            >
              <View
                style={{
                  backgroundColor: "#774494",
                  width: "80%",
                  height: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white" }}>lebih</Text>
              </View>
            </View>
          </View>
        </View>
        <Separator h={15} />
      </>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <View style={{ flexDirection: "row", backgroundColor: "#774494", padding: 10 }}>
        <Profile name={"GGoldy"} />
      </View>
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}>

        <Separator h={10} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', margin: 10 }}>User Information</Text>
        <View style={styles.container}>

          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.info}>: Goldy Subagyo</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.info}>: goldysubagyo@gmail.com</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.info}>: Jl. Jemur Andayani XXII/10</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.info}>: 081-xxx-xxx</Text>
            </View>
          </View>

        </View>
        <Separator h={30} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'left' }}>Recent Visits</Text>
        <Separator h={15} />
        <FlatList
            data={dataBerita}
            renderItem={renderBerita}
            keyExtractor={(item) => item.id}
            // horizontal={true}
            showsVerticalScrollIndicator={false}
          />

        <Button
          left={false}
          text={"Keluar"}
          op={() => navigation.navigate("Login")}
          full={true}
        />
      </View>
      
    </View>
  );
};

export default ProfileScreen;
