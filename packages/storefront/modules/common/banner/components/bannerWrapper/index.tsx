import Link from 'next/link';
import { ReactChild } from 'react';

import Button from '@/modules/common/banner/components/bannerButton';

interface BannerProps {
  bg?: string;
  width?: string;
  height?: string;
  buttonText?: string;
  position?: string;
  linkhref: string;
  buttonPosition?: string;
  buttonEdge?: string;
  hasButton?: boolean;
  hasHeading?: boolean;
  heading?: ReactChild;
  hasBodyText?: boolean;
  bodyText?: ReactChild;
  buttonPadding?: string;
  buttonMargin?: string;
  buttonBg?: string;
  onHover?: string;
  buttonTextColor?: string;
}

const BannerWrapper: React.FC<BannerProps> = (props) => {
  const {
    bg,
    width,
    height,
    buttonText,
    position,
    linkhref,
    buttonPosition,
    buttonEdge,
    hasButton,
    hasHeading,
    heading,
    hasBodyText,
    bodyText,
    buttonPadding,
    buttonMargin,
    buttonBg,
    onHover,
    buttonTextColor,
  } = props;
  return (
    <div className={`${position} ${bg} ${width} ${height} container mx-auto`}>
      {hasBodyText && <>{bodyText}</>}
      {hasHeading && <>{heading}</>}

      {hasButton && (
        <div className="container mx-auto px-4">
          <Link href={linkhref} passHref>

            <Button
              position={buttonPosition}
              padding={buttonPadding}
              margin={buttonMargin}
              bg={buttonBg}
              buttonText={buttonText}
              onHover={onHover}
              textColor={buttonTextColor}
              edge={buttonEdge}
            />

          </Link>
        </div>
      )}
    </div>
  );
};

export default BannerWrapper;
