import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Image
} from 'react-native';


import Orientation from 'react-native-orientation';

import RNFS from 'react-native-fs'

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filedata: [],
      permission: false,
      current_path: this.props.route.params.path == '' ? RNFS.ExternalStorageDirectoryPath : this.props.route.params.path
    }
  }

  componentDidMount() {

    var l = this.state.current_path.length

    this.props.navigation.setOptions({
      title: '...' + this.state.current_path.substring(l - 15, l), headerStyle: {
        backgroundColor: '#000000'
      },
      headerTitleStyle: {
        color: '#ffffff'
      },
      headerTintColor: '#fff'
    })

    Orientation.unlockAllOrientations();

    this.requestStoragePermission();
    this.getFiles();

  }


  requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "MyPro wants storage permission" +
            "so you can browse files",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Granted");
        this.setState({
          permission_allowed: true
        });
      } else {
        this.setState({
          permission_allowed: false
        });
        console.log("Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



  getFiles = () => {
    // get a list of files and directories in the main bundle
    RNFS.readDir(this.state.current_path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        // Alert.alert('GOT RESULT', result[0].name);
        console.log(result);
        this.setState({
          filedata: result.filter(item => {
            return item.name.includes('.mp4') || item.name.includes('.mkv') || !item.name.includes('.')
          })
        })

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
  }

  fileitem = (item) => {
    var f = this.state.current_path + '/' + item.name;
    return <View style={{ margin: 5, padding: 5 }}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => {
          if (item.name.includes('.mp4') || item.name.includes('.mkv')) {
            this.props.navigation.navigate('VideoScreen',{path_location:item.path})

          }
          else if (!item.name.includes('.')) {
            this.props.navigation.push('Home', { path: f })
            
          }

        }}
      >
        <Image
          style={{ width: 40, height: 40, marginRight: 5 }}
          source={item.name.includes('.mp4') || item.name.includes('.mkv') ? require('./app/assets/video_player.png') : require('./app/assets/folder.png') }
        ></Image>
        <Text
          style={{ color: 'white', marginLeft: 10 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>

  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#1B1B1B' }}>

        <FlatList
          data={this.state.filedata}
          renderItem={
            ({ item }) => this.fileitem(item)
          }
        >
        </FlatList>

      </View>

    )
  }

}

export default HomeScreen;
