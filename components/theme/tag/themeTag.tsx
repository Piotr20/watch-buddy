import { useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode } from 'react';
import { type TextProps } from 'react-native';
import { ThemeText } from '../typography';
import { ThemeView } from '../view';

type Props = TextProps & {
  children: ReactNode;
};

export function ThemeTag({ children }: Props) {
  const colors = useThemeColor();

  return (
    <ThemeView
      style={{
        backgroundColor: colors.background.secondary,
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start'
      }}>
      <ThemeText 
        size="xs"
        style={{
          color: colors.text.details
        }}>{children}
      </ThemeText>
    </ThemeView>
  );
}
