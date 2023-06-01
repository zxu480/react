import React from "react";

class MyPureComponent extends React.Component {

    static shallowEqual(objA, objB) {
      if (objA === objB) {
        return true;
      }
  
      if (typeof objA !== 'object' || typeof objB !== 'object' || objA === null || objB === null) {
        return false;
      }
  
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
      
      if (keysA.length !== keysB.length) {
        return false;
      }
  
      for (let i = 0; i < keysA.length; i++) {
        if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
          return false;
        }
      }
      
      return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (MyPureComponent.shallowEqual(this.props, nextProps) && MyPureComponent.shallowEqual(this.state, nextState)) {
          return false;
        }
        return true;
    }
}

export default MyPureComponent;