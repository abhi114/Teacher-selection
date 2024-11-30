import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Heart, 
  X, 
  Award, 
  Briefcase, 
  Check, 
  UserCheck,
  Search, 
  Filter, 
  SquarePlay
} from 'lucide-react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('window');

const TEACHERS = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    expertise: 'Mathematics',
    experience: 7,
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
    achievements: ['Teaching Excellence Award', 'Math Olympiad Coach'],
    Proximity:3
  },
  {
    id: 2,
    name: 'Michael Chang',
    expertise: 'Computer Science',
    experience: 12,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    achievements: ['Tech Innovator Award', 'Coding Curriculum Developer'],
    Proximity:2
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    expertise: 'Biology',
    experience: 5,
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    achievements: ['Science Fair Mentor', 'Research Publication'],
    Proximity:15
  },
  {
    id: 4,
    name: 'David Kim',
    expertise: 'Computer Science',
    experience: 8,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    achievements: ['AI Research Lead', 'Startup Founder'],
    Proximity:5
  }
];

const TeacherCard = ({ teacher, onSwipe,showFilters }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      //translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > width / 3) {
        const swipeDirection = event.translationX > 0 ? 'right' : 'left';
        runOnJS(onSwipe)(teacher, swipeDirection);
        //runOnJS(handleStopVideo);
        translateX.value = withSpring(
          event.translationX > 0 ? width : -width
        );
        //videoRef.current.stopAsync();
        //setIsPlaying(false);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-15, 0, 15]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` }
      ]
    };
  });
   const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlayIntro = () => {
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    
  };
  const [status, setStatus] = useState({});
  const handleStopVideo = () => {
  if (videoRef.current) {
    videoRef.current.stopAsync();
    setIsPlaying(false);
  }
};
 return (
  <PanGestureHandler onGestureEvent={gestureHandler}>
    
    <Animated.View
      className={`absolute w-11/12 self-center ${showFilters == true ?'h-full':'h-3/4'} bg-white rounded-2xl shadow-2xl overflow-hidden`}
      style={animatedStyle}
    >
      <LinearGradient
        colors={['#4A90E2', '#50C878']}
        className="absolute inset-0 opacity-10"
      />
      {isPlaying ? (
        <View className="relative w-full h-2/5">
          <Video
            ref={videoRef}
            source={require('../assets/teacher-demo-1.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            useNativeControls
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                handleVideoEnd();
              }
            }}
            style={{ borderRadius: 10, width: '100%', height: '100%' }}
          />
          {status.isBuffering && (
            <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50">
              <ActivityIndicator size="large" color="white" />
              <Text className="text-white mt-2">Loading...</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={handleStopVideo}
            className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
          >
            <X color="white" size={20} />
          </TouchableOpacity>
        </View>
      ) : (
        <Image
          source={{ uri: teacher.image }}
          className="w-full h-2/5"
          resizeMode="cover"
          style={{ borderRadius: 10 }}
        />
      )}
      
      <View className="p-5 flex-1 justify-between ">
        
       
        
       
        <View>
           <TouchableOpacity 
          className="flex flex-row justify-center items-center mb-2 gap-1" 
          onPress={() => handlePlayIntro()}
        >
          <SquarePlay size={20} className="text-blue-600"/>
          <Text className="text-sm text-blue-600">Play Intro</Text>
        </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text className="text-xl font-bold mb-2">{teacher.name} <Text className="text-sm font-bold mb-2 text-red-400">({teacher.Proximity} km Away)</Text></Text>
          
          </View>
          
          <View className="flex-row items-center mb-2">
            <Briefcase size={20} color="#4A5568" className="mr-2" />
            <Text className="text-gray-600">{teacher.expertise}</Text>
          </View>
          
          <View className="flex-row items-center mb-2">
            <Award size={20} color="#4A5568" className="mr-2" />
            <Text className="text-gray-600">{teacher.experience} Years Experience</Text>
          </View>
          
          <View >
            <Text className="text-lg font-semibold mb-2">Achievements:</Text>
            {teacher.achievements.map((achievement, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <UserCheck size={16} color="#48BB78" className="mr-2" />
                <Text className="text-green-600">{achievement}</Text>
              </View>
            ))}
          </View>
          
        </View>
         <View className="flex-row justify-between mt-2 mb-2">
          <TouchableOpacity
            onPress={() => onSwipe(teacher, 'left')}
            className="bg-red-500 p-3 rounded-full"
          >
            <X color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSwipe(teacher, 'right')}
            className="bg-green-500 p-3 rounded-full"
          >
            <Check color="white" size={20} />
          </TouchableOpacity>
        </View>
        
       
      </View>
    </Animated.View>
    
  </PanGestureHandler>
);
};

