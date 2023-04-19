import React, { useRef, useState } from "react";
import Draggable from "react-draggable";

function MyDraggableElement() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const container = useRef();
  const intervalIDRef = React.useRef(null);
  const intervalIDRefLeft = React.useRef(null);

  function handleStop(e) {
    clearInterval(intervalIDRef.current);
    clearInterval(intervalIDRefLeft.current);
    setIsDragging(false);
    setPosition({
      x: e.pageX - 50 + +container?.current?.scrollLeft,
      y: e.pageY - 50 + container?.current?.scrollTop,
    });
  }

  const handleDrag2 = (event) => {
    const mousePos = {
      x: event.clientX,
      y: event.clientY,
    };
    setIsDragging(true);
    setPosition({ x: mousePos.x - 100, y: mousePos.y - 100 });
    const distBottom =
      container.current?.getBoundingClientRect()?.bottom - event.y;
    const distLeft =
      event?.x - container?.current?.getBoundingClientRect().left;
    const distRight =
      container?.current?.getBoundingClientRect()?.right - event.x;

    // Check if mouse is close to edge of container and start autoscrolling
    const scrollThreshold = 200; // Set distance from edge to start autoscrolling

    if (event.y < scrollThreshold && container?.current?.scrollTop) {
      clearInterval(intervalIDRef.current);
      intervalIDRef.current = setInterval(() => {
        container.current.scrollTop -= 10;
      }, 10);
    } else if (distBottom < scrollThreshold) {
      // const allRoad = container.current.scrollHeight - container.current.scrollTop - container.current.getBoundingClientRect().height + 24
      clearInterval(intervalIDRef.current);
      intervalIDRef.current = setInterval(() => {
        container.current.scrollTop += 10;
      }, 10);
    } else {
      clearInterval(intervalIDRef.current);
    }
    if (distLeft < scrollThreshold) {
      clearInterval(intervalIDRefLeft.current);
      intervalIDRefLeft.current = setInterval(() => {
        container.current.scrollLeft -= 10;
      }, 10);
    } else if (distRight < scrollThreshold) {
      clearInterval(intervalIDRefLeft.current);
      intervalIDRefLeft.current = setInterval(() => {
        container.current.scrollLeft += 10;
      }, 10);
    } else {
      clearInterval(intervalIDRefLeft.current);
    }
    console.log(event.y);
  };

  return (
    <div
      style={{ width: "1400px", overflow: "auto", height: "720px" }}
      ref={container}
    >
      <div
        style={{
          width: "8000px",
          height: "8000px",
          backgroundImage:
            "url(https://images.freeimages.com/images/previews/ac9/railway-hdr-1361893.jpg)",
        }}
      >
        <Draggable
          onStart={() => {
            setPosition({ x: position.x, y: position.y });
          }}
          onDrag={handleDrag2}
          onStop={(e, k) => handleStop(e, k)}
          position={position}
        >
          <div
            onScroll={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            ref={ref}
            id={"kio1"}
            style={
              isDragging
                ? {
                    position: "fixed",
                    width: "200px",
                    height: "200px",
                    background: "orange",
                  }
                : { width: "200px", height: "200px", background: "red" }
            }
          >
            {position?.x} and {position.y}
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default MyDraggableElement;
