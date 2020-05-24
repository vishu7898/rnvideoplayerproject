import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PanGestureHandler } from 'react-native-gesture-handler'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    PermissionsAndroid,
    Image

} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

// import VideoPlayer from 'react-native-video-player';
// import PXVideo from 'accessible-html5-video-player'
// import VideoPlayer from 'react-native-video-player';
// import Video from 'react-native-af-video-player'
import Orientation from 'react-native-orientation';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNFS from 'react-native-fs'

class VideoScreen extends Component {

    static navigationOptions = { header: null };


    constructor(props) {
        super(props);
        this.state = {
            current_path: this.props.route.params.path_location
        }
    }

    componentDidMount() {
        // this.props.navigation.setOption(navigationOptions)

        Orientation.unlockAllOrientations();

    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#1B1B1B' }}>

                <PanGestureHandler
                >

                    <VideoPlayer source={{ uri: this.state.current_path }}
                        playInBackground={true}
                        fullscreen={true}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        resizeMode={"contain"}
                        onBuffer={this.onBuffer}
                        useNativeDriver={true}
                        onError={this.videoError}
                        style={styles.backgroundVideo}
                        controls={true}
                        pictureInPicture={true}
                    />

                </PanGestureHandler>

            </View>

        )
    }

}






const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    container: {
        margin: 10
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default VideoScreen;