export default function TeacherMatchingApp() {
  const [teachers, setTeachers] = useState(TEACHERS);
  const [matches, setMatches] = useState([]);
  const [showFilters,setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minExperience: 0,
    expertise: '',
    Proximity:0
  });
  useEffect(() => {
    getMatchesFromStorage();
  
    return () => {
      
    }
  }, [])
  
  const handleSwipe = async (teacher, direction) => {
  if (direction === 'right') {
    // Prevent duplicates by checking if the teacher already exists in matches
    setMatches((prev) => {
      if (prev.some((match) => match.id === teacher.id)) {
        console.log('Teacher already exists in matches, not adding duplicate.');
        return prev; // Return the current state without changes
      }

      // Add the teacher to matches if not already present
      const updatedMatches = [...prev, teacher];

      // Save to AsyncStorage
      try {
        AsyncStorage.setItem('matches', JSON.stringify(updatedMatches));
        console.log('Matches saved to AsyncStorage!');
      } catch (error) {
        console.error('Error saving matches to AsyncStorage:', error);
      }

      return updatedMatches;
    });
  }

  // Remove the swiped teacher from the teachers list
  setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
};

 const getMatchesFromStorage = async () => {
  try {
    const storedMatches = await AsyncStorage.getItem('matches');
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      const newMatches = parsedMatches.filter(
        (storedMatch) => !matches.some((match) => match.id === storedMatch.id)
      );

      if (newMatches.length > 0) {
        setMatches((prevMatches) => [...prevMatches, ...newMatches]);
        console.log('New matches added from AsyncStorage:', newMatches);
      } else {
        console.log('No new matches to add from AsyncStorage.');
      }
    }
  } catch (error) {
    console.error('Error retrieving matches from AsyncStorage:', error);
  }
};

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    teacher.experience >= filters.minExperience && teacher.Proximity >= filters.Proximity && 
    (filters.expertise ? teacher.expertise === filters.expertise : true)
  );

  const resetFilters = () => {
    setShowFilters(!showFilters)
    setFilters({ minExperience: 0, expertise: '' ,Proximity:0});
    setSearchTerm('');
  };

  if (teachers.length === 0) {
    return (
      <LinearGradient 
        colors={['#4A90E2', '#50C878']} 
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1 pt-12 px-4">
          <Text className="text-3xl font-bold text-white mb-4">Your Teachers</Text>
          {matches.length == 0 && (<Text className="text-md font-bold text-white mb-4 text-center">No Teachers Selected</Text>)}
          <ScrollView>
            {matches.map(teacher => (
              <View 
                key={teacher.id} 
                className="bg-white/20 rounded-xl p-4 mb-3 flex-row items-center"
              >
                <Image 
                  source={{ uri: teacher.image }} 
                  className="w-16 h-16 rounded-full mr-4" 
                />
                <View>
                  <Text className="text-lg font-bold text-white">{teacher.name}</Text>
                  <Text className="text-gray-200">{teacher.expertise}</Text>
                </View>
              </View>
            ))}
              <TouchableOpacity 
        className="mt-4 px-6 py-3 bg-white/30 rounded-full border border-white/50 shadow-md flex-row items-center justify-center"
         onPress={()=>{ console.log("press")
            setTeachers(TEACHERS) 
            setMatches([])}}>
       <Text className="text-white font-bold text-base text-center">
             Explore More Options
         </Text>
              </TouchableOpacity>
          
       
          </ScrollView>
          
        </View>
       
      </LinearGradient>
    );
  }

 return (
  <LinearGradient
    colors={['#4A90E2', '#50C878']}
    className="flex-1"
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View className="pt-12 px-4 flex-1">
      <Text className="text-xl font-bold text-white mb-4">Find Your Teacher</Text>

      <View className="flex-row mb-4">
        <View className="flex-1 flex-row items-center bg-white/20 rounded-xl px-4 mr-2">
          <Search color="white" size={20} />
          <TextInput
            placeholder="Search teachers"
            placeholderTextColor="white"
            className="flex-1 text-white p-2"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity
          onPress={resetFilters}
          className={`${
            showFilters ? 'bg-yellow-300' : 'bg-white/20'
          } rounded-xl p-2 justify-center`}
        >
          <Filter color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Wrap this section in a ScrollView */}
      <ScrollView
        contentContainerStyle={{flex:1}} // Add padding to prevent content from being cut off
        showsVerticalScrollIndicator={false}
      >
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: true, margin: 5 }}
          >
            {['Mathematics', 'Computer Science', 'Biology'].map((expertise) => (
              <TouchableOpacity
                key={expertise}
                className={`mr-2 px-3 py-2 rounded-full h-[40px] ${
                  filters.expertise === expertise ? 'bg-white' : 'bg-white/20'
                }`}
                onPress={() =>
                  setFilters({
                    ...filters,
                    expertise: filters.expertise === expertise ? '' : expertise,
                  })
                }
                style={{ justifyContent: 'center' }}
              >
                <Text
                  className={
                    filters.expertise === expertise
                      ? 'text-blue-500'
                      : 'text-white'
                  }
                  style={{ alignSelf: 'center' }}
                >
                  {expertise}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {showFilters && (
          <View className="flex-row items-center p-2 justify-center gap-1">
            <Text className="text-white">Min Distance:</Text>
            <View className="flex-row">
              {[0, 5, 10].map((Proximity) => (
                <TouchableOpacity
                  key={Proximity}
                  className={`mr-2 px-3 py-2 rounded-full ${
                    filters.Proximity === Proximity ? 'bg-white' : 'bg-white/20'
                  }`}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      Proximity:
                        filters.Proximity === Proximity ? 0 : Proximity,
                    })
                  }
                >
                  <Text
                    className={
                      filters.Proximity === Proximity
                        ? 'text-blue-500'
                        : 'text-white'
                    }
                  >
                    {Proximity}+ KM
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {showFilters && (
          <View className="flex-row mb-4 items-center p-2 justify-center gap-1">
            <Text className="text-white">Experience:</Text>
            <View className="flex-row">
              {[0, 5, 10].map((years) => (
                <TouchableOpacity
                  key={years}
                  className={`mr-2 px-3 py-2 rounded-full ${
                    filters.minExperience === years
                      ? 'bg-white'
                      : 'bg-white/20'
                  }`}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      minExperience:
                        filters.minExperience === years ? 0 : years,
                    })
                  }
                >
                  <Text
                    className={
                      filters.minExperience === years
                        ? 'text-blue-500'
                        : 'text-white'
                    }
                  >
                    {years}+ Years
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {filteredTeachers.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-xl">
              No teachers match your filters
            </Text>
            <TouchableOpacity
              className="mt-4 px-6 py-3 bg-white/30 rounded-full border border-white/50 shadow-md flex-row items-center justify-center"
              onPress={() => {
                setTeachers([]);
              }}
            >
              <Text className="text-white font-bold text-base text-center">
                Check My Teachers
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-full h-full mb-2 flex-1">
            
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onSwipe={handleSwipe}
                showFilters={showFilters}
              />
              
            ))}
            
          </View>
          
        )}
        
      </ScrollView>
    </View>
  </LinearGradient>
);

}