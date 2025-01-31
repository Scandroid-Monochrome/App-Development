import { View, Text, ActivityIndicator, FlatList, ScrollView} from 'react-native'
import React from 'react'
import styles from './ActivityList.style'
import useSupabase from '../../../services/useSupabase'
import {getActivityByCategoryAndRiver } from '../../../services/getData'
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import MiniActivitiesCard from '../../common/cards/mini-activities/miniActivitiesCard'

const ActivityList = ({category, riverID}) => {
    const {router} = useRouter();
    const {data, isLoading, error} = useSupabase(() => getActivityByCategoryAndRiver(category, riverID))

    return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <View style={styles.cardsContainer}>
            {isLoading ? (
                <ActivityIndicator size='large' color={COLORS.primary} />
            ) : error ? (
                <Text>Something went wrong</Text>
            ) : (
                data?.map((item) => (
                <MiniActivitiesCard
                    item={item}
                    key={`${item.id}`}
                    handleNavigate={() => router.push(`/activities/${item.id}`)}
                />  
                ))
            )}
        </View>
    </ScrollView>
  )
}

export default ActivityList