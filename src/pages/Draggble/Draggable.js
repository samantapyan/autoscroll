import React, { useState } from 'react';
import Draggable from 'react-draggable';

function MyDraggableElement() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [draggingPosition, seDraggingPosition] = useState({x:0,y:0})
  const ref = React.useRef(null)
  const [isDragging, setIsDragging] = useState(false);
  let scroll_speed =0
  let el = document.documentElement,
    scroll_position = 0,

    scroll_delta = 1.12,
    scroller,
    status = "stopped";
  function scroll(etype, dis= 0)
  {
    console.log("PARAMTERS+++",etype, document.documentElement)
    if (etype == "click")
    {
      window.cancelAnimationFrame(scroller);
      scroll_position = document.documentElement.scrollTop; //make sure we start from current position
      scroll_speed++; //increase speed with each click
      // setScrollSpeed(prev => prev++)
      // info("auto scroll");
    }
    //if previous position is different, this means user scrolled
    console.log("dd1000", dis)
    // if (ref.current.getBoundingClientRect().top >= 150 || etype === "stop")
    // {
    //   console.log("STOPIT")
    //   scroll_speed = 0;
    //   // window.cancelAnimationFrame(scroller);
    //   // setScrollSpeed(0)
    //   // info("stopped by user");
    //   return;
    // }
console.log("CONDITION1", window.innerHeight - ref.current.getBoundingClientRect().top - (ref.current.getBoundingClientRect().height/2))
     if (window.innerHeight - ref.current.getBoundingClientRect().top - (ref.current.getBoundingClientRect().height) <= 100 ) {
       document.documentElement.scrollTop -= scroll_delta * scroll_speed; //scroll to new position
       scroll_position = document.documentElement.scrollTop; //get the current position

       window.cancelAnimationFrame(scroller);
       scroll_position = el.scrollTop; //make sure we start from current position
       scroll_speed++; //increase speed with each click
    } else if (ref.current.getBoundingClientRect().top >= 200) {
       scroll_speed++
       document.documentElement.scrollTop += scroll_delta * scroll_speed; //scroll to new position
       scroll_position = document.documentElement.scrollTop; //get the current position
       window.cancelAnimationFrame(scroller);
       scroll_position = el.scrollTop; //make sure we start from current position
       scroll_speed++; //increase speed with each click
     }

    // document.documentElement.scrollTop -= scroll_delta * scroll_speed; //scroll to new position
    // scroll_position = document.documentElement.scrollTop; //get the current position

    //loop only if we didn't reach the bottom
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight > 0)
    {
      scroller = window.requestAnimationFrame(scroll); //loop
    }
    else
    {
      document.documentElement.scrollTop = document.documentElement.scrollHeight; //make sure it's all the way to the bottom
      scroll_speed = 0;
      // setScrollSpeed(0)
      // info("auto stopped");
    }
  }

  function handleDrag(event, ui) {
    console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",ref.current.getBoundingClientRect().top)
    setIsDragging(true);
    console.log("event++++++++",event);
    // Autoscroll logic
    const threshold = 200; // Distance from edge of viewport to trigger autoscroll
    const speed = 10; // Scrolling speed in pixels per frame

    // Get the position of the mouse pointer and the drag element
    const mousePos = {
      x: event.clientX,
      y: event.clientY
    };
    const dragPos = {
      x: ui.x,
      y: ui.y
    };
    setPosition({ x:mousePos.x, y: mousePos.y });
    // Check if the mouse pointer is close to the edge of the viewport
    console.log(window.scrollY, mousePos.y , threshold)

console.log("ppp8000",  event.clientY)
    if ( event.clientY <= 100) {
      console.log("FIRE++++++")
      scroll("click")
    } else if (event.clientY >=130) {
      scroll("stop",event.clientY )
    }
    // if (mousePos.y < threshold && window.scrollY > 0) {
    //   // Scroll up
    //   window.scrollBy(0, -speed);
    //   // Update the position of the drag element
    //   setPosition({ ...position, y: position.y - speed });
    // } else if (mousePos.y > window.innerHeight - threshold) {
    //   // Scroll down
    //   console.log("DOWN")
    //   window.scrollBy(0, speed);
    //   // Update the position of the drag element
    //   setPosition({ ...position, y: position.y + speed });
    // }

    // if (mousePos.x < threshold) {
    //   // Scroll left
    //   window.scrollBy(-speed, 0);
    //   // Update the position of the drag element
    //   setPosition({ ...position, x: position.x - speed });
    // } else if (mousePos.x > window.innerWidth - threshold) {
    //   // Scroll right
    //   window.scrollBy(speed, 0);
    //   // Update the position of the drag element
    //   setPosition({ ...position, x: position.x + speed });
    // }
  }



  // el.addEventListener("click", scroll);

  function test() {
    let el = document.documentElement,
      footer = document.getElementById("status").querySelectorAll("td"),
      scroll_position = 0,
      scroll_speed = 0,
      scroll_delta = 1.12,
      scroller,
      status = "stopped";

    el.addEventListener("click", scroll);

    info();

    function scroll(e)
    {
      if (e.type == "click")
      {
        window.cancelAnimationFrame(scroller);
        scroll_position = el.scrollTop; //make sure we start from current position
        scroll_speed++; //increase speed with each click
        info("auto scroll");
      }
      //if previous position is different, this means user scrolled
      if (scroll_position != el.scrollTop)
      {
        scroll_speed = 0;
        info("stopped by user");
        return;
      }

      el.scrollTop += scroll_delta * scroll_speed; //scroll to new position
      scroll_position = el.scrollTop; //get the current position

      //loop only if we didn't reach the bottom
      if (el.scrollHeight - el.scrollTop - el.clientHeight > 0)
      {
        scroller = window.requestAnimationFrame(scroll); //loop
      }
      else
      {
        el.scrollTop = el.scrollHeight; //make sure it's all the way to the bottom
        scroll_speed = 0;
        // info("auto stopped");
      }
    }

    function info(s)
    {
      if (typeof s === "string")
        status = s;

      footer[1].textContent = el.scrollTop;
      footer[3].textContent = scroll_speed;
      footer[5].textContent = status;

    }

//generate html demo sections
    for(let i = 2, section = document.createElement("section"); i < 6; i++)
    {
      section = section.cloneNode(false);
      section.textContent = "Section " + i;
      document.body.appendChild(section);
    }

//register scroll listener for displaying info
    window.addEventListener("scroll", info);
  }

  function handleStop(e,k) {
    setIsDragging(false);
    console.log("end",e,k)
    setPosition({x: e.pageX-50, y: e.pageY-50 })
  }

  return (
    <div style={{width:"4000px", height: "2000px", background:"yellow"}}>
      <Draggable
        onStart={(e, k) =>{
          setPosition({x:position.x, y:position.y})
          // setPosition({x: e.offsetX, y:e.offsetY})
        }}
        onDrag={handleDrag}
        onStop={(e, k) => handleStop(e, k)}
        position={position}
      >
        <div
ref={ref}
          style={
          isDragging ?

          {position: "fixed", width:"200px", height:"200px", background:"orange"}:
            { width:"200px", height:"200px", background:"red"}

        }

        >{position?.x} and {position.y}</div>
        {/*<div style={{transform : `translate(${position.x}px, ${position.y}px)`}}>Drag me!</div>*/}
      </Draggable>
    </div>

  );
}

export default MyDraggableElement;
