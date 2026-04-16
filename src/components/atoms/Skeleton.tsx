import { useEffect, useRef } from "react";
import { Animated, DimensionValue, StyleSheet, View } from "react-native";

interface SkeletonProps {
    height?: number;
    animationWidth?: number;
    width?: DimensionValue;
    className?: string;
}

export function Skeleton({
    height = 20,
    width = "100%",
    animationWidth = 400,
    className = "",
}: SkeletonProps) {
    const shimmerOpacity = useRef(new Animated.Value(0)).current;
    const shimmerTranslateX = useRef(new Animated.Value(-animationWidth)).current;
    const randomDelay = useRef(Math.random() * 1000).current;

    useEffect(() => {
        const animation = Animated.parallel([
            Animated.loop(
                Animated.sequence([
                    Animated.delay(randomDelay),
                    Animated.sequence([
                        Animated.timing(shimmerOpacity, {
                            toValue: 0.8,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(shimmerOpacity, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.delay(randomDelay),
                    Animated.sequence([
                        Animated.timing(shimmerTranslateX, {
                            toValue: animationWidth,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(shimmerTranslateX, {
                            toValue: -animationWidth,
                            duration: 0,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
            ),
        ]);

        animation.start();
        return () => animation.stop();
    }, []);

    return (
        <View className={className} style={{ width }}>
            <View style={[styles.base, { height }]}>
                <Animated.View
                    style={[
                        styles.shimmer,
                        {
                            opacity: shimmerOpacity,
                            transform: [{ translateX: shimmerTranslateX }],
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: "#CBD5E1",
        overflow: "hidden",
        borderRadius: 6,
    },
    shimmer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#E2E8F0",
    },
});
