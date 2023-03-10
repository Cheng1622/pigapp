/**
 * Created by HuangXiaoFeng on 2018-02-08.
 */

import React, { PureComponent } from 'react';
import {
    Platform,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import ListItem from '../components/ListItem'
import Login from './Login';

export default class Mine extends PureComponent {

    /* 构造器 */
    constructor(props) {
        super(props);
        this.state = {
            rotation: new Animated.Value(0),
            scale: new Animated.Value(1),
            translateY: new Animated.Value(10),
            opacity: new Animated.Value(0)
        };
    }

    settingData = [
        {
            leftText: '我的消息',
            rightText: '评论我的跟帖/通知',
            onPress() {
                alert(123);
            }
        },
        {
            leftText: '我的关注',
        },
        {
            leftText: '金币商城',
            rightText: '踏春出行，新品幸运享不停'
        },
        {
            leftText: '活动广场',
        },
        {
            leftText: '我的钱包',
        },
        {
            leftText: '免流量看新闻',
        },
        {
            leftText: '扫一扫',
        },
        {
            leftText: '设置',
            isShowUnderline: false
        },
    ];

    /* 渲染后 */
    componentDidMount() {

        //顺序执行
        Animated.sequence([

            Animated.timing(
                this.state.rotation,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,// linear \ ease
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.scale,
                {
                    toValue: 1.3,
                    duration: 600,
                    useNativeDriver: true
                }
            ),

            // 同时执行
            Animated.parallel([
                Animated.timing(
                    this.state.scale,
                    {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    this.state.translateY,
                    {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true
                    }
                ),
            ])

        ]).start();

    }
    _showLogin = () => {
        if (this.state.user_name) {
            return (
                <View style={{ marginTop: 20, flexDirection: 'row', marginLeft: 20 }}>
                    <Image source={{ uri: this.state.user_avatar }} style={styles.avatar} />
                    <Text style={{ fontSize: 23, marginTop: 15, marginLeft: 10, fontWeight: 'bold' }}>{this.state.user_name}</Text>
                </View>
            )
        } else {

            return (
                <View style={styles.loginBtn} onTouchStart={() => {
                    this.props.navigation.navigate('Login', {
                        refresh: () => { this._getUserDetail() }
                    });
                }} >
                    <Text style={styles.logintxt}>登录</Text>
                </View>
            )
        }

    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {

                    this._showLogin()
                }

                {/* 头部 */}
                <View style={styles.headContainer}>

                    {/* 夜间/签到 */}
                    <View style={styles.headTopContainer}>

                        <TouchableOpacity style={styles.topBtnStyle} activeOpacity={.9} onPress={() => { alert('夜间') }}>
                            <Image source={require('./../../assets/images/i_night.png')} style={styles.headTopImg} resizeMode={'contain'} />
                            <Text style={styles.headTopText}>夜间</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.topBtnStyle} activeOpacity={.9} onPress={() => { alert('签到') }}>
                            <Image source={require('./../../assets/images/i_sign.png')} style={styles.headTopImg} resizeMode={'contain'} />
                            <Text style={styles.headTopText}>签到</Text>
                        </TouchableOpacity>

                    </View>

                    {/* 头像、昵称、标签 */}
                    <View style={styles.headCenterContainer}>
                        <Animated.Image style={[styles.userImg, {
                            transform: [
                                {
                                    rotateY: this.state.rotation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '720deg']
                                    }),
                                },
                                {
                                    scale: this.state.scale
                                }
                            ]
                        }]} source={require('./../../assets/images/i_user.jpg')} resizeMode={'contain'} />

                        <Animated.Text style={[styles.userNickname, {
                            opacity: this.state.opacity, transform: [

                                {
                                    translateY: this.state.translateY
                                }


                            ]
                        }]}>Pinuo</Animated.Text>
                        <View style={styles.positionContainer}>
                            <Image style={styles.positionImg} source={require('./../../assets/images/i_bookmark.png')} />
                            <Text style={styles.positionText}>跟帖局副处长</Text>
                        </View>
                    </View>

                    {/* 收藏、历史、跟帖 */}
                    <View style={styles.headBottomContainer} >

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => { alert('收藏') }}>
                            <Text style={styles.bottomNum}>2</Text>
                            <Text style={styles.bottomText}>收藏</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => { alert('历史') }}>
                            <Text style={styles.bottomNum}>979</Text>
                            <Text style={styles.bottomText}>历史</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.bottomBtn} activeOpacity={1} onPress={() => { alert('跟帖') }}>
                            <Text style={styles.bottomNum}>170</Text>
                            <Text style={styles.bottomText}>跟帖</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                {/* 过渡条 */}
                <View style={styles.transitionView} />

                {/* 设置列表 */}
                <View style={styles.settingListContainer}>
                    {
                        this.settingData.map((item, index) => (
                            <ListItem
                                key={index}
                                leftText={item.leftText}
                                rightText={item.rightText}
                                rightComponent={item.rightComponent}
                                isShowArrow={item.isShowArrow}
                                isShowUnderline={item.isShowUnderline}
                                onPress={item.onPress}
                            />
                        ))
                    }

                </View>


            </ScrollView>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    headContainer: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        // paddingTop: isLT19()?10:30,
    },
    headTopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    topBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 30,
        borderColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 20,
    },
    headTopImg: {
        width: 15,
        height: 15,
        marginRight: 5
    },
    headTopText: {
        fontSize: 12,
        color: '#515151'
    },
    headCenterContainer: {
        alignItems: 'center',
        marginBottom: 15
    },
    userImg: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    userNickname: {
        marginVertical: 5,
        fontSize: 20,
        color: '#000'
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    positionImg: {
        width: 10,
        height: 10,
        marginRight: 2
    },
    positionText: {
        color: '#bfbfbf',
        fontSize: 10
    },
    headBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomBtn: {
        alignItems: 'center'
    },
    bottomNum: {
        fontSize: 20,
        color: '#000'
    },
    bottomText: {
        color: '#bfbfbf',
        fontSize: 12
    },
    transitionView: {
        height: 5,
        backgroundColor: 'rgba(230,230,230, .5)'
    },
    settingListContainer: {
        paddingLeft: 20,
    },
    tabBarIcon:{
        width:21,
        height:21,
    },
    loginBtn:{
        width:100,
        height:100,
        backgroundColor:'red',
        borderRadius:50,
        marginTop:25,
        marginLeft:160
    },
    loginBtn1:{
        display:'none'
    },
    logintxt:{
        position:'absolute',
        top:32,
        left:25,
        fontSize:24,
        color:'white'
    },
    wrapper:{
        marginTop:40,
        height:140
    },
    mineContent:{
        marginTop:15,
        flexWrap:'wrap',
        width:400,
        display:"flex",
        flexDirection:'row',
        marginLeft:30
    },
    mineItem:{
        width:100,
        height:90
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:50,
       
    }

});