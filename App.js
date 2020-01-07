import React, {Component} from 'react';
import {Animated,SafeAreaView, View,Dimensions,Text, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('window');
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import  An2,{Easing} from 'react-native-reanimated';
import Slider from './Slider';
const { Clock, spring,Value,event,add, set,defined, cond, eq,startClock, clockRunning, timing, debug, stopClock, block } = An2
class App extends Component{

    // dragX = new Value(0);
    // state2 = new Value(-1);
    // dragVX = new Value(0);
    state={
        min:0, max: 1000, shouldAnimate: true
    }
    constructor() {
        super();
        // this.onHandlerStateChange = this.onHandlerStateChange.bind(this)
        // this.translateX = new Value(0);
        // const dragX = new Value(0);
        // const state2 = new Value(-1);
        // const dragVX = new Value(0);
        // this.minMove = event([
        //     {
        //         nativeEvent: {
        //             translationX: dragX, state: state2,
        //             velocityX: dragVX
        //         }
        //     }
        // ]);
        // const clock = new Clock();
        // const transX = new Value(0);
        // // this.translateX = cond(
        // //     eq(this.state2, State.ACTIVE),
        // set(transX, dragX)
        // this.translateX= transX


        this.animated = new Animated.Value(0);

        var range = 1, snapshot = 50, radius = 30;
        /// translateX
        var inputRange = [], outputRange = [];
        for (var i=0; i<=snapshot; ++i) {
            var value = i/snapshot;
            var move = Math.sin(value * Math.PI * 2) * radius;
            inputRange.push(value);
            outputRange.push(move);
        }
        this.tx = this.animated.interpolate({ inputRange, outputRange });

        /// translateY
        var inputRange = [], outputRange = [];
        for (var i=0; i<=snapshot; ++i) {
            var value = i/snapshot;
            var move = -Math.cos(value * Math.PI * 2) * radius;
            inputRange.push(value);
            outputRange.push(move);
        }
        this.ty = this.animated.interpolate({ inputRange, outputRange });


            // ],
            // [
            //     set(transX, cond(defined(transX), runTiming(clock, transX, 0)),0),
            //     transX
            // ])
        // this.animate();
    }
    componentDidMount() {
        var i=0;
        // while(i<10){
        //     i = this.animate(i);
        // }
    }

    // onHandlerStateChange(event){
    //     if(event.nativeEvent.oldState == State.ACTIVE){
    //         Animated.timing(this.translateX, {
    //             toValue: 0,
    //             duration:1000,
    //             useNativeDriver: true,
    //         }).start();
    //     }
    // }

    // minMove=(e)=>
    //     event([
    //         {
    //             nativeEvent: {
    //                 translationX: e.nativeEvent.translationX
    //             }
    //         }
    //     ]);
    //     console.log(e.nativeEvent);
    // }
    animate() {
        // let i = 0;
        this.animated.setValue(0)
        Animated.loop(
            Animated.timing(this.animated, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
            })).start(()=>{
                // if(this.state.shouldAnimate){
                //     this.animated.setValue(0); this.animate()
                // }
            });

    }
    render(){
        const transform = [{ translateY: this.ty }, {translateX: this.tx}];
        if(0){return (
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    {/*<View style={{marginBottom:100,borderRadius:10,alignItems:'center',justifyContent:'space-between',width:width*0.5, height:10, backgroundColor:'grey', flexDirection:'row'}}>*/}
                    {/*    <PanGestureHandler*/}
                    {/*        onGestureEvent={this.minMove}*/}
                    {/*        // onHandlerStateChange={this.minMov}*/}
                    {/*    >*/}
                    {/*        <Animated.View*/}
                    {/*            style={{*/}
                    {/*                width:30, height: 30, backgroundColor: '#2065ff',borderRadius:100,*/}
                    {/*                transform: [{translateX: this.translateX}]*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </PanGestureHandler>*/}

                    {/*    <PanGestureHandler*/}
                    {/*        onGestureEvent={this.maxMove}*/}
                    {/*        // onHandlerStateChange={this.maxMove}*/}
                    {/*    >*/}
                    {/*    <Animated.View*/}
                    {/*        style={{*/}
                    {/*            width:30, height: 30, backgroundColor: '#2065ff',borderRadius:100,*/}
                    {/*            transform: [{translateX: this.translateX}]*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</PanGestureHandler>*/}
                    {/*</View>*/}
                    <Animated.View style={{transform: transform}} >
                        <View style={{width:50, height:50, backgroundColor:'red'}}/>
                        {/*<View style={{width:50, height:30, borderWidth:1, alignItems:'center'}}>*/}
                        {/*    <Text>{this.state.min}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{width:50, height:30, borderWidth:1, alignItems:'center'}}>*/}
                        {/*    <Text>{this.state.max}</Text>*/}
                        {/*</View>*/}
                    </Animated.View>
                    <TouchableOpacity onPress={() => {
                        this.animate()
                    }} ><Text>sd</Text></TouchableOpacity>
                    {/*<PanGestureHandler*/}
                    {/*    onGestureEvent={this.onGestureEvent}*/}
                    {/*    onHandlerStateChange={this.onGestureEvent}*/}
                    {/*>*/}
                    {/*    <Animated.View*/}
                    {/*        style={{*/}
                    {/*            width:100, height: 100, backgroundColor: 'orange',*/}
                    {/*            transform: [{translateX: this.translateX}]*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</PanGestureHandler>*/}
                </View>
            </SafeAreaView>
        );}
        else{
            return (<Slider/>)
        }
    }
}

function runSpring(clock, value, velocity, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, velocity),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ];
}

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

export default App;
