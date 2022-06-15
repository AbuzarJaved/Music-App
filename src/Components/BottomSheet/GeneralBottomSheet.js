import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const GeneralBottomSheet = React.forwardRef((props, ref) => {
  return (
    <RBSheet
      ref={ref}
      height={props.height ? props.height : 150}
      openDuration={0}
      closeDuration={0}
      animationType="slide"
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: props.radius ? props.radius : null,
          borderTopLeftRadius: props.radius ? props.radius : null,
          backgroundColor: props.bg ? props.bg : '#1a1a1a',
          zIndex: 1000,
        },
        draggableIcon: {
          backgroundColor: '#F68128',
          width: 100,
          height: 8,
        },
      }}>
      {props.children}
    </RBSheet>
  );
});

export default GeneralBottomSheet;
