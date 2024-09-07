import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ScreenHeaderBtn} from "../../components/index.js";
import { COLORS, icons, SIZES } from "../../constants/index.js";
import styles from "./ActivitiesDetails.style.js";
import { getActivity } from "../../services/getData.js";
import useSupabase from "../../services/useSupabase.js";
import Navigation from "../../components/activity-details/navigation/Navigation.js";

const categories = ["Swimming", "Fishing", "Paddling", "Boating and Sailing", "Hiking, Walk, & Run"];

const ActivitiesDetails = () => {
  const {id} = useLocalSearchParams();
  const router = useRouter();

  const { data, refetch, error } = useSupabase(() => getActivity(`${id}`));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.neutral }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        styles={{position: 'absolute'}}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <ImageBackground
          source = {{uri: (data.image)}}
          resizeMode= 'cover'
          style = {styles.backgroundRiver}
        >
          <View style={styles.stomach}/>
        </ImageBackground>
        
        <View style = {styles.infoMainContainer}> 
            <View style = {styles.infoContainer}>

              {/*Top Catergory and Ratings Section */}
              <View style={styles.infoTextContainer}>
                <View style={styles.infoTopContainer}>
                  <View style={styles.category(data.activity)}>
                    {icons.IconSelect(data.activity, 24)}
                    <Text style={styles.categoryText}>{data.activity}</Text>
                  </View>
                  <View>
                    <Text style={styles.categoryText}> Ratings</Text>
                  </View>
                </View>
              </View>

              {/*Description Section */}
              <View style = {styles.infoTextContainer}>
                <Text style = {styles.activityName}> 
                  {data.name} 
                </Text>
                <Text style = {styles.activityDescription}>
                  {data.description}
                </Text>
              </View>

              {/*Navigation Section */}
              <View style = {styles.infoTextContainer}>
                <Text style = {styles.title}>
                  Navigation
                </Text>
                <Navigation item={data} />
              </View>

            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivitiesDetails;