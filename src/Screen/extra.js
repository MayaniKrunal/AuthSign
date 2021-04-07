const { useState, useEffect } = React;
const { useSpring, animated, interpolate } = ReactSpring;
const { useDrag } = ReactUseGesture;
const rootElement = document.getElementById("root");
const height = window.innerHeight;
const width = window.innerWidth;
let w = 400;
if (width <= 500) {
  w = width;
}
const content = [
  {
    contentL1: "Online",
    contentL2: "GAMBLING",
    contentL3:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    src:
      "https://github.com/Cuberto/liquid-swipe/blob/master/Example/liquid-swipe/Images.xcassets/firstPageImage.imageset/firstPageImage@3x.png?raw=true",
  },
  {
    contentL1: "For",
    contentL2: "GAMERS",
    contentL3:
      "Temporibus autem aut officiis debitis aut rerum necessitatibus.",
    src:
      "https://raw.githubusercontent.com/Cuberto/liquid-swipe/master/Example/liquid-swipe/Images.xcassets/secondPageImage.imageset/secondPageImage%403x.png",
  },
  {
    contentL1: "Online",
    contentL2: "GAMBLING",
    contentL3:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    src:
     "https://github.com/Cuberto/liquid-swipe/blob/master/Example/liquid-swipe/Images.xcassets/firstPageImage.imageset/firstPageImage@3x.png?raw=true",
  },
];
const keyMap = {
  0: 1,
  1: 2,
  2: 0,
};
const getPath = (y, x, width) => {
  const anchorDistance = 200 + x * 0.5;
  const curviness = anchorDistance - 60;
  return `M0, 
    ${height} 
    H0V0h${width}v 
    ${y - anchorDistance} 
    c0, 
    ${curviness} 
    , 
   ${x} 
    , 
    ${curviness} 
    , 
   ${x} 
    , 
    ${anchorDistance} 
    S${width}, 
    ${y} 
    ,${width}, 
    ${y + anchorDistance * 2}
    V
    ${height}
    z`;
};
const Page = ({ data, index, setActive, gone = false }) => {
  const [isGone, setGone] = useState(gone);
  const [isMove, setMove] = useState(false);
  const { contentL1, contentL2, contentL3, src } = data;
  const [{ posX, posY }, setPos] = useSpring(() => ({
    posX: -50,
    posY: height * 0.72 - 20,
    config: {
      mass: 3,
    },
  }));
  const [{ d }, setDvalue] = useSpring(() => ({
    d: gone ? getPath(0, 0, w) : getPath(height * 0.72, 0, 0),
    config: {
      mass: 3,
    },
    onRest: () => {
      if (isGone) {
        setDvalue(getPath(0, 0, w));
      }
    },
  }));

  // swiper display ------------
  useEffect(() => {
    if (!gone) {
      setDvalue({
        d: getPath(height * 0.72, 48, 5),
      });
      setTimeout(() => {
        setPos({
          posX: 7,
        });
      }, 100);
    }
  }, [gone]);
// -----------
  const bind = useDrag(({ down, movement: [mx], xy: [, my], vxvy: [vx] }) => {
    if (!isGone) {
      if (down && isMove) {
        setDvalue({
          d: getPath(my, mx + 60, 10),
        });
        setPos({
          posX: mx + 20,
          posY: my - 20,
        });
        if (mx > 200 || vx > 3) {
          setDvalue({
            d: getPath(my, -50, w),
          });
          setGone(true);
          setTimeout(() => {
            setDvalue({
              d: getPath(my, 0, w),
            });
            setActive(index);
          }, 240);
        }
      } else {
        setDvalue({
          d: getPath(height * 0.72, 48, 5),
        });
        setPos({
          posX: 7,
          posY: height * 0.72 - 20,
        });
      }
    }
  });
  return (
    <div id={`pageContainer${index}`} className="pageContainer" {...bind()}>
      <svg version="1.1" id="blob" xmlns="http://www.w3.org/2000/svg">
        <clipPath id={`clipping${index}`}>
          <animated.path id={`blob-path${index}`} d={d} />
        </clipPath>
      </svg>
      <div
        id={`page${index}`}
        className="page"
        style={{
          clipPath: `url(#clipping${index})`,
          WebkitClipPath: `url(#clipping${index})`,
        }}
      >
        <div id={`header${index}`} className="header">
          <div>GameCoin</div>
          <div className={`skip text${index}`}>SKIP</div>
        </div>
        <img alt={`img${index}`} src={src} />
        <div id="content">
          <div className={`contentL1 text${index}`}>{contentL1}</div>
          <div className={`contentL2 text${index}`}>{contentL2}</div>
          <div className={`contentL3 text${index}`}>{contentL3}</div>
        </div>
      </div>
      <animated.button
        className={`button${index}`}
        onMouseDown={() => {
          setMove(true);
        }}
        onMouseUp={() => {
          setMove(false);
        }}
        onTouchStart={() => {
          setMove(true);
        }}
        onTouchEnd={() => {
          setMove(false);
        }}
        style={{
          opacity: posX.interpolate({
            range: [0, 100],
            output: [1, 0],
          }),
          transform: interpolate(
            [
              posX.interpolate((x) => `translateX(${x}px)`),
              posY.interpolate((y) => `translateY(${y}px)`),
            ],
            (translateX, translateY) => `${translateX} ${translateY}`
          ),
        }}
      >
        {">"}
      </animated.button>
    </div>
  );
};
const App = () => {
  const [isActive, setActive] = useState(0);
  const [elm, setElm] = useState([

    //---- first page
    <Page
      key={0}
      data={content[0]}
      index={0}
      setActive={setActive}
      gone={true}
    />,
    //---
  ]);

  useEffect(() => {
    const key = keyMap[isActive];
    if (elm.length === 2) {
      setTimeout(() => {
        setElm([
          ...elm.slice(1, 3),
          <Page
            key={key}
            data={content[key]}
            index={key}
            setActive={setActive}
          />,
        ]);
      }, 600);
    } else {
      setElm([
        ...elm,
        <Page
          key={key}
          data={content[key]}
          index={key}
          setActive={setActive}
        />,
      ]);
    }
  }, [isActive]);
  return (
    <>
      <div id="container">{elm}</div>
    </>
  );
};


ReactDOM.render(
    <App />,
  rootElement
);
