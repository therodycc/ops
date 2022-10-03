import React from 'react';

export const LoadingPoints = () => {
  return (
    <div
      style={{
        position: 'absolute',
        // backgroundColor: "#0000001d",
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}
    >
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};
