import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler'
import {
    StyleSheet,
    View
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

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
