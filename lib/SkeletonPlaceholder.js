"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const expo_linear_gradient_1 = require("expo-linear-gradient");
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 0 };
function SkeletonPlaceholder({ children, backgroundColor = "#E1E9EE", speed = 800, highlightColor = "#F2F8FC", }) {
    const animatedValue = React.useMemo(() => new react_native_1.Animated.Value(0), []);
    const translateX = React.useMemo(() => animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 350],
    }), [animatedValue]);
    React.useEffect(() => {
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(animatedValue, {
            toValue: 1,
            duration: speed,
            easing: react_native_1.Easing.ease,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [animatedValue, speed]);
    const absoluteTranslateStyle = React.useMemo(() => (Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { transform: [{ translateX }] })), [translateX]);
    const gradientColors = React.useMemo(() => [backgroundColor, highlightColor, backgroundColor], [backgroundColor, highlightColor]);
    const viewStyle = React.useMemo(() => ({ backgroundColor, overflow: "hidden" }), [backgroundColor]);
    const getChildren = React.useCallback((element) => {
        return React.Children.map(element, (child, index) => {
            let style;
            if (child.type.displayName === "SkeletonPlaceholderItem") {
                const _a = child.props, { children } = _a, styles = __rest(_a, ["children"]);
                style = styles;
            }
            else {
                style = child.props.style;
            }
            if (child.props.children) {
                return (<react_native_1.View key={index} style={style}>
                {getChildren(child.props.children)}
              </react_native_1.View>);
            }
            else {
                return (<react_native_1.View key={index} style={styles.childContainer}>
                <react_native_1.View style={[style, viewStyle]}>
                  <react_native_1.Animated.View style={absoluteTranslateStyle}>
                    <expo_linear_gradient_1.LinearGradient colors={gradientColors} start={GRADIENT_START} end={GRADIENT_END} style={styles.gradient}/>
                  </react_native_1.Animated.View>
                </react_native_1.View>
              </react_native_1.View>);
            }
        });
    }, [viewStyle, absoluteTranslateStyle, gradientColors]);
    return <React.Fragment>{getChildren(children)}</React.Fragment>;
}
exports.default = SkeletonPlaceholder;
SkeletonPlaceholder.Item = (_a) => {
    var { children } = _a, style = __rest(_a, ["children"]);
    return (<react_native_1.View style={style}>{children}</react_native_1.View>);
};
//@ts-ignore
SkeletonPlaceholder.Item.displayName = "SkeletonPlaceholderItem";
const styles = react_native_1.StyleSheet.create({
    childContainer: {
        position: "relative",
    },
    gradient: {
        flex: 1,
    },
});
//# sourceMappingURL=SkeletonPlaceholder.js.map