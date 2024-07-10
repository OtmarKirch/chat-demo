
import React from 'react';
import Svg, { G, Path, Rect, Mask, Use } from 'react-native-svg';

const PersonSvg = () => (
  <Svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1">
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <G id="iPhone-XR" transform="translate(-58.000000, -389.000000)">
        <G id="Form" transform="translate(24.000000, 355.000000)">
          <G id="Form-Field_Name" transform="translate(16.000000, 16.000000)">
            <G id="icon" transform="translate(16.000000, 16.000000)">
              <Rect id="bounds" x="0" y="0" width="24" height="23.6666667" />
              <Mask id="mask-2" fill="white" />
              <Use id="profile" fill="#757083" fillRule="nonzero" xlinkHref="#path-1" />
              <Path
                d="M12,13.2533333 C15.24,13.2533333 21.6,14.830125 21.6,18.105 L21.6,20.5308333 L2.4,20.5308333 L2.4,18.105 C2.4,14.830125 8.76,13.2533333 12,13.2533333 Z M20.64,19.5708333 L20.64,18.105 C20.64,16.0913979 15.9773097,14.2133333 12,14.2133333 C8.02269035,14.2133333 3.36,16.0913979 3.36,18.105 L3.36,19.5708333 L20.64,19.5708333 Z M12,11.36 C9.624,11.36 7.68,9.443 7.68,7.1 C7.68,4.757 9.624,2.84 12,2.84 C14.376,2.84 16.32,4.757 16.32,7.1 C16.32,9.443 14.376,11.36 12,11.36 Z M12,10.4 C13.8487889,10.4 15.36,8.90977792 15.36,7.1 C15.36,5.29022208 13.8487889,3.8 12,3.8 C10.1512111,3.8 8.64,5.29022208 8.64,7.1 C8.64,8.90977792 10.1512111,10.4 12,10.4 Z"
                id="path-1"
                fill="#757083"
              />
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default PersonSvg;