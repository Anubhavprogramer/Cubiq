import { Text } from "react-native";

const ThemedText: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => {
    return <Text style={[{ color: '#333', fontFamily: 'Jersey25-Regular' }, style]}>{children}</Text>;
}

export default ThemedText;