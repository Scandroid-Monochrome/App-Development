/**
 * @fileOverview This is a component for the Explore page, which allows users to search for posts and create new posts.
 * @module (Tabs)/Explore
 */

import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './index.style'
import { Stack, useRouter } from "expo-router";

/**
 * Explore Component for viewing community posts and creating new posts
 * 
 * @component
 * @param {string} searchTerm - what the user is searching for
 * @param {function} setSearchTerm - sets the search term
 * @param {function} handleClick - handles click event for search
 * @returns {JSX.Element} the explore page
 */
const explore = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter()

  const onPushCreate = () => {
    router.push('/create')
  }

  return (
    <View style={{flex : 1}} contentContainerStyle={{ flexGrow: 1 }}>
      
      <ScrollView style={{backgroundColor: '#FBFAF5'}}>
        <View style={styles.topPadding}></View>
        <View style={styles.topBackground}>
          <View style={styles.topContainer}>
            <Text style={styles.bigText}>
              Share your experience
            </Text>
            <Text style={styles.smallText}>
              connect with the community
            </Text>

            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchTerm}
                  onChangeText={(text) => setSearchTerm(text)}
                  placeholder='Search...'
                />
              </View>
            </View>

            <View style={styles.createSection}>
              <Image 
                style={styles.pfpImage}
                resizeMode='cover'
                src={'https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg'}
              />
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createText}>
                  Create a new post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.stomach}></View>
        </View>

        <View style={styles.bottomBackground}>
          <View style={styles.bottomContainer}>
            <Text style={styles.mainTitle}>
              <Text style={styles.firstTitle}>
                {'Latest '}
              </Text>
              <Text style={styles.secondTitle}>
                posts
              </Text>
            </Text>
          </View>
        </View>
        
      </ScrollView>
    </View>
  )
}

export default explore