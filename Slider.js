import React, {Component} from 'react';
import {Animated,PanResponder,SafeAreaView, View,Dimensions,Text, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('window');
import {PanGestureHandler, State} from 'react-native-gesture-handler';

class Slider extends Component{
    pointerSize = 20;
    minRef = React.createRef();
    barRef = React.createRef();
    state={
        sliderMax:1000, sliderMin:0,
        min:0, max: 1000, shouldAnimate: true, minPan: new Animated.ValueXY(0),
        maxPan: new Animated.ValueXY(0),
        sliderPosition: {
            x:0,y:0
        }
    }
    constructor() {
        super();
        this.translateX = new Animated.Value(0);
        this.minX = new Animated.Value(0);
        this.maxX = new Animated.Value(0);
        this.maxMove = Animated.event([{
            nativeEvent: {
                translationX: this.maxX
            }
        }])
        this.state.minPan.x.addListener(value => (this._animatedValueX = value.value));
        this.state.maxPan.x.addListener(value => (this._animatedValueX2 = value.value));
        const misc = {
            onStartShouldSetPanResponder:()=>true,
            onStartShouldSetPanResponderCapture:()=>true,
            onMoveShouldSetPanResponder:()=>true,
            onMoveShouldSetPanResponderCapture:()=>true,
            onShouldBlockNativeResponder:()=>true,
        }

        this._panResponder = PanResponder.create({
            ...misc,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.minPan.setOffset({x: this._animatedValueX});
                this.state.minPan.setValue({x: 0});
            },
            onPanResponderMove: (event,gestureState)=>{
                let {_offset, _value, _startingValue} = this.state.minPan.x;
                if(gestureState.dx>0){
                    Animated.event([null, {dx: this.state.minPan.x}])(event,gestureState)
                    this.setState({min: Math.floor(_offset+_value)})
                } else if(_offset+_value>_startingValue) {
                    Animated.event([null, {dx: this.state.minPan.x}])(event,gestureState)
                    this.setState({min: Math.floor(_offset+_value)})
                }
            }
        });


        this._panResponder2 = PanResponder.create({
            ...misc,
            onPanResponderGrant: (evt, gestureState) => {
                this.state.maxPan.setOffset({x: this._animatedValueX2});
                this.state.maxPan.setValue({x: 0});
            },
            onPanResponderMove: (event,gestureState)=>{
                if((this.state.sliderPosition.x + this.state.sliderPosition.width-(this.pointerSize/2))>gestureState.moveX){
                    Animated.event([null, {dx: this.state.maxPan.x}])(event,gestureState);
                    // console.log("X2:",{...Object.assign({}, this.state.maxPan.x)})
                    // console.log("GS:",{...Object.assign({}, gestureState)})
                    // console.log("GS:",
                    //     (Math.floor(gestureState.moveX)/Math.floor(this.state.sliderPosition.x + this.state.sliderPosition.width)).toFixed(2)
                    //     );
                    let percentage = Math.floor(gestureState.moveX).toFixed(2)/Math.floor(this.state.sliderPosition.x + this.state.sliderPosition.width).toFixed(2);
                    this.setState({max:Math.floor(percentage*this.state.sliderMax)})
                }
            }
        });
    }

    componentDidMount(){
        this._animatedValueX = 0;
        this._animatedValueX2 = 0;

        console.log("MINREF: ", this.minRef);
        // console.log("BAR REF: ", this.barRef);
        console.log("WEIDTH: ", width*0.5);
        // console.log("UI: ", this.state.pan.x._startingValue);
    }

    render(){
        const transform = [{ translateX: this.translateX }];
        console.log(this.state.sliderPosition);
        console.log("sMAX",this.state.sliderMax, "max:", this.state.max);
        console.log("min:", this.state.min);
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View
                        onLayout={({nativeEvent})=>this.setState({
                            sliderPosition: nativeEvent.layout
                        })}
                        style={{borderWidth:1}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <Animated.View
                                {...this._panResponder.panHandlers}
                                style={{
                                    alignItems:'center', justifyContent:'center',
                                    transform: [{translateX: this.state.minPan.x}],
                                }}>
                                <View style={{
                                    width:this.pointerSize, height: this.pointerSize, backgroundColor: 'rgba(32,101,255,0.55)',borderRadius:100,
                                    alignItems:'center',justifyContent:'flex-end'}} />
                                <View style={{width:3, height: 15, backgroundColor: 'rgba(32,101,255,0.55)'}}/>
                            </Animated.View>
                            <Animated.View
                                {...this._panResponder2.panHandlers}
                                ref = {ref=>this.maxRef = ref}
                                style={{
                                    alignItems:'center', justifyContent:'center',
                                    transform: [{translateX: this.state.maxPan.x}],
                                }}>
                                <View style={{
                                    width:this.pointerSize, height: this.pointerSize, backgroundColor: 'rgba(32,101,255,0.55)',borderRadius:100,
                                    alignItems:'center',justifyContent:'flex-end'}} />
                                <View style={{width:3, height: 15, backgroundColor: 'rgba(32,101,255,0.55)'}}/>
                            </Animated.View>
                        </View>
                        <View
                            style={{marginBottom:100,borderRadius:10,width:width*0.5, height:10, backgroundColor:'grey', flexDirection:'row'}}>
                            <View  style={{width:this.state.min+10, height:10,backgroundColor:'red'}}/>
                            <View  style={{flex:1, height:10,backgroundColor:'green'}}/>
                            <View  style={{width:this.state.sliderMax-this.state.max+10, height:10,backgroundColor:'blue'}}/>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>Min Price: {this.state.min}</Text>
                    <Text>Max Price: {this.state.max}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default Slider;
