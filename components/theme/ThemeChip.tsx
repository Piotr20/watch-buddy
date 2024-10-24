import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { SvgIcon } from '../svg-icon';
import { ThemeText } from './typography';

type Props = {
  active: boolean ;
};

export function ThemeChip({ active }:Props) {
  const [isWatched, setIsWatched] = useState<boolean>(active);
  const colors = useThemeColor();

  const chipStyles = StyleSheet.create({
    common: {
      paddingVertical: 2,
      paddingHorizontal: 4,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1, 
      borderColor: 'transparent',
      gap: 4,
      alignSelf: 'flex-start',
      ...(Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)),
      position: 'absolute',
    },
    watched: {
      backgroundColor: !isWatched ? 'rgb(255,255,255, 0.3)' : 'rgb(0,0,0, 0.3)',
      ...(isWatched && {
        borderColor: colors.border.brand,
        borderStyle: 'solid',
      }), 
    },
  });

  return (
    <Pressable
      onPress={() => setIsWatched(prevState => !prevState)}
      style={[
        chipStyles.common,
        chipStyles.watched,
      ]}
    >
      {isWatched && (<SvgIcon svg="check" color={colors.background.brand} size={16}/>)}
        <ThemeText size='sm' style={!isWatched ? {color: colors.text.base} : {color: colors.text.brand}}>Watched</ThemeText>
    </Pressable>
  );
}
